import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { experience, projects, skillPlanets } from "../data";

const cameraKeys = [
  { t: 0, position: [0, 1.8, 9], target: [0, 1.1, 0] },
  { t: 0.18, position: [-1.6, 1.9, 3], target: [0, 1.5, -8] },
  { t: 0.38, position: [1.4, 2.1, -10], target: [0, 1.7, -24] },
  { t: 0.58, position: [-1.2, 2.3, -28], target: [0, 1.4, -42] },
  { t: 0.78, position: [0.8, 2.7, -48], target: [0, 1.2, -60] },
  { t: 1, position: [0, 2.2, -70], target: [0, 1, -82] },
];

function lerpPath(progress) {
  const nextIndex = cameraKeys.findIndex((key) => progress <= key.t);

  if (nextIndex <= 0) {
    return cameraKeys[0];
  }

  if (nextIndex === -1) {
    return cameraKeys[cameraKeys.length - 1];
  }

  const prev = cameraKeys[nextIndex - 1];
  const next = cameraKeys[nextIndex];
  const span = next.t - prev.t || 1;
  const alpha = (progress - prev.t) / span;

  return {
    position: prev.position.map((value, index) => THREE.MathUtils.lerp(value, next.position[index], alpha)),
    target: prev.target.map((value, index) => THREE.MathUtils.lerp(value, next.target[index], alpha)),
  };
}

function ParticleField() {
  const points = useMemo(() => {
    const positions = new Float32Array(900 * 3);

    for (let index = 0; index < 900; index += 1) {
      positions[index * 3] = THREE.MathUtils.randFloatSpread(24);
      positions[index * 3 + 1] = THREE.MathUtils.randFloat(-4, 8);
      positions[index * 3 + 2] = THREE.MathUtils.randFloat(-92, 10);
    }

    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#f7f3ee" size={0.04} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function LightRig() {
  const rim = useRef(null);

  useFrame(({ clock }) => {
    if (rim.current) {
      rim.current.position.x = Math.sin(clock.elapsedTime * 0.2) * 6;
      rim.current.position.z = -28 + Math.cos(clock.elapsedTime * 0.18) * 16;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} color="#f7f3ee" />
      <directionalLight position={[4, 6, 4]} intensity={2.1} color="#f2ddc2" />
      <pointLight position={[-5, 3, 2]} intensity={28} distance={24} color="#8b6f5a" />
      <pointLight ref={rim} position={[0, 4, -28]} intensity={22} distance={36} color="#c6a77d" />
      <spotLight position={[0, 10, 6]} angle={0.42} intensity={55} penumbra={0.9} color="#f7f3ee" />
    </>
  );
}

function AvatarChamber() {
  const group = useRef(null);

  useFrame(({ mouse, clock }) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y = mouse.x * 0.28 + Math.sin(clock.elapsedTime * 0.3) * 0.06;
    group.current.rotation.x = mouse.y * 0.08;
    group.current.position.y = Math.sin(clock.elapsedTime * 1.1) * 0.05;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.4, 2.9, 64]} />
        <meshBasicMaterial color="#c6a77d" transparent opacity={0.32} side={THREE.DoubleSide} />
      </mesh>
      <Float speed={1.2} floatIntensity={0.3} rotationIntensity={0.15}>
        <mesh position={[0, -0.05, 0]}>
          <capsuleGeometry args={[0.36, 1.15, 8, 16]} />
          <meshStandardMaterial color="#ead8c5" roughness={0.7} metalness={0.08} />
        </mesh>
        <mesh position={[0, 1.02, 0]}>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshStandardMaterial color="#f7f3ee" roughness={0.72} metalness={0.05} />
        </mesh>
        <mesh position={[0, 0.22, -0.34]}>
          <boxGeometry args={[1.05, 0.6, 0.05]} />
          <meshStandardMaterial color="#141210" emissive="#6f4e37" emissiveIntensity={0.35} roughness={0.2} metalness={0.75} />
        </mesh>
        <mesh position={[-0.72, 0.2, 0]} rotation={[0, 0, 0.35]}>
          <capsuleGeometry args={[0.11, 0.85, 6, 14]} />
          <meshStandardMaterial color="#dcc7aa" roughness={0.65} />
        </mesh>
        <mesh position={[0.72, 0.2, 0]} rotation={[0, 0, -0.35]}>
          <capsuleGeometry args={[0.11, 0.85, 6, 14]} />
          <meshStandardMaterial color="#dcc7aa" roughness={0.65} />
        </mesh>
        <mesh position={[-0.24, -1.36, 0]} rotation={[0, 0, 0.08]}>
          <capsuleGeometry args={[0.12, 0.95, 6, 14]} />
          <meshStandardMaterial color="#ccb395" roughness={0.7} />
        </mesh>
        <mesh position={[0.24, -1.36, 0]} rotation={[0, 0, -0.08]}>
          <capsuleGeometry args={[0.12, 0.95, 6, 14]} />
          <meshStandardMaterial color="#ccb395" roughness={0.7} />
        </mesh>
      </Float>
      <mesh position={[0, -1.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.4, 64]} />
        <meshStandardMaterial color="#211d1a" roughness={0.96} metalness={0.1} />
      </mesh>
      <mesh position={[-1.8, -0.9, -0.7]}>
        <torusGeometry args={[0.38, 0.04, 14, 80]} />
        <meshStandardMaterial color="#c6a77d" emissive="#8b6f5a" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[1.7, 0.85, -0.9]}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color="#f7f3ee" emissive="#c6a77d" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function KeywordOrbit() {
  const group = useRef(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={group} position={[0, 1.3, -14]}>
      {[0, 1, 2, 3, 4, 5].map((index) => {
        const angle = (index / 6) * Math.PI * 2;
        return (
          <Float key={index} speed={1 + index * 0.08} floatIntensity={0.35}>
            <mesh position={[Math.cos(angle) * 3.6, Math.sin(angle * 1.4) * 1.2, Math.sin(angle) * 2.4]}>
              <icosahedronGeometry args={[0.42 + index * 0.03, 0]} />
              <meshStandardMaterial
                color={index % 2 === 0 ? "#d9c1a7" : "#8b6f5a"}
                transparent
                opacity={0.72}
                emissive="#c6a77d"
                emissiveIntensity={0.16}
                roughness={0.3}
                metalness={0.45}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function ExperienceRiver() {
  const linePoints = useMemo(
    () => [
      new THREE.Vector3(-2.2, -0.4, -24),
      new THREE.Vector3(-1.1, 0.25, -27),
      new THREE.Vector3(0.5, 0.35, -30),
      new THREE.Vector3(1.8, -0.15, -34),
    ],
    [],
  );

  return (
    <group>
      {linePoints.slice(0, -1).map((point, index) => {
        const next = linePoints[index + 1];
        const mid = point.clone().add(next).multiplyScalar(0.5);
        const length = point.distanceTo(next);
        const direction = new THREE.Vector3().subVectors(next, point);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());

        return (
          <mesh key={index} position={mid} quaternion={quaternion}>
            <cylinderGeometry args={[0.03, 0.03, length, 12]} />
            <meshBasicMaterial color="#c6a77d" transparent opacity={0.7} />
          </mesh>
        );
      })}

      {experience.map((item, index) => (
        <group key={item.company} position={linePoints[index + 1].toArray()}>
          <mesh>
            <sphereGeometry args={[0.25, 24, 24]} />
            <meshStandardMaterial color="#f7f3ee" emissive="#c6a77d" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[0, 0, -0.02]}>
            <torusGeometry args={[0.46, 0.03, 16, 80]} />
            <meshBasicMaterial color="#8b6f5a" transparent opacity={0.55} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function ProjectConstellations() {
  return (
    <group position={[0, 1.2, -42]}>
      {projects.map((project, index) => {
        const x = (index - 1.5) * 2.6;
        const y = index % 2 === 0 ? 0.65 : -0.1;
        const z = index * -1.65;

        return (
          <Float key={project.title} speed={1 + index * 0.12} floatIntensity={0.32}>
            <group position={[x, y, z]}>
              <mesh>
                <icosahedronGeometry args={[0.68, 0]} />
                <meshStandardMaterial color="#6f4e37" metalness={0.55} roughness={0.2} emissive="#c6a77d" emissiveIntensity={0.2} />
              </mesh>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.12, 0.02, 16, 100]} />
                <meshBasicMaterial color="#f7f3ee" transparent opacity={0.38} />
              </mesh>
              {[0, 1, 2].map((node) => {
                const angle = (node / 3) * Math.PI * 2;
                return (
                  <mesh key={node} position={[Math.cos(angle) * 1.25, Math.sin(angle) * 0.6, Math.sin(angle) * 0.8]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial color="#ead8c5" emissive="#c6a77d" emissiveIntensity={0.45} />
                  </mesh>
                );
              })}
            </group>
          </Float>
        );
      })}
    </group>
  );
}

function SkillSolarSystem() {
  const orbits = useRef([]);

  useFrame(({ clock }) => {
    orbits.current.forEach((orbit, index) => {
      if (orbit) {
        orbit.rotation.y = clock.elapsedTime * (0.06 + index * 0.01);
      }
    });
  });

  return (
    <group position={[0, 0.8, -62]}>
      <mesh>
        <sphereGeometry args={[1.05, 36, 36]} />
        <meshStandardMaterial color="#c6a77d" emissive="#f7f3ee" emissiveIntensity={0.55} roughness={0.3} metalness={0.18} />
      </mesh>
      {skillPlanets.map((planet, index) => (
        <group key={planet.id} ref={(node) => (orbits.current[index] = node)} rotation={[0.2 + index * 0.08, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[planet.orbitRadius * 0.65, 0.012, 12, 120]} />
            <meshBasicMaterial color="#8b6f5a" transparent opacity={0.24} />
          </mesh>
          <mesh position={[planet.orbitRadius * 0.65, 0, 0]}>
            <sphereGeometry args={[0.22 + index * 0.04, 24, 24]} />
            <meshStandardMaterial color={planet.color} emissive={planet.emissive} emissiveIntensity={0.28} metalness={0.4} roughness={0.34} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function FinalBeacon() {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.4) * 0.05);
      ref.current.rotation.y = clock.elapsedTime * 0.25;
    }
  });

  return (
    <group ref={ref} position={[0, 1.2, -82]}>
      <mesh>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color="#f7f3ee" emissive="#c6a77d" emissiveIntensity={0.95} roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.05, 16, 80]} />
        <meshBasicMaterial color="#c6a77d" transparent opacity={0.36} />
      </mesh>
    </group>
  );
}

function CameraRig({ progress }) {
  const lookAt = useRef(new THREE.Vector3(0, 1, 0));

  useFrame(({ camera }) => {
    const next = lerpPath(progress);
    camera.position.lerp(new THREE.Vector3(...next.position), 0.08);
    lookAt.current.lerp(new THREE.Vector3(...next.target), 0.08);
    camera.lookAt(lookAt.current);
  });

  return null;
}

function Scene({ progress }) {
  return (
    <>
      <color attach="background" args={["#120f0d"]} />
      <fogExp2 attach="fog" args={["#120f0d", 0.04]} />
      <CameraRig progress={progress} />
      <LightRig />
      <ParticleField />
      <Sparkles count={80} scale={[18, 8, 88]} size={2.2} speed={0.18} color="#f7f3ee" opacity={0.42} />
      <AvatarChamber />
      <KeywordOrbit />
      <ExperienceRiver />
      <ProjectConstellations />
      <SkillSolarSystem />
      <FinalBeacon />
    </>
  );
}

export function CinematicWorld({ progress }) {
  return (
    <div className="cinematic-world" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <Scene progress={progress} />
      </Canvas>
    </div>
  );
}
