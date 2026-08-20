"use client";

import { useState } from "react";

export type AccordionItem = {
  question: string;
  answer: string;
};

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#5b3429]/16 border-y border-[#5b3429]/16">
      {items.map((item, index) => {
        const active = open === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={active}
              onClick={() => setOpen(active ? null : index)}
              className="grid w-full grid-cols-[1fr_auto] items-center gap-6 py-7 text-left"
            >
              <span className="lx-serif text-2xl md:text-3xl">{item.question}</span>
              <span className={`text-2xl text-[#8d3a25] transition-transform duration-300 ${active ? "rotate-45" : ""}`}>
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ${
                active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-7 text-sm leading-7 text-[#645149]">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
