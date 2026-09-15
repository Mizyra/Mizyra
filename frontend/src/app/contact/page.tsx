import type { Metadata } from "next";
import { CalendarCheck2, Mail, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import PageReveal from "@/components/PageReveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with MIZYRA for software development, research, design, and digital marketing support."
};

const contacts = [
  {
    label: "Email",
    value: "mizyra.instituteoftechnology@gmail.com",
    href: "mailto:mizyra.instituteoftechnology@gmail.com",
    icon: Mail
  },
  {
    label: "Phone",
    value: "+91 93631 56825",
    href: "tel:+919363156825",
    icon: PhoneCall
  },
  {
    label: "Location",
    value: "Chennai, Tamil Nadu",
    href: "https://maps.google.com/?q=Chennai%20Tamil%20Nadu",
    icon: MapPin
  }
];

export default function ContactPage() {
  return (
    <PageReveal>
      <section className="page-hero section-shell reveal-up">
        <SectionHeading
          eyebrow="Contact"
          title="Talk to MIZYRA"
          description="Share your software, research, design, or digital growth goals and we will help you move the project forward."
        />

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <form className="glass-panel grid gap-4 p-6 md:p-8">
            <div>
              <label htmlFor="name" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Full Name</label>
              <input id="name" placeholder="Your full name" className="w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Email</label>
              <input id="email" placeholder="you@example.com" type="email" className="w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Phone Number</label>
              <input id="phone" placeholder="Phone number" className="w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Project Requirements</label>
              <textarea id="message" placeholder="Tell us about your software, research, design, or digital marketing needs" className="min-h-[120px] w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
            </div>
            <button className="neo-btn-primary btn-glow shine-on-hover rounded-full px-5 py-3 text-sm font-semibold">Submit Inquiry</button>
          </form>

          <div className="space-y-6">
            <article className="glass-panel p-6">
              <h3 className="text-xl font-semibold text-moonInk">Direct Contact</h3>
              <div className="mt-4 space-y-3">
                {contacts.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="neo-chip flex items-center gap-3 rounded-2xl px-3 py-3 text-left">
                      <span className="rounded-full bg-moonSoft/70 p-2 text-moonGreen">
                        <Icon size={14} />
                      </span>
                      <div>
                        <p className="text-xs text-moonInk/65">{item.label}</p>
                        <p className="break-words text-sm font-semibold text-moonInk">{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/919363156825"
                  target="_blank"
                  rel="noreferrer"
                  className="neo-btn-primary btn-glow shine-on-hover inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
                <a
                  href="mailto:mizyra.instituteoftechnology@gmail.com"
                  className="neo-btn-secondary btn-glow inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                >
                  <CalendarCheck2 size={15} /> Email Us
                </a>
              </div>
            </article>

            <article className="glass-panel overflow-hidden p-2">
              <iframe
                title="MIZYRA Institute of Technology Location"
                src="https://www.google.com/maps?q=Chennai&output=embed"
                className="h-64 w-full rounded-2xl border-0"
                loading="lazy"
              />
            </article>
          </div>
        </div>
      </section>
    </PageReveal>
  );
}
