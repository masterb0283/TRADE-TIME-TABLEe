"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/testimonials";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/section-heading";

export function BlogPreview() {
  return (
    <section className="px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Notes & writing" description="Occasional write-ups on things I learn while building." />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.a
              key={post.slug}
              href={`#`}
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass group flex flex-col justify-between rounded-2xl p-6 transition-colors hover:bg-[var(--surface-hover)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11.5px] text-[var(--text-faint)]">
                    {formatDate(post.date)} · {post.readTime}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--text-faint)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <h3 className="mt-3 font-display text-[15.5px] font-semibold leading-snug text-[var(--text)]">
                  {post.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-muted)]">
                  {post.excerpt}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
