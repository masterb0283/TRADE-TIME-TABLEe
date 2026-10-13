"use client";

import * as React from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projects, projectCategories, statusLabel, type Project, type ProjectCategory, type ProjectStatus } from "@/data/projects";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { ProjectThumb } from "@/components/sections/project-thumb";
import { ProjectModal } from "@/components/sections/project-modal";
import { cn } from "@/lib/utils";

const filters: ("All" | ProjectCategory)[] = ["All", ...projectCategories];

const statusDot: Record<ProjectStatus, string> = {
  live: "bg-emerald-400",
  "in-development": "bg-amber-400",
  concept: "bg-[var(--text-faint)]",
};

export function Projects() {
  const [filter, setFilter] = React.useState<(typeof filters)[number]>("All");
  const [active, setActive] = React.useState<Project | null>(null);
  const [open, setOpen] = React.useState(false);

  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title="Selected projects"
            description="A mix of full-stack products, AI features, and brand work — shipped for real clients and teams."
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "relative rounded-2xl px-4 py-2 text-[13.5px] font-medium transition-colors",
                filter === f
                  ? "text-white"
                  : "glass text-[var(--text-muted)] hover:text-[var(--text)]"
              )}
            >
              {filter === f && (
                <motion.span
                  layoutId="project-filter-active"
                  className="absolute inset-0 -z-10 rounded-2xl bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {f}
            </button>
          ))}
        </div>

        <LayoutGroup>
          <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <motion.article
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group glass overflow-hidden rounded-2xl"
                >
                  <button
                    onClick={() => {
                      setActive(project);
                      setOpen(true);
                    }}
                    className="block w-full text-left"
                    aria-label={`Open ${project.title} details`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.06]">
                        <ProjectThumb seed={project.image} />
                      </div>
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="p-4 text-[13px] font-medium text-white">
                          View details →
                        </span>
                      </div>
                    </div>
                  </button>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-[16px] font-semibold text-[var(--text)]">
                        {project.title}
                      </h3>
                      <span className="font-mono text-[11px] text-[var(--text-faint)]">
                        {project.year}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className={cn("h-1.5 w-1.5 rounded-full", statusDot[project.status])} />
                      <span className="text-[11.5px] text-[var(--text-faint)]">
                        {statusLabel[project.status]}
                      </span>
                    </div>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--text-muted)]">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 3).map((s) => (
                        <Badge key={s}>{s}</Badge>
                      ))}
                      {project.stack.length > 3 && <Badge>+{project.stack.length - 3}</Badge>}
                    </div>
                    {(project.github || project.demo) && (
                      <div className="mt-5 flex items-center gap-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-[13px] text-[var(--text-muted)] hover:text-[var(--text)]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="h-3.5 w-3.5" /> Code
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-[13px] text-[var(--text-muted)] hover:text-[var(--text)]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-3.5 w-3.5" /> Live demo
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      <ProjectModal project={active} open={open} onOpenChange={setOpen} />
    </section>
  );
}
