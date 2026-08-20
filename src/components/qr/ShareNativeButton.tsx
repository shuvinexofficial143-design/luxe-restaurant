"use client";

import { useState } from "react";

export default function ShareNativeButton({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [message, setMessage] = useState("");

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: `Open ${title} on LUXE`,
          url,
        });
        setMessage("Share sheet opened.");
        return;
      }

      await navigator.clipboard.writeText(url);
      setMessage("Link copied.");
    } catch {
      setMessage("Share cancelled.");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={share}
        className="h-12 w-full rounded-[16px] bg-[#201713] text-[9px] uppercase tracking-[.12em] text-white"
      >
        Share link ↗
      </button>
      {message ? (
        <p className="mt-2 text-center text-[9px] text-[#75645d]">
          {message}
        </p>
      ) : null}
    </div>
  );
}
