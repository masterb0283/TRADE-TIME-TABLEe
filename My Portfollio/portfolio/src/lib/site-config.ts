export const siteConfig = {
  name: "Babalola Boluwatife Joel",
  shortName: "Boluwatife Joel",
  role: "Full Stack Developer • AI Solutions Engineer • Video Editor",
  location: "Osun State, Nigeria",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://boluwatifejoel.dev",
  description:
    "Full stack developer and AI solutions engineer designing interfaces, building APIs, and shipping the databases and systems behind them — from Osun State, Nigeria.",
  email: "hello@boluwatifejoel.dev",
  // WhatsApp doubles as the primary phone contact — update both to your real number.
  phone: "+234 000 000 0000",
  whatsappNumber: "234000000000", // digits only, country code first, no leading +/0
  links: {
    github: "https://github.com/boluwatifejoel",
    linkedin: "https://linkedin.com/in/boluwatifejoel",
    youtube: "https://youtube.com/@boluwatifejoel",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export const whatsappHref = (message?: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
