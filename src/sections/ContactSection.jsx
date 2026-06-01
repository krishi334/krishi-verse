import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { contactLinks } from "../data";
import { SectionShell } from "../components/SectionShell";

export function ContactSection({ id, chapter }) {
  return (
    <SectionShell id={id} chapter={chapter} eyebrow="Final Chapter" title="Contact">
      <div className="contact-layout">
        <div className="contact-copy">
          <div className="contact-location">
            <MapPin size={16} />
            <span>Anand</span>
          </div>
          <p className="lede">
            Building polished software experiences, intelligent automation, and memorable digital products for teams
            that want more than ordinary.
          </p>

          <div className="contact-list">
            {contactLinks.map((item) => (
              <a key={item.label} href={item.href} className="contact-item">
                <small>{item.label}</small>
                <strong>{item.value}</strong>
              </a>
            ))}
          </div>
        </div>

        <motion.form
          className="contact-form glass-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
        >
          <label>
            <span>Name</span>
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" placeholder="your@email.com" />
          </label>
          <label>
            <span>Project vision</span>
            <textarea rows="5" placeholder="Tell me about the experience you want to build." />
          </label>
          <button type="button" className="luxury-button">
            Start the conversation <ArrowRight size={16} />
          </button>
        </motion.form>
      </div>
    </SectionShell>
  );
}
