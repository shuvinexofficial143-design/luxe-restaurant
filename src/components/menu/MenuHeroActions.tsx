import Link from "next/link";

export default function MenuHeroActions() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      <Link href="/menu/favorites" className="shrink-0 rounded-full bg-[#201713] px-4 py-3 text-[9px] uppercase tracking-[.14em] text-white">
        ♥ Favourites
      </Link>
      <Link href="/menu/tasting" className="shrink-0 rounded-full border border-[#4a3025]/10 bg-white/70 px-4 py-3 text-[9px] uppercase tracking-[.14em]">
        7-course tasting
      </Link>
      <Link href="/menu/wine-pairing" className="shrink-0 rounded-full border border-[#4a3025]/10 bg-white/70 px-4 py-3 text-[9px] uppercase tracking-[.14em]">
        Wine pairing
      </Link>
    </div>
  );
}
