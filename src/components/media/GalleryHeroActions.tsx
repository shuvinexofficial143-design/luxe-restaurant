import Link from "next/link";

export default function GalleryHeroActions() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      <Link
        href="/gallery/videos"
        className="shrink-0 rounded-full bg-[#201713] px-4 py-3 text-[9px] uppercase tracking-[.12em] text-white"
      >
        Cinematic reels
      </Link>
      <Link
        href="/tour"
        className="shrink-0 rounded-full bg-[#7c241e] px-4 py-3 text-[9px] uppercase tracking-[.12em] text-white"
      >
        Virtual tour
      </Link>
      <Link
        href="/gallery/favorites"
        className="shrink-0 rounded-full border border-[#4a3025]/10 bg-white/70 px-4 py-3 text-[9px] uppercase tracking-[.12em]"
      >
        Saved moments
      </Link>
    </div>
  );
}
