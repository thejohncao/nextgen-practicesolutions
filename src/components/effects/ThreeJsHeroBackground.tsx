
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

// Floating sphere with gradient material
const GradientSphere = ({ position, size, color1, color2, speed = 1 }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  // Create gradient texture
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d')!;
    
    // Create gradient
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [color1, color2]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.2;
    mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 * speed) * 0.2;
  });

  return (
    <Float floatIntensity={2} speed={2} rotationIntensity={0.5}>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          map={texture}
          transparent={true}
          opacity={0.7}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
    </Float>
  );
};

// Floating icosahedron
const FloatingPoly = ({ position, size, color, speed = 1 }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += 0.002 * speed;
    mesh.current.rotation.y += 0.003 * speed;
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.1;
  });

  return (
    <mesh ref={mesh} position={position}>
      <icosahedronGeometry args={[size, 0]} />
      <meshStandardMaterial 
        color={color}
        transparent={true}
        opacity={0.7}
        metalness={0.3}
        roughness={0.6}
        wireframe={true}
      />
    </mesh>
  );
};

// Scene adjustments based on viewport
const SceneSetup = () => {
  const { camera } = useThree();
  const isMobile = useIsMobile();
  
  React.useEffect(() => {
    // Adjust camera based on device
    if (isMobile) {
      camera.position.z = 10;
    } else {
      camera.position.z = 7;
    }
    camera.lookAt(0, 0, 0);
  }, [camera, isMobile]);
  
  return null;
};

const Scene = () => {
  return (
    <>
      <SceneSetup />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      
      <Sparkles 
        count={100}
        size={4}
        speed={0.3}
        opacity={0.5}
        scale={12}
        color="#9b87f5"
      />
      
      <GradientSphere 
        position={[-2, 0.5, -2]} 
        size={1.2} 
        color1="#9b87f5" 
        color2="#1EAEDB" 
        speed={1.2}
      />
      
      <GradientSphere 
        position={[2.5, -0.5, -1]} 
        size={0.9} 
        color1="#E87C7C" 
        color2="#9b87f5" 
        speed={0.8}
      />
      
      <FloatingPoly 
        position={[1, 1, -3]} 
        size={0.8} 
        color="#9b87f5" 
        speed={1}
      />
      
      <FloatingPoly 
        position={[-1.5, -1, -2]} 
        size={0.6} 
        color="#1EAEDB" 
        speed={1.3}
      />
    </>
  );
};

interface ThreeJsHeroBackgroundProps {
  className?: string;
}

const ThreeJsHeroBackground = ({ className = "" }: ThreeJsHeroBackgroundProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas 
        dpr={[1, isMobile ? 1.5 : 2]} // Lower DPR on mobile for performance
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene />
      </Canvas>
      
      {/* Additional gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-nextgen-dark/90 opacity-80"></div>
      
      {/* Grid overlay for aesthetics */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" 
        style={{ opacity: 0.3 }}
      ></div>
    </div>
  );
};

export default ThreeJsHeroBackground;
