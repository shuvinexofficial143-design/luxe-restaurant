import type { PrivateDiningRoom } from "@/lib/private-dining/types";
import RoomCard from "./RoomCard";

export default function RoomGrid({
  rooms,
}: {
  rooms: PrivateDiningRoom[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {rooms.map((room) => (
        <RoomCard key={room.slug} room={room} />
      ))}
    </div>
  );
}
