import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import GalleryClient from "@/components/media/GalleryClient";
import GalleryHeroActions from "@/components/media/GalleryHeroActions";
import MediaStats from "@/components/media/MediaStats";
import CinematicVideoRail from "@/components/media/CinematicVideoRail";
import { galleryItems, videoItems } from "@/lib/media/data";

export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Inside LUXE"
        title="Gallery"
        text="Food, rooms, wine, people and events — now searchable, filterable, saveable and fully clickable."
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="px-3 py-6 md:px-5 md:py-10">
        <div className="mx-auto max-w-[1180px]">
          <MediaStats items={galleryItems} />
          <div className="mt-4">
            <GalleryHeroActions />
          </div>

          <div className="mt-8">
            <p className="lx-kicker">Cinematic reels</p>
            <h2 className="lx-serif mt-2 text-4xl">See it move.</h2>
            <div className="mt-4">
              <CinematicVideoRail videos={videoItems} />
            </div>
          </div>

          <div className="mt-10">
            <p className="lx-kicker">Photography</p>
            <h2 className="lx-serif mt-2 text-4xl">Every corner.</h2>
            <div className="mt-5">
              <GalleryClient items={galleryItems} />
            </div>
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
