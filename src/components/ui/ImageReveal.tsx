"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE_INOUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { BLUR_DATA_URL } from "@/data/images";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Parallax travel in px (image container is oversized to compensate) */
  parallax?: number;
  /** Clip reveal from bottom on first scroll into view */
  reveal?: boolean;
  delay?: number;
  hoverZoom?: boolean;
}

export default function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
  parallax = 0,
  reveal = true,
  delay = 0,
  hoverZoom = false,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);

  const useParallax = parallax > 0 && !reduce;

  return (
    <div ref={ref} className={cn("group/img relative overflow-hidden bg-ink-800", className)}>
      <motion.div
        className="absolute inset-0"
        initial={reveal && !reduce ? { clipPath: "inset(100% 0% 0% 0%)" } : false}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 1.2, ease: EASE_INOUT, delay }}
      >
        <motion.div
          className="absolute inset-x-0"
          style={
            useParallax
              ? { top: -parallax, bottom: -parallax, y }
              : { top: 0, bottom: 0 }
          }
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className={cn(
              "object-cover",
              hoverZoom &&
                "transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/img:scale-[1.06]",
              imgClassName
            )}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
