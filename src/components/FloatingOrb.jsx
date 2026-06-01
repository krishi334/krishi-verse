import { motion } from "framer-motion";

export function FloatingOrb() {
  return (
    <motion.div
      className="assistant-orb"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8 }}
    >
      <span className="assistant-orb__pulse" />
      <div>
        <small>AI presence</small>
        <strong>Adaptive storyteller</strong>
      </div>
    </motion.div>
  );
}
