"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Youtube, Loader2, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { siteConfig, whatsappHref } from "@/lib/site-config";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[14px] text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-accent";

  return (
    <section id="contact" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Let's build something"
          description="Have a project in mind, or just want to say hi? I usually reply within a day."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Contact info */}
          <div className="space-y-6">
            {[
              { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: siteConfig.phone,
                href: whatsappHref("Hi Boluwatife, I found your portfolio and I'd like to talk about a project."),
                external: true,
              },
              { icon: MapPin, label: "Location", value: siteConfig.location },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-accent">
                  <item.icon className="h-[18px] w-[18px]" />
                </div>
                <div>
                  <p className="text-[12.5px] text-[var(--text-faint)]">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      className="text-[14.5px] font-medium text-[var(--text)] hover:text-accent"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[14.5px] font-medium text-[var(--text)]">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <a
              href={whatsappHref("Hi Boluwatife, I'd like to talk about a project.")}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <Button variant="secondary" size="md" className="w-full sm:w-auto">
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </Button>
            </a>

            <div className="flex gap-2.5 pt-2">
              {[
                { icon: Github, href: siteConfig.links.github, label: "GitHub" },
                { icon: Linkedin, href: siteConfig.links.linkedin, label: "LinkedIn" },
                { icon: Youtube, href: siteConfig.links.youtube, label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="glass flex h-11 w-11 items-center justify-center rounded-2xl text-[var(--text-muted)] transition-colors hover:text-accent"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <input
                  id="name"
                  className={cn(inputClass, "mt-1.5", errors.name && "border-red-500/60")}
                  placeholder="Ada Lovelace"
                  {...register("name")}
                />
                {errors.name && <p className="mt-1.5 text-[12px] text-red-400">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <input
                  id="email"
                  type="email"
                  className={cn(inputClass, "mt-1.5", errors.email && "border-red-500/60")}
                  placeholder="ada@example.com"
                  {...register("email")}
                />
                {errors.email && <p className="mt-1.5 text-[12px] text-red-400">{errors.email.message}</p>}
              </div>
            </div>

            <div className="mt-5">
              <Label htmlFor="subject">Subject</Label>
              <input
                id="subject"
                className={cn(inputClass, "mt-1.5", errors.subject && "border-red-500/60")}
                placeholder="Project inquiry"
                {...register("subject")}
              />
              {errors.subject && <p className="mt-1.5 text-[12px] text-red-400">{errors.subject.message}</p>}
            </div>

            <div className="mt-5">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                rows={5}
                className={cn(inputClass, "mt-1.5 resize-none", errors.message && "border-red-500/60")}
                placeholder="Tell me a bit about what you're building…"
                {...register("message")}
              />
              {errors.message && <p className="mt-1.5 text-[12px] text-red-400">{errors.message.message}</p>}
            </div>

            {/* Honeypot — hidden from real users */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
              {...register("company")}
            />

            <div className="mt-6 flex items-center gap-4">
              <Button type="submit" size="lg" disabled={status === "loading"} className="min-w-[150px]">
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  "Send message"
                )}
              </Button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-[13.5px] text-emerald-400"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Message sent — thank you!
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-[13.5px] text-red-400"
                  >
                    <AlertCircle className="h-4 w-4" /> {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
