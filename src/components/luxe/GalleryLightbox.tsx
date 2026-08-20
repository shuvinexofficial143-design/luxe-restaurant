"use client";

import { useEffect, useMemo, useState } from "react";

type GalleryItem = {
  category: string;
  image: string;
};

export default function GalleryLightbox({
  items,
  filters,
}: {
  items: GalleryItem[];
  filters: string[];
}) {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);

  const visible = useMemo(
    () => items.filter((item) => active === "All" || item.category === active),
    [active, items]
  );

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") setSelected((v) => (v === null ? null : (v + 1) % visible.length));
      if (e.key === "ArrowLeft") setSelected((v) => (v === null ? null : (v - 1 + visible.length) % visible.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, visible.length]);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => {
              setActive(filter);
              setSelected(null);
            }}
            className={`lx-button lx-button--dark min-h-10 px-4 ${
              active === filter ? "border-[#5e1717] bg-[#5e1717] text-white" : ""
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {visible.map((item, i) => (
          <button
            key={`${item.image}-${i}`}
            type="button"
            onClick={() => setSelected(i)}
            className="group relative mb-5 block w-full break-inside-avoid overflow-hidden text-left"
            aria-label={`Open ${item.category} image`}
          >
            <div
              className={`bg-cover bg-center transition duration-700 group-hover:scale-[1.045] ${
                i % 3 === 0 ? "h-[570px]" : i % 2 ? "h-[390px]" : "h-[470px]"
              }`}
              style={{ backgroundImage: `url("${item.image}")` }}
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20 text-[10px] uppercase tracking-[.25em] text-white">
              {item.category} <span className="float-right">Open ↗</span>
            </span>
          </button>
        ))}
      </div>

      {selected !== null && visible[selected] ? (
        <div
          className="fixed inset-0 z-[200] grid place-items-center bg-[#0b0605]/95 p-4 backdrop-blur-lg"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="absolute right-5 top-5 grid h-12 w-12 place-items-center border border-white/20 text-2xl text-white"
            aria-label="Close image"
          >
            ×
          </button>

          <button
            type="button"
            onClick={() => setSelected((selected - 1 + visible.length) % visible.length)}
            className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/15 text-2xl text-white md:left-8"
            aria-label="Previous image"
          >
            ←
          </button>

          <div className="w-full max-w-6xl">
            <div
              className="h-[72vh] bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url("${visible[selected].image}")` }}
            />
            <div className="mt-4 flex items-center justify-between text-white">
              <span className="text-[10px] uppercase tracking-[.26em] text-[#efb36c]">
                {visible[selected].category}
              </span>
              <span className="text-[10px] uppercase tracking-[.2em] text-white/40">
                {selected + 1} / {visible.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelected((selected + 1) % visible.length)}
            className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/15 text-2xl text-white md:right-8"
            aria-label="Next image"
          >
            →
          </button>
        </div>
      ) : null}
    </>
  );
}
