"use client";

import { PointerEvent, useState } from "react";
import type { TourScene } from "@/lib/media/types";
import TourHotspot from "./TourHotspot";

export default function PanoramaViewer({
  scene,
}: {
  scene: TourScene;
}) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startPosition, setStartPosition] = useState(50);

  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    setDragging(true);
    setStartX(event.clientX);
    setStartPosition(position);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragging) return;

    const delta = event.clientX - startX;
    const next = Math.max(0, Math.min(100, startPosition - delta * 0.12));
    setPosition(next);
  }

  function pointerUp(event: PointerEvent<HTMLDivElement>) {
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div>
      <div
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={() => setDragging(false)}
        className={`relative h-[68dvh] min-h-[520px] select-none overflow-hidden rounded-[28px] bg-[#201713] ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ touchAction: "pan-y" }}
      >
        <div
          className="absolute inset-0 scale-[1.14] bg-cover"
          style={{
            backgroundImage: `url("${scene.image}")`,
            backgroundPosition: `${position}% center`,
          }}
        />

        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/48 to-transparent p-4 text-white">
          <p className="text-[8px] uppercase tracking-[.14em] text-white/60">
            Drag left / right · 360 foundation
          </p>
          <h1 className="lx-serif mt-1 text-3xl">{scene.name}</h1>
        </div>

        {scene.hotspots.map((hotspot) => (
          <TourHotspot key={hotspot.id} hotspot={hotspot} />
        ))}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-[8px] uppercase tracking-[.12em] text-white">
          ← drag to look around →
        </div>
      </div>

      <p className="mt-3 text-[10px] leading-5 text-[#8a756b]">
        This is an interactive virtual-tour foundation using panoramic movement over demo photography. Real equirectangular 360° restaurant captures can replace these images later.
      </p>
    </div>
  );
}
