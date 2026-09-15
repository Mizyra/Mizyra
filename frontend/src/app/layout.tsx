import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body"
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mizyra.org"),
  title: {
    default: "MIZYRA | AI & Software Technology",
    template: "%s | MIZYRA"
  },
  description:
    "MIZYRA is a technology company building innovative AI, software, and intelligent digital solutions for the future.",
  applicationName: "MIZYRA",
  keywords: [
    "MIZYRA",
    "AI software",
    "software development",
    "digital products",
    "technology solutions"
  ],
  alternates: {
    canonical: "https://www.mizyra.org/"
  },
  openGraph: {
    type: "website",
    url: "https://www.mizyra.org/",
    title: "MIZYRA | AI & Software Technology",
    description:
      "MIZYRA is a technology company building innovative AI, software, and intelligent digital solutions for the future.",
    siteName: "MIZYRA",
    locale: "en_US",
    images: [
      {
        url: "/logo1.png",
        width: 1080,
        height: 608,
        alt: "MIZYRA"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MIZYRA | AI & Software Technology",
    description:
      "MIZYRA is a technology company building innovative AI, software, and intelligent digital solutions for the future.",
    images: ["/logo1.png"]
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "MIZYRA",
      url: "https://www.mizyra.org/",
      logo: "https://www.mizyra.org/logo1.png"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "MIZYRA",
      alternateName: "Mizyra",
      url: "https://www.mizyra.org/"
    }
  ];

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <div className="relative z-10">
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="pt-20 md:pt-24">
            {children}
          </main>
          <Footer />
          <ChatbotWidget />
        </div>
      </body>
    </html>
  );
}
