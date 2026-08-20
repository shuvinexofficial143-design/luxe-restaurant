import Link from "next/link";

export const metadata = { title: "LUXE Offline" };

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-[#f7f1e8] p-4 text-[#201713]">
      <div className="mx-auto grid min-h-[90vh] max-w-[720px] place-items-center">
        <div className="w-full rounded-[32px] bg-[#fffaf4] p-7 text-center shadow-sm">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#201713] text-2xl text-white">
            L
          </div>
          <p className="mt-5 text-[9px] uppercase tracking-[.15em] text-[#7c241e]">
            Offline
          </p>
          <h1 className="lx-serif mt-2 text-5xl">The table is still here.</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#75645d]">
            Your connection is unavailable. Previously cached LUXE pages may still open.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <Link
              href="/app"
              className="flex min-h-12 items-center justify-center rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white"
            >
              App home
            </Link>
            <Link
              href="/menu"
              className="flex min-h-12 items-center justify-center rounded-[16px] border border-[#4a3025]/10 text-[9px] uppercase tracking-[.12em]"
            >
              Cached menu
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
