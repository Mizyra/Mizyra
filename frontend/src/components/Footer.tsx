import Link from "next/link";
import Image from "next/image";
import { BriefcaseBusiness, Camera, Play } from "lucide-react";

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
              <Link href="#" aria-label="LinkedIn" className="rounded-full border border-moonBorder/70 p-2 hover:text-moonGreen">
                <BriefcaseBusiness size={18} />
              </Link>
              <Link href="#" aria-label="Instagram" className="rounded-full border border-moonBorder/70 p-2 hover:text-moonGreen">
                <Camera size={18} />
              </Link>
              <Link href="#" aria-label="YouTube" className="rounded-full border border-moonBorder/70 p-2 hover:text-moonGreen">
                <Play size={18} />
              </Link>
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
                <a href="mailto:mizyra.instituteoftechnology@gmail.com" className="hover:text-moonGreen">
                  mizyra.instituteoftechnology@gmail.com
                </a>
              </li>
              <li>+91 93631 56825</li>
              <li>Chennai, Tamil Nadu</li>
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
