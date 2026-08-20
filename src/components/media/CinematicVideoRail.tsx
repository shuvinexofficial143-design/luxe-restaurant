import type { VideoItem } from "@/lib/media/types";
import CinematicVideoCard from "./CinematicVideoCard";

export default function CinematicVideoRail({
  videos,
}: {
  videos: VideoItem[];
}) {
  return (
    <div className="-mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 md:mx-0 md:grid md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {videos.map((video) => (
        <div
          key={video.id}
          className="w-[86vw] max-w-[460px] shrink-0 snap-center md:w-auto"
        >
          <CinematicVideoCard video={video} />
        </div>
      ))}
    </div>
  );
}
