"use client";

import { useState } from "react";

export default function DatabaseSaveDishButton({
  dishSlug,
  dishTitle,
  imageUrl,
}: {
  dishSlug: string;
  dishTitle: string;
  imageUrl?: string;
}) {
  const [message, setMessage] = useState("");

  async function save() {
    try {
      const response = await fetch("/api/v1/account/saved-dishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dishSlug,
          dishTitle,
          imageUrl: imageUrl || "",
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        data?: { alreadySaved?: boolean };
        error?: { message?: string };
      };

      setMessage(
        response.ok && payload.ok
          ? payload.data?.alreadySaved
            ? "Already saved."
            : "Saved to your account."
          : payload.error?.message || "Sign in to save this dish."
      );
    } catch {
      setMessage("Dish could not be saved.");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => void save()}
        className="rounded-full border border-[#4a3025]/10 bg-white px-4 py-3 text-[8px] uppercase tracking-[.11em]"
      >
        Save to account ♡
      </button>
      {message ? (
        <p className="mt-2 text-[9px] text-[#75645d]">{message}</p>
      ) : null}
    </div>
  );
}
