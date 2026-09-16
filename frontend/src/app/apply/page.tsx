import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";

export const metadata: Metadata = {
  title: "Request a Project Consultation",
  description: "Discuss your software development, AI, design, or digital growth project with MIZYRA Institute of Technology.",
  alternates: {
    canonical: "https://www.mizyra.org/apply"
  },
  keywords: [
    "project consultation",
    "software consulting",
    "AI solutions consultation",
    "digital transformation service",
    "MIZYRA consultation"
  ]
};

export default function ApplyPage() {
  return <ApplyForm />;
}
