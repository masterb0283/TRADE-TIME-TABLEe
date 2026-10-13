export type SkillGroup = {
  category: string;
  items: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "TypeScript", level: 92 },
      { name: "JavaScript", level: 95 },
      { name: "Python", level: 80 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: 94 },
      { name: "Next.js", level: 92 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Redux", level: 78 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 88 },
      { name: "NestJS", level: 76 },
      { name: "REST APIs", level: 92 },
      { name: "GraphQL", level: 74 },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "PostgreSQL", level: 86 },
      { name: "MongoDB", level: 80 },
      { name: "Prisma", level: 85 },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", level: 93 },
      { name: "Docker", level: 78 },
      { name: "Vercel", level: 88 },
      { name: "Figma", level: 72 },
    ],
  },
];

export const techBadges = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "GraphQL",
  "Docker",
  "Tailwind CSS",
  "Python",
  "NestJS",
  "MongoDB",
];
