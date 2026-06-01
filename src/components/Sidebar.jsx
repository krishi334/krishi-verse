import { motion } from "framer-motion";
import { chapters } from "../data";

export function Sidebar({ activeChapter, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-eyebrow">Portfolio Index</span>
        <h1>Krishi Shah</h1>
      </div>

      <nav className="sidebar-nav" aria-label="Chapter navigation">
        {chapters.map((chapter) => {
          const isActive = chapter.id === activeChapter;

          return (
            <button
              key={chapter.id}
              className={`sidebar-link ${isActive ? "is-active" : ""}`}
              onClick={() => onNavigate(chapter.id)}
            >
              <span className="sidebar-index">{chapter.index}</span>
              <span className="sidebar-label">{chapter.label}</span>
              {isActive ? <motion.span className="sidebar-glow" layoutId="chapterGlow" /> : null}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
