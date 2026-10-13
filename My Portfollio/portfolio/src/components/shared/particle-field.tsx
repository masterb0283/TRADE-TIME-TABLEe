"use client";

import * as React from "react";

/**
 * Lightweight canvas particle field ("live coding background particles").
 * Respects prefers-reduced-motion and pauses when off-screen.
 */
export function ParticleField() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * devicePixelRatio);

    const glyphs = "01{}<>/;=+-*".split("");
    const count = Math.min(46, Math.floor((width * height) / 90000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: 0.15 + Math.random() * 0.35,
      char: glyphs[Math.floor(Math.random() * glyphs.length)] ?? "0",
      size: 10 + Math.random() * 8,
      opacity: 0.06 + Math.random() * 0.1,
    }));

    let raf: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = "12px var(--font-mono)";
      particles.forEach((p) => {
        ctx.fillStyle = `rgba(79,124,255,${p.opacity})`;
        ctx.font = `${p.size}px var(--font-mono)`;
        ctx.fillText(p.char, p.x, p.y);
        p.y += p.vy;
        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }
      });
      raf = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth * devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70"
    />
  );
}
