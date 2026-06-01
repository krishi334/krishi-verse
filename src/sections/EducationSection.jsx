import { motion } from "framer-motion";
import { education } from "../data";
import { SectionShell } from "../components/SectionShell";

export function EducationSection({ id, chapter }) {
  return (
    <SectionShell id={id} chapter={chapter} eyebrow="Academic Journey" title="Education">
      <div className="education-cards education-cards--full">
        {education.map((item, index) => (
          <motion.article
            key={item.course}
            className="education-card glass-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
          >
            <span>{item.course}</span>
            <h3>{item.institution}</h3>
            <p>{item.detail}</p>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
