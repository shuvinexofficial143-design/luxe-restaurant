import Link from "next/link";
import type { PrivateDiningRoom } from "@/lib/private-dining/types";

export default function RoomCard({
  room,
}: {
  room: PrivateDiningRoom;
}) {
  return (
    <article className="overflow-hidden rounded-[26px] border border-[#4a3025]/10 bg-[#fffaf4]">
      <div
        className="relative h-[340px] bg-cover bg-center"
        style={{ backgroundImage: `url("${room.image}")` }}
      >
        <span className="absolute left-3 top-3 rounded-full bg-[#201713]/88 px-3 py-2 text-[8px] uppercase tracking-[.12em] text-white">
          {room.minGuests}–{room.maxGuests} guests
        </span>
      </div>

      <div className="p-5">
        <p className="lx-serif text-3xl">{room.name}</p>
        <p className="mt-2 text-xs leading-6 text-[#75645d]">
          {room.subtitle}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-[16px] bg-[#f3e7dc] p-3">
            <p className="lx-serif text-xl text-[#7c241e]">{room.seated}</p>
            <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">
              seated
            </p>
          </div>
          <div className="rounded-[16px] bg-[#f3e7dc] p-3">
            <p className="lx-serif text-xl text-[#7c241e]">{room.standing}</p>
            <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">
              standing
            </p>
          </div>
        </div>

        <Link
          href={`/private-dining?room=${encodeURIComponent(room.slug)}`}
          className="mt-4 flex min-h-12 items-center justify-center rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white"
        >
          Select room ↗
        </Link>
      </div>
    </article>
  );
}
