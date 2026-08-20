import Link from "next/link";
import { galleryItems } from "@/lib/media/data";

export default function InstagramMockGrid() {
  const items = galleryItems.slice(0, 9);

  return (
    <div>
      <div className="grid grid-cols-3 gap-1.5">
        {items.map((item) => (
          <Link
            key={item.id}
            href="/gallery"
            className="aspect-square overflow-hidden rounded-[10px] bg-[#ddd]"
          >
            <div
              className="h-full w-full bg-cover bg-center transition duration-500 hover:scale-105"
              style={{ backgroundImage: `url("${item.image}")` }}
            />
          </Link>
        ))}
      </div>

      <p className="mt-3 text-[9px] leading-5 text-[#8a756b]">
        Instagram-ready visual grid. Production social-feed API is not connected.
      </p>
    </div>
  );
}
