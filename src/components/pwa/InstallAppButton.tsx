"use client";

import { useEffect, useState } from "react";
import { isStandaloneMode } from "@/lib/pwa/utils";

type InstallPromptEvent = Event & {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function InstallAppButton() {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initialModeCheck = window.setTimeout(() => {
      setInstalled(isStandaloneMode());
    }, 0);

    function beforeInstall(event: Event) {
      event.preventDefault();
      setPromptEvent(event as InstallPromptEvent);
    }

    function appInstalled() {
      setInstalled(true);
      setPromptEvent(null);
      setMessage("LUXE is installed.");
    }

    window.addEventListener("beforeinstallprompt", beforeInstall);
    window.addEventListener("appinstalled", appInstalled);

    return () => {
      window.clearTimeout(initialModeCheck);
      window.removeEventListener("beforeinstallprompt", beforeInstall);
      window.removeEventListener("appinstalled", appInstalled);
    };
  }, []);

  async function install() {
    if (!promptEvent) {
      setMessage(
        "Install prompt is not available yet. Open this site in a supported browser over HTTPS, then try again."
      );
      return;
    }

    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;

    if (choice.outcome === "accepted") {
      setInstalled(true);
      setMessage("Install accepted.");
    } else {
      setMessage("Install dismissed.");
    }

    setPromptEvent(null);
  }

  return (
    <div>
      <button
        type="button"
        onClick={install}
        disabled={installed}
        className="h-13 w-full rounded-[18px] bg-[#7c241e] text-[9px] uppercase tracking-[.13em] text-white disabled:opacity-50"
      >
        {installed ? "App installed ✓" : "Install LUXE app"}
      </button>

      {message ? (
        <p className="mt-3 text-[9px] leading-5 text-[#75645d]">{message}</p>
      ) : null}
    </div>
  );
}
