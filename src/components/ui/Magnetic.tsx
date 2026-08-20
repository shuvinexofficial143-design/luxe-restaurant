"use client";

import type { ReactNode } from "react";

interface MagneticProps {
  children?: ReactNode;
  className?: string;
  strength?: number;
  disabled?: boolean;
  asChild?: boolean;
  [key: string]: unknown;
}

export default function Magnetic({ children }: MagneticProps) {
  return <>{children}</>;
}
