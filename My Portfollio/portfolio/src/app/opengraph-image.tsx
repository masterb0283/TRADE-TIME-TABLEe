import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#08090d",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(79,124,255,0.35), transparent 45%), radial-gradient(circle at 85% 85%, rgba(139,127,255,0.3), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#4F7CFF", letterSpacing: 2 }}>
          {siteConfig.location}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 68,
            fontWeight: 700,
            color: "#F2F3F7",
            lineHeight: 1.1,
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 30, color: "#90939F" }}>
          {siteConfig.role}
        </div>
      </div>
    ),
    { ...size }
  );
}
