import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "MIZYRA",
  description: "Contact MIZYRA for software development, AI solutions, research support, UI/UX design, and digital growth services in Chennai and Tamil Nadu.",
  alternates: {
    canonical: "https://www.mizyra.org/contact"
  },
  keywords: [
    "contact MIZYRA",
    "software development company in Chennai",
    "AI solutions company",
    "research support service",
    "digital marketing agency Tamil Nadu"
  ]
};

export default function ContactPage() {
  return <ContactForm />;
}
