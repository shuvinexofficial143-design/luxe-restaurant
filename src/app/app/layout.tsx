import type { ReactNode } from "react";
import PWARegistrar from "@/components/pwa/PWARegistrar";

export default function MobileAppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <PWARegistrar />
      {children}
    </>
  );
}
