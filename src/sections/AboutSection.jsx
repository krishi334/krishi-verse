import { motion } from "framer-motion";
import { Bot, Mic2, Sparkles, Workflow } from "lucide-react";
import { SectionShell } from "../components/SectionShell";

const points = [
  { icon: Bot, text: "AI automation designed to remove friction from real workflows." },
  { icon: Mic2, text: "Voice assistant experiments focused on natural, useful interaction." },
  { icon: Workflow, text: "Full-stack development that connects thoughtful interfaces with robust systems." },
  { icon: Sparkles, text: "A problem-solving mindset shaped by curiosity, precision, and innovation." },
];

export function AboutSection({ id, chapter }) {
  return (
    <SectionShell id={id} chapter={chapter} eyebrow="Editorial Profile" title="About Me" className="about-section">
      <div className="split-layout">
        <div className="about-copy">
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            Motivated MCA student with a strong foundation in software development and a passion for AI-powered,
            full-stack solutions that feel intelligent, elegant, and deeply useful.
          </motion.p>

          <div className="feature-list">
            {points.map(({ icon: Icon, text }, index) => (
              <motion.div
                key={text}
                className="feature-item"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
              >
                <Icon size={18} />
                <span>{text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="editorial-panel"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9 }}
        >
          <div className="editorial-stat">
            <span>Focus</span>
            <strong>AI + Product Engineering</strong>
          </div>
          <div className="editorial-stat">
            <span>Approach</span>
            <strong>Human-centered automation</strong>
          </div>
          <div className="editorial-stat">
            <span>Energy</span>
            <strong>Inventive, polished, future-facing</strong>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
