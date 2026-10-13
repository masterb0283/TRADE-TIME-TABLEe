"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Home, User, FolderKanban, Wrench, FileText, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { projects } from "@/data/projects";

const navIcons: Record<string, React.ElementType> = {
  Home,
  About: User,
  Projects: FolderKanban,
  Services: Wrench,
  Resume: FileText,
  Contact: Mail,
};

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const navResults = siteConfig.nav.filter((n) =>
    n.label.toLowerCase().includes(query.toLowerCase())
  );
  const projectResults = projects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label="Open command palette"
          onClick={() => setOpen(true)}
          className="glass hidden items-center gap-2 rounded-2xl px-3.5 py-2 text-[13px] text-[var(--text-muted)] transition-colors hover:text-[var(--text)] sm:flex"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search</span>
          <kbd className="ml-2 rounded-md border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild aria-describedby={undefined}>
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="glass fixed left-1/2 top-[18%] z-[80] w-[92vw] max-w-lg -translate-x-1/2 rounded-2xl bg-[var(--bg-elevated)] p-0 shadow-2xl"
              >
                <Dialog.Title className="sr-only">Command palette</Dialog.Title>
                <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3.5">
                  <Search className="h-4 w-4 text-[var(--text-muted)]" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search sections and projects…"
                    className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-faint)]"
                  />
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                  {navResults.length > 0 && (
                    <div className="mb-1">
                      <p className="px-3 py-1.5 font-mono text-[10px] text-[var(--text-faint)]">
                        Navigate
                      </p>
                      {navResults.map((n) => {
                        const Icon = navIcons[n.label] ?? ArrowRight;
                        return (
                          <button
                            key={n.href}
                            onClick={() => go(n.href)}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[var(--text)] hover:bg-[var(--surface-hover)]"
                          >
                            <Icon className="h-4 w-4 text-[var(--text-muted)]" />
                            {n.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {projectResults.length > 0 && (
                    <div>
                      <p className="px-3 py-1.5 font-mono text-[10px] text-[var(--text-faint)]">
                        Projects
                      </p>
                      {projectResults.map((p) => (
                        <button
                          key={p.slug}
                          onClick={() => go("#projects")}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[var(--text)] hover:bg-[var(--surface-hover)]"
                        >
                          <FolderKanban className="h-4 w-4 text-[var(--text-muted)]" />
                          {p.title}
                        </button>
                      ))}
                    </div>
                  )}
                  {navResults.length === 0 && projectResults.length === 0 && (
                    <p className="px-3 py-6 text-center text-sm text-[var(--text-faint)]">
                      No results for “{query}”
                    </p>
                  )}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
