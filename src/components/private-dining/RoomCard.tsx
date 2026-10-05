import Image from "next/image";
import Link from "next/link";
import type { PrivateDiningRoom } from "@/lib/private-dining/types";

export default function RoomCard({
  room,
}: {
  room: PrivateDiningRoom;
}) {
  return (
    <article className="overflow-hidden rounded-[26px] border border-[#e7c58f]/10 bg-[#11100d]">
      <div className="relative h-[340px] overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
        <span className="absolute left-3 top-3 rounded-full bg-[#201713]/88 px-3 py-2 text-[10px] uppercase tracking-[.12em] text-[#efc28b] backdrop-blur-md">
          {room.minGuests}–{room.maxGuests} guests
        </span>
      </div>

      <div className="p-5 text-[#f1e4d2]">
        <p className="lx-serif text-3xl">{room.name}</p>
        <p className="mt-2 text-sm leading-6 text-white/50">
          {room.subtitle}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-[16px] border border-[#e7c58f]/10 bg-white/[.03] p-3">
            <p className="lx-serif text-xl text-[#d3a762]">{room.seated}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[.1em] text-white/48">
              seated
            </p>
          </div>
          <div className="rounded-[16px] border border-[#e7c58f]/10 bg-white/[.03] p-3">
            <p className="lx-serif text-xl text-[#d3a762]">{room.standing}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[.1em] text-white/48">
              standing
            </p>
          </div>
        </div>

        <Link
          href={"/private-dining?room=" + encodeURIComponent(room.slug)}
          className="mt-4 flex min-h-12 items-center justify-center rounded-[16px] bg-[#c9944b] text-[10px] font-semibold uppercase tracking-[.12em] text-[#100c08]"
        >
          Select room ↗
        </Link>
      </div>
    </article>
  );
}
