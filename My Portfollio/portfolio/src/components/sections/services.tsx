"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/shared/section-heading";

export function Services() {
  return (
    <section id="services" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="What I can build for you"
          description="From a single API to a full product surface — scoped to what the project actually needs."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--surface-hover)] hover:shadow-[0_20px_40px_-24px_rgba(79,124,255,0.35)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/12 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-[16px] font-semibold text-[var(--text)]">
                {service.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--text-muted)]">
                {service.description}
              </p>
              <ul className="mt-4 space-y-2">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-[12.5px] text-[var(--text-muted)]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
