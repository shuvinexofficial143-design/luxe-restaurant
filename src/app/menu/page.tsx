import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import MenuClient from "@/components/menu/MenuClient";
import { dishes } from "@/lib/menu/data";

export const metadata = {
  title: "Menu · LUXE",
};

const quick = [
  ["Chef Choice", "/menu/chef-choice"],
  ["Vegetarian", "/menu/vegetarian"],
  ["Vegan", "/menu/vegan"],
  ["Gluten Free", "/menu/gluten-free"],
  ["Tasting", "/menu/tasting"],
  ["Wine Pairing", "/menu/wine-pairing"],
];

export default function MenuPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-5 md:px-5 md:pt-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-4 rounded-[24px] border border-[#e7c58f]/10 bg-[#0d0b08] p-4 md:grid-cols-[1fr_auto] md:items-end md:p-6">
            <div>
              <p className="text-[10px] uppercase tracking-[.18em] text-[#c9944b]">LUXE menu</p>
              <h1 className="lx-serif mt-1 text-4xl leading-[.9] text-[#f1e3d0] md:text-6xl">Pick a plate.<br /><span className="italic text-[#d5a05a]">Build your evening.</span></h1>
              <p className="mt-3 max-w-xl text-[13px] leading-6 text-white/54 md:text-sm">Browse compact dish cards, filter by preference and open each item for full details.</p>
            </div>
            <div className="rounded-[18px] border border-[#e7c58f]/10 bg-white/[.02] px-4 py-3 text-right">
              <p className="lx-serif text-3xl text-[#d7a762]">{dishes.length}</p>
              <p className="text-[9px] uppercase tracking-[.12em] text-white/46">dishes available</p>
            </div>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {quick.map(([label, href]) => (
              <Link key={href} href={href} className="shrink-0 rounded-full border border-[#e7c58f]/10 bg-white/[.02] px-3 py-2 text-[10px] uppercase tracking-[.1em] text-white/38">
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-3 py-5 md:px-5 md:py-8">
        <div className="mx-auto max-w-[1240px]">
          <MenuClient dishes={dishes} />
        </div>
      </section>
    </LuxeShell>
  );
}
