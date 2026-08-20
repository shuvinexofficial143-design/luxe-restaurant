import Link from "next/link";
import ShareExperience from "./ShareExperience";

export default function SocialShareCard() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <ShareExperience />

      <div className="rounded-[24px] bg-[#7c241e] p-5 text-white">
        <p className="text-[9px] uppercase tracking-[.14em] text-[#ffd19a]">
          Guest voice
        </p>
        <h2 className="lx-serif mt-2 text-3xl">Leave your own review.</h2>
        <p className="mt-3 text-xs leading-6 text-white/55">
          Rate the experience, add a title and save your review into the demo feed.
        </p>
        <Link
          href="/reviews/write"
          className="mt-5 inline-flex rounded-full bg-white px-4 py-3 text-[9px] uppercase tracking-[.12em] text-[#7c241e]"
        >
          Write review ↗
        </Link>
      </div>
    </div>
  );
}
