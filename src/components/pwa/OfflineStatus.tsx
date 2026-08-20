"use client";

import { useEffect, useState } from "react";

export default function OfflineStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const initialStatus = window.setTimeout(() => {
      setOnline(navigator.onLine);
    }, 0);

    const on = () => setOnline(true);
    const off = () => setOnline(false);

    window.addEventListener("online", on);
    window.addEventListener("offline", off);

    return () => {
      window.clearTimeout(initialStatus);
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-[8px] uppercase tracking-[.11em] ${
        online
          ? "bg-[#335f50]/10 text-[#335f50]"
          : "bg-[#7c241e]/10 text-[#7c241e]"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          online ? "animate-pulse bg-[#335f50]" : "bg-[#7c241e]"
        }`}
      />
      {online ? "Online" : "Offline mode"}
    </span>
  );
}
