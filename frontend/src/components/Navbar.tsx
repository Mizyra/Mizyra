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
        <div className="relative z-10 mx-auto max-w-[1580px] px-0 md:px-8">
          <div
            className={clsx(
              "relative transition-all after:absolute after:inset-x-6 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-moonGreen/70 after:to-transparent",
              scrolled
                ? "rounded-b-[28px] border border-t-0 border-moonGreen/35 bg-[rgb(0_15_12_/_0.82)] py-2 shadow-[0_18px_45px_rgba(0,0,0,0.38)] backdrop-blur-xl"
                : "border border-transparent bg-transparent py-6"
            )}
          >
            <div className="flex items-center justify-between px-4 md:px-7">
              <Link href="/#home" className="flex min-w-0 items-center gap-2 font-display text-base font-semibold uppercase tracking-[0.16em] text-moonInk/80">
                <Image
                  src="/logo1.png"
                  alt="MIZYRA Institute of Technology logo"
                  width={80}
                  height={60}
                  className="h-12 w-16 shrink-0 object-contain sm:h-14 sm:w-20"
                  priority
                />
                <span className="min-w-0 leading-tight sm:whitespace-nowrap">
                  <strong className="block font-serif text-2xl tracking-[0.34em] text-moonGold">MIZYRA</strong>
                </span>
              </Link>

              <nav className="hidden items-center gap-8 lg:gap-11 md:flex" aria-label="Primary">
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

              <Link href="/apply" className="neo-btn-secondary hidden items-center gap-2 rounded-full px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] md:inline-flex">
                Apply Now <ArrowRight size={15} />
              </Link>
              <div className="flex items-center gap-2 md:hidden">
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
              "md:hidden overflow-hidden transition-all duration-300",
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
