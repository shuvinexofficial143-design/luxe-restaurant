"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const pages = [
  ["Home", "/", "LUXE overview, signature dishes and experiences"],
  ["Menu", "/menu", "Tasting menu, à la carte, dessert and pairings"],
  ["Reservations", "/reservations", "Request a table and choose your dining experience"],
  ["About", "/about", "Restaurant story, philosophy and milestones"],
  ["Chefs", "/chefs", "Executive chef, pastry chef and sommelier"],
  ["Private Dining", "/private-dining", "Wine room, chef's table and private events"],
  ["Gallery", "/gallery", "Cuisine, interiors, kitchen, people and events"],
  ["Experiences", "/experiences", "Chef's table, seasonal tasting, wine evenings and brunch"],
  ["Journal", "/journal", "Stories from the kitchen, cellar and growers"],
  ["Wine", "/wine", "Cellar philosophy and wine pairings"],
  ["Sustainability", "/sustainability", "Sourcing, seasonality and waste reduction"],
  ["Careers", "/careers", "Kitchen, pastry, wine and front-of-house roles"],
  ["Gift Cards", "/gift-cards", "Digital dining gift cards"],
  ["FAQ", "/faq", "Guest questions before booking"],
  ["Accessibility", "/accessibility", "Access information and inclusive website features"],
  ["Press", "/press", "Editorial coverage and media notes"],
  ["Events", "/events", "Upcoming special dinners and collaborations"],
  ["Location", "/location", "Arrival, parking and local directions"],
  ["Newsletter", "/newsletter", "Dining notes and seasonal updates"],
  ["Contact", "/contact", "Restaurant contact and enquiry form"],
];

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  const closeSearch = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSearch();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeSearch]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pages;

    return pages.filter(([title, , description]) =>
      `${title} ${description}`.toLowerCase().includes(q)
    );
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[220] overflow-y-auto bg-[#120a08]/98 px-5 py-8 text-white backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label="Search LUXE"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-5">
          <p className="lx-serif text-3xl tracking-[.18em]">LUXE</p>
          <button
            type="button"
            onClick={closeSearch}
            className="grid h-12 w-12 place-items-center border border-white/18 text-2xl"
            aria-label="Close search"
          >
            ×
          </button>
        </div>

        <label className="mt-16 block">
          <span className="text-[10px] uppercase tracking-[.32em] text-[#efb36c]">
            Search the restaurant
          </span>
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try menu, wine, careers..."
            className="mt-5 w-full border-b border-white/18 bg-transparent pb-5 lx-serif text-4xl outline-none placeholder:text-white/18 md:text-6xl"
          />
        </label>

        <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {results.length ? (
            results.map(([title, href, description], index) => (
              <Link
                key={href}
                href={href}
                onClick={closeSearch}
                className="group grid gap-3 py-6 md:grid-cols-[70px_220px_1fr_auto] md:items-center"
              >
                <span className="text-[9px] uppercase tracking-[.24em] text-[#efb36c]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="lx-serif text-2xl md:text-3xl">{title}</span>
                <span className="text-sm leading-6 text-white/45">{description}</span>
                <span className="text-2xl text-[#efb36c] transition group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </Link>
            ))
          ) : (
            <p className="py-10 text-sm text-white/45">No matching LUXE page found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
