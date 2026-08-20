import Link from "next/link";
import type { TourScene } from "@/lib/media/types";

export default function TourSceneCard({
  scene,
  index,
}: {
  scene: TourScene;
  index: number;
}) {
  return (
    <Link
      href={`/tour/${scene.slug}`}
      className="group overflow-hidden rounded-[26px] bg-[#fffaf4]"
    >
      <div className="relative h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-[1.04]"
          style={{ backgroundImage: `url("${scene.preview}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-2 text-[8px] uppercase tracking-[.12em] text-[#7c241e]">
          0{index + 1}
        </span>
        <p className="absolute bottom-4 left-4 lx-serif text-3xl text-white">
          {scene.name}
        </p>
      </div>

      <div className="p-4">
        <p className="text-xs leading-6 text-[#75645d]">
          {scene.description}
        </p>
        <span className="mt-3 inline-flex text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
          Enter scene ↗
        </span>
      </div>
    </Link>
  );
}
