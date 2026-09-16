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
    default: "MIZYRA | Software Development, AI & Research Solutions",
    template: "%s | MIZYRA"
  },
  description:
    "MIZYRA delivers software development, AI & machine learning, web design, research support, and digital transformation solutions for businesses and learners in Chennai, Tamil Nadu, and beyond.",
  applicationName: "MIZYRA",
  keywords: [
    "MIZYRA",
    "software development company",
    "AI consulting",
    "machine learning solutions",
    "web development company",
    "UI UX design services",
    "research and development support",
    "digital marketing agency",
    "technology solutions in Chennai",
    "Tamil Nadu IT company",
    "Nagercoil software services"
  ],
  alternates: {
    canonical: "https://www.mizyra.org/"
  },
  openGraph: {
    type: "website",
    url: "https://www.mizyra.org/",
    title: "MIZYRA | Software Development, AI & Research Solutions",
    description:
      "MIZYRA delivers software development, AI & machine learning, web design, research support, and digital transformation solutions for businesses and learners in Chennai, Tamil Nadu, and beyond.",
    siteName: "MIZYRA",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "MIZYRA"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MIZYRA | Software Development, AI & Research Solutions",
    description:
      "MIZYRA delivers software development, AI & machine learning, web design, research support, and digital transformation solutions for businesses and learners in Chennai, Tamil Nadu, and beyond.",
    images: ["/opengraph-image.png"]
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "MIZYRA",
      alternateName: "MIZYRA",
      url: "https://www.mizyra.org/",
      logo: "https://www.mizyra.org/logo1.png",
      email: "mizyra.instituteoftechnology@gmail.com",
      telephone: "+91 93631 56825",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN"
      },
      areaServed: ["Chennai", "Tamil Nadu", "Nagercoil", "Kanyakumari"],
      description:
        "MIZYRA provides software development, AI & machine learning, UI/UX design, research support, and digital transformation services.",
      sameAs: ["https://www.mizyra.org/"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+91 93631 56825",
        email: "mizyra.instituteoftechnology@gmail.com",
        areaServed: "IN",
        availableLanguage: ["English"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "MIZYRA",
      alternateName: "MIZYRA",
      url: "https://www.mizyra.org/",
      description:
        "Software development, AI, research, design, and digital solutions provider empowering businesses and learners.",
      inLanguage: "en"
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "MIZYRA",
      url: "https://www.mizyra.org/",
      image: "https://www.mizyra.org/logo1.png",
      areaServed: ["Chennai", "Tamil Nadu", "Nagercoil", "Kanyakumari"],
      description:
        "Software development, AI and machine learning, research support, UX/UI design, digital marketing, and technology consulting.",
      email: "mizyra.instituteoftechnology@gmail.com",
      telephone: "+91 93631 56825"
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
