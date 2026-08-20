import type { Variants } from "framer-motion";

/** Signature LUXE easing — soft, expensive deceleration */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
/** Symmetrical ease used for curtains / reveals */
export const EASE_INOUT: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 1, ease: "easeOut", delay },
  }),
};

export const staggerParent: Variants = {
  hidden: {},
  visible: (stagger: number = 0.08) => ({
    transition: { staggerChildren: stagger },
  }),
};
