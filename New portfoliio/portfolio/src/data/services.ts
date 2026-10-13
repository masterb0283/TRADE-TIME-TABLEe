import type { LucideIcon } from "lucide-react";
import { Code2, Layers, Plug, Brain, Database, Clapperboard } from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    icon: Code2,
    title: "Full Stack Web Development",
    description:
      "End-to-end product builds — from database schema to a polished, production-ready UI.",
    deliverables: ["Next.js + TypeScript apps", "Component design systems", "CI/CD to Vercel or Docker"],
  },
  {
    icon: Layers,
    title: "SaaS Application Development",
    description: "Multi-tenant SaaS foundations built to hold up under real usage and growth.",
    deliverables: ["Auth & billing integration", "Role-based access control", "Usage metering & dashboards"],
  },
  {
    icon: Plug,
    title: "REST API Development",
    description: "Well-documented, versioned APIs designed for the clients that will consume them.",
    deliverables: ["OpenAPI documentation", "Rate limiting & auth", "Webhook infrastructure"],
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "Practical LLM features — retrieval, function calling, and agentic workflows.",
    deliverables: ["RAG pipelines", "Prompt & eval design", "Cost-aware model routing"],
  },
  {
    icon: Database,
    title: "Database Design",
    description: "Schemas that stay coherent as the product changes shape.",
    deliverables: ["PostgreSQL / Prisma modeling", "Query performance tuning", "Migration strategy"],
  },
  {
    icon: Clapperboard,
    title: "Video & Digital Branding",
    description: "Product and brand video, motion identity, and content systems.",
    deliverables: ["Product demo videos", "Motion graphics templates", "Brand & content strategy"],
  },
];
