/**
 * Every word of copy on the site lives here.
 *
 * Sections read from this file and nothing else, so changing a date or adding a
 * project never means touching layout or motion code.
 */

export const SITE = {
  name: "Vansh Sharma",
  /**
   * Canonical origin — feeds metadataBase, the Open Graph tags and the
   * JSON-LD. It has to be a host that actually resolves: these URLs are what
   * LinkedIn, Slack and iMessage fetch the preview card from, and pointing
   * them at a name with no DNS silently yields a preview with no image.
   *
   * The intended home is vanshsharma.is-a.dev. It is not here yet — is-a.dev
   * suspended new registrations on 2026-10-08 — so this stays on the Vercel
   * host until that domain resolves. The old vanshsharma.work.gd is ruled out
   * permanently: work.gd is absent from the Public Suffix List, so Vercel
   * treats work.gd as the apex and looks for the ownership record in
   * DNSExit's zone rather than ours.
   */
  url: "https://portfolio-gamma-puce-62.vercel.app",
  role: "Software Engineer — AI Automation & Agentic AI",
  shortRole: "AI & Full-Stack Engineer",
  tagline: "I build systems that think.",
  location: "Delhi, India",
  email: "vanshsharma4238@gmail.com",
  phone: "+91 98377 74238",
  phoneHref: "+919837774238",
  linkedin: "https://www.linkedin.com/in/vansh-sharma-vs4238/",
  resume: "/Vansh-Sharma-Resume.pdf",
  available: true,
} as const;

export const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export const HERO = {
  eyebrow: "Software Engineer · Delhi, India",
  /** Rendered one line per array entry, each one masked in from below. */
  headline: ["Generative AI,", "Agentic systems,", "shipped."],
  blurb:
    "I design and build intelligent, scalable systems — LLM pipelines, RAG, multi-agent orchestration and the full-stack platforms that put them in front of real users.",
  /**
   * The phone gets the shorter one. Not for taste: on a narrow screen the copy
   * sits above the hole, and five lines of blurb push the buttons down onto
   * the accretion disc where nothing is readable.
   */
  blurbShort:
    "LLM pipelines, RAG and multi-agent systems — plus the full-stack platforms that put them in front of real users.",
  /** The rotating word in the role line under the headline. */
  rotating: [
    "Agentic AI",
    "RAG Pipelines",
    "Physical AI",
    "Rust + Polars",
    "Full-Stack",
  ],
} as const;

export const STATS = [
  { value: 4, suffix: "+", label: "Years building software" },
  { value: 30, suffix: "+", label: "Technologies shipped with" },
  { value: 12, suffix: "+", label: "Products & platforms" },
  { value: 3, suffix: "×", label: "Project of the Year" },
] as const;

/* -------------------------------------------------------------------------- */
/*  About                                                                     */
/* -------------------------------------------------------------------------- */

export const ABOUT = {
  heading: "I care about the problem before the stack.",
  paragraphs: [
    "I'm Vansh Sharma, a software engineer specialising in Generative AI, Agentic AI, full-stack engineering and Physical AI. I build intelligent, scalable systems that solve real business and operational problems — not demos.",
    "Right now I'm a Full Stack Developer at UBIQ Technologies working on DAFFY, a Physical AI and industrial intelligence ecosystem. My day is Rust, Polars, computer vision, IoT sensor streams, aerial data and high-performance pipelines.",
    "Before that I built BotIntelli — an enterprise AI automation platform — from LLM workflows and RAG retrieval through multi-agent orchestration, document intelligence and the enterprise integrations around them.",
  ],
  philosophy:
    "Great engineering is understanding the problem, taking ownership, thinking systematically, and delivering something that holds up in production.",
  facts: [
    { k: "Currently", v: "Full Stack Developer @ UBIQ Technologies" },
    { k: "Focus", v: "Agentic AI · RAG · Physical AI · Data Engineering" },
    { k: "Based in", v: "Delhi, India — open to remote" },
    { k: "Languages", v: "Hindi (native) · English (fluent)" },
  ],
  interests: [
    "AI-first products",
    "Physical AI",
    "Industrial intelligence",
    "Hackathons",
    "Tech writing",
    "Sports leadership",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Experience                                                                */
/* -------------------------------------------------------------------------- */

export type Role = {
  company: string;
  title: string;
  period: string;
  duration: string;
  location: string;
  summary: string;
  points: string[];
  stack: string[];
  current?: boolean;
};

export const EXPERIENCE: Role[] = [
  {
    company: "UBIQ Technologies",
    title: "Software Engineer — Full Stack",
    period: "Jul 2026 — Present",
    duration: "4 mos",
    location: "Noida, India",
    current: true,
    summary:
      "Building DAFFY, an enterprise AI platform that lets organisations automate business workflows, integrate their systems, and get real answers out of intelligent agents.",
    points: [
      "Designing and developing scalable full-stack applications for enterprise AI automation.",
      "Building a visual workflow engine for creating, orchestrating and monitoring AI-powered workflows.",
      "Developing secure integrations with enterprise platforms, databases, cloud storage and third-party APIs.",
      "Implementing high-performance backend services, data pipelines and event-driven architectures.",
      "Working with vector, analytical and distributed messaging systems to power intelligent retrieval and real-time processing.",
      "Building AI agent orchestration, memory management and Retrieval-Augmented Generation capabilities.",
      "Optimising performance, scalability, security and developer experience across the platform.",
    ],
    stack: [
      "Rust",
      "Python",
      "TypeScript",
      "React",
      "Next.js",
      "MongoDB",
      "Milvus",
      "ClickHouse",
      "DuckDB",
      "Redpanda / Kafka",
      "Amazon S3",
      "Docker",
      "Nginx",
    ],
  },
  {
    company: "LiteratiTech",
    title: "Software Engineer — AI Automation & RAG Systems",
    period: "Dec 2025 — Jul 2026",
    duration: "8 mos",
    location: "Noida, India",
    summary:
      "Full-stack AI platform engineer on BotIntelli — designing AI-driven automation end to end, from RAG and LLM orchestration to the interfaces that configure and operate it.",
    points: [
      "Designed agentic AI workflows, LLM pipelines and RAG systems for conversation analysis.",
      "Built Langflow workflows and Apache NiFi pipelines for multi-source data ingestion.",
      "Developed Node.js and Python services exposing secure RESTful APIs.",
      "Built Next.js and React interfaces for workflow creation and AI insight dashboards.",
      "Contributed to cross-platform Flutter app development alongside the web platform.",
      "Designed alerting and monitoring systems for pipeline and agent health.",
    ],
    stack: [
      "Langflow",
      "Apache NiFi",
      "LangChain",
      "RAG",
      "Node.js",
      "Python",
      "Next.js",
      "React",
      "Flutter",
      "Pinecone",
    ],
  },
  {
    company: "Unified Mentor",
    title: "Machine Learning Intern",
    period: "Nov 2025 — Feb 2026",
    duration: "4 mos",
    location: "Gurugram, India",
    summary:
      "Machine learning and model development across supervised and unsupervised problems.",
    points: [
      "Implemented ML algorithms for supervised and unsupervised learning use cases.",
      "Built classification, regression and clustering models with Python ML libraries.",
      "Trained, tested and evaluated models against appropriate performance metrics.",
      "Tuned model parameters to improve accuracy and generalisation.",
    ],
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "PyTorch"],
  },
  {
    company: "Butterfly Technology",
    title: "Software Developer Intern",
    period: "Mar 2025 — May 2025",
    duration: "3 mos",
    location: "Pitampura, Delhi",
    summary:
      "Led a full-stack Expense Management App across Android, iOS and web as primary backend developer.",
    points: [
      "Spearheaded a full-stack expense app with Flutter on the front end and Node.js / Express behind it.",
      "Designed secure, scalable RESTful APIs connecting the app to backend systems.",
      "Integrated real-time data visualisation for spending patterns and categorised expenditure.",
      "Engineered Python automation tools to streamline internal workflows.",
      "Integrated Google Gemini with EasyOCR and PDFPlumber to pull structured data out of receipts, invoices and PDFs.",
      "Worked with Firebase, Cloudinary and Git-based CI/CD workflows.",
    ],
    stack: [
      "Flutter",
      "Node.js",
      "Express",
      "Firebase",
      "Cloudinary",
      "MongoDB",
      "Gemini API",
      "EasyOCR",
    ],
  },
  {
    company: "Kingster636",
    title: "Flutter Mobile Developer",
    period: "May 2021 — Oct 2023",
    duration: "2 yrs 6 mos",
    location: "Remote",
    summary:
      "Enterprise hybrid apps for Android and iOS, with native platform integrations and release ownership.",
    points: [
      "Developed enterprise hybrid apps for Android and iOS in Flutter and Dart.",
      "Implemented Bloc state management across large, multi-screen applications.",
      "Built custom Flutter packages and plugins bridging native Android (Java / Kotlin) and iOS (Swift).",
      "Integrated REST services with JSON/XML serialisation and secure API communication.",
      "Managed CI/CD pipelines, app signing, versioning and Play Store / App Store releases.",
      "Worked in Agile/Scrum teams with designers, backend developers and QA.",
    ],
    stack: ["Flutter", "Dart", "Bloc", "Kotlin", "Swift", "REST APIs", "CI/CD"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Projects                                                                  */
/* -------------------------------------------------------------------------- */

export type Project = {
  name: string;
  kind: string;
  year: string;
  blurb: string;
  detail: string;
  stack: string[];
  /** Drives the size of the card in the bento grid. */
  span: "lg" | "md" | "sm";
  accent: "amber" | "cyan" | "violet";
};

export const PROJECTS: Project[] = [
  {
    name: "DAFFY",
    kind: "Physical AI · Industrial Intelligence",
    year: "2026",
    blurb:
      "An enterprise platform where agents automate business workflows and turn operational, sensor and aerial data into decisions.",
    detail:
      "A visual workflow engine over a Rust and Polars data core. Agent orchestration with memory and RAG, vector and analytical stores for retrieval, and event-driven pipelines carrying IoT, computer-vision and aerial data into industry-specific workspaces.",
    stack: [
      "Rust",
      "Polars",
      "Python",
      "Next.js",
      "Milvus",
      "ClickHouse",
      "DuckDB",
      "Kafka",
      "Computer Vision",
      "IoT",
    ],
    span: "lg",
    accent: "amber",
  },
  {
    name: "BotIntelli",
    kind: "Agentic AI · Enterprise Automation",
    year: "2026",
    blurb:
      "Conversation and workflow automation: LLM pipelines, RAG retrieval and multi-agent orchestration behind a visual builder.",
    detail:
      "Langflow workflows and Apache NiFi pipelines ingest from many sources; Node.js and Python services expose it over REST; Next.js dashboards let a non-engineer compose an agent and read the insight it produces.",
    stack: [
      "Langflow",
      "Apache NiFi",
      "LangChain",
      "RAG",
      "Node.js",
      "Next.js",
      "Pinecone",
    ],
    span: "md",
    accent: "cyan",
  },
  {
    name: "Expense Management",
    kind: "Cross-Platform Product",
    year: "2025",
    blurb:
      "Receipts in, analytics out — shipped to Android, iOS and web with Gemini-backed document extraction.",
    detail:
      "Flutter across three platforms over a Node.js and Express backend. Gemini paired with EasyOCR and PDFPlumber reads receipts, invoices and PDFs; real-time dashboards categorise and chart the spend.",
    stack: [
      "Flutter",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "Gemini API",
      "EasyOCR",
    ],
    span: "md",
    accent: "violet",
  },
  {
    name: "Vamsi AI Assistant",
    kind: "Voice AI",
    year: "2024",
    blurb:
      "A voice assistant with speech I/O, web research, alarms, PDF tooling and games. College Project of the Year, three years running.",
    detail:
      "Speech recognition and text-to-speech over a command router that reaches Wikipedia, search, scraping and local utilities — including PDF password recovery and a small set of built-in games.",
    stack: [
      "Python",
      "pyttsx3",
      "SpeechRecognition",
      "BeautifulSoup",
      "Tkinter",
      "Pygame",
    ],
    span: "sm",
    accent: "amber",
  },
  {
    name: "AI OCR System",
    kind: "Document Intelligence",
    year: "2025",
    blurb:
      "Document processing and classification across scans, photos and PDFs.",
    detail:
      "Tesseract, EasyOCR and PDFPlumber extract text and layout; Gemini classifies the document and normalises the fields into a structured record.",
    stack: ["Tesseract", "EasyOCR", "PDFPlumber", "Gemini API", "Python"],
    span: "sm",
    accent: "cyan",
  },
  {
    name: "Steganography Suite",
    kind: "Security Tooling",
    year: "2023",
    blurb:
      "Hides payloads inside text, image, audio and video files, with cryptography layered underneath.",
    detail:
      "A desktop tool combining steganographic embedding across four media types with encryption, so the hidden payload is unreadable even once it is found.",
    stack: ["Python", "Stegano", "Pillow", "wave", "Tkinter"],
    span: "sm",
    accent: "violet",
  },
  {
    name: "Data Extraction & Analysis",
    kind: "Data Engineering",
    year: "2023",
    blurb:
      "Crawls many URLs at once and reports readability metrics plus packet-level inspection.",
    detail:
      "Requests and BeautifulSoup pull and clean the text, Syllapy scores readability, and Scapy adds network packet inspection for the transport side of the same fetch.",
    stack: ["Python", "Scapy", "Syllapy", "Requests", "BeautifulSoup"],
    span: "lg",
    accent: "amber",
  },
];

/* -------------------------------------------------------------------------- */
/*  Skills                                                                    */
/* -------------------------------------------------------------------------- */

export type SkillGroup = { title: string; note: string; items: string[] };

export const SKILLS: SkillGroup[] = [
  {
    title: "AI & Machine Learning",
    note: "Agentic systems, retrieval and model work",
    items: [
      "Agentic AI",
      "Multi-Agent Systems",
      "LLM Pipelines",
      "RAG",
      "Generative AI",
      "Embeddings",
      "Semantic Search",
      "Prompt Engineering",
      "Fine-Tuning",
      "Model Deployment",
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "OpenCV",
      "Physical AI",
    ],
  },
  {
    title: "Orchestration & Automation",
    note: "How the agents are wired together",
    items: [
      "LangChain",
      "LangGraph",
      "Langflow",
      "CrewAI",
      "MCP",
      "Function Calling",
      "Tool Calling",
      "OpenAI API",
      "Gemini API",
      "Hugging Face",
      "Ollama",
      "Workflow Design",
    ],
  },
  {
    title: "Languages",
    note: "What it gets written in",
    items: [
      "Python",
      "Rust",
      "TypeScript",
      "JavaScript",
      "Dart",
      "C",
      "SQL",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Backend & Frameworks",
    note: "Services, APIs and the web layer",
    items: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "Django",
      "Flask",
      "RESTful APIs",
      "Tailwind CSS",
    ],
  },
  {
    title: "Data Engineering",
    note: "Moving and reshaping data at volume",
    items: [
      "Polars",
      "Pandas",
      "NumPy",
      "Apache NiFi",
      "ETL Pipelines",
      "Data Ingestion",
      "Data Warehousing",
      "ClickHouse",
      "DuckDB",
      "Kafka / Redpanda",
    ],
  },
  {
    title: "Databases & Vector Stores",
    note: "Where state and embeddings live",
    items: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Milvus",
      "Pinecone",
      "Firebase",
      "Redis",
    ],
  },
  {
    title: "Cloud & DevOps",
    note: "Getting it running and keeping it up",
    items: [
      "AWS",
      "Amazon S3",
      "Google Cloud",
      "Docker",
      "Nginx",
      "PM2",
      "GitHub Actions",
      "CI/CD",
      "Linux",
    ],
  },
  {
    title: "Mobile",
    note: "Three years of Flutter, shipped to stores",
    items: [
      "Flutter",
      "Dart",
      "Bloc",
      "Provider",
      "GetX",
      "Android",
      "iOS",
      "Custom Packages",
      "Play Store / App Store",
    ],
  },
  {
    title: "Vision, OCR & IoT",
    note: "Reading the physical world",
    items: [
      "Computer Vision",
      "Tesseract OCR",
      "EasyOCR",
      "Google Vision API",
      "PDFPlumber",
      "Aerial Imagery",
      "IoT Sensors",
      "Sensor Data Processing",
    ],
  },
  {
    title: "Enterprise Integrations",
    note: "Plugging into what the business already runs",
    items: [
      "Salesforce",
      "HubSpot",
      "Zendesk",
      "Jira",
      "GA4",
      "OAuth2",
      "SSO",
      "CRM Integrations",
    ],
  },
];

/** The ticker under the hero. Short, recognisable, no duplicates. */
export const MARQUEE = [
  "Python",
  "Rust",
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "Flutter",
  "LangChain",
  "LangGraph",
  "Langflow",
  "CrewAI",
  "RAG",
  "PyTorch",
  "TensorFlow",
  "Polars",
  "Apache NiFi",
  "Milvus",
  "Pinecone",
  "ClickHouse",
  "DuckDB",
  "Kafka",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "GCP",
  "OpenCV",
  "MCP",
  "Computer Vision",
  "IoT",
] as const;

/* -------------------------------------------------------------------------- */
/*  Credentials                                                               */
/* -------------------------------------------------------------------------- */

export const EDUCATION = [
  {
    school: "Maharishi Dayanand University",
    degree: "B.Tech, Computer Science Engineering",
    period: "Oct 2021 — Jun 2025",
    place: "Rohtak, Haryana",
  },
  {
    school: "Mother India Senior Secondary School",
    degree: "Class XII — Computer Science (CBSE)",
    period: "Apr 2020 — Apr 2021",
    place: "Jhajjar, Haryana",
  },
  {
    school: "S.F. DAV Public School",
    degree: "Class X (CBSE)",
    period: "Apr 2018 — Apr 2019",
    place: "Mansurpur, Uttar Pradesh",
  },
] as const;

export const CERTIFICATIONS = [
  { name: "Python for Data Science & Machine Learning", issuer: "Udemy", year: "2024" },
  { name: "Google Developer Event", issuer: "Google", year: "2024" },
  { name: "Front End Development", issuer: "Great Learning Academy", year: "2023" },
  { name: "Employability Skills", issuer: "Rubicon Foundation", year: "2022" },
] as const;

export const ACHIEVEMENTS = [
  {
    title: "College Project of the Year — three years running",
    detail: "For the Vamsi AI voice assistant.",
  },
  {
    title: "Invited to Google Developer Events, twice",
    detail: "Delhi NCR developer community.",
  },
  {
    title: "Shipped a receipt platform to three platforms",
    detail: "Android, iOS and web, from one Flutter codebase.",
  },
  {
    title: "Sports Coordinator of the Year",
    detail: "Three years leading volleyball and badminton selection.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Contact                                                                   */
/* -------------------------------------------------------------------------- */

export const SOCIALS = [
  { label: "LinkedIn", href: SITE.linkedin, handle: "/in/vansh-sharma-vs4238" },
  { label: "Email", href: `mailto:${SITE.email}`, handle: SITE.email },
  { label: "Phone", href: `tel:${SITE.phoneHref}`, handle: SITE.phone },
  { label: "Résumé", href: SITE.resume, handle: "Download PDF" },
] as const;
