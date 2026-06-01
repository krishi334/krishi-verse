import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProjectScene({ project, index, setArticleRef, isActive }) {
  const cardRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useTransform(pointerX, [-40, 40], [7, -7]);
  const rotateX = useTransform(pointerY, [-40, 40], [-7, 7]);
  const smoothRotateX = useSpring(rotateX, { stiffness: 120, damping: 16, mass: 0.45 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 120, damping: 16, mass: 0.45 });
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 18, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 18, mass: 0.5 });

  const handleMouseMove = (event) => {
    const bounds = cardRef.current?.getBoundingClientRect();

    if (!bounds) {
      return;
    }

    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    pointerX.set(x / 10);
    pointerY.set(y / 10);
  };

  const resetDepth = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <article
      ref={(node) => setArticleRef(node, index)}
      className={`project-cinematic ${isActive ? "is-active" : ""}`}
      style={{
        "--project-accent": project.accent,
        "--project-glow": project.glow,
      }}
    >
      <div className="project-cinematic__layout">
        <motion.div
          className="project-cinematic__copy"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="project-cinematic__eyebrow">Project {String(index + 1).padStart(2, "0")}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-cinematic__tech">
            {project.technologies.map((technology, techIndex) => (
              <motion.span
                key={technology}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.45, delay: techIndex * 0.05 }}
              >
                {technology}
              </motion.span>
            ))}
          </div>
          <div className="project-cinematic__actions">
            {index < 2 ? (
              <button
                className="project-cinematic__button project-cinematic__button--primary"
                type="button"
                onClick={() => window.open(project.githubUrl, "_blank")}
              >
                <Github size={16} />
                View Code
              </button>
            ) : null}
            {project.demoUrl ? (
              <a
                className="project-cinematic__button"
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowUpRight size={16} />
                Live Demo
              </a>
            ) : null}
          </div>
        </motion.div>

        <motion.div
          ref={cardRef}
          className="project-cinematic__visual"
          onMouseMove={handleMouseMove}
          onMouseLeave={resetDepth}
          style={{ rotateX: smoothRotateX, rotateY: smoothRotateY }}
          initial={{ opacity: 0, scale: 0.92, y: 56 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="project-cinematic__light" />
          <div className="project-cinematic__particles" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, particleIndex) => (
              <span
                key={particleIndex}
                style={{
                  "--particle-left": `${12 + particleIndex * 9}%`,
                  "--particle-delay": `${particleIndex * 0.55}s`,
                  "--particle-size": `${4 + (particleIndex % 3)}px`,
                }}
              />
            ))}
          </div>
          <motion.div
            className="project-cinematic__frame"
            style={{
              x: smoothX,
              y: smoothY,
              background: project.backdrop,
            }}
          >
            <div className="project-cinematic__image-shell">
              <img src={project.image} alt={`${project.title} mockup`} className="project-cinematic__image" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </article>
  );
}

export function ProjectShowcase({ projects }) {
  const sectionRef = useRef(null);
  const articleRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex] ?? projects[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      articleRefs.current.forEach((article, index) => {
        if (!article) {
          return;
        }

        const image = article.querySelector(".project-cinematic__visual");
        const copy = article.querySelector(".project-cinematic__copy");
        const frame = article.querySelector(".project-cinematic__frame");

        gsap.fromTo(
          image,
          { y: 110, opacity: 0.35, scale: 0.88 },
          {
            y: -42,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: article,
              start: "top 85%",
              end: "bottom 20%",
              scrub: true,
              onEnter: () => setActiveIndex(index),
              onEnterBack: () => setActiveIndex(index),
            },
          },
        );

        gsap.fromTo(
          copy,
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: article,
              start: "top 72%",
            },
          },
        );

        gsap.to(frame, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: article,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  const setArticleRef = (node, index) => {
    articleRefs.current[index] = node;
  };

  return (
    <div
      ref={sectionRef}
      className="project-showcase"
      style={{
        "--showcase-glow": activeProject?.glow,
        "--showcase-accent": activeProject?.accent,
      }}
    >
      <div className="project-showcase__ambient" aria-hidden="true" />
      <div className="project-showcase__stack">
        {projects.map((project, index) => (
          <ProjectScene
            key={project.title}
            project={project}
            index={index}
            setArticleRef={setArticleRef}
            isActive={activeIndex === index}
          />
        ))}
      </div>
    </div>
  );
}
