"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, EASE_INOUT } from "@/lib/motion";
import { site } from "@/data/site";
import { useLenis } from "./SmoothScroll";
import { ArrowUpRight } from "../ui/icons";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  const links = [{ label: "Home", href: "/" }, ...site.nav, { label: "Reservations", href: "/reservations" }];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          className="fixed inset-0 z-[70] flex flex-col bg-ink-950 lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.65, ease: EASE_INOUT }}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              background:
                "radial-gradient(60% 50% at 80% 10%, rgba(107,42,55,0.5) 0%, transparent 70%), radial-gradient(50% 40% at 10% 90%, rgba(198,161,91,0.18) 0%, transparent 70%)",
            }}
          />
          <nav
            aria-label="Mobile"
            className="relative flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-7 pt-24 pb-8"
            data-lenis-prevent
          >
            {links.map((item, i) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.12 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-baseline gap-4 border-b border-cream-50/8 py-3 ${
                      active ? "text-gold-300" : "text-cream-50"
                    }`}
                  >
                    <span className="w-7 text-[0.625rem] tracking-[0.2em] text-cream-100/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(1.7rem,7vw,2.6rem)] font-light leading-tight transition-transform duration-500 group-hover:translate-x-2 group-hover:italic">
                      {item.label}
                    </span>
                    <ArrowUpRight
                      width={18}
                      height={18}
                      className="ml-auto self-center text-cream-100/30 transition-all duration-500 group-hover:text-gold-300"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>
          <motion.div
            className="relative border-t border-cream-50/10 px-7 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-cream-100/60">
              <div>
                <p className="eyebrow text-gold-400">Reservations</p>
                <a href={site.phoneHref} className="mt-2 block text-sm text-cream-50">
                  {site.phone}
                </a>
              </div>
              <div className="flex gap-5">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-line text-[0.6875rem] uppercase tracking-[0.2em] text-cream-100/70"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
