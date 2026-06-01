import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";

function buildMailto(email) {
  return `mailto:${email}`;
}

export function FloatingContactButton({ email }) {
  return (
    <motion.a
      className="floating-contact-cta"
      href={buildMailto(email)}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      aria-label="Contact me by email"
      title="Let's Connect"
    >
      <motion.span
        className="floating-contact-cta__pulse"
        animate={{ scale: [1, 1.24, 1], opacity: [0.28, 0.1, 0.28] }}
        transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <span className="floating-contact-cta__icon" aria-hidden="true">
        <Mail size={18} />
      </span>
      <span className="floating-contact-cta__label">Let&apos;s Connect</span>
      <motion.span
        className="floating-contact-cta__spark"
        animate={{ rotate: [0, 14, 0], y: [0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <Sparkles size={14} />
      </motion.span>
    </motion.a>
  );
}
