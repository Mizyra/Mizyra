import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-moonBorder/70 bg-moonSoft/60 py-12">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/#home" className="inline-flex min-w-0 items-center gap-2 font-display text-lg font-semibold text-moonInk">
              <Image
                src="/logo1.png"
                alt="MIZYRA logo"
                width={96}
                height={68}
                className="h-16 w-24 object-contain"
              />
              <span className="min-w-0 leading-tight">MIZYRA</span>
            </Link>
            <p className="mt-3 text-sm text-moonMuted">
              Building technology systems, research support, and digital experiences that move businesses forward.
            </p>
            <div className="mt-4 flex items-center gap-3 text-moonInk/70">
              <a href="https://www.linkedin.com/company/mizyra/posts/?feedView=all" aria-label="MIZYRA on LinkedIn" target="_blank" rel="noreferrer" className="rounded-full border border-moonBorder/70 p-2 hover:text-moonGreen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-[18px] w-[18px]">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M8 10v7M8 7v.01M12 17v-4a3 3 0 0 1 6 0v4M12 10v7" />
                </svg>
              </a>
              <a href="https://www.instagram.com/mizyra.tech?xtok=MTZwc3lsZjBwenVuZw==" aria-label="MIZYRA on Instagram" target="_blank" rel="noreferrer" className="rounded-full border border-moonBorder/70 p-2 hover:text-moonGreen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-[18px] w-[18px]">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M17.5 6.5h.01" />
                </svg>
              </a>
              <a href="https://wa.me/919363156825" aria-label="Message MIZYRA on WhatsApp" target="_blank" rel="noreferrer" className="rounded-full border border-moonBorder/70 p-2 hover:text-moonGreen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-[18px] w-[18px]">
                  <path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L3 20l1.2-4.9a8.2 8.2 0 1 1 16-3.4Z" />
                  <path d="M8.3 8.1c.2-.5.4-.5.7-.5h.5c.2 0 .3.1.4.4l.7 1.6c.1.2.1.4 0 .5l-.5.6c-.2.2-.2.3-.1.5.3.6.8 1.1 1.3 1.5.5.4 1 .7 1.5.9.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.6-.1l1.5.7c.3.1.4.2.4.4 0 .3-.2 1.1-.7 1.5-.5.5-1.2.7-1.9.6-.8-.1-1.8-.5-2.9-1.2-1.4-.9-2.4-2-3-3.1-.5-.9-.7-1.7-.6-2.3.1-.5.5-1.1 1-1.2Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-moonInk">Services</h4>
            <ul className="mt-3 space-y-2 text-sm text-moonInk/70">
              <li><Link href="/#services" className="hover:text-moonGreen">Software Development</Link></li>
              <li><Link href="/#research" className="hover:text-moonGreen">Research Support</Link></li>
              <li><Link href="/#contact" className="hover:text-moonGreen">Digital Consulting</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-moonInk">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-moonInk/70">
              <li><Link href="/#about" className="hover:text-moonGreen">About</Link></li>
              <li><Link href="/#projects" className="hover:text-moonGreen">Projects</Link></li>
              <li><Link href="/#contact" className="hover:text-moonGreen">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-moonInk">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-moonInk/70">
              <li>
                <a href="mailto:mizyra.official@gmail.com" className="break-words hover:text-moonGreen">
                  mizyra.official@gmail.com
                </a>
              </li>
              <li>+91 93631 56825</li>
              <li>Nagercoil, Kanyakumari</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-moonBorder/70 pt-6 text-center text-xs text-moonInk/60">
          <span>Copyright {new Date().getFullYear()} MIZYRA. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
