"use client";

import type { ReactNode } from "react";

interface SmoothScrollProps {
  children?: ReactNode;
  [key: string]: unknown;
}

type ScrollTarget = string | number | HTMLElement;

interface LenisCompat {
  scrollTo: (
    target: ScrollTarget,
    options?: {
      offset?: number;
      immediate?: boolean;
      duration?: number;
      [key: string]: unknown;
    }
  ) => void;
  stop: () => void;
  start: () => void;
}

export function useLenis(): LenisCompat {
  return {
    scrollTo(target, options = {}) {
      const offset = typeof options.offset === "number" ? options.offset : 0;
      const behavior: ScrollBehavior = options.immediate ? "auto" : "smooth";

      if (typeof target === "number") {
        window.scrollTo({ top: target + offset, behavior });
        return;
      }

      const element =
        typeof target === "string"
          ? document.querySelector<HTMLElement>(target)
          : target;

      if (!element) return;

      const top = element.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior });
    },

    stop() {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    },

    start() {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    },
  };
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return <>{children}</>;
}
