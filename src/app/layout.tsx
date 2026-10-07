import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { DiscoveryModal } from "@/components/ui/DiscoveryModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://mahmudhasan.dev"),
  title: "Mahmud Hasan | Autonomous AI Systems Architect & Full-Stack Systems Engineer",
  description:
    "Enterprise portfolio of Mahmud Hasan. Architecting autonomous AI agents, enterprise workflow automation pipelines, zero-trust security systems, and high-performance full-stack applications.",
  authors: [{ name: "Mahmud Hasan" }],
  keywords: [
    "Mahmud Hasan",
    "Autonomous AI Systems Architect",
    "AI Automation Architect",
    "Full-Stack Systems Engineer",
    "Autonomous Agents",
    "Enterprise Workflow Automation",
    "Zero-Trust Architecture",
    "Next.js",
    "Flutter",
    "NestJS",
    "Python Security Daemon",
    "Dhaka Bangladesh",
  ],
  openGraph: {
    title: "Mahmud Hasan | Autonomous AI Systems Architect & Full-Stack Systems Engineer",
    description:
      "Architecting autonomous AI agents, enterprise workflow automation pipelines, zero-trust security systems, and high-performance full-stack applications.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/profile/mahmud-hasan-suit.jpg",
        width: 800,
        height: 1067,
        alt: "Mahmud Hasan Executive Portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmud Hasan | Autonomous AI Systems Architect & Full-Stack Systems Engineer",
    description:
      "Architecting autonomous AI agents, enterprise workflow automation pipelines, zero-trust security systems, and high-performance full-stack applications.",
    images: ["/images/profile/mahmud-hasan-suit.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mahmud Hasan",
              jobTitle: "AI Automation Expert, App Developer & Web Developer",
              url: "https://mahmudhasan.dev",
              sameAs: [
                "https://github.com/naimsmahmud50-dotcom",
                "https://www.linkedin.com/in/mahmud-hasan-687908269/",
                "https://www.facebook.com/profile.php?id=61594545143334",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-canvas dark:bg-canvas text-slate-100 selection:bg-cyan selection:text-slate-950 font-sans antialiased min-h-screen flex flex-col relative">
        <ThemeProvider>
          <ToastProvider>
            {/* Ambient Cosmic Nebula Mesh (Luminous Aurora Depth) */}
            <div className="fixed inset-0 pointer-events-none z-0 cosmic-nebula-mesh" aria-hidden="true" />
            <InteractiveBackground />
            <Navbar />
            <CommandPalette />
            <DiscoveryModal />
            <div className="flex-1 relative z-10">{children}</div>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
