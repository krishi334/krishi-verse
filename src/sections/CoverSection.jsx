import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const FuturisticScene = lazy(() =>
  import("../components/FuturisticScene").then((module) => ({ default: module.FuturisticScene })),
);

export function CoverSection({ id }) {
  return (
    <section id={id} className="hero-section">
      <div className="hero-copy">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          Software Developer • AI Systems • Immersive Builder
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.9 }}
        >
          Krishi
          <br />
          Shah
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.9 }}
        >
          AI Developer | Full Stack Engineer | Automation
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.8 }}
        >
          <a href="#projects" className="luxury-button">
            View Case Studies
          </a>
          <span className="scroll-note">
            Scroll to enter the digital book <ArrowDownRight size={16} />
          </span>
        </motion.div>
      </div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 1.1 }}
      >
        <div className="hero-glass-card">
          <div className="hero-card-header">
            <span>Immersive identity</span>
            <small>Interactive workspace model</small>
          </div>
          <Suspense fallback={<div className="scene-fallback">Loading immersive scene</div>}>
            <FuturisticScene />
          </Suspense>
        </div>
      </motion.div>
    </section>
  );
}
