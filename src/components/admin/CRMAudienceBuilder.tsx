"use client";

import { useState } from "react";
import type { CRMSegment } from "@/lib/server/crm/types";

const segments: CRMSegment[] = [
  "NEW",
  "REGULAR",
  "LOYAL",
  "VIP",
  "AT_RISK",
  "DORMANT",
];

export default function CRMAudienceBuilder() {
  const [selected, setSelected] = useState<CRMSegment[]>(["VIP"]);
  const [minScore, setMinScore] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [channel, setChannel] = useState<"EMAIL" | "WHATSAPP">("EMAIL");
  const [count, setCount] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  function toggle(segment: CRMSegment) {
    setSelected((current) =>
      current.includes(segment)
        ? current.filter((item) => item !== segment)
        : [...current, segment]
    );
  }

  async function preview() {
    setMessage("");

    const response = await fetch("/api/v1/crm/audiences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        segments: selected,
        minVipScore: minScore,
        minLifetimeValue: minValue,
        preferredChannel: channel,
        excludeDoNotContact: true,
      }),
    });

    const payload = (await response.json()) as {
      ok?: boolean;
      data?: { count?: number };
      error?: { message?: string };
    };

    if (!response.ok || !payload.ok) {
      setMessage(
        payload.error?.message || "Audience preview failed."
      );
      return;
    }

    setCount(payload.data?.count || 0);
  }

  return (
    <div className="rounded-[28px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Audience builder</p>
      <h2 className="lx-serif mt-2 text-3xl">
        Build a guest segment.
      </h2>

      <div className="mt-4 flex flex-wrap gap-2">
        {segments.map((segment) => (
          <button
            key={segment}
            type="button"
            onClick={() => toggle(segment)}
            className={`rounded-full px-3 py-2 text-[8px] ${
              selected.includes(segment)
                ? "bg-[#201713] text-white"
                : "border border-[#4a3025]/10 bg-white"
            }`}
          >
            {segment.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <label className="grid gap-1 text-[8px] uppercase tracking-[.08em] text-[#75645d]">
          Min VIP
          <input
            type="number"
            min="0"
            max="100"
            value={minScore}
            onChange={(event) =>
              setMinScore(Number(event.target.value))
            }
            className="h-10 rounded-[12px] border border-[#4a3025]/10 px-2 text-sm"
          />
        </label>
        <label className="grid gap-1 text-[8px] uppercase tracking-[.08em] text-[#75645d]">
          Min value
          <input
            type="number"
            min="0"
            value={minValue}
            onChange={(event) =>
              setMinValue(Number(event.target.value))
            }
            className="h-10 rounded-[12px] border border-[#4a3025]/10 px-2 text-sm"
          />
        </label>
        <label className="grid gap-1 text-[8px] uppercase tracking-[.08em] text-[#75645d]">
          Channel
          <select
            value={channel}
            onChange={(event) =>
              setChannel(
                event.target.value as "EMAIL" | "WHATSAPP"
              )
            }
            className="h-10 rounded-[12px] border border-[#4a3025]/10 px-2 text-sm"
          >
            <option>EMAIL</option>
            <option>WHATSAPP</option>
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={() => void preview()}
        className="mt-4 h-11 w-full rounded-[14px] bg-[#335f50] text-[8px] uppercase tracking-[.11em] text-white"
      >
        Preview audience
      </button>

      {count !== null ? (
        <div className="mt-4 rounded-[16px] bg-[#f3e7dc] p-4">
          <p className="lx-serif text-3xl text-[#7c241e]">{count}</p>
          <p className="mt-1 text-[8px] uppercase tracking-[.09em] text-[#75645d]">
            matching contactable customers
          </p>
        </div>
      ) : null}

      {message ? (
        <p className="mt-3 text-[9px] text-[#7c241e]">{message}</p>
      ) : null}
    </div>
  );
}
