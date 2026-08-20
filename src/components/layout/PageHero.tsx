"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import AnimatedText from "../ui/AnimatedText";
import Reveal from "../ui/Reveal";
import { cn } from "@/lib/utils";
import { BLUR_DATA_URL } from "@/data/images";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string;
  image: string;
  imageAlt: string;
  compact?: boolean;
  children?: ReactNode;
}

/** Shared cinematic hero for interior pages */
export default function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  image,
  imageAlt,
  compact = false,
  children,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  return (
    <section
      ref={ref}
      className={cn(
        "relative flex items-end overflow-hidden bg-ink-950",
        compact ? "min-h-[58svh] pb-14" : "min-h-[76svh] pb-16 lg:pb-20"
      )}
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="scale-105 object-cover"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/55" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink-950/45 to-transparent" />

      <motion.div style={{ opacity }} className="container-x relative">
        <Reveal y={14}>
          <p className="eyebrow flex items-center gap-4 text-gold-400">
            <span aria-hidden className="inline-block h-px w-10 bg-gold-400/60" />
            {eyebrow}
          </p>
        </Reveal>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,7.5vw,6.25rem)] leading-[1.0] font-light tracking-[-0.01em] text-cream-50">
          <AnimatedText text={title} delay={0.1} />
          {titleAccent && (
            <>
              {" "}
              <em className="font-normal text-gold-300">
                <AnimatedText text={titleAccent} delay={0.3} />
              </em>
            </>
          )}
        </h1>
        {description && (
          <Reveal delay={0.35}>
            <p className="mt-6 max-w-xl text-base leading-relaxed font-light text-cream-100/75 sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}
        {children && <Reveal delay={0.45}>{children}</Reveal>}
      </motion.div>
    </section>
  );
}
