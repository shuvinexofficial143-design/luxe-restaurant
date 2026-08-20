import Link from "next/link";
import { site } from "@/data/site";
import NewsletterForm from "./NewsletterForm";
import { ArrowUpRight, Diamond, MapPin, Phone, Mail } from "../ui/icons";

const exploreLinks = [
  { label: "The Menu", href: "/menu" },
  { label: "Experiences", href: "/experiences" },
  { label: "Private Dining", href: "/private-dining" },
  { label: "Reservations", href: "/reservations" },
  { label: "Gallery", href: "/gallery" },
  { label: "Journal", href: "/journal" },
  { label: "Our Story", href: "/about" },
  { label: "Our Chefs", href: "/chefs" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-cream-50">
      <div className="container-x pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-baseline gap-1.5 font-display text-2xl font-medium tracking-[0.32em]">
              LUXE
              <Diamond width={8} height={8} className="text-gold-500" />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed font-light text-cream-100/60">
              {site.tagline}. Twelve tables, one open hearth, and a menu written
              each dawn in the heart of Mayfair.
            </p>
            <div className="mt-8 flex gap-6">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-line text-[0.6875rem] uppercase tracking-[0.24em] text-cream-100/70 hover:text-cream-50"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="eyebrow text-gold-400">Explore</p>
            <ul className="mt-6 space-y-3">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-light text-cream-100/70 transition-colors hover:text-gold-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div className="lg:col-span-3">
            <p className="eyebrow text-gold-400">Visit</p>
            <ul className="mt-6 space-y-4 text-sm font-light text-cream-100/70">
              <li className="flex gap-3">
                <MapPin width={16} height={16} className="mt-0.5 shrink-0 text-gold-500" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone width={16} height={16} className="mt-0.5 shrink-0 text-gold-500" />
                <a href={site.phoneHref} className="hover:text-gold-300">{site.phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail width={16} height={16} className="mt-0.5 shrink-0 text-gold-500" />
                <a href={site.emailHref} className="hover:text-gold-300">{site.email}</a>
              </li>
            </ul>
            <a
              href={site.address.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.22em] text-cream-100/60 hover:text-gold-300"
            >
              Get directions <ArrowUpRight width={12} height={12} />
            </a>
          </div>

          {/* Hours + newsletter */}
          <div className="lg:col-span-3">
            <p className="eyebrow text-gold-400">Hours</p>
            <ul className="mt-6 space-y-2.5 text-sm font-light text-cream-100/70">
              {site.hours.map((h) => (
                <li key={h.days} className="flex flex-col">
                  <span className="text-cream-50">{h.days}</span>
                  <span className="text-cream-100/50">{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-10 text-gold-400">The LUXE Letter</p>
            <div className="mt-5">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream-50/10 pt-8 text-[0.6875rem] tracking-wide text-cream-100/40 sm:flex-row sm:items-center">
          <p>© 2026 {site.legalName} All rights reserved.</p>
          <p className="flex items-center gap-2">
            <Diamond width={7} height={7} className="text-gold-500" />
            Michelin Guide 2026 · One Star
          </p>
        </div>
      </div>

      {/* Giant watermark */}
      <div aria-hidden className="pointer-events-none relative select-none overflow-hidden">
        <p className="translate-y-[28%] text-center font-display text-[clamp(6rem,22vw,20rem)] leading-none font-medium tracking-[0.14em] text-stroke-cream">
          LUXE
        </p>
      </div>
    </footer>
  );
}
