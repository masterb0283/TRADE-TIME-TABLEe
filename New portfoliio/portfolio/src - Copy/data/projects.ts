export type ProjectCategory = "Full Stack" | "AI" | "Web Apps" | "Branding";
export type ProjectStatus = "live" | "in-development" | "concept";

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  stack: string[];
  image: string;
  status: ProjectStatus;
  /** Only set these when the URL is real and reachable — the UI hides the button otherwise. */
  github?: string;
  demo?: string;
  year: string;
};

export const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  "in-development": "In development",
  concept: "Concept build",
};

export const projects: Project[] = [
  {
    slug: "commerceos",
    title: "CommerceOS",
    description: "Headless commerce platform with real-time inventory sync across channels.",
    longDescription:
      "A multi-tenant headless commerce platform concept for mid-market retailers: catalog management, real-time inventory sync across Shopify, POS, and marketplaces, and an order-routing engine that picks the optimal fulfillment center per order.",
    category: "Full Stack",
    stack: ["Next.js", "PostgreSQL", "Prisma", "tRPC", "Redis"],
    image: "commerce",
    status: "concept",
    year: "2026",
  },
  {
    slug: "insightgpt",
    title: "InsightGPT",
    description: "AI copilot that turns raw spreadsheets into narrated business insights.",
    longDescription:
      "An AI analyst that ingests CSV/Excel exports, infers schema, and generates a narrated report with charts, anomaly flags, and suggested next actions — built around function calling and a custom RAG pipeline over historical reports.",
    category: "AI",
    stack: ["Next.js", "OpenAI API", "LangChain", "Python", "PostgreSQL"],
    image: "insight",
    status: "in-development",
    year: "2025",
  },
  {
    slug: "clinicflow",
    title: "ClinicFlow",
    description: "Appointment and patient records SaaS for independent clinics.",
    longDescription:
      "A scheduling and records SaaS for independent clinics — patient intake, recurring appointment rules, SMS reminders via Twilio, and a role-based dashboard for front-desk staff and physicians.",
    category: "Full Stack",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Twilio", "Docker"],
    image: "clinic",
    status: "concept",
    year: "2025",
  },
  {
    slug: "loopcv",
    title: "LoopCV",
    description: "Resume-to-interview pipeline that scores candidates against a live role brief.",
    longDescription:
      "A hiring-workflow tool that parses uploaded résumés, scores them against a structured role brief using embeddings, and generates a shortlist with justification per criterion — designed to cut first-pass screening time for a small hiring team.",
    category: "AI",
    stack: ["Next.js", "Python", "FastAPI", "pgvector", "OpenAI API"],
    image: "loop",
    status: "in-development",
    year: "2025",
  },
  {
    slug: "pulseboard",
    title: "Pulseboard",
    description: "Real-time analytics dashboard for indie SaaS founders.",
    longDescription:
      "A lightweight, privacy-respecting analytics dashboard for indie SaaS founders who want MRR, churn, and funnel data in one screen. Ingests Stripe webhooks and product events over WebSockets.",
    category: "Web Apps",
    stack: ["React", "Node.js", "WebSockets", "PostgreSQL", "Chart.js"],
    image: "pulse",
    status: "concept",
    year: "2024",
  },
  {
    slug: "framewrk",
    title: "Framewrk Studio",
    description: "Brand system and motion identity for a creative agency concept.",
    longDescription:
      "A brand identity concept for a creative agency: logo system, type pairing, motion identity guidelines for reels and pitch decks, and a component library for client work.",
    category: "Branding",
    stack: ["Figma", "After Effects", "Brand Strategy"],
    image: "framewrk",
    status: "concept",
    year: "2024",
  },
];

export const projectCategories: ProjectCategory[] = ["Full Stack", "AI", "Web Apps", "Branding"];

