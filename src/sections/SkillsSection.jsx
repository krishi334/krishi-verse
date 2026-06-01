import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { skillPlanets } from "../data";
import { SectionShell } from "../components/SectionShell";
import { SkillOrbitBoard } from "../components/SkillOrbitBoard";

function SkillBadgeIcon({ skill }) {
  const [failed, setFailed] = useState(false);
  const fallback = skill.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return failed ? (
    <span className="skill-icon-fallback">{fallback}</span>
  ) : (
    <img
      src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`}
      alt={skill.name}
      width="18"
      height="18"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function MobileSkillCard({ planet, index }) {
  return (
    <motion.article
      className="mobile-orbit-card glass-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
    >
      <div className="mobile-orbit-card__header">
        <div className="mobile-orbit-card__header-icons">
          {planet.skills.slice(0, 4).map((skill) => (
            <span key={skill.name} className="mobile-orbit-card__header-icon">
              <SkillBadgeIcon skill={skill} />
            </span>
          ))}
        </div>
        <strong>{planet.skills.length}</strong>
      </div>
      <h3>{planet.title}</h3>
      <p>{planet.summary}</p>
      <div className="mobile-orbit-card__icons">
        {planet.skills.map((skill) => (
          <div key={skill.name} className="mobile-skill-pill">
            <img
              src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`}
              alt={skill.name}
              width="18"
              height="18"
              loading="lazy"
            />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

export function SkillsSection({ id, chapter }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 920);

    onResize();

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  const skillCount = useMemo(() => skillPlanets.reduce((total, planet) => total + planet.skills.length, 0), []);

  return (
    <SectionShell
      id={id}
      chapter={chapter}
      eyebrow="Luxury Skill Universe"
      title="Skills"
      className="skills-universe-section"
    >
      <div className="skills-universe">
        <div className="skills-universe__intro">
          <div>
            <span className="skills-kicker">Interactive Solar System</span>
            <p>
              A cinematic map of Krishi Shah&apos;s capabilities, where each orbit reveals a different discipline
              shaping AI products, full-stack systems, and design-led engineering.
            </p>
          </div>
          <div className="skills-intro-badge">
            <Sparkles size={16} />
            <span>{skillCount} technologies in motion</span>
          </div>
        </div>

        {isMobile ? (
          <div className="mobile-orbit-grid">
            {skillPlanets.map((planet, index) => (
              <MobileSkillCard key={planet.id} planet={planet} index={index} />
            ))}
          </div>
        ) : (
          <div className="skills-universe__desktop">
            <div className="skills-universe__scene glass-card">
              <SkillOrbitBoard planets={skillPlanets} />
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  );
}
