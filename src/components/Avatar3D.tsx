import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simplified 3D hijab-wearing avatar
function HijabAvatar({ mousePosition }: { mousePosition: THREE.Vector2 }) {
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    time.current += delta;
    
    // Floating motion
    groupRef.current.position.y = Math.sin(time.current * 0.8) * 0.3;
    
    // Subtle rotation following cursor
    const targetRotationY = mousePosition.x * 0.3;
    const targetRotationX = -mousePosition.y * 0.2;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#d4a574"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Hijab fabric - main */}
      <mesh position={[0, 0.6, -0.2]}>
        <sphereGeometry args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>

      {/* Hijab fabric - drape */}
      <mesh position={[0, -0.2, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 1.2, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>

      {/* Face details - eyes */}
      <mesh position={[-0.15, 0.6, 0.4]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#2d3748" />
      </mesh>
      <mesh position={[0.15, 0.6, 0.4]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#2d3748" />
      </mesh>

      {/* Neon rim lighting */}
      <pointLight position={[2, 2, 2]} color="#60a5fa" intensity={3} distance={5} />
      <pointLight position={[-2, 0, 2]} color="#a855f7" intensity={2} distance={5} />
      
      {/* Edge glow */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Scene setup
function Scene({ mousePosition }: { mousePosition: THREE.Vector2 }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
      
      <HijabAvatar mousePosition={mousePosition} />
    </>
  );
}

// Main component
export default function Avatar3D() {
  const mousePosition = useRef(new THREE.Vector2(0, 0));

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mousePosition.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mousePosition.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  return (
    <div 
      className="w-full h-full"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene mousePosition={mousePosition.current} />
      </Canvas>
    </div>
  );
}
