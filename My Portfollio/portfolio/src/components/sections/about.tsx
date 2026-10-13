"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { education, certifications } from "@/data/resume";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";

function SkillMeter({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[13px]">
        <span className="text-[var(--text)]">{name}</span>
        <span className="font-mono text-[var(--text-faint)]">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface)]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-[var(--color-accent-2)]"
        />
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="I build the parts users notice and the parts they never see"
        />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: bio + timeline */}
          <div>
            <p className="text-[16px] leading-relaxed text-[var(--text-muted)]">
              I&apos;m a full stack developer and AI solutions engineer based in Osun
              State, Nigeria, with five years of hands-on experience shipping
              products end to end — from database schema to the pixel that
              greets a user. I care about software that survives contact with
              real usage: clear API boundaries, sensible data models, and
              interfaces that don&apos;t make people think.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-muted)]">
              Alongside development, I work as a video editor and digital
              brand builder, which shapes how I think about product design —
              pacing, hierarchy, and the small details that make something
              feel considered rather than assembled.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { value: "5+", label: "Years experience" },
                { value: "42+", label: "Projects shipped" },
                { value: "28+", label: "Clients served" },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-2xl px-4 py-5 text-center">
                  <p className="font-display text-2xl font-semibold text-[var(--text)]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11.5px] leading-tight text-[var(--text-faint)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="flex items-center gap-2 font-display text-[15px] font-semibold text-[var(--text)]">
                <GraduationCap className="h-4 w-4 text-accent" />
                Education
              </h3>
              <div className="mt-4 space-y-4 border-l border-[var(--border)] pl-5">
                {education.map((ed) => (
                  <div key={ed.title} className="relative">
                    <span className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--bg)] bg-accent" />
                    <p className="text-[14px] font-medium text-[var(--text)]">{ed.title}</p>
                    <p className="text-[13px] text-[var(--text-muted)]">{ed.org}</p>
                    <p className="font-mono text-[11.5px] text-[var(--text-faint)]">{ed.period}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="flex items-center gap-2 font-display text-[15px] font-semibold text-[var(--text)]">
                <Award className="h-4 w-4 text-accent" />
                Certifications
              </h3>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {certifications.map((c) => (
                  <Card key={c.title} className="px-4 py-3.5">
                    <p className="text-[13.5px] font-medium leading-snug text-[var(--text)]">
                      {c.title}
                    </p>
                    <p className="mt-1 text-[12px] text-[var(--text-faint)]">
                      {c.org} · {c.year}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right: skill meters + tech grid */}
          <div className="space-y-8">
            {skillGroups.map((group) => (
              <Card key={group.category} className="p-6">
                <p className="mb-5 font-mono text-[12px] text-[var(--text-faint)]">
                  {group.category}
                </p>
                <div className="space-y-4">
                  {group.items.map((skill) => (
                    <SkillMeter key={skill.name} {...skill} />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
