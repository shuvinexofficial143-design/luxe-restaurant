"use client";

import { useEffect, useState } from "react";

export default function PublicCMSStatus() {
  const [counts, setCounts] = useState({
    menu: 0,
    journal: 0,
    events: 0,
  });
  const [message, setMessage] = useState("Checking published CMS…");

  useEffect(() => {
    Promise.all([
      fetch("/api/v1/public/content?collection=menu&locale=en", {
        cache: "no-store",
      }),
      fetch("/api/v1/public/content?collection=journal&locale=en", {
        cache: "no-store",
      }),
      fetch("/api/v1/public/content?collection=events&locale=en", {
        cache: "no-store",
      }),
    ])
      .then(async ([m, j, e]) => {
        const menu = (await m.json()) as { data?: { items?: unknown[] } };
        const journal = (await j.json()) as { data?: { items?: unknown[] } };
        const events = (await e.json()) as { data?: { items?: unknown[] } };

        setCounts({
          menu: menu.data?.items?.length || 0,
          journal: journal.data?.items?.length || 0,
          events: events.data?.items?.length || 0,
        });
        setMessage("");
      })
      .catch(() => setMessage("Public CMS API unavailable."));
  }, []);

  return (
    <div className="rounded-[24px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#efc28b]">
        Public CMS
      </p>

      {message ? (
        <p className="mt-3 text-xs text-white/45">{message}</p>
      ) : (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            [counts.menu, "menu"],
            [counts.journal, "journal"],
            [counts.events, "events"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[15px] bg-white/[.06] p-3">
              <p className="lx-serif text-3xl text-[#efc28b]">{value}</p>
              <p className="text-[8px] text-white/40">{label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
