import { Github, Linkedin, Youtube, Mail, MessageCircle } from "lucide-react";
import { siteConfig, whatsappHref } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-sm font-semibold text-[var(--text)]">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-[13px] text-[var(--text-faint)]">
            © {new Date().getFullYear()} — Built from {siteConfig.location}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[
            { icon: Github, href: siteConfig.links.github, label: "GitHub" },
            { icon: Linkedin, href: siteConfig.links.linkedin, label: "LinkedIn" },
            { icon: Youtube, href: siteConfig.links.youtube, label: "YouTube" },
            { icon: MessageCircle, href: whatsappHref(), label: "WhatsApp" },
            { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={label}
              className="glass flex h-10 w-10 items-center justify-center rounded-2xl text-[var(--text-muted)] transition-colors hover:text-accent"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
