"use client";

import { useState } from "react";
import type { VideoItem } from "@/lib/media/types";

export default function CinematicVideoCard({
  video,
}: {
  video: VideoItem;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="overflow-hidden rounded-[26px] bg-[#201713] text-white">
      <div className="relative aspect-[9/14] overflow-hidden sm:aspect-video">
        {playing ? (
          <video
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${video.poster}")` }}
            />
            <div className="absolute inset-0 bg-black/20" />
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xl text-[#201713]"
              aria-label={`Play ${video.title}`}
            >
              ▶
            </button>
          </>
        )}

        <span className="absolute right-3 top-3 rounded-full bg-black/55 px-3 py-2 text-[8px]">
          {video.duration}
        </span>
      </div>

      <div className="p-4">
        <p className="text-[8px] uppercase tracking-[.12em] text-[#efc28b]">
          {video.category}
        </p>
        <h3 className="lx-serif mt-1 text-2xl">{video.title}</h3>
        <p className="mt-2 text-xs leading-6 text-white/50">
          {video.caption}
        </p>
      </div>
    </article>
  );
}
