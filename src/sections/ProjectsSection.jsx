import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data";
import { SectionShell } from "../components/SectionShell";

export function ProjectsSection({ id, chapter }) {
  return (
    <SectionShell id={id} chapter={chapter} eyebrow="Showcase Gallery" title="Projects">
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: index * 0.1 }}
            whileHover={{ y: -8, rotateX: -4, rotateY: 4 }}
          >
            <div className="project-visual">
              <div className="project-glow" />
              <div className="project-screen">
                <span>{project.title}</span>
              </div>
            </div>
            <div className="project-body">
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="tag-row">
                {project.tech.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
              <button className="text-button">
                View Case Study <ArrowUpRight size={15} />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
