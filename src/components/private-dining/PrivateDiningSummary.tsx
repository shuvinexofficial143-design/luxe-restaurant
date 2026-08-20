import type {
  PrivateDiningPackage,
  PrivateDiningRoom,
} from "@/lib/private-dining/types";

export default function PrivateDiningSummary({
  room,
  diningPackage,
  guests,
  total,
}: {
  room: PrivateDiningRoom;
  diningPackage: PrivateDiningPackage;
  guests: number;
  total: number;
}) {
  return (
    <aside className="rounded-[26px] bg-[#201713] p-5 text-white lg:sticky lg:top-[110px] lg:self-start">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
        Estimate
      </p>
      <p className="lx-serif mt-2 text-3xl">{room.name}</p>
      <p className="mt-1 text-xs text-white/45">{diningPackage.name}</p>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-white/45">Guests</span>
          <span>{guests}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-white/45">Per guest</span>
          <span>₹{diningPackage.pricePerGuest.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-white/45">Room minimum</span>
          <span>₹{room.baseMinimum.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-[8px] uppercase tracking-[.12em] text-white/40">
          Estimated minimum
        </p>
        <p className="lx-serif mt-1 text-3xl text-[#efc28b]">
          ₹{total.toLocaleString("en-IN")}
        </p>
      </div>

      <p className="mt-4 text-[9px] leading-5 text-white/40">
        Demo estimate only. Taxes, drinks, décor, AV and custom menu charges are not final.
      </p>
    </aside>
  );
}
