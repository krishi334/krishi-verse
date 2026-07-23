export const narrativeStops = [
  { id: "arrival", label: "Arrival Chamber", index: "01", offset: 0 },
  { id: "identity", label: "Identity Drift", index: "02", offset: 0.16 },
  { id: "memory", label: "Memory Corridor", index: "03", offset: 0.34 },
  { id: "projects", label: "Project Constellations", index: "04", offset: 0.53 },
  { id: "skills", label: "Skill Solar System", index: "05", offset: 0.72 },
  { id: "contact", label: "Signal Beacon", index: "06", offset: 0.9 },
];

export const profile = {
  name: "Krishi Shah",
  website: "https://krishishah.dev/",
  location: "Anand",
  email: "krishishah334@gmail.com",
  phone: "+9898810441",
  linkedin: "linkedin.com/in/krishi-shah",
  sameAs: [
    "https://www.linkedin.com/in/krishi-shah-030304k",
    "https://github.com/krishi334",
  ],
  title: "AI Developer / Full Stack Engineer / Automation",
  objective:
    "Motivated MCA student with a strong foundation in software development and a passion for building AI-powered and full-stack solutions. Skilled in transforming ideas into practical applications, with hands-on experience in automation, web development, and UI/UX design. Seeking opportunities to apply technical expertise, problem-solving ability, and creativity to contribute to innovative projects.",
};

export const experience = [
  {
    company: "Haronex Technology",
    role: "Full Stack Developer & HR Executive",
    period: "November 2025 - Present",
    points: [
      "Developing backend systems using Django and REST APIs to handle company data.",
      "Working on both HR tasks and software development to make office work faster and more efficient.",
      "Helping the recruitment team by using technical knowledge to interview and filter new developers.",
      "Working closely with the dev team to connect website designs with backend logic.",
      "Managing employee records and office coordination while writing code for internal software.",
    ],
  },
  {
    company: "Kaviaya Technologies",
    role: "Intern / Full Stack Developer",
    period: "July 2025 - November 2025",
    points: [
      "Designed user-friendly UI/UX interfaces with modern tools.",
      "Developed software to improve efficiency.",
      "Collaborated with developers to integrate design with backend systems.",
    ],
  },
];

export const projects = [
  {
    title: "Personal Voice Assistant",
    description:
      "A smart voice assistant with wake-word detection, AI-powered conversations, app control, and smooth voice-first task automation for daily workflows.",
    technologies: ["Python", "OpenAI GPT", "SpeechRecognition", "Pyttsx3"],
    image: "/projects/voice-assistant-reference-1.png",
    githubUrl: "https://github.com/krishi334/AI-Voice-Assistant",
    demoUrl: "",
    accent: "#c6a77d",
    glow: "rgba(198, 167, 125, 0.34)",
    backdrop:
      "radial-gradient(circle at 24% 18%, rgba(247, 243, 238, 0.18), transparent 34%), radial-gradient(circle at 76% 28%, rgba(198, 167, 125, 0.28), transparent 30%), linear-gradient(160deg, rgba(43, 32, 25, 0.96), rgba(16, 12, 10, 0.94))",
  },
  {
    title: "Automated Recruitment System",
    description:
      "An AI recruitment workflow that reads resumes, runs guided screening logic, and surfaces better candidate matches with less manual effort.",
    technologies: ["Python", "Groq API", "Firebase"],
    image: "/projects/recruitment-system-reference-1.png",
    githubUrl: "https://github.com/krishi334/Hireverse",
    demoUrl: "",
    accent: "#dcc7aa",
    glow: "rgba(220, 199, 170, 0.3)",
    backdrop: "radial-gradient(circle at 18% 24%, rgba(220, 199, 170, 0.2), transparent 32%), radial-gradient(circle at 82% 22%, rgba(139, 111, 90, 0.22), transparent 30%), linear-gradient(160deg, rgba(26, 19, 15, 0.96), rgba(12, 9, 8, 0.94))",
  },
  {
    title: "Automated Timetable Management System",
    description:
      "A scheduling system that turns faculty availability, subject constraints, and classroom demand into structured, conflict-aware timetables.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap"],
    image: "/projects/timetable-system-reference-1.png",
    githubUrl: "https://github.com/krishi334",
    demoUrl: "",
    accent: "#8b6f5a",
    glow: "rgba(139, 111, 90, 0.3)",
    backdrop: "radial-gradient(circle at 28% 16%, rgba(198, 167, 125, 0.16), transparent 34%), radial-gradient(circle at 72% 74%, rgba(247, 243, 238, 0.12), transparent 30%), linear-gradient(155deg, rgba(24, 19, 16, 0.96), rgba(11, 9, 8, 0.94))",
  },
  {
    title: "Idea-Innovator-Investor Platform",
    description:
      "A collaboration platform for matching ideas with capital through polished pitches, document exchange, and built-in communication touchpoints.",
    technologies: ["PHP", "PHPMailer", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap"],
    image: "/projects/idea-inoverter-refrence-1.png",
    githubUrl: "https://github.com/krishi334",
    demoUrl: "",
    accent: "#f7f3ee",
    glow: "rgba(247, 243, 238, 0.18)",
    backdrop: "radial-gradient(circle at 32% 22%, rgba(247, 243, 238, 0.18), transparent 34%), radial-gradient(circle at 76% 32%, rgba(198, 167, 125, 0.22), transparent 28%), linear-gradient(160deg, rgba(20, 16, 14, 0.96), rgba(10, 8, 7, 0.95))",
  },
];

export const skillPlanets = [
  {
    id: "fullstack",
    title: "Full-Stack Development",
    planetLabel: "Web Stack",
    orbitRadius: 4.55,
    orbitSpeed: 0.16,
    baseAngle: 1.4,
    size: 0.62,
    color: "#E8D8C4",
    emissive: "#C6A77D",
    accent: "#8B6F5A",
    ring: true,
    summary: "Creating modern web applications that combine exceptional user experiences with powerful backend functionality. Every solution is built with scalability, performance, and long-term maintainability in mind, helping businesses operate more efficiently and grow with confidence.",
    skills: [
      { name: "HTML5", proficiency: "Advanced", note: "Semantic structure for responsive, production-ready interfaces.", slug: "html5", color: "E34F26" },
      { name: "CSS3", proficiency: "Advanced", note: "Modern layouts, motion, and premium visual styling across products.", slug: "css3", color: "1572B6" },
      { name: "Bootstrap", proficiency: "Advanced", note: "Used for rapid and consistent interface development.", slug: "bootstrap", color: "7952B3" },
      { name: "AngularJS", proficiency: "Intermediate", note: "Experience building app structure and connected views.", slug: "angular", color: "DD0031" },
      { name: "Node.js", proficiency: "Intermediate", note: "Used for JavaScript-driven backend services and APIs.", slug: "nodedotjs", color: "339933" },
      { name: "Express.js", proficiency: "Intermediate", note: "Structured backend routing and API handling for lightweight systems.", slug: "express", color: "222222" },
    ],
  },
  {
    id: "database-cloud",
    title: "Database & Cloud Solutions",
    planetLabel: "Data Systems",
    orbitRadius: 5.95,
    orbitSpeed: 0.12,
    baseAngle: 2.4,
    size: 0.66,
    color: "#3B2A23",
    emissive: "#8B6F5A",
    accent: "#DCC7AA",
    summary: "Building secure and reliable data systems that keep information organized, accessible, and ready for growth. From database design to API integrations and cloud services, solutions are designed to support real business operations and seamless digital experiences.",
    skills: [
      { name: "MongoDB", proficiency: "Advanced", note: "Document modeling and practical backend integration for modern apps.", slug: "mongodb", color: "47A248" },
      { name: "MySQL", proficiency: "Advanced", note: "Used extensively in academic systems and production-style tools.", slug: "mysql", color: "4479A1" },
      { name: "PL-SQL", proficiency: "Intermediate", note: "Comfortable with procedural querying and relational logic.", slug: "postgresql", color: "4169E1" },
      { name: "Firebase", proficiency: "Advanced", note: "Fast iteration for auth, cloud-backed storage, and automation projects.", slug: "firebase", color: "FFCA28" },
      { name: "REST APIs", proficiency: "Advanced", note: "API design and backend integration across Django and full-stack systems.", slug: "fastapi", color: "009688" },
    ],
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    planetLabel: "AI Systems",
    orbitRadius: 7.25,
    orbitSpeed: 0.09,
    baseAngle: 3.4,
    size: 0.7,
    color: "#C6A77D",
    emissive: "#F7F3EE",
    accent: "#6F4E37",
    glow: true,
    summary: "Transforming manual processes into intelligent workflows through automation and AI-powered solutions. By reducing repetitive tasks and improving efficiency, businesses can save time, increase productivity, and focus on strategic priorities.",
    skills: [
      { name: "Generative AI (GPT)", proficiency: "Advanced", note: "Used for conversational systems, assistants, and smart automation flows.", slug: "openai", color: "412991" },
      { name: "Groq API", proficiency: "Intermediate", note: "Integrated fast LLM inference into automation-based products.", slug: "speedtest", color: "F15B2A" },
      { name: "n8n", proficiency: "Intermediate", note: "Workflow automation thinking for low-friction integrations and logic chains.", slug: "n8n", color: "EA4B71" },
      { name: "AI Automation", proficiency: "Advanced", note: "Focused on blending models, tooling, and product logic into practical systems.", slug: "dependabot", color: "025E8C" },
    ],
  },
  {
    id: "design",
    title: "Design & Visual Experience",
    planetLabel: "Visual Craft",
    orbitRadius: 9.85,
    orbitSpeed: 0.05,
    baseAngle: 5.45,
    size: 0.58,
    color: "#DCC7AA",
    emissive: "#F7F3EE",
    accent: "#6F4E37",
    summary: "Crafting intuitive interfaces and engaging digital experiences that balance functionality with aesthetics. Every design decision is focused on improving usability, strengthening brand presence, and creating meaningful interactions for users.",
    skills: [
      { name: "Photoshop", proficiency: "Intermediate", note: "Visual editing and presentation refinement for polished assets.", slug: "adobephotoshop", color: "31A8FF" },
      { name: "Figma", proficiency: "Advanced", note: "Wireframes, layout systems, and interface experimentation.", slug: "figma", color: "F24E1E" },
      { name: "Adobe XD", proficiency: "Intermediate", note: "Used for interface planning, layout ideation, and design handoff.", slug: "adobexd", color: "FF61F6" },
      { name: "Canva", proficiency: "Advanced", note: "Fast visual storytelling, decks, and presentation design support.", slug: "canva", color: "00C4CC" },
    ],
  },
];

export const skillGroups = skillPlanets.map((planet) => ({
  title: planet.title,
  items: planet.skills.map((skill) => skill.name),
}));

export const education = [
  {
    course: "BCA",
    institution: "Charusat University",
    period: "Aug 2021 - May 2024",
    detail: "GPA: 8.34",
    coursework: ["Application Development", "Web Development"],
  },
  {
    course: "MCA",
    institution: "Charusat University",
    period: "Aug 2024 - May 2026",
    detail: "Motivated MCA student focused on AI integration and practical software development.",
    coursework: ["Application Development", "Web Development", "AI Integration"],
  },
];

export const contactLinks = [
  {
    label: "Website",
    value: "krishishah.dev",
    href: "https://krishishah.dev/",
  },
  {
    label: "Location",
    value: "Anand",
    href: "#",
  },
  {
    label: "Email",
    value: "Email",
    href: "mailto:krishishah334@gmail.com?subject=Inquiry%20from%20Portfolio&body=Hi%20Krishi%2C%0A%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20connect.%20Please%20reply%20with%20more%20details.%0A%0ARegards%2C%0A",
  },
  {
    label: "Phone",
    value: "+9898810441",
    href: "tel:+9898810441",
  },
  {
    label: "LinkedIn",
    value: "Krishi Shah",
    href: "https://www.linkedin.com/in/krishi-shah-030304k",
  },
  {
    label: "GitHub",
    value: "Krishi334",
    href: "https://github.com/krishi334",
  },
];
