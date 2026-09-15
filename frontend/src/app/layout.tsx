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
  metadataBase: new URL("https://mizyra.instituteoftechnology.com"),
  title: {
    default: "MIZYRA Institute of Technology",
    template: "%s | MIZYRA Institute of Technology"
  },
  description:
    "MIZYRA Institute of Technology delivers software development, research support, UI/UX design, digital marketing, and technology solutions for modern businesses.",
  keywords: [
    "MIZYRA Institute of Technology",
    "software development",
    "research support",
    "UI/UX design",
    "digital marketing",
    "technology solutions",
    "custom software"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "https://mizyra.instituteoftechnology.com",
    title: "MIZYRA Institute of Technology",
    description:
      "Technology-focused solutions for software development, research, design, and digital growth.",
    siteName: "MIZYRA Institute of Technology",
    locale: "en_IN",
    images: [
      {
        url: "/logo1.png",
        width: 1080,
        height: 608,
        alt: "MIZYRA Institute of Technology"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MIZYRA Institute of Technology",
    description:
      "Software development, research, design, and digital marketing solutions for modern businesses.",
    images: ["/logo1.png"]
  },
  icons: {
    icon: "/logo1.png",
    shortcut: "/logo1.png",
    apple: "/logo1.png"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <div className="relative z-10">
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="pt-14 md:pt-16">
            {children}
          </main>
          <Footer />
          <ChatbotWidget />
        </div>
      </body>
    </html>
  );
}
