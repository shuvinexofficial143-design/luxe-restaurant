
import Link from "next/link";

export default function MobileReserveBar() {
  return (
    <div className="fixed inset-x-3 bottom-[74px] z-[70] md:hidden">
      <div className="lx-luxury-shell grid grid-cols-2 gap-2 rounded-[18px] p-2">
        <Link
          href="/menu"
          className="flex h-11 items-center justify-center rounded-[13px] border border-[#e7c58f]/12 text-[7px] uppercase tracking-[.12em] text-[#d6c1a4]"
        >
          Menu
        </Link>
        <Link
          href="/reservations"
          className="lx-gold-button flex h-11 items-center justify-center rounded-[13px] text-[7px] uppercase tracking-[.12em]"
        >
          Reserve
        </Link>
      </div>
    </div>
  );
}
