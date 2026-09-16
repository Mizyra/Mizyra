"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import PageReveal from "@/components/PageReveal";
import SectionHeading from "@/components/SectionHeading";
import { loginStudent } from "@/lib/api";

export default function LoginForm() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await loginStudent({
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? "")
      });
      localStorage.setItem("mizyra_access_token", result.access_token);
      setMessage(`Signed in successfully as ${result.role}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageReveal>
      <section className="page-hero section-shell">
        <div className="mx-auto max-w-xl">
          <SectionHeading
            eyebrow="Student access"
            title="Continue your MIZYRA journey"
            description="Sign in to access your learner account and dashboard."
          />
          <form onSubmit={handleSubmit} className="glass-panel grid gap-4 p-6 md:p-8">
            <div>
              <label htmlFor="email" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" className="w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Password</label>
              <input id="password" name="password" type="password" required autoComplete="current-password" className="w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
            </div>
            <button type="submit" disabled={isSubmitting} className="neo-btn-primary btn-glow rounded-full px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
            {message ? <p className="text-sm text-moonInk/80" role="status">{message}</p> : null}
            <p className="text-sm text-moonMuted">
              Need help first? <Link href="/contact" className="font-semibold text-moonGreen hover:text-moonGold">Contact the team</Link>.
            </p>
          </form>
        </div>
      </section>
    </PageReveal>
  );
}
