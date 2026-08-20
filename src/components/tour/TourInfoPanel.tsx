import type { TourScene } from "@/lib/media/types";

export default function TourInfoPanel({
  scene,
}: {
  scene: TourScene;
}) {
  return (
    <div className="rounded-[24px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
        {scene.eyebrow}
      </p>
      <h2 className="lx-serif mt-2 text-3xl">{scene.name}</h2>
      <p className="mt-3 text-xs leading-6 text-white/55">
        {scene.description}
      </p>

      <div className="mt-4">
        <p className="text-[8px] uppercase tracking-[.12em] text-white/40">
          Interactive points
        </p>
        <div className="mt-2 space-y-2">
          {scene.hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className="rounded-[14px] bg-white/[.06] p-3"
            >
              <p className="text-sm">{hotspot.label}</p>
              <p className="mt-1 text-[10px] text-white/45">{hotspot.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
