"use client";

import * as React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { experience, education, certifications, stats } from "@/data/resume";
import { skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/shared/section-heading";
import { Counter } from "@/components/shared/counter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function TimelineList({
  items,
}: {
  items: { title: string; org: string; period: string; points?: string[] }[];
}) {
  return (
    <div className="space-y-8 border-l border-[var(--border)] pl-6">
      {items.map((it) => (
        <div key={it.title} className="relative">
          <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--bg)] bg-accent" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h4 className="font-display text-[15px] font-semibold text-[var(--text)]">
              {it.title}
            </h4>
            <span className="font-mono text-[11.5px] text-[var(--text-faint)]">{it.period}</span>
          </div>
          <p className="text-[13.5px] text-[var(--text-muted)]">{it.org}</p>
          {it.points && (
            <ul className="mt-2.5 space-y-1.5">
              {it.points.map((p) => (
                <li key={p} className="text-[13px] leading-relaxed text-[var(--text-muted)]">
                  — {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export function Resume() {
  return (
    <section id="resume" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title="Experience & background"
            description="A timeline of where I've worked, what I studied and what I've earned along the way."
          />
          <a href="/resume.pdf" download>
            <Button size="lg">
              <Download className="h-4 w-4" />
              Download CV
            </Button>
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl px-5 py-6 text-center"
            >
              <p className="font-display text-3xl font-semibold text-[var(--text)]">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 text-[12.5px] text-[var(--text-faint)]">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <Tabs.Root defaultValue="experience" className="mt-16">
          <Tabs.List className="glass inline-flex gap-1 rounded-2xl p-1.5">
            {[
              { value: "experience", label: "Experience" },
              { value: "education", label: "Education" },
              { value: "skills", label: "Technical skills" },
            ].map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                className="rounded-xl px-4 py-2 text-[13.5px] font-medium text-[var(--text-muted)] transition-colors data-[state=active]:bg-accent data-[state=active]:text-white"
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <div className="mt-10">
            <Tabs.Content value="experience">
              <TimelineList
                items={experience.map((e) => ({
                  title: e.role,
                  org: e.org,
                  period: e.period,
                  points: e.points,
                }))}
              />
            </Tabs.Content>

            <Tabs.Content value="education">
              <div className="grid gap-10 sm:grid-cols-2">
                <TimelineList items={education.map((e) => ({ ...e, points: undefined }))} />
                <div>
                  <h4 className="font-display text-[15px] font-semibold text-[var(--text)]">
                    Certifications
                  </h4>
                  <div className="mt-4 space-y-2.5">
                    {certifications.map((c) => (
                      <div key={c.title} className="glass rounded-xl px-4 py-3">
                        <p className="text-[13.5px] font-medium text-[var(--text)]">{c.title}</p>
                        <p className="text-[12px] text-[var(--text-faint)]">
                          {c.org} · {c.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="skills">
              <div className="flex flex-wrap gap-2.5">
                {skillGroups.flatMap((g) => g.items).map((s) => (
                  <Badge key={s.name} className="px-3.5 py-1.5 text-[12px]">
                    {s.name}
                  </Badge>
                ))}
              </div>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </div>
    </section>
  );
}
