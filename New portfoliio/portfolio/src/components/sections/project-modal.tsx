"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, Calendar } from "lucide-react";
import type { Project } from "@/data/projects";
import { statusLabel } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectThumb } from "@/components/sections/project-thumb";

export function ProjectModal({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && project && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild aria-describedby="project-desc">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 10 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-1/2 top-1/2 z-[80] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2"
              >
                <div className="glass noise max-h-[85vh] overflow-y-auto rounded-2xl bg-[var(--bg-elevated)]">
                  <div className="relative aspect-[16/8]">
                    <ProjectThumb seed={project.image} className="rounded-t-2xl" />
                    <Dialog.Close asChild>
                      <button
                        aria-label="Close"
                        className="glass absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="p-7">
                    <div className="flex items-start justify-between gap-4">
                      <Dialog.Title className="font-display text-xl font-semibold text-[var(--text)]">
                        {project.title}
                      </Dialog.Title>
                      <span className="flex shrink-0 items-center gap-1.5 font-mono text-[12px] text-[var(--text-faint)]">
                        <Calendar className="h-3.5 w-3.5" />
                        {project.year}
                      </span>
                    </div>

                    <p className="mt-1.5 text-[12.5px] text-[var(--text-faint)]">
                      {statusLabel[project.status]}
                    </p>

                    <p id="project-desc" className="mt-3 text-[14.5px] leading-relaxed text-[var(--text-muted)]">
                      {project.longDescription}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <Badge key={s}>{s}</Badge>
                      ))}
                    </div>

                    {(project.github || project.demo) ? (
                      <div className="mt-7 flex gap-3">
                        {project.github && (
                          <Button variant="secondary" asChild>
                            <a href={project.github} target="_blank" rel="noreferrer">
                              <Github className="h-4 w-4" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {project.demo && (
                          <Button asChild>
                            <a href={project.demo} target="_blank" rel="noreferrer">
                              <ExternalLink className="h-4 w-4" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <p className="mt-7 text-[12.5px] text-[var(--text-faint)]">
                        No public link yet — ask about this one directly on the Contact section.
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
