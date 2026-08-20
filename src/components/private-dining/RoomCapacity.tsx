import type { PrivateDiningRoom } from "@/lib/private-dining/types";

export default function RoomCapacity({
  room,
}: {
  room: PrivateDiningRoom;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        [`${room.minGuests}`, "minimum"],
        [`${room.seated}`, "seated"],
        [`${room.standing}`, "standing"],
      ].map(([value, label]) => (
        <div
          key={label}
          className="rounded-[18px] bg-[#f3e7dc] p-3 text-center"
        >
          <p className="lx-serif text-2xl text-[#7c241e]">{value}</p>
          <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
