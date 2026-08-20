import Link from "next/link";

export const metadata = {
  title:
    "LUXE Deployment Status",
};

export const dynamic =
  "force-dynamic";

export default function DeploymentCheckPage() {
  return (
    <main className="min-h-screen bg-[#201713] p-4 text-white">
      <div className="mx-auto grid min-h-[92vh] max-w-[760px] place-items-center">
        <div className="w-full rounded-[32px] bg-[#fffaf4] p-7 text-[#201713]">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#7c241e]">
            LUXE deployment status
          </p>
          <h1 className="lx-serif mt-3 text-5xl">
            Public health endpoints are available.
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#75645d]">
            Public readiness intentionally exposes only aggregate status, not
            secret names or provider credentials.
          </p>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <Link
              href="/api/health/live"
              className="rounded-[16px] bg-[#335f50] p-4 text-[9px] uppercase text-white"
            >
              Liveness
            </Link>
            <Link
              href="/api/health/readiness"
              className="rounded-[16px] bg-[#7c241e] p-4 text-[9px] uppercase text-white"
            >
              Readiness
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
