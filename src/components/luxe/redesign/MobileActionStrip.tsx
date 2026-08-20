
import Link from "next/link";

export default function MobileActionStrip() {
  return (
    <div className="grid grid-cols-2 gap-2 md:flex">
      <Link
        href="/reservations"
        className="lx-gold-button flex min-h-12 items-center justify-center rounded-[15px] px-5 text-[8px] uppercase tracking-[.12em]"
      >
        Reserve a table
      </Link>
      <Link
        href="/menu"
        className="lx-ghost-button flex min-h-12 items-center justify-center rounded-[15px] px-5 text-[8px] uppercase tracking-[.12em]"
      >
        View menu
      </Link>
    </div>
  );
}
