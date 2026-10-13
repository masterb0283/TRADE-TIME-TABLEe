"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { techBadges } from "@/data/skills";
import { ParticleField } from "@/components/shared/particle-field";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-28 pb-16 sm:pt-32"
    >
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-[70%] rounded-full bg-accent/20 blur-[120px] animate-glow-pulse" />
        <div
          className="absolute top-1/3 right-0 h-[420px] w-[420px] translate-x-1/3 rounded-full bg-[var(--color-accent-2)]/20 blur-[110px] animate-glow-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="noise absolute inset-0 opacity-40" />
      </div>

      <ParticleField />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="glass mb-7 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] text-[var(--text-muted)]"
          >
            <MapPin className="h-3.5 w-3.5 text-accent" />
            {siteConfig.location}
            <span className="mx-0.5 h-1 w-1 rounded-full bg-[var(--text-faint)]" />
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for work
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance font-display text-[clamp(2.3rem,5.5vw,4.2rem)] font-semibold leading-[1.05] tracking-tight text-[var(--text)]"
          >
            Building scalable digital products with modern technologies
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-balance text-[16px] leading-relaxed text-[var(--text-muted)] sm:text-[17px]"
          >
            I&apos;m {siteConfig.name} — a full stack developer and AI solutions
            engineer. I work across the whole stack: interfaces, APIs,
            databases, and the infrastructure that keeps them running — not
            just the parts people see.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Hire Me
            </Button>
            <a
              href="/resume.pdf"
              download
              className="inline-flex h-13 items-center gap-2 rounded-2xl px-4 text-[15px] font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              <Download className="h-4 w-4" />
              CV
            </a>
          </motion.div>

          <motion.div variants={item} className="relative mt-14 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[var(--bg)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[var(--bg)] to-transparent" />
            <div className="flex w-max animate-marquee gap-2.5">
              {[...techBadges, ...techBadges].map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="glass shrink-0 rounded-full px-3.5 py-1.5 font-mono text-[12px] text-[var(--text-muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="animate-float">
            <div className="glass noise relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 100% at 30% 0%, rgba(79,124,255,0.35), transparent 55%), radial-gradient(100% 100% at 100% 100%, rgba(139,127,255,0.3), transparent 50%)",
                }}
              />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                <div>
                  <p className="font-display text-lg font-semibold text-white drop-shadow-sm">
                    {siteConfig.shortName}
                  </p>
                  <p className="mt-0.5 text-[12px] text-white/70">Full Stack · AI · Video</p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="glass absolute -left-6 top-8 hidden rounded-2xl px-4 py-3 sm:block"
            >
              <p className="font-mono text-[11px] text-[var(--text-faint)]">status</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[13px] font-medium text-[var(--text)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Shipping
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              className="glass absolute -right-5 bottom-16 hidden rounded-2xl px-4 py-3 sm:block"
            >
              <p className="font-mono text-[11px] text-[var(--text-faint)]">experience</p>
              <p className="mt-0.5 text-[13px] font-medium text-[var(--text)]">5+ years</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
