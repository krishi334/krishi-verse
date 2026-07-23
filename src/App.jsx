import { Suspense, lazy, useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { ArrowDown, Github, Globe, Linkedin, Mail, MapPin, MoveRight, Phone } from "lucide-react";
import { contactLinks, experience, narrativeStops, profile, projects, skillPlanets } from "./data";
import { CustomCursor } from "./components/CustomCursor";
import { LuxuryBackground } from "./components/LuxuryBackground";
import { FloatingContactButton } from "./components/FloatingContactButton";
import { DirectContactForm } from "./components/DirectContactForm";
import { ProjectShowcase } from "./components/ProjectShowcase";
const CinematicWorld = lazy(() =>
  import("./components/CinematicWorld").then((module) => ({ default: module.CinematicWorld })),
);

const stopOffsets = {
  arrival: 0,
  identity: 0.16,
  memory: 0.34,
  projects: 0.53,
  skills: 0.72,
  contact: 0.9,
};

const stopThresholds = Object.entries(stopOffsets);

function getActiveStop(progress) {
  let current = "arrival";

  for (const [id, threshold] of stopThresholds) {
    if (progress >= threshold) {
      current = id;
    }
  }

  return current;
}

export default function App() {
  const [progress, setProgress] = useState(0);
  const [activeStop, setActiveStop] = useState("arrival");
  
  const objectiveRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const pageTitle = "Krishi Shah | krishishah.dev | AI Developer & Full-Stack Engineer";
    const pageDescription =
      "krishishah.dev is the official portfolio of Krishi Shah, showcasing AI projects, full-stack work, automation, experience, LinkedIn, GitHub, and direct contact options.";

    document.title = pageTitle;

    const updateMeta = (selector, attribute, value) => {
      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");

        if (selector.includes("property=")) {
          element.setAttribute("property", selector.match(/property=\"([^\"]+)\"/)?.[1] ?? "");
        } else if (selector.includes("name=")) {
          element.setAttribute("name", selector.match(/name=\"([^\"]+)\"/)?.[1] ?? "");
        }

        document.head.appendChild(element);
      }

      element.setAttribute(attribute, value);
    };

    updateMeta('meta[name="description"]', "content", pageDescription);
    updateMeta('meta[property="og:title"]', "content", pageTitle);
    updateMeta('meta[property="og:description"]', "content", pageDescription);
    updateMeta('meta[property="og:url"]', "content", profile.website);
    updateMeta('meta[property="og:site_name"]', "content", "krishishah.dev");
    updateMeta('meta[name="twitter:title"]', "content", pageTitle);
    updateMeta('meta[name="twitter:description"]', "content", pageDescription);
    updateMeta('meta[name="twitter:image"]', "content", `${profile.website}og-image.svg`);

    const scriptId = "krishishah-structured-data";
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${profile.website}#website`,
          url: profile.website,
          name: "krishishah.dev",
          alternateName: "Krishi Shah Portfolio",
          description: pageDescription,
          publisher: {
            "@id": `${profile.website}#person`,
          },
        },
        {
          "@type": "Person",
          "@id": `${profile.website}#person`,
          name: profile.name,
          alternateName: ["Krishi", "krishishah.dev"],
          url: profile.website,
          jobTitle: ["AI Developer", "Full-Stack Engineer", "Automation Specialist"],
          sameAs: profile.sameAs,
          knowsAbout: ["AI development", "Full-stack engineering", "Automation", "Web development", "UI/UX design"],
        },
      ],
    });
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      smoothWheel: true,
      touchMultiplier: 1.05,
    });

    let frameId = 0;

    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = total > 0 ? window.scrollY / total : 0;
      setProgress(nextProgress);
      setActiveStop(getActiveStop(nextProgress));
    };

    frameId = requestAnimationFrame(raf);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      lenis.destroy();
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="app-shell">
      <LuxuryBackground progress={progress} />
      <CustomCursor />
      <FloatingContactButton email={profile.email} />
      <Suspense fallback={<div className="cinematic-world cinematic-world--fallback" aria-hidden="true" />}>
        <CinematicWorld progress={progress} />
      </Suspense>

      

      <div className="experience-shell">
        <div className="nav-beam" aria-label="Scene navigation">
          <div className="nav-beam__line" />
          {narrativeStops.map((stop) => (
            <button
              key={stop.id}
              className={`nav-dot ${activeStop === stop.id ? "is-active" : ""}`}
              type="button"
              onClick={() => jumpTo(stop.id)}
              aria-label={stop.label}
            >
              <span>{stop.index}</span>
            </button>
          ))}
        </div>

        <main className="story-track">
          <section id="arrival" className="story-node story-node--hero">
            <div className="node-copy node-copy--hero">
              <span className="hero-brand">krishishah.dev</span>
              <h1>{profile.name.toUpperCase()}</h1>
              <a className="hire-me-button" href="/Krishi_CV.pdf" target="_blank" rel="noreferrer">
                Hire Me
              </a>
              <p>{profile.title}</p>
              <p className="hero-brand-copy">
                The official portfolio of Krishi Shah, where AI, full-stack engineering, automation,
                projects, and social profiles are connected to one name and one domain.
              </p>
              <div className="hero-meta">
                <span>
                  <Mail size={16} />
                  {profile.email}
                </span>
                <span>
                  <Globe size={16} />
                  {profile.website.replace("https://", "")}
                </span>
              </div>
            </div>
          </section>

          <section id="identity" className="story-node story-node--identity">
            <div className="identity-layout">
              <div className="fragment-cloud">
                {["AI", "Automation", "Full Stack", "Innovation", "UI/UX"].map((word) => (
                  <motion.span
                    key={word}
                    className="fragment-word"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.9 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <div className="identity-copy">
                <span className="eyebrow">Objective</span>
                <p
                  className="floating-paragraph"
                  ref={objectiveRef}
                  onClick={() => setIsZoomed(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setIsZoomed(true);
                  }}
                >
                  {profile.objective}
                </p>
              </div>
            </div>
          </section>

          <section id="memory" className="story-node story-node--memory">
            <div className="timeline-copy timeline-copy--memory">
              <h2>Experience</h2>
            </div>
            <div className="memory-stream">
              {experience.map((item) => (
                <motion.article
                  key={item.company}
                  className="memory-fragment"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.9 }}
                >
                  <span>{item.period}</span>
                  <h3>{item.company}</h3>
                  <strong>{item.role}</strong>
                  <p>{item.points.join(" ")}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="projects" className="story-node story-node--projects">
            <div className="timeline-copy timeline-copy--projects">
              <span className="eyebrow">Project Worlds</span>
            </div>
            <ProjectShowcase projects={projects} />
          </section>

          <section id="skills" className="story-node story-node--skills">
            <div className="timeline-copy timeline-copy--skills">
              <span className="eyebrow">Skills</span>
            </div>
            <div className="skill-whispers">
              {skillPlanets.map((planet) => (
                <motion.article
                  key={planet.id}
                  className="skill-whisper"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9 }}
                >
                  <span>{planet.proficiency}</span>
                  <h3>{planet.title}</h3>
                  <p>{planet.summary}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="contact" className="story-node story-node--contact">
            <div className="contact-finale">
              <h2>Get in touch</h2>
              <DirectContactForm recipientEmail={profile.email} />
              <div className="contact-links">
                {contactLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    {item.label === "Website" ? <Globe size={16} /> : null}
                    {item.label === "Location" ? <MapPin size={16} /> : null}
                    {item.label === "Email" ? <Mail size={16} /> : null}
                    {item.label === "Phone" ? <Phone size={16} /> : null}
                    {item.label === "GitHub" ? <Github size={16} /> : null}
                    {item.label === "LinkedIn" ? <Linkedin size={16} /> : null}
                    <span>{item.value}</span>
                    {item.href !== "#" ? <MoveRight size={14} /> : null}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      {isZoomed ? (
        <div
          className="objective-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setIsZoomed(false);
            objectiveRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <div
            className="objective-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="objective-close"
              aria-label="Close"
              onClick={() => {
                setIsZoomed(false);
                objectiveRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              ×
            </button>
            <div className="objective-content">{profile.objective}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
