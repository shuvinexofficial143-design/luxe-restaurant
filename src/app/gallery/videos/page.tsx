import LuxeShell from "@/components/luxe/LuxeShell";
import CinematicVideoRail from "@/components/media/CinematicVideoRail";
import { videoItems } from "@/lib/media/data";

export const metadata = { title: "Cinematic Reels" };

export default function GalleryVideosPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1180px]">
          <p className="lx-kicker">Motion</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Cinematic reels.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75645d]">
            Short demo reels for atmosphere, kitchen and cellar. Video sources are external demo media and can later be replaced with real restaurant footage.
          </p>

          <div className="mt-7">
            <CinematicVideoRail videos={videoItems} />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
