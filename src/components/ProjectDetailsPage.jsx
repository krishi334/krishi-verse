import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

export function ProjectDetailsPage({ project, onBack }) {
  if (!project) {
    return (
      <div className="project-route project-route--empty">
        <div className="project-route__empty-card">
          <h2>Project not found</h2>
          <p>The project you requested is not available.</p>
          <button type="button" className="project-route__back" onClick={onBack}>
            <ArrowLeft size={16} />
            Back to portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="project-route">
      <div className="project-route__glow" style={{ "--route-glow": project.glow }} aria-hidden="true" />
      <div className="project-route__wrap">
        <button type="button" className="project-route__back" onClick={onBack}>
          <ArrowLeft size={16} />
          Back to portfolio
        </button>

        <article className="project-blog" style={{ "--route-accent": project.accent }}>
          <header className="project-blog__header">
            <span className="project-blog__eyebrow">Project Details</span>
            <h1>{project.blog?.heading || project.title}</h1>
          </header>

          <figure className="project-blog__hero" style={{ background: project.backdrop }}>
            <img src={project.image} alt={project.imageAlt ?? `${project.title} visual`} />
          </figure>

          <section className="project-blog__section">
            {(project.blog?.intro && project.blog.intro.length > 0 ? project.blog.intro : [project.overview ?? project.description]).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section className="project-blog__section">
            <h2>Key Features</h2>
            <ul>
              {(project.blog?.keyFeatures ?? project.highlights ?? project.technologies ?? []).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="project-blog__section">
            <h2>Tools & Technologies</h2>
            <p>{project.blog?.tools || (project.technologies || []).join(", ")}</p>
          </section>

          <footer className="project-blog__actions">
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-route__button project-route__button--primary">
                <Github size={16} />
                View Code
                <ArrowUpRight size={16} />
              </a>
            ) : null}
            {project.demoUrl ? (
              <a href={project.demoUrl} target="_blank" rel="noreferrer" className="project-route__button">
                Live Demo
                <ArrowUpRight size={16} />
              </a>
            ) : null}
          </footer>
        </article>
      </div>
    </div>
  );
}