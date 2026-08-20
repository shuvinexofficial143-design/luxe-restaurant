"use client";

import { useEffect, useState } from "react";
import { isStandaloneMode } from "@/lib/pwa/utils";
import OfflineStatus from "./OfflineStatus";
import InstallAppButton from "./InstallAppButton";

export default function PWAStatusCard() {
  const [standalone, setStandalone] = useState(false);
  const [workerReady, setWorkerReady] = useState(false);

  useEffect(() => {
    const initialModeCheck = window.setTimeout(() => {
      setStandalone(isStandaloneMode());
    }, 0);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then(() => setWorkerReady(true))
        .catch(() => setWorkerReady(false));
    }

    return () => window.clearTimeout(initialModeCheck);
  }, []);

  return (
    <div className="rounded-[28px] bg-[#fffaf4] p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="lx-kicker">Mobile app mode</p>
          <h2 className="lx-serif mt-2 text-3xl">LUXE in your pocket.</h2>
        </div>
        <OfflineStatus />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-[16px] bg-[#f3e7dc] p-3">
          <p className="lx-serif text-2xl text-[#7c241e]">
            {workerReady ? "Ready" : "Loading"}
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">
            offline worker
          </p>
        </div>
        <div className="rounded-[16px] bg-[#f3e7dc] p-3">
          <p className="lx-serif text-2xl text-[#7c241e]">
            {standalone ? "App" : "Browser"}
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">
            display mode
          </p>
        </div>
      </div>

      <div className="mt-4">
        <InstallAppButton />
      </div>
    </div>
  );
}
