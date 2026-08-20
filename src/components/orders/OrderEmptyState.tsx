import Link from "next/link";

export default function OrderEmptyState() {
  return (
    <div className="rounded-[28px] bg-[#fffaf4] p-8 text-center">
      <p className="text-4xl">🥢</p>
      <h2 className="lx-serif mt-3 text-4xl">Your cart is empty.</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#75645d]">
        Add a few LUXE dishes, then choose pickup or table ordering.
      </p>
      <Link
        href="/order"
        className="mt-5 inline-flex rounded-full bg-[#7c241e] px-5 py-3 text-[9px] uppercase tracking-[.13em] text-white"
      >
        Browse order menu
      </Link>
    </div>
  );
}
