"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./icons";
import Magnetic from "./Magnetic";

type Variant = "primary" | "gold" | "outline" | "outline-ink" | "ghost";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

const base =
  "group relative inline-flex items-center justify-center overflow-hidden px-8 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.32em] transition-colors duration-500";

const variants: Record<Variant, { box: string; layer: string }> = {
  primary: {
    box: "bg-wine-600 text-cream-50",
    layer: "bg-ink-950",
  },
  gold: {
    box: "bg-gold-500 text-ink-950",
    layer: "bg-cream-50",
  },
  outline: {
    box: "border border-cream-50/40 text-cream-50 hover:border-cream-50",
    layer: "bg-cream-50 group-hover:text-ink-950",
  },
  "outline-ink": {
    box: "border border-ink-900/30 text-ink-900 hover:border-ink-900",
    layer: "bg-ink-950 group-hover:text-cream-50",
  },
  ghost: {
    box: "text-current",
    layer: "",
  },
};

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  arrow = false,
  magnetic = true,
  className,
  disabled,
  ariaLabel,
}: ButtonProps) {
  const v = variants[variant];
  const isGhost = variant === "ghost";

  const inner = (
    <>
      {!isGhost && (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0",
            v.layer
          )}
        />
      )}
      <span
        className={cn(
          "relative z-10 inline-flex items-center gap-3 transition-colors duration-500",
          variant === "outline" && "group-hover:text-ink-950",
          variant === "outline-ink" && "group-hover:text-cream-50",
          isGhost && "link-line"
        )}
      >
        <span>{children}</span>
        {arrow && (
          <ArrowRight
            width={14}
            height={14}
            className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
          />
        )}
      </span>
    </>
  );

  const classes = cn(base, v.box, disabled && "pointer-events-none opacity-50", className);

  const el = href ? (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {inner}
    </Link>
  ) : (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} aria-label={ariaLabel}>
      {inner}
    </button>
  );

  return magnetic ? <Magnetic strength={0.22}>{el}</Magnetic> : el;
}
