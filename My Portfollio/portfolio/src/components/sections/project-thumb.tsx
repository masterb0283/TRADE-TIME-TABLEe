"use client";

import { cn } from "@/lib/utils";

/**
 * Deterministic gradient placeholder used in place of real project screenshots.
 * Swap the parent <div> for a real <Image> once assets are available.
 */
const gradients: Record<string, string> = {
  commerce: "linear-gradient(135deg,#4F7CFF,#1E2A78)",
  insight: "linear-gradient(135deg,#8B7FFF,#2A2160)",
  clinic: "linear-gradient(135deg,#4FD1FF,#1E4E78)",
  loop: "linear-gradient(135deg,#FF8A65,#7A2E1E)",
  pulse: "linear-gradient(135deg,#4FFFB0,#1E783F)",
  framewrk: "linear-gradient(135deg,#FF6FB5,#781E4E)",
};

export function ProjectThumb({ seed, className }: { seed: string; className?: string }) {
  return (
    <div
      className={cn("noise relative h-full w-full overflow-hidden", className)}
      style={{ background: gradients[seed] ?? gradients.commerce }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
    </div>
  );
}
