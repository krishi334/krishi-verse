import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, PerspectiveCamera, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";

function iconUrl(skill) {
  return `https://cdn.simpleicons.org/${skill.slug}/${skill.color}`;
}

function SkillIconImage({ skill, className = "" }) {
  const [failed, setFailed] = useState(false);
  const fallback = skill.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return failed ? (
    <span className={`skill-icon-fallback ${className}`}>{fallback}</span>
  ) : (
    <img
      src={iconUrl(skill)}
      alt={skill.name}
      width="24"
      height="24"
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

function PlanetRings({ color }) {
  return (
    <group rotation={[Math.PI / 2.6, 0.2, 0]}>
      <mesh>
        <torusGeometry args={[1.15, 0.055, 20, 100]} />
        <meshStandardMaterial color={color} transparent opacity={0.78} metalness={0.5} roughness={0.42} />
      </mesh>
      <mesh scale={1.18}>
        <torusGeometry args={[1.15, 0.018, 20, 100]} />
        <meshBasicMaterial color="#F7F3EE" transparent opacity={0.26} />
      </mesh>
    </group>
  );
}

function PlanetIcons({ planet, onHoverSkill, isPlanetActive }) {
  const iconsGroup = useRef(null);

  useFrame(({ clock }) => {
    if (!iconsGroup.current) {
      return;
    }
    iconsGroup.current.rotation.y = clock.elapsedTime * (isPlanetActive ? 0.24 : 0.4);
    iconsGroup.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={iconsGroup}>
      {planet.skills.map((skill, index) => {
        const angle = (Math.PI * 2 * index) / planet.skills.length;
        const radius = planet.size + 0.55;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.35;
        const z = Math.sin(angle) * radius;
        const fallback = skill.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2);

        return (
          <group key={skill.name} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[0.13, 18, 18]} />
              <meshBasicMaterial color="#F7F3EE" transparent opacity={0.18} />
            </mesh>
            <Html transform occlude distanceFactor={10} sprite>
              <button
                type="button"
                className={`planet-skill-icon ${isPlanetActive ? "is-active" : ""}`}
                onMouseEnter={() => onHoverSkill(skill, planet)}
                onMouseLeave={() => onHoverSkill(null, planet)}
                onFocus={() => onHoverSkill(skill, planet)}
                onBlur={() => onHoverSkill(null, planet)}
              >
                <SkillIconImage skill={skill} />
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

function OrbitTrail({ radius, active }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.015, radius + 0.015, 128]} />
      <meshBasicMaterial color={active ? "#C6A77D" : "#8B6F5A"} transparent opacity={active ? 0.42 : 0.18} side={THREE.DoubleSide} />
    </mesh>
  );
}

function PlanetNode({ planet, hoveredPlanetId, hoveredSkill, onHoverPlanet, onHoverSkill, onSelectPlanet }) {
  const orbitRef = useRef(null);
  const planetRef = useRef(null);
  const isActive = hoveredPlanetId === planet.id || hoveredSkill?.planet?.id === planet.id;

  useFrame(({ clock }) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = planet.baseAngle + clock.elapsedTime * (isActive ? planet.orbitSpeed * 0.42 : planet.orbitSpeed);
    }
    if (planetRef.current) {
      const lift = isActive ? 1.08 : 1;
      planetRef.current.scale.lerp(new THREE.Vector3(lift, lift, lift), 0.08);
      planetRef.current.rotation.y += 0.0035;
      planetRef.current.rotation.x += 0.0012;
    }
  });

  return (
    <group ref={orbitRef}>
      <OrbitTrail radius={planet.orbitRadius} active={isActive} />
      <group position={[planet.orbitRadius, 0, 0]}>
        <mesh
          ref={planetRef}
          onPointerOver={(event) => {
            event.stopPropagation();
            onHoverPlanet(planet);
          }}
          onPointerOut={() => onHoverPlanet(null)}
          onClick={() => onSelectPlanet(planet)}
        >
          <sphereGeometry args={[planet.size, 48, 48]} />
          <meshPhysicalMaterial
            color={planet.color}
            emissive={planet.emissive}
            emissiveIntensity={planet.glow ? 0.8 : 0.35}
            roughness={0.42}
            metalness={0.48}
            clearcoat={0.85}
            clearcoatRoughness={0.18}
          />
        </mesh>

        {planet.ring ? <PlanetRings color={planet.accent} /> : null}
        {planet.glow ? <Sparkles count={24} scale={[2.8, 2.8, 2.8]} size={1.8} speed={0.6} color={planet.emissive} /> : null}
        {planet.id === "database-cloud" ? <Sparkles count={18} scale={[2.3, 2.3, 2.3]} size={1.2} speed={0.4} color="#DCC7AA" /> : null}
        {planet.id === "design" ? <Sparkles count={14} scale={[2.1, 2.1, 2.1]} size={1.1} speed={0.35} color="#F7F3EE" /> : null}

        <Html center transform distanceFactor={12} position={[0, planet.size + 0.48, 0]}>
          <div className={`planet-label planet-label--icons ${isActive ? "is-active" : ""}`}>
            {planet.skills.slice(0, 3).map((skill) => (
              <span key={skill.name} className="planet-label__icon">
                <SkillIconImage skill={skill} className="planet-label__icon-image" />
              </span>
            ))}
          </div>
        </Html>

        <PlanetIcons planet={planet} onHoverSkill={onHoverSkill} isPlanetActive={isActive} />
      </group>
    </group>
  );
}

function SceneRig({ planets, hoveredPlanetId, hoveredSkill, onHoverPlanet, onHoverSkill, onSelectPlanet, scrollProgress }) {
  const rootRef = useRef(null);
  const { camera, pointer } = useThree();

  useFrame(() => {
    if (rootRef.current) {
      rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, pointer.x * 0.18, 0.035);
      rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, -pointer.y * 0.08, 0.035);
    }

    const targetX = pointer.x * 1.05;
    const targetY = 1.2 + pointer.y * 0.45 + scrollProgress * 0.45;
    const targetZ = 14 - scrollProgress * 1.8;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.03);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.03);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={rootRef}>
      {planets.map((planet) => (
        <PlanetNode
          key={planet.id}
          planet={planet}
          hoveredPlanetId={hoveredPlanetId}
          hoveredSkill={hoveredSkill}
          onHoverPlanet={onHoverPlanet}
          onHoverSkill={onHoverSkill}
          onSelectPlanet={onSelectPlanet}
        />
      ))}
    </group>
  );
}

export function SkillSolarSystem({ planets, hoveredPlanet, hoveredSkill, onHoverPlanet, onHoverSkill, onSelectPlanet, scrollProgress }) {
  const hoveredPlanetId = hoveredPlanet?.id || hoveredSkill?.planet?.id || null;
  const controlsConfig = useMemo(
    () => ({
      minPolarAngle: Math.PI / 2.35,
      maxPolarAngle: Math.PI / 1.7,
    }),
    [],
  );

  return (
    <div className="skill-scene">
      <Canvas dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[0, 1.2, 14]} fov={36} />
        <fog attach="fog" args={["#F7F3EE", 12, 26]} />
        <ambientLight intensity={1.25} color="#F7F3EE" />
        <directionalLight position={[8, 8, 5]} intensity={1.8} color="#FFF4E7" />
        <pointLight position={[-4, 2, 3]} intensity={2.1} color="#C6A77D" />
        <pointLight position={[3, -2, -3]} intensity={1.2} color="#8B6F5A" />
        <mesh>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshBasicMaterial color="#C6A77D" transparent opacity={0.18} />
        </mesh>
        <Stars radius={40} depth={18} count={2500} factor={1.8} saturation={0} fade speed={0.4} />
        <Sparkles count={120} scale={[24, 10, 24]} size={1.5} speed={0.18} color="#DCC7AA" />
        <SceneRig
          planets={planets}
          hoveredPlanetId={hoveredPlanetId}
          hoveredSkill={hoveredSkill}
          onHoverPlanet={onHoverPlanet}
          onHoverSkill={onHoverSkill}
          onSelectPlanet={onSelectPlanet}
          scrollProgress={scrollProgress}
        />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={!hoveredPlanetId}
          autoRotateSpeed={0.3}
          minPolarAngle={controlsConfig.minPolarAngle}
          maxPolarAngle={controlsConfig.maxPolarAngle}
        />
      </Canvas>
    </div>
  );
}
