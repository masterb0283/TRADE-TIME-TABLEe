"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      {eyebrow && (
        <p className="mb-3 font-mono text-[12.5px] text-accent">{eyebrow}</p>
      )}
      <h2 className="text-balance font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-semibold leading-tight tracking-tight text-[var(--text)]">
        {title}
      </h2>
      {description && (
        <p className="mt-3.5 text-balance text-[15.5px] leading-relaxed text-[var(--text-muted)]">
          {description}
        </p>
      )}
    </motion.div>
  );
}
