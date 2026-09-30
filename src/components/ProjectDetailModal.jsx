import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";

export function ProjectDetailModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project ? (
        <motion.div
          className="project-modal__overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="project-modal"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button className="project-modal__close" type="button" onClick={onClose} aria-label="Close project details">
              <X size={18} />
            </button>

            <div className="project-modal__media">
              <img src={project.image} alt={project.imageAlt ?? `${project.title} project visual`} />
            </div>

            <div className="project-modal__content">
              <span className="project-modal__eyebrow">Project Details</span>
              <h3 id="project-modal-title">{project.title}</h3>
              <p className="project-modal__summary">{project.overview ?? project.description}</p>

              <div className="project-modal__grid">
                <section>
                  <h4>Why it was built</h4>
                  <p>{project.whyBuilt ?? project.description}</p>
                </section>

                <section>
                  <h4>What it uses</h4>
                  <p>{project.whatItUses ?? project.technologies.join(", ")}</p>
                </section>
              </div>

              <section className="project-modal__section">
                <h4>Highlights</h4>
                <ul>
                  {(project.highlights ?? project.technologies).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <div className="project-modal__tags">
                {(project.technologies ?? []).map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>

              <div className="project-modal__actions">
                {project.githubUrl ? (
                  <a className="project-modal__button project-modal__button--primary" href={project.githubUrl} target="_blank" rel="noreferrer">
                    <Github size={16} />
                    Open Source
                    <ArrowUpRight size={16} />
                  </a>
                ) : null}
                <button className="project-modal__button" type="button" onClick={onClose}>
                  Close Details
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}