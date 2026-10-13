"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";

const WEEKS = 52;
const DAYS = 7;

// Deterministic pseudo-random generator so the graph is stable across renders/builds.
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildContributionData() {
  const rand = seededRandom(42);
  return Array.from({ length: WEEKS }, () =>
    Array.from({ length: DAYS }, () => {
      const r = rand();
      if (r > 0.88) return 4;
      if (r > 0.72) return 3;
      if (r > 0.5) return 2;
      if (r > 0.3) return 1;
      return 0;
    })
  );
}

const levelColors = [
  "var(--surface)",
  "rgba(79,124,255,0.25)",
  "rgba(79,124,255,0.5)",
  "rgba(79,124,255,0.75)",
  "#4f7cff",
];

export function GithubGraph() {
  const data = React.useMemo(buildContributionData, []);

  return (
    <section className="px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Building in public"
          description="Roughly a year of commits across client work, side projects, and open source."
        />

        <div className="glass mt-10 overflow-x-auto rounded-2xl p-6">
          <div className="flex w-max gap-[3px]">
            {data.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((level, di) => (
                  <motion.div
                    key={di}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.3, delay: (wi * DAYS + di) * 0.0015 }}
                    className="h-[11px] w-[11px] rounded-[3px]"
                    style={{ background: levelColors[level] }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-[var(--text-faint)]">
            Less
            {levelColors.map((c, i) => (
              <span key={i} className="h-[11px] w-[11px] rounded-[3px]" style={{ background: c }} />
            ))}
            More
          </div>
        </div>
      </div>
    </section>
  );
}
