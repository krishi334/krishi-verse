import { motion } from "framer-motion";
import { experience } from "../data";
import { SectionShell } from "../components/SectionShell";

export function ExperienceSection({ id, chapter }) {
  return (
    <SectionShell id={id} chapter={chapter} eyebrow="Career Story" title="Experience">
      <div className="timeline">
        <div className="timeline-line" />
        {experience.map((item, index) => (
          <motion.article
            key={item.company}
            className="timeline-card glass-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: index * 0.12 }}
          >
            <div className="timeline-card__top">
              <span>{item.period}</span>
              <strong>{item.company}</strong>
            </div>
            <h3>{item.role}</h3>
            <div className="timeline-points">
              {item.points.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
