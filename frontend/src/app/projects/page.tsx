import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects | MIZYRA",
  description: "Explore MIZYRA's web, app, IoT, real-time, research, and digital marketing project capabilities.",
  alternates: {
    canonical: "https://www.mizyra.org/projects"
  },
  keywords: [
    "MIZYRA projects",
    "web development",
    "app development",
    "IoT solutions",
    "real-time applications",
    "research paper support",
    "digital marketing"
  ]
};

type ProjectItem = {
  title: string;
  description: string;
  repoUrl?: string;
};

const sectionImages: Record<string, string[]> = {
  "web-development": [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80"
  ],
  "app-development": [
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80"
  ],
  iot: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80"
  ],
  "real-time": [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=80"
  ],
  "research-papers": [
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1453738773917-9c3eff1db985?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
  ],
  "digital-marketing": [
    "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80"
  ]
};

const showcaseSections: {
  id: string;
  title: string;
  description: string;
  items: ProjectItem[];
}[] = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Web experiences built for clarity, performance, and growth.",
    items: [
      {
        title: "EcoSphereHub",
        description: "A web project focused on environmental awareness and sustainability.",
        repoUrl: "https://github.com/M-Chandran/EcoSphereHub"
      },
      {
        title: "Field Management System",
        description: "A workforce platform for scheduling jobs, tracking field teams, and managing operations.",
        repoUrl: "https://github.com/M-Chandran/Field-management-web"
      },
      {
        title: "Urban Safety Command Center",
        description: "A web-based platform for crime-data analysis, visualization, and trend forecasting.",
        repoUrl: "https://github.com/M-Chandran/Urban-Safety-Command-Center"
      },
      {
        title: "Image Dehazing Web Application",
        description: "A web application that uses computer vision to restore hazy and foggy images.",
        repoUrl: "https://github.com/M-Chandran/Image-Dehazing-Web-Application"
      },
      {
        title: "Future Message Delivery using Blockchain",
        description: "A web project exploring scheduled message delivery with blockchain concepts.",
        repoUrl: "https://github.com/M-Chandran/Future-Message-Delivering-using-BlockChain"
      }
    ]
  },
  {
    id: "app-development",
    title: "App Development",
    description: "Applied software projects, browser tools, and AI-powered application concepts.",
    items: [
      {
        title: "Solar Panel Defect Detection",
        description: "An AI-powered application concept for detecting and locating solar panel defects.",
        repoUrl: "https://github.com/M-Chandran/Solar-Panel-Defect-Detection"
      },
      {
        title: "SecureChain Digital Security Platform",
        description: "A security platform concept for document verification, fraud prevention, and blockchain certification.",
        repoUrl: "https://github.com/M-Chandran/SecureChain-AI-Blockchain-Digital-Security-Platform"
      },
      {
        title: "Image Forgery Detection System",
        description: "A Python application focused on detecting manipulated or forged images.",
        repoUrl: "https://github.com/M-Chandran/Advanced-Image-Forgery-Detection-System"
      },
      {
        title: "AI Dark Pattern Buster",
        description: "A browser extension concept for identifying deceptive interface patterns.",
        repoUrl: "https://github.com/M-Chandran/AI-Dark-Pattern-Buster"
      },
      {
        title: "Obscene Content Blocker",
        description: "A browser extension project for detecting and filtering inappropriate web content.",
        repoUrl: "https://github.com/M-Chandran/obsence-blocker"
      }
    ]
  },
  {
    id: "iot",
    title: "IoT Projects",
    description: "Connected-device solutions, from sensor prototypes to cloud-connected monitoring.",
    items: [
      {
        title: "Scalable IoT Management Platform",
        description: "A platform concept for real-time device data, edge-cloud storage, and secure audit trails.",
        repoUrl: "https://github.com/M-Chandran/Scalable_IoT_Project"
      },
      {
        title: "Smart Agriculture Monitoring",
        description: "Connect soil and weather sensors to track growing conditions and support irrigation decisions."
      },
      {
        title: "Industrial Equipment Monitoring",
        description: "Collect equipment sensor readings to surface operating conditions and maintenance signals."
      },
      {
        title: "Energy Usage Monitoring",
        description: "Bring connected meter data into a dashboard for visibility into energy consumption."
      },
      {
        title: "Environmental Sensor Network",
        description: "Combine distributed sensors to monitor local air quality, temperature, and humidity."
      }
    ]
  },
  {
    id: "real-time",
    title: "Real-Time Projects",
    description: "Interactive systems that keep teams and users up to date as activity happens.",
    items: [
      {
        title: "Live Operations Dashboard",
        description: "Stream current activity and key operational metrics into a shared dashboard."
      },
      {
        title: "Real-Time Field Tracking",
        description: "Show field-team status and job progress as updates arrive from the field."
      },
      {
        title: "Instant Alerting System",
        description: "Route event-based notifications to the right people with configurable alert rules."
      },
      {
        title: "Collaborative Messaging",
        description: "Enable teams to exchange updates and coordinate work without stale information."
      },
      {
        title: "Sensor Data Streaming",
        description: "Process incoming device telemetry for live monitoring and timely response."
      }
    ]
  },
  {
    id: "research-papers",
    title: "Research Papers",
    description: "Research planning, technical writing, analysis, and submission-format support. Publication or indexing is not guaranteed.",
    items: [
      {
        title: "IEEE Conference Papers",
        description: "Structure technical contributions and prepare manuscripts to match IEEE conference templates."
      },
      {
        title: "Scopus-Indexed Journal Submissions",
        description: "Support manuscript development and journal-fit preparation for Scopus-indexed venues."
      },
      {
        title: "SCI / SCIE Journal Manuscripts",
        description: "Refine research narrative, methodology, figures, and formatting for SCI / SCIE journal submission."
      },
      {
        title: "Springer Proceedings & Journals",
        description: "Prepare research manuscripts and supporting material using the target Springer publication format."
      },
      {
        title: "Elsevier Journal Submissions",
        description: "Assist with manuscript organization, technical presentation, and submission-readiness checks."
      }
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Digital growth services designed to strengthen discovery, reach, and measurable engagement.",
    items: [
      {
        title: "Search Engine Optimization",
        description: "Improve technical foundations, content relevance, and organic search visibility."
      },
      {
        title: "Social Media Campaigns",
        description: "Plan channel-specific content and campaigns to build awareness and audience engagement."
      },
      {
        title: "Content Marketing",
        description: "Create useful content that explains your offer and supports your customer journey."
      },
      {
        title: "Paid Advertising",
        description: "Design and refine paid campaigns around defined audiences, goals, and budgets."
      },
      {
        title: "Analytics & Conversion Optimization",
        description: "Measure campaign performance and improve the paths visitors take to become customers."
      }
    ]
  }
];

const serviceShowcase = [
  {
    title: "Software & Web Development",
    description: "Custom websites, web applications, APIs, and business software designed around your requirements.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Mobile & Application Development",
    description: "User-focused mobile and desktop applications built to support your products and workflows.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "AI, IoT & Technology Solutions",
    description: "Practical AI, machine learning, data, automation, cloud, and connected-device solutions.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Research & Publication Support",
    description: "Research planning, methodology, technical writing, data analysis, formatting, and submission-readiness support.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "UI/UX & Graphic Design",
    description: "Interface design, branding, graphics, and presentation design for clear and polished experiences.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Digital Marketing",
    description: "SEO, social media, content, paid campaigns, and performance analytics to support digital growth.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=900&q=80"
  }
];

export default function ProjectsPage() {
  return (
    <section className="page-hero py-20">
      <div className="section-shell">
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-moonBorder/70 bg-moonCard/80 px-4 py-2 text-sm font-medium text-moonGreen">
            <Rocket size={16} />
            Projects & Services
          </span>
          <h1 className="mt-4 text-3xl font-semibold text-moonInk md:text-4xl">
            Ideas, products, and digital experiences
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-moonInk/70">
            Explore web and app projects alongside the IoT, real-time, research, and marketing work we can help you plan and build.
          </p>
        </div>

        <div className="space-y-16">
          {showcaseSections.map((section, sectionIndex) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-moonGreen">
                  {String(sectionIndex + 1).padStart(2, "0")} / Showcase
                </p>
                <h2 id={`${section.id}-heading`} className="mt-2 text-2xl font-semibold text-moonInk md:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-2 max-w-3xl text-sm text-moonMuted md:text-base">{section.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {section.items.map((item, itemIndex) => (
                  <article key={item.title} className="glass-panel flex min-h-80 flex-col overflow-hidden">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={sectionImages[section.id][itemIndex]}
                        alt={`${item.title} — ${section.title}`}
                        fill
                        sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-semibold text-moonInk">{item.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-moonMuted">{item.description}</p>
                      {item.repoUrl ? (
                        <a
                          href={item.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-moonGreen hover:underline"
                        >
                          View on GitHub <ExternalLink size={14} />
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-20" id="services" aria-labelledby="services-heading">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-moonGreen">What we offer</p>
            <h2 id="services-heading" className="mt-2 text-2xl font-semibold text-moonInk md:text-3xl">
              MIZYRA Services
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-moonMuted md:text-base">
              From the first idea through design, development, and launch, explore services available for your next project.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceShowcase.map((service) => (
              <article key={service.title} className="glass-panel flex min-h-80 flex-col overflow-hidden">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold text-moonInk">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-moonMuted">{service.description}</p>
                  <Link href="/#contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-moonGreen hover:underline">
                    Discuss this service <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-16 text-center">
          <Link href="/#contact" className="neo-btn-primary btn-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
            Start a Project <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
