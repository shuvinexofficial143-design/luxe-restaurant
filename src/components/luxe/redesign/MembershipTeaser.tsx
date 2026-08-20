
import Link from "next/link";

export default function MembershipTeaser() {
  return (
    <Link
      href="/account/secure"
      className="group block rounded-[27px] border border-[#e7c58f]/12 bg-[linear-gradient(135deg,#15110d,#0a0907)] p-5"
    >
      <div className="flex items-end justify-between gap-5">
        <div>
          <p className="text-[7px] uppercase tracking-[.22em] text-[#c9944b]">
            LUXE Membership
          </p>
          <h3 className="lx-serif mt-3 text-3xl text-[#efe0cc]">
            Dine beautifully.
          </h3>
          <p className="mt-2 text-[9px] leading-5 text-white/32">
            Priority reservations, member evenings and loyalty rewards.
          </p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#c9944b]/28 text-[#d5a45f] transition group-hover:bg-[#c9944b] group-hover:text-black">
          L
        </span>
      </div>
    </Link>
  );
}
