import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Cursor tracking hook
function useCursorPosition() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return cursor;
}

// Thick neon wireframe orb with blue→purple gradient
function CentralOrb({ cursor }: { cursor: { x: number; y: number } }) {
  const orbRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  // Wireframe geometry
  const wireframeGeometry = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1, 2);
    return new THREE.EdgesGeometry(geometry);
  }, []);

  // Shader material for gradient wireframe
  const wireframeMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vPosition;
        
        void main() {
          // Blue to purple gradient based on position
          float gradientFactor = (vPosition.y + 1.0) / 2.0;
          vec3 blue = vec3(0.376, 0.647, 0.980); // #60a5fa
          vec3 purple = vec3(0.659, 0.333, 0.969); // #a855f7
          vec3 color = mix(blue, purple, gradientFactor);
          
          // Holographic pulse
          float pulse = 0.85 + 0.15 * sin(time * 0.8 + vPosition.y * 2.5);
          
          gl_FragColor = vec4(color * pulse, 0.95);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (!orbRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Slow auto rotation
    orbRef.current.rotation.y = time * 0.2;
    orbRef.current.rotation.x = Math.sin(time * 0.15) * 0.15;
    
    // Cursor reactive tilt
    const targetRotationX = cursor.y * 0.25;
    const targetRotationZ = cursor.x * 0.25;
    
    orbRef.current.rotation.x = THREE.MathUtils.lerp(
      orbRef.current.rotation.x,
      targetRotationX + Math.sin(time * 0.15) * 0.15,
      0.05
    );
    orbRef.current.rotation.z = THREE.MathUtils.lerp(
      orbRef.current.rotation.z,
      targetRotationZ,
      0.05
    );

    // Update shader time for pulse effect
    if (wireframeRef.current && wireframeRef.current.material) {
      (wireframeRef.current.material as THREE.ShaderMaterial).uniforms.time.value = time;
    }

    // Glass orb subtle pulse
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.MeshPhysicalMaterial;
      material.opacity = 0.1 + Math.sin(time * 0.6) * 0.03;
    }
  });

  return (
    <group ref={orbRef}>
      {/* Reflective glass sphere core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 2]} />
        <meshPhysicalMaterial
          color="#1e40af"
          transparent
          opacity={0.1}
          metalness={0.9}
          roughness={0.05}
          transmission={0.98}
          thickness={1.2}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* Thick neon wireframe with gradient */}
      <lineSegments ref={wireframeRef} geometry={wireframeGeometry} material={wireframeMaterial} />

      {/* Outer holographic glow sphere */}
      <mesh>
        <icosahedronGeometry args={[1.08, 2]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Inner core glow lights */}
      <pointLight color="#60a5fa" intensity={1.5} distance={3} />
      <pointLight color="#a855f7" intensity={1.2} distance={2.5} position={[0.5, 0.5, 0.5]} />
    </group>
  );
}

// Single neon ribbon with enhanced cursor reactivity
function NeonRibbon({ 
  cursor, 
  index = 0, 
  totalRibbons = 1 
}: { 
  cursor: { x: number; y: number }; 
  index?: number;
  totalRibbons?: number;
}) {
  const ribbonRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Offset rotation for multiple ribbons
  const rotationOffset = (index / totalRibbons) * Math.PI * 2;
  const radiusVariation = 1.2 + index * 0.15;

  const ribbonGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const turns = 2.5 + index * 0.3;
    const segments = 180;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 2 * turns + rotationOffset;
      const radius = radiusVariation + Math.sin(t * Math.PI * 6) * 0.08;
      const y = (t - 0.5) * 1.2;
      
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        y + Math.sin(t * Math.PI * 4) * 0.1,
        Math.sin(angle) * radius
      ));
    }
    
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 180, 0.025 - index * 0.003, 8, false);
  }, [rotationOffset, radiusVariation, index]);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        cursorX: { value: 0 },
        cursorY: { value: 0 },
        cursorProximity: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        uniform float cursorProximity;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 pos = position;
          // Sine wave ripples along ribbon - amplified by cursor proximity
          float rippleStrength = 0.008 + cursorProximity * 0.015;
          pos += normal * sin(uv.x * 25.0 + time * 3.0) * rippleStrength;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        uniform float cursorProximity;
        
        void main() {
          float gradient = vUv.x;
          
          // Cyan → Blue → Purple → Pink gradient
          vec3 cyan = vec3(0.0, 0.95, 0.95);
          vec3 blue = vec3(0.25, 0.45, 1.0);
          vec3 purple = vec3(0.55, 0.25, 1.0);
          vec3 pink = vec3(1.0, 0.35, 0.65);
          
          vec3 color;
          if (gradient < 0.33) {
            color = mix(cyan, blue, gradient * 3.0);
          } else if (gradient < 0.66) {
            color = mix(blue, purple, (gradient - 0.33) * 3.0);
          } else {
            color = mix(purple, pink, (gradient - 0.66) * 3.0);
          }
          
          // Glow pulsation - intensified by cursor
          float glow = 0.6 + 0.4 * sin(time * 2.5 + vUv.x * 12.0);
          float cursorGlow = 1.0 + cursorProximity * 0.4;
          color *= glow * cursorGlow;
          
          // Soft edge fade
          float edgeFade = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
          
          gl_FragColor = vec4(color, 0.85 * edgeFade);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false
    });
  }, []);

  useFrame((state) => {
    if (!ribbonRef.current || !materialRef.current) return;
    
    const time = state.clock.elapsedTime;
    const cursorDist = Math.sqrt(cursor.x * cursor.x + cursor.y * cursor.y);
    const proximity = Math.max(0, 1 - cursorDist);
    
    materialRef.current.uniforms.time.value = time;
    materialRef.current.uniforms.cursorX.value = cursor.x;
    materialRef.current.uniforms.cursorY.value = cursor.y;
    materialRef.current.uniforms.cursorProximity.value = proximity;
    
    // Slow orbital rotation (0.15-0.2 speed)
    ribbonRef.current.rotation.y = time * (0.15 + index * 0.02);
    
    // Cursor-reactive tilt with spring physics
    ribbonRef.current.rotation.x += (cursor.y * 0.12 - ribbonRef.current.rotation.x) * 0.04;
    ribbonRef.current.rotation.z += (cursor.x * 0.12 - ribbonRef.current.rotation.z) * 0.04;
    
    // Breathing expansion/contraction
    const breathe = 1 + Math.sin(time * 0.4 + index) * 0.03;
    ribbonRef.current.scale.setScalar(breathe);
  });

  return (
    <mesh ref={ribbonRef} geometry={ribbonGeometry}>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  );
}

// Multiple layered ribbons
function LayeredRibbons({ cursor }: { cursor: { x: number; y: number } }) {
  const ribbonCount = 4;
  
  return (
    <>
      {Array.from({ length: ribbonCount }).map((_, i) => (
        <NeonRibbon 
          key={i} 
          cursor={cursor} 
          index={i} 
          totalRibbons={ribbonCount} 
        />
      ))}
    </>
  );
}

// Subtle particle cloud
function SubtleParticles({ cursor }: { cursor: { x: number; y: number } }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 200;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.2 + Math.random() * 1.5;
      
      return {
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        originalPosition: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        scale: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.5 + 0.3,
        color: new THREE.Color().setHSL(
          0.6 + Math.random() * 0.35,
          0.85,
          0.65
        )
      };
    });
  }, []);

  useMemo(() => {
    particles.forEach(p => {
      p.originalPosition.copy(p.position);
    });
  }, [particles]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    const cursorPos = new THREE.Vector3(cursor.x * 2, cursor.y * 2, 0);
    
    particles.forEach((particle, i) => {
      const dir = cursorPos.clone().sub(particle.position);
      const dist = dir.length();
      
      if (dist < 3) {
        const force = dir.normalize().multiplyScalar(0.008 / (dist + 0.5));
        particle.velocity.add(force);
      }
      
      const returnForce = particle.originalPosition.clone().sub(particle.position).multiplyScalar(0.008);
      particle.velocity.add(returnForce);
      
      particle.velocity.multiplyScalar(0.96);
      particle.position.add(particle.velocity);
      
      const offset = Math.sin(time * particle.speed + i * 0.15) * 0.03;
      
      dummy.position.copy(particle.position);
      dummy.position.y += offset;
      
      const scalePulse = particle.scale * (1 + Math.sin(time * 1.5 + i) * 0.15);
      dummy.scale.setScalar(scalePulse);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      meshRef.current!.setColorAt(i, particle.color);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial transparent opacity={0.6} />
    </instancedMesh>
  );
}

// Ultra-faint background dust
function BackgroundDust() {
  const points = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.015;
    points.current.rotation.x = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={300}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#a78bfa"
        transparent
        opacity={0.2}
        sizeAttenuation
      />
    </points>
  );
}

// Main scene component
function Scene() {
  const cursor = useCursorPosition();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    
    groupRef.current.rotation.x += (cursor.y * 0.1 - groupRef.current.rotation.x) * 0.03;
    groupRef.current.rotation.y += (cursor.x * 0.1 - groupRef.current.rotation.y) * 0.03;
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#8b5cf6" />
      <pointLight position={[0, 3, 3]} intensity={0.3} color="#06b6d4" />
      
      <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.2}>
        <group ref={groupRef}>
          <CentralOrb cursor={cursor} />
          <LayeredRibbons cursor={cursor} />
        </group>
      </Float>
      
      <SubtleParticles cursor={cursor} />
      <BackgroundDust />
      
      <Environment preset="night" />
      
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.95}
          intensity={1.8}
          radius={0.9}
        />
      </EffectComposer>
    </>
  );
}

export default function NeonRibbonOrb() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
