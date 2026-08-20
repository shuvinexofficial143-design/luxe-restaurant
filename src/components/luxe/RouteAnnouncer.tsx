"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RouteAnnouncer() {
  const pathname = usePathname();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const id = window.setTimeout(() => {
      setMessage(`Navigated to ${document.title || "LUXE"}`);
    }, 60);
    const clear = window.setTimeout(() => setMessage(""), 1500);
    return () => {
      window.clearTimeout(id);
      window.clearTimeout(clear);
    };
  }, [pathname]);

  return (
    <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  );
}
