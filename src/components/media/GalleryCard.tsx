import Image from "next/image";
import type { GalleryItem } from "@/lib/media/types";
import MediaFavoriteButton from "./MediaFavoriteButton";

export default function GalleryCard({
  item,
  onOpen,
}: {
  item: GalleryItem;
  onOpen: () => void;
}) {
  return (
    <article
      className={"group relative overflow-hidden rounded-[24px] bg-[#d9cec4] " +
        (item.portrait ? "min-h-[430px]" : "min-h-[300px]")}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 34vw"
        className="object-cover transition duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/5 to-transparent" />

      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 z-10 text-left"
        aria-label={"Open " + item.title}
      />

      <div className="absolute right-3 top-3 z-20">
        <MediaFavoriteButton id={item.id} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 text-white">
        <p className="text-[10px] uppercase tracking-[.13em] text-white/64">
          {item.category}
        </p>
        <h3 className="lx-serif mt-1 text-2xl">{item.title}</h3>
        <p className="mt-1 text-[12px] leading-5 text-white/68">
          {item.caption}
        </p>
      </div>
    </article>
  );
}
