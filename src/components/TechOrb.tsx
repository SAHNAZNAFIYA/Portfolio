import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Particle rings orbiting the orb
function ParticleRings({ mousePosition }: { mousePosition: THREE.Vector2 }) {
  const ring1Ref = useRef<THREE.Points>(null);
  const ring2Ref = useRef<THREE.Points>(null);
  const ring3Ref = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      const theta = (i / 150) * Math.PI * 2;
      const radius = 2.8 + (i % 3) * 0.4;
      
      positions[i * 3] = radius * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(theta) * 0.3;
      positions[i * 3 + 2] = radius * Math.sin(theta);
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = time * 0.3;
      ring1Ref.current.rotation.x = Math.sin(time * 0.2) * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.4;
      ring2Ref.current.rotation.z = Math.cos(time * 0.3) * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = time * 0.35;
      ring3Ref.current.rotation.y = -time * 0.25;
    }
  });

  return (
    <>
      <Points ref={ring1Ref} positions={particlesPosition} stride={3}>
        <PointMaterial
          transparent
          color="#60a5fa"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
      <Points ref={ring2Ref} positions={particlesPosition} stride={3} rotation={[Math.PI / 2, 0, 0]}>
        <PointMaterial
          transparent
          color="#a855f7"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.7}
        />
      </Points>
      <Points ref={ring3Ref} positions={particlesPosition} stride={3} rotation={[0, Math.PI / 2, Math.PI / 4]}>
        <PointMaterial
          transparent
          color="#ec4899"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </>
  );
}

// Main Tech Orb with wireframe and glow
function TechOrbMesh({ mousePosition }: { mousePosition: THREE.Vector2 }) {
  const orbRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  // Wireframe geometry
  const wireframeGeometry = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    return new THREE.EdgesGeometry(geometry);
  }, []);

  useFrame((state) => {
    if (!orbRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Slow auto rotation
    orbRef.current.rotation.y = time * 0.15;
    orbRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    
    // Cursor reactive tilt
    const targetRotationX = mousePosition.y * 0.4;
    const targetRotationZ = mousePosition.x * 0.4;
    
    orbRef.current.rotation.x = THREE.MathUtils.lerp(
      orbRef.current.rotation.x,
      targetRotationX + Math.sin(time * 0.1) * 0.1,
      0.05
    );
    orbRef.current.rotation.z = THREE.MathUtils.lerp(
      orbRef.current.rotation.z,
      targetRotationZ,
      0.05
    );

    // Holographic glow pulse
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.MeshPhysicalMaterial;
      material.opacity = 0.15 + Math.sin(time * 0.8) * 0.05;
    }

    // Wireframe pulse
    if (wireframeRef.current && wireframeRef.current.material) {
      const material = wireframeRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.7 + Math.sin(time * 1.2) * 0.2;
    }
  });

  return (
    <group ref={orbRef}>
      {/* Reflective glass sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshPhysicalMaterial
          color="#1e40af"
          transparent
          opacity={0.15}
          metalness={0.9}
          roughness={0.05}
          transmission={0.98}
          thickness={0.8}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Thick neon wireframe with gradient effect */}
      <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
        <lineBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.8}
          linewidth={3}
        />
      </lineSegments>

      {/* Outer glow sphere */}
      <mesh>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Inner core glow */}
      <pointLight color="#60a5fa" intensity={2} distance={5} />
      <pointLight color="#a855f7" intensity={1.5} distance={4} position={[1, 1, 1]} />
    </group>
  );
}

// Main scene
function Scene({ mousePosition }: { mousePosition: THREE.Vector2 }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#60a5fa" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      
      <TechOrbMesh mousePosition={mousePosition} />
      <ParticleRings mousePosition={mousePosition} />
    </>
  );
}

// Main component
export default function TechOrb() {
  const mousePosition = useRef(new THREE.Vector2(0, 0));

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mousePosition.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mousePosition.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  return (
    <div 
      className="w-full h-full cursor-move"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene mousePosition={mousePosition.current} />
      </Canvas>
    </div>
  );
}
