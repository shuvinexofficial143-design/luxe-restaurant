import Link from "next/link";
import { tourScenes } from "@/lib/media/data";
import TourSceneGrid from "./TourSceneGrid";

export default function VirtualTourHome() {
  return (
    <div>
      <div className="overflow-hidden rounded-[30px] bg-[#201713] text-white md:grid md:grid-cols-[1fr_.8fr]">
        <div
          className="min-h-[58dvh] bg-cover bg-center"
          style={{ backgroundImage: `url("${tourScenes[0].preview}")` }}
        />
        <div className="p-6 md:flex md:items-center md:p-9">
          <div>
            <p className="text-[9px] uppercase tracking-[.16em] text-[#efc28b]">
              Virtual restaurant tour
            </p>
            <h1 className="lx-serif mt-3 text-5xl md:text-7xl">
              Walk through LUXE.
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/55">
              Move through four interactive scenes, drag to look around and tap hotspots for room details.
            </p>

            <Link
              href="/tour/entrance"
              className="mt-6 inline-flex rounded-full bg-[#7c241e] px-5 py-3 text-[9px] uppercase tracking-[.13em] text-white"
            >
              Start tour ↗
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <p className="lx-kicker">Four scenes</p>
        <h2 className="lx-serif mt-2 text-4xl">Choose where to go.</h2>
        <div className="mt-5">
          <TourSceneGrid scenes={tourScenes} />
        </div>
      </div>
    </div>
  );
}
