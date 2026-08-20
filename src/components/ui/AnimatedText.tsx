"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createElement } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  mode?: "words" | "chars";
}

/**
 * Masked word/character reveal — the signature LUXE typography animation.
 */
export default function AnimatedText({
  text,
  as = "span",
  className,
  delay = 0,
  stagger = 0.045,
  once = true,
  mode = "words",
}: AnimatedTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return createElement(as, { className }, text);
  }

  let index = 0;

  return createElement(
    as,
    { className: cn(className), "aria-label": text },
    words.map((word, wi) => {
      const units =
        mode === "chars"
          ? word.split("").map((c) => {
              const i = index++;
              return (
                <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
                  <motion.span
                    className="inline-block will-change-transform"
                    initial={{ y: "115%", rotate: 4 }}
                    whileInView={{ y: "0%", rotate: 0 }}
                    viewport={{ once, margin: "-8% 0px" }}
                    transition={{ duration: 0.8, ease: EASE, delay: delay + i * stagger }}
                  >
                    {c}
                  </motion.span>
                </span>
              );
            })
          : (() => {
              const i = index++;
              return [
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
                  aria-hidden
                >
                  <motion.span
                    className="inline-block will-change-transform"
                    initial={{ y: "115%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once, margin: "-8% 0px" }}
                    transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
                  >
                    {word}
                  </motion.span>
                </span>,
              ];
            })();

      return (
        <span key={wi} className="inline">
          {units}
          {wi < words.length - 1 && <span aria-hidden> </span>}
        </span>
      );
    })
  );
}
