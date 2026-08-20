"use client";

import Link from "next/link";
import { MouseEvent, ReactNode, useRef } from "react";

export default function MagneticButton({
  href,
  children,
  dark = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function move(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function leave() {
    if (ref.current) {
      ref.current.style.transform = "translate3d(0,0,0)";
    }
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`${dark ? "lx-button lx-button--dark" : "lx-button"} ${className}`}
      style={{ transition: "transform .22s ease, background .3s ease, color .3s ease, border-color .3s ease" }}
    >
      {children}
    </Link>
  );
}
