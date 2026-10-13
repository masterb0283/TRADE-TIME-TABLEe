export const siteConfig = {
  name: "Babalola Boluwatife Joel",
  shortName: "Boluwatife Joel",
  role: "Full Stack Developer • AI Solutions Engineer • Video Editor",
  location: "Osun State & Ebonyi State, Nigeria",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://boluwatifejoel.dev",
  description:
    "Full stack developer and AI solutions engineer designing interfaces, building APIs, and shipping the databases and systems behind them — based between Osun State and Ebonyi State, Nigeria.",
  email: "Boluwatifejoel9@gmail.com",
  // WhatsApp doubles as the primary phone contact.
  phone: "+234 913 834 5280",
  whatsappNumber: "2349138345280", // digits only, country code first, no leading +/0
    links: {
    linkedin: "https://www.linkedin.com/in/boluwatife-babalola-583552433?trk=contact-info",
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
