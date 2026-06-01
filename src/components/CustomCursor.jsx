import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onMove = (event) => setPosition({ x: event.clientX, y: event.clientY });
    const onDown = () => setActive(true);
    const onUp = () => setActive(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <motion.div
      className={`custom-cursor ${active ? "is-active" : ""}`}
      animate={{ x: position.x - 14, y: position.y - 14 }}
      transition={{ type: "spring", damping: 24, stiffness: 320, mass: 0.3 }}
    />
  );
}
