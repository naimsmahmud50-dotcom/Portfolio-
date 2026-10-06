import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";

export const metadata: Metadata = {
  metadataBase: new URL("https://mahmudhasan.dev"),
  title: "Mahmud Hasan | AI Automation Expert, App Developer & Web Developer",
  description:
    "Portfolio of Mahmud Hasan. Architecting intelligent automation workflows, autonomous AI agents, practical web applications, and security-conscious digital solutions.",
  authors: [{ name: "Mahmud Hasan" }],
  keywords: [
    "Mahmud Hasan",
    "AI Automation Expert",
    "App Developer",
    "Web Developer",
    "Autonomous Agents",
    "Workflow Automation",
    "Next.js",
    "TypeScript",
    "Dhaka Bangladesh",
  ],
  openGraph: {
    title: "Mahmud Hasan | AI Automation Expert, App Developer & Web Developer",
    description:
      "I build intelligent automation systems, AI-powered applications, modern websites, and practical digital solutions.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/profile/mahmud-hasan.jpg",
        width: 800,
        height: 1067,
        alt: "Mahmud Hasan Portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmud Hasan | AI Automation Expert, App Developer & Web Developer",
    description:
      "I build intelligent automation systems, AI-powered applications, modern websites, and practical digital solutions.",
    images: ["/images/profile/mahmud-hasan.jpg"],
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
            <div className="flex-1 relative z-10">{children}</div>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
