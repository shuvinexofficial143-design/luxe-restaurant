import Link from "next/link";

export default function AccountEmptyState() {
  return (
    <div className="rounded-[28px] border border-dashed border-[#7c241e]/20 bg-[#fffaf4] p-8 text-center">
      <p className="text-4xl">♨</p>
      <h2 className="lx-serif mt-3 text-4xl">Make LUXE yours.</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#75645d]">
        Create a demo account to save preferences, loyalty points and special dates.
      </p>
      <div className="mt-5 flex justify-center gap-2">
        <Link href="/account/register" className="rounded-full bg-[#7c241e] px-5 py-3 text-[9px] uppercase tracking-[.13em] text-white">
          Join LUXE
        </Link>
        <Link href="/account/login" className="rounded-full border border-[#4a3025]/10 px-5 py-3 text-[9px] uppercase tracking-[.13em]">
          Login
        </Link>
      </div>
    </div>
  );
}
