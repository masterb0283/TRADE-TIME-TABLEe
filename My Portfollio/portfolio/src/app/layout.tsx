import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { siteConfig } from "@/lib/site-config";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { SplashScreen } from "@/components/shared/splash-screen";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { CursorGlow } from "@/components/shared/cursor-glow";
import { BackToTop } from "@/components/shared/back-to-top";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Full Stack Developer & AI Solutions Engineer`,
    template: `%s — ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "Full Stack Developer",
    "AI Solutions Engineer",
    "Next.js Developer",
    "Nigeria",
    "Babalola Boluwatife Joel",
    "React Developer",
    "TypeScript",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — Full Stack Developer & AI Solutions Engineer`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Full Stack Developer & AI Solutions Engineer`,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090d" },
    { media: "(prefers-color-scheme: light)", color: "#fafafc" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <SplashScreen />
          <ScrollProgress />
          <CursorGlow />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <Toaster position="bottom-right" theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}
