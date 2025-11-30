import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

// Custom hook for cursor tracking
function useCursorPosition() {
  const cursor = useRef(new THREE.Vector2(0, 0));
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursor.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      cursor.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return cursor.current;
}

// Neural network node
function NetworkNode({ position, index, totalNodes, cursor }: { 
  position: THREE.Vector3; 
  index: number; 
  totalNodes: number;
  cursor: THREE.Vector2;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Pulsing glow effect
    const pulse = 0.7 + 0.3 * Math.sin(time * 2 + index * 0.5);
    meshRef.current.scale.setScalar(pulse);
    
    // Color shift between blue and purple
    const material = meshRef.current.material as THREE.MeshBasicMaterial;
    const colorShift = Math.sin(time + index) * 0.5 + 0.5;
    material.color.setHSL(0.6 - colorShift * 0.15, 0.8, 0.6);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial transparent opacity={0.9} />
      <pointLight color="#60a5fa" intensity={0.5} distance={1} />
    </mesh>
  );
}

// Neural network connections
function NetworkConnections({ nodes }: { nodes: THREE.Vector3[] }) {
  const connections = useMemo(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].distanceTo(nodes[j]);
        if (distance < 1.2) {
          pairs.push([nodes[i], nodes[j]]);
        }
      }
    }
    
    return pairs;
  }, [nodes]);

  return (
    <>
      {connections.map((pair, index) => (
        <PulsingConnection key={index} start={pair[0]} end={pair[1]} index={index} />
      ))}
    </>
  );
}

// Pulsing connection line
function PulsingConnection({ start, end, index }: { 
  start: THREE.Vector3; 
  end: THREE.Vector3; 
  index: number;
}) {
  const materialRef = useRef<THREE.LineBasicMaterial>(
    new THREE.LineBasicMaterial({ 
      color: '#a855f7',
      transparent: true,
      opacity: 0.3
    })
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Pulsing opacity
    materialRef.current.opacity = 0.2 + 0.15 * Math.sin(time * 1.5 + index * 0.3);
  });

  return (
    <Line
      points={[start, end]}
      color="#a855f7"
      lineWidth={1}
      transparent
      opacity={0.3}
    />
  );
}

// Skill icon components
function AIIcon({ position, orbitAngle, index }: { position: THREE.Vector3; orbitAngle: number; index: number }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Orbiting + bobbing
    const radius = 2.8;
    const speed = 0.3;
    const x = Math.cos(time * speed + orbitAngle) * radius;
    const z = Math.sin(time * speed + orbitAngle) * radius;
    const y = Math.sin(time * 0.5 + index) * 0.3;
    
    meshRef.current.position.set(x, y, z);
    meshRef.current.rotation.y = time * 0.5;
    
    // Glow pulse
    const pulse = 0.6 + 0.4 * Math.sin(time * 1.5 + index * 0.5);
    meshRef.current.scale.setScalar(pulse * 0.15);
  });
  
  return (
    <group ref={meshRef}>
      <mesh>
        <sphereGeometry args={[1, 8, 8]} />
        <meshPhysicalMaterial
          color="#60a5fa"
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
          transmission={0.8}
        />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-0.3, -0.2, 0]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.3, -0.2, 0]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.8} />
      </mesh>
      <pointLight color="#60a5fa" intensity={1} distance={3} />
    </group>
  );
}

function IoTIcon({ position, orbitAngle, index }: { position: THREE.Vector3; orbitAngle: number; index: number }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    const radius = 2.8;
    const speed = 0.3;
    const x = Math.cos(time * speed + orbitAngle) * radius;
    const z = Math.sin(time * speed + orbitAngle) * radius;
    const y = Math.sin(time * 0.5 + index) * 0.3;
    
    meshRef.current.position.set(x, y, z);
    meshRef.current.rotation.y = time * 0.5;
    
    const pulse = 0.6 + 0.4 * Math.sin(time * 1.5 + index * 0.5);
    meshRef.current.scale.setScalar(pulse * 0.15);
  });
  
  return (
    <group ref={meshRef}>
      <mesh>
        <torusGeometry args={[1, 0.3, 8, 16]} />
        <meshPhysicalMaterial
          color="#a855f7"
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
          transmission={0.8}
        />
      </mesh>
      <mesh position={[0.8, 0, 0]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.8, 0, 0]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.9} />
      </mesh>
      <pointLight color="#a855f7" intensity={1} distance={3} />
    </group>
  );
}

function Web3Icon({ position, orbitAngle, index }: { position: THREE.Vector3; orbitAngle: number; index: number }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    const radius = 2.8;
    const speed = 0.3;
    const x = Math.cos(time * speed + orbitAngle) * radius;
    const z = Math.sin(time * speed + orbitAngle) * radius;
    const y = Math.sin(time * 0.5 + index) * 0.3;
    
    meshRef.current.position.set(x, y, z);
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.5;
    
    const pulse = 0.6 + 0.4 * Math.sin(time * 1.5 + index * 0.5);
    meshRef.current.scale.setScalar(pulse * 0.15);
  });
  
  return (
    <group ref={meshRef}>
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshPhysicalMaterial
          color="#60a5fa"
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
          transmission={0.8}
          wireframe
        />
      </mesh>
      <mesh>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>
      <pointLight color="#60a5fa" intensity={1} distance={3} />
    </group>
  );
}

function WebDevIcon({ position, orbitAngle, index }: { position: THREE.Vector3; orbitAngle: number; index: number }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    const radius = 2.8;
    const speed = 0.3;
    const x = Math.cos(time * speed + orbitAngle) * radius;
    const z = Math.sin(time * speed + orbitAngle) * radius;
    const y = Math.sin(time * 0.5 + index) * 0.3;
    
    meshRef.current.position.set(x, y, z);
    meshRef.current.rotation.y = time * 0.5;
    
    const pulse = 0.6 + 0.4 * Math.sin(time * 1.5 + index * 0.5);
    meshRef.current.scale.setScalar(pulse * 0.15);
  });
  
  return (
    <group ref={meshRef}>
      <mesh position={[-0.5, 0, 0]}>
        <boxGeometry args={[0.3, 1.5, 0.3]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.5, 0, 0]}>
        <boxGeometry args={[0.3, 1.5, 0.3]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.8} />
      </mesh>
      <mesh>
        <torusGeometry args={[1, 0.15, 8, 16]} />
        <meshPhysicalMaterial
          color="#60a5fa"
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
          transmission={0.8}
        />
      </mesh>
      <pointLight color="#60a5fa" intensity={1} distance={3} />
    </group>
  );
}

function BlockchainIcon({ position, orbitAngle, index }: { position: THREE.Vector3; orbitAngle: number; index: number }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    const radius = 2.8;
    const speed = 0.3;
    const x = Math.cos(time * speed + orbitAngle) * radius;
    const z = Math.sin(time * speed + orbitAngle) * radius;
    const y = Math.sin(time * 0.5 + index) * 0.3;
    
    meshRef.current.position.set(x, y, z);
    meshRef.current.rotation.y = time * 0.5;
    
    const pulse = 0.6 + 0.4 * Math.sin(time * 1.5 + index * 0.5);
    meshRef.current.scale.setScalar(pulse * 0.15);
  });
  
  return (
    <group ref={meshRef}>
      <mesh>
        <cylinderGeometry args={[1, 1, 0.4, 6]} />
        <meshPhysicalMaterial
          color="#a855f7"
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
          transmission={0.8}
        />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.2, 6]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.2, 6]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.7} />
      </mesh>
      <pointLight color="#a855f7" intensity={1} distance={3} />
    </group>
  );
}


// Semi-transparent orb container
function TransparentOrb({ cursor }: { cursor: THREE.Vector2 }) {
  const orbRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!orbRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Slow rotation
    orbRef.current.rotation.y = time * 0.15;
    orbRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    
    // Enhanced cursor tilt
    const targetRotationX = cursor.y * 0.3;
    const targetRotationZ = cursor.x * 0.3;
    
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

    // Holographic pulse
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.MeshPhysicalMaterial;
      material.opacity = 0.1 + Math.sin(time * 0.5) * 0.03;
    }
  });

  return (
    <group ref={orbRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.2, 2]} />
        <meshPhysicalMaterial
          color="#60a5fa"
          transparent
          opacity={0.1}
          metalness={0.9}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh>
        <icosahedronGeometry args={[2.4, 2]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Neural network structure
function NeuralNetwork({ cursor }: { cursor: THREE.Vector2 }) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate neural network nodes
  const nodes = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const layers = 4;
    const nodesPerLayer = 8;
    
    for (let layer = 0; layer < layers; layer++) {
      const radius = 1.2 + layer * 0.2;
      const angleOffset = (layer % 2) * Math.PI / nodesPerLayer;
      
      for (let i = 0; i < nodesPerLayer; i++) {
        const angle = (i / nodesPerLayer) * Math.PI * 2 + angleOffset;
        const x = Math.cos(angle) * radius;
        const y = (layer - layers / 2) * 0.5;
        const z = Math.sin(angle) * radius;
        
        positions.push(new THREE.Vector3(x, y, z));
      }
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Gentle rotation
    groupRef.current.rotation.y = time * 0.1;
  });

  return (
    <group ref={groupRef}>
      <NetworkConnections nodes={nodes} />
      {nodes.map((position, index) => (
        <NetworkNode 
          key={index} 
          position={position} 
          index={index} 
          totalNodes={nodes.length}
          cursor={cursor}
        />
      ))}
    </group>
  );
}

// Main scene
function Scene() {
  const cursor = useCursorPosition();
  const dummyPosition = new THREE.Vector3(0, 0, 0);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#60a5fa" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#a855f7" />
      
      <TransparentOrb cursor={cursor} />
      <NeuralNetwork cursor={cursor} />
      
      {/* Orbiting skill icons */}
      <AIIcon position={dummyPosition} orbitAngle={0} index={0} />
      <IoTIcon position={dummyPosition} orbitAngle={Math.PI * 0.4} index={1} />
      <Web3Icon position={dummyPosition} orbitAngle={Math.PI * 0.8} index={2} />
      <WebDevIcon position={dummyPosition} orbitAngle={Math.PI * 1.2} index={3} />
      <BlockchainIcon position={dummyPosition} orbitAngle={Math.PI * 1.6} index={4} />
    </>
  );
}

// Main component export
export default function NeuralNetworkOrb() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
