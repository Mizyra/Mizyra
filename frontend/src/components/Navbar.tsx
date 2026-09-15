"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#programs", label: "Programs" },
  { href: "/#research", label: "Research & Labs" },
  { href: "/apply", label: "Admissions" },
  { href: "/blog", label: "News & Events" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full transition-all">
      <div className="relative">
        <div className="relative z-10 mx-auto max-w-[1580px] px-3 sm:px-4 lg:px-8">
          <div
            className={clsx(
              "relative transition-all after:absolute after:inset-x-6 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-moonGreen/70 after:to-transparent",
              scrolled
                ? "rounded-b-[28px] border border-t-0 border-moonGreen/35 bg-[rgb(0_15_12_/_0.82)] py-2 shadow-[0_18px_45px_rgba(0,0,0,0.38)] backdrop-blur-xl"
                : "border border-transparent bg-transparent py-4 md:py-5"
            )}
          >
            <div className="flex min-w-0 items-center justify-between gap-3 px-2 sm:px-4">
              <Link href="/#home" className="flex min-w-0 shrink items-center gap-1.5 font-display text-base font-semibold uppercase tracking-[0.16em] text-moonInk/80 sm:gap-2">
                <Image
                  src="/logo1.png"
                  alt="MIZYRA logo"
                  width={80}
                  height={60}
                  className="h-10 w-12 shrink-0 object-contain sm:h-12 sm:w-16"
                  priority
                />
                <span className="min-w-0 whitespace-nowrap leading-tight">
                  <strong className="block font-serif text-xl tracking-[0.22em] text-moonGold sm:text-2xl sm:tracking-[0.28em]">MIZYRA</strong>
                </span>
              </Link>

              <nav className="hidden items-center gap-6 xl:gap-9 2xl:gap-11 xl:flex" aria-label="Primary">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-[11px] font-semibold uppercase tracking-[0.28em] text-moonInk/76 transition hover:text-moonGreen after:absolute after:-bottom-6 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-moonGreen after:shadow-[0_0_16px_rgb(var(--moon-green)/0.9)] after:transition-all hover:after:w-16"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <Link href="/apply" className="neo-btn-secondary hidden shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] xl:inline-flex 2xl:px-7 2xl:tracking-[0.24em]">
                Apply Now <ArrowRight size={15} />
              </Link>
              <div className="flex items-center gap-2 xl:hidden">
                <button
                  onClick={() => setOpen((value) => !value)}
                  aria-label="Toggle menu"
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  className="rounded-full border border-moonBorder/70 p-2 text-moonInk"
                >
                  {open ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>

          <div
            id="mobile-menu"
            className={clsx(
              "xl:hidden overflow-hidden transition-all duration-300",
              open ? "max-h-96 mt-3 opacity-100" : "pointer-events-none max-h-0 opacity-0"
            )}
          >
            <nav className="rounded-2xl border border-moonBorder/60 bg-moonCard/90 px-4 py-4 shadow-lg" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-moonInk/80"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/#contact"
                  className="neo-btn-primary gold-shimmer rounded-full px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em]"
                  onClick={() => setOpen(false)}
                >
                  Get Quote
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
