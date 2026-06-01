import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

function SkillIcon({ skill, size = 22 }) {
  const [failed, setFailed] = useState(false);
  const fallback = skill.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return failed ? (
    <span className="orbit-fallback" style={{ width: size, height: size }}>
      {fallback}
    </span>
  ) : (
    <img
      src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`}
      alt={skill.name}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function chunkSkills(skills, sizes) {
  const chunks = [];
  let index = 0;

  sizes.forEach((size) => {
    chunks.push(skills.slice(index, index + size));
    index += size;
  });

  return chunks;
}

export function SkillOrbitBoard({ planets }) {
  const allSkills = useMemo(
    () =>
      planets.flatMap((planet) =>
        planet.skills.map((skill) => ({
          ...skill,
          category: planet.title,
        })),
      ),
    [planets],
  );

  const orbitGroups = useMemo(() => chunkSkills(allSkills, [6, 7, 7, 8]), [allSkills]);
  const ringSizes = [150, 235, 320, 405];
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [rotation, setRotation] = useState(-18);
  const [tilt, setTilt] = useState(8);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ x: 0, y: 0, rotation: -18, tilt: 8 });
  const rotationRef = useRef(-18);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    let frameId = 0;
    let lastTime = 0;

    const animate = (time) => {
      if (!lastTime) {
        lastTime = time;
      }

      const delta = time - lastTime;
      lastTime = time;

      if (!isDragging) {
        setRotation((current) => current + delta * 0.0045);
      }

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isDragging]);

  useEffect(() => {
    if (!isDragging) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      const deltaX = event.clientX - dragState.current.x;
      const deltaY = event.clientY - dragState.current.y;
      setRotation(dragState.current.rotation + deltaX * 0.16);
      setTilt(Math.max(0, Math.min(16, dragState.current.tilt - deltaY * 0.04)));
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging]);

  const handlePointerDown = (event) => {
    setIsDragging(true);
    dragState.current = {
      x: event.clientX,
      y: event.clientY,
      rotation: rotationRef.current,
      tilt,
    };
  };

  return (
    <div className="orbit-board-shell">
      <div className="orbit-board-instruction">
        <span>{isDragging ? "Dragging orbit" : "Auto rotating • drag to rotate"}</span>
      </div>

      <div className="orbit-board-frame" onPointerDown={handlePointerDown}>
        <div
          className={`orbit-board ${isDragging ? "is-dragging" : ""}`}
          style={{
            transform: `rotateZ(${rotation}deg) rotateX(${tilt}deg)`,
            "--orbit-counter-rotation": `${-rotation}deg`,
            "--orbit-counter-tilt": `${-tilt}deg`,
          }}
        >
          <div className="orbit-core" />

          {ringSizes.map((size, index) => (
            <div
              key={size}
              className="orbit-ring-shell"
              style={{ width: size * 2, height: size * 2, animationDuration: `${38 + index * 12}s` }}
            >
              <div className="orbit-ring" />
            </div>
          ))}

          {orbitGroups.map((group, orbitIndex) => {
            const radius = ringSizes[orbitIndex];
            return group.map((skill, skillIndex) => {
              const angle = (Math.PI * 2 * skillIndex) / group.length - Math.PI / 2 + orbitIndex * 0.28;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.button
                  key={`${skill.category}-${skill.name}`}
                  type="button"
                  className="orbit-node"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  whileHover={{ scale: 1.08 }}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onFocus={() => setHoveredSkill(skill)}
                  onBlur={() => setHoveredSkill(null)}
                >
                  <div className="orbit-node__inner">
                    <SkillIcon skill={skill} />
                    <motion.div
                      className={`orbit-node__tooltip ${hoveredSkill?.name === skill.name ? "is-visible" : ""}`}
                      initial={false}
                      animate={{
                        opacity: hoveredSkill?.name === skill.name ? 1 : 0,
                        y: hoveredSkill?.name === skill.name ? -6 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill.name}
                    </motion.div>
                  </div>
                </motion.button>
              );
            });
          })}
        </div>
      </div>

      <motion.div
        className="orbit-skill-panel glass-card"
        key={hoveredSkill?.name || "default"}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
      >
        <div className="orbit-skill-panel__icon">
          <SkillIcon skill={hoveredSkill || allSkills[0]} size={26} />
        </div>
        <div>
          <strong>{hoveredSkill?.name || "Hover any icon"}</strong>
          <p>{hoveredSkill?.category || "Move across the orbit to reveal each skill name."}</p>
        </div>
      </motion.div>
    </div>
  );
}
