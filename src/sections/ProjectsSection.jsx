import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data";
import { SectionShell } from "../components/SectionShell";

function slugifyProjectTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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
            whileHover={{ y: -4 }}
          >
            <div className="project-visual">
              <div className="project-glow" style={{ background: project.glow }} />
              <div className="project-screen" style={{ background: project.backdrop }}>
                <img src={project.image} alt={project.imageAlt ?? project.title} className="project-screen__image" />
              </div>
            </div>
            <div className="project-body">
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="tag-row">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
              <a className="text-button" href={`/project/${slugifyProjectTitle(project.title)}`}>
                View Details <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
