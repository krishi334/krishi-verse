import { motion } from "framer-motion";

export function SectionShell({ id, chapter, title, eyebrow, children, className = "" }) {
  return (
    <section id={id} className={`chapter-section ${className}`}>
      <motion.div
        className="chapter-frame"
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="chapter-meta">
          <span>{chapter.index}</span>
          <div>
            <small>{eyebrow}</small>
            <h2>{title}</h2>
          </div>
        </div>
        {children}
      </motion.div>
    </section>
  );
}
