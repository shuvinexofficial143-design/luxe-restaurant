"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";
import { img, BLUR_DATA_URL } from "@/data/images";
import Button from "@/components/ui/Button";
import { Star } from "@/components/ui/icons";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const D = reduce ? 0 : 1.9; // follow the preloader curtain

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "24%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-svh min-h-[620px] flex-col overflow-hidden bg-ink-950">
      {/* Cinematic backdrop */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 animate-kenburns">
          <Image
            src={img.heroTable}
            alt="A candlelit table at LUXE set for evening service"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        </div>
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-ink-950/55" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink-950/55 via-transparent to-transparent" />

      {/* Main composition */}
      <motion.div style={{ opacity: fade }} className="container-x relative flex flex-1 flex-col justify-end pb-10">
        <motion.p
          className="eyebrow flex items-center gap-4 text-gold-300"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: D + 0.1 }}
        >
          <span aria-hidden className="inline-block h-px w-10 bg-gold-400/70" />
          Mayfair · London — Est. 2012
        </motion.p>

        <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.2rem,9.5vw,8.5rem)] leading-[0.98] font-light tracking-[-0.015em] text-cream-50">
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block will-change-transform"
              initial={reduce ? false : { y: "112%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease: EASE, delay: D + 0.2 }}
            >
              Dining as
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.14em]">
            <motion.span
              className="block will-change-transform italic text-gold-300"
              initial={reduce ? false : { y: "112%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease: EASE, delay: D + 0.34 }}
            >
              an art form.
            </motion.span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            className="max-w-md text-base leading-relaxed font-light text-cream-100/80 sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: D + 0.55 }}
          >
            One Michelin star. Twelve tables. A tasting menu written each dawn
            and cooked over open fire in the heart of Berkeley Square.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: D + 0.7 }}
          >
            <Button href="/reservations" variant="gold" arrow>
              Reserve a Table
            </Button>
            <Button href="/menu" variant="outline">
              Explore the Menu
            </Button>
          </motion.div>
        </div>

        {/* Bottom info strip */}
        <motion.div
          className="mt-12 hidden grid-cols-3 gap-6 border-t border-cream-50/15 pt-5 text-[0.6875rem] uppercase tracking-[0.24em] text-cream-100/60 sm:grid"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: D + 0.9 }}
        >
          <p>Tue — Sun · From 17:30</p>
          <p className="text-center">12 Berkeley Square, Mayfair</p>
          <p className="flex items-center justify-end gap-2">
            <Star width={11} height={11} className="text-gold-400" /> Michelin Guide 2026
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        className="absolute right-6 bottom-28 hidden flex-col items-center gap-4 md:flex lg:right-10"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: D + 1.1 }}
      >
        <span className="writing-vertical text-[0.625rem] uppercase tracking-[0.35em] text-cream-100/60">
          Scroll
        </span>
        <span className="relative h-16 w-px overflow-hidden bg-cream-50/20">
          <motion.span
            className="absolute left-0 top-0 h-6 w-px bg-gold-400"
            animate={reduce ? {} : { y: [-24, 64] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
