import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Student Login",
  description: "Student login for MIZYRA learners.",
  robots: {
    index: false,
    follow: false
  }
};

export default function LoginPage() {
  return <LoginForm />;
}
