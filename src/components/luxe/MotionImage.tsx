"use client";

import { useEffect, useRef } from "react";

export default function MotionImage({
  image,
  className = "",
  overlay = false,
}: {
  image: string;
  className?: string;
  overlay?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const center = rect.top + rect.height / 2;
      const delta = (center - viewport / 2) / viewport;
      el.style.setProperty("--lx-parallax", `${Math.max(-18, Math.min(18, delta * -24))}px`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={`lx-motion-image relative overflow-hidden ${className}`}>
      <div
        className="absolute -inset-y-6 inset-x-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${image}")`,
          transform: "translate3d(0,var(--lx-parallax,0px),0) scale(1.05)",
        }}
      />
      {overlay ? <div className="absolute inset-0 bg-black/20" /> : null}
    </div>
  );
}
