import { useState } from "react";
import { motion } from "framer-motion";

const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

function isConfigured() {
  return Boolean(accessKey);
}

export function DirectContactForm({ recipientEmail }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ type: "idle", text: "" });
  const canSendDirect = isConfigured();

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!canSendDirect) {
      setStatus({
        type: "info",
        text: "Direct messaging will be available here soon. For now, please use the contact button above.",
      });
      return;
    }

    try {
      setStatus({ type: "loading", text: "Sending message..." });

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: form.subject,
          from_name: form.name,
          email: form.email,
          replyto: form.email,
          message: form.message,
          to_name: recipientEmail,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit form.");
      }

      setStatus({ type: "success", text: "Message sent successfully. I will get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (_error) {
      setStatus({
        type: "error",
        text: "Could not send from website right now. Please use the mail button above.",
      });
    }
  };

  return (
    <motion.form
      className="direct-contact-form"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      onSubmit={onSubmit}
    >
      <div className="direct-contact-form__grid">
        <input name="name" value={form.name} onChange={onChange} placeholder="Your name" required /><br />
        <input name="email" type="email" value={form.email} onChange={onChange} placeholder="Your email" required /><br />
        <input name="subject" value={form.subject} onChange={onChange} placeholder="Subject" required />
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          placeholder="Write your message"
          rows={4}
          required
        />
      </div>
      <button className="direct-contact-form__submit" type="submit">
        Send Message
      </button>
      {status.text ? <p className={`direct-contact-form__status is-${status.type}`}>{status.text}</p> : null}
      {!canSendDirect ? (
        <p className="direct-contact-form__hint">
          This quick contact form is being set up. You can still reach out right away using the contact button above.
        </p>
      ) : null}
    </motion.form>
  );
}
