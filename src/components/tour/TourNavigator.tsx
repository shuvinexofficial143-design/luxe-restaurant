import Link from "next/link";
import type { TourScene } from "@/lib/media/types";

export default function TourNavigator({
  scene,
}: {
  scene: TourScene;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {scene.previousSlug ? (
        <Link
          href={`/tour/${scene.previousSlug}`}
          className="flex min-h-12 items-center justify-center rounded-[16px] border border-[#4a3025]/10 bg-[#fffaf4] text-[9px] uppercase tracking-[.12em]"
        >
          ← Previous
        </Link>
      ) : (
        <Link
          href="/tour"
          className="flex min-h-12 items-center justify-center rounded-[16px] border border-[#4a3025]/10 bg-[#fffaf4] text-[9px] uppercase tracking-[.12em]"
        >
          ← Tour home
        </Link>
      )}

      {scene.nextSlug ? (
        <Link
          href={`/tour/${scene.nextSlug}`}
          className="flex min-h-12 items-center justify-center rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white"
        >
          Next scene →
        </Link>
      ) : (
        <Link
          href="/reservations"
          className="flex min-h-12 items-center justify-center rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white"
        >
          Reserve a table →
        </Link>
      )}
    </div>
  );
}
