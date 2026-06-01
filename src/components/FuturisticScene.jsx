import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls, PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { useRef } from "react";

function WorkspaceModel() {
  const group = useRef(null);

  useFrame(({ mouse, clock }) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y = mouse.x * 0.35 + Math.sin(clock.elapsedTime * 0.3) * 0.08;
    group.current.rotation.x = mouse.y * 0.12;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.05;
  });

  return (
    <group ref={group} position={[0, -0.3, 0]}>
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.45}>
        <RoundedBox args={[3.5, 0.18, 1.9]} radius={0.06} position={[0, -1.15, 0]}>
          <meshStandardMaterial color="#4d392f" metalness={0.35} roughness={0.7} />
        </RoundedBox>
        <RoundedBox args={[1.35, 0.75, 0.08]} radius={0.05} position={[0.05, -0.18, -0.2]}>
          <meshStandardMaterial color="#1c1c1c" metalness={0.8} roughness={0.25} />
        </RoundedBox>
        <RoundedBox args={[0.65, 0.05, 0.4]} radius={0.03} position={[0.02, -0.63, 0.48]}>
          <meshStandardMaterial color="#bba390" metalness={0.15} roughness={0.6} />
        </RoundedBox>
        <RoundedBox args={[0.7, 0.7, 0.7]} radius={0.16} position={[-0.98, -0.54, 0.16]}>
          <meshStandardMaterial color="#8b6f5a" metalness={0.25} roughness={0.55} />
        </RoundedBox>
        <mesh position={[-0.98, 0.1, 0.16]}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color="#dfcfbf" metalness={0.15} roughness={0.7} />
        </mesh>
        <mesh position={[1.03, -0.55, 0.1]} rotation={[0, 0, -0.2]}>
          <cylinderGeometry args={[0.23, 0.23, 0.55, 32]} />
          <meshStandardMaterial color="#e6d5c3" metalness={0.15} roughness={0.55} />
        </mesh>
        <mesh position={[1.02, -0.07, 0.12]}>
          <torusGeometry args={[0.28, 0.06, 18, 80]} />
          <meshStandardMaterial color="#c7ad96" metalness={0.35} roughness={0.35} />
        </mesh>
        <mesh position={[1.28, 0.35, -0.4]}>
          <octahedronGeometry args={[0.19, 0]} />
          <meshStandardMaterial color="#f5f1ea" emissive="#c8b6a6" emissiveIntensity={0.25} />
        </mesh>
      </Float>
    </group>
  );
}

export function FuturisticScene() {
  return (
    <div className="scene-wrapper">
      <Canvas dpr={[1, 1.6]}>
        <PerspectiveCamera makeDefault position={[0, 0.2, 5]} fov={38} />
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={1.6} color="#f1e3d2" />
        <directionalLight position={[4, 5, 3]} intensity={2} color="#fef4e8" />
        <pointLight position={[-4, 1, 2]} intensity={1.4} color="#8b6f5a" />
        <WorkspaceModel />
        <ContactShadows position={[0, -1.55, 0]} opacity={0.42} scale={6} blur={2.8} far={3} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.55} enablePan={false} />
      </Canvas>
    </div>
  );
}
