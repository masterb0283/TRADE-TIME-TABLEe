"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { CommandPalette } from "@/components/shared/command-palette";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [active, setActive] = React.useState("#home");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const sections = siteConfig.nav
      .map((n) => document.querySelector(n.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const goTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "glass flex w-full max-w-3xl items-center justify-between rounded-2xl px-4 py-2.5 transition-shadow duration-300",
            scrolled && "shadow-[0_8px_32px_-16px_rgba(0,0,0,0.5)]"
          )}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              goTo("#home");
            }}
            className="font-display shrink-0 text-[15px] font-semibold tracking-tight text-[var(--text)]"
          >
            BB<span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(item.href);
                  }}
                  className={cn(
                    "relative rounded-xl px-3.5 py-2 text-[13.5px] font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)]",
                    active === item.href && "text-[var(--text)]"
                  )}
                >
                  {active === item.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-xl bg-[var(--surface-hover)]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <CommandPalette />
            <ThemeToggle />
            <Button
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => goTo("#contact")}
            >
              Hire Me
            </Button>
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--text)] md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="glass absolute inset-x-4 top-24 rounded-2xl bg-[var(--bg-elevated)] p-2"
            >
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(item.href);
                  }}
                  className={cn(
                    "block rounded-xl px-4 py-3.5 text-[15px] font-medium text-[var(--text-muted)]",
                    active === item.href && "bg-[var(--surface-hover)] text-[var(--text)]"
                  )}
                >
                  {item.label}
                </a>
              ))}
              <div className="p-2 pt-1">
                <Button variant="primary" className="w-full" onClick={() => goTo("#contact")}>
                  Hire Me
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
