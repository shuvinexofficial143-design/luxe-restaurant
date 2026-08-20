import Link from "next/link";

export const metadata = { title: "Admin Permission Required" };

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-[#201713] p-4 text-white">
      <div className="mx-auto grid min-h-[90vh] max-w-[760px] place-items-center">
        <div className="w-full rounded-[32px] bg-[#fffaf4] p-7 text-[#201713]">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#7c241e]">
            Permission denied
          </p>
          <h1 className="lx-serif mt-3 text-5xl">
            Your admin role cannot open this area.
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#75645d]">
            Access is checked on the server. Ask an OWNER to review your role
            rather than attempting to bypass the interface.
          </p>
          <Link
            href="/admin"
            className="mt-6 inline-flex rounded-full bg-[#201713] px-5 py-4 text-[9px] uppercase tracking-[.1em] text-white"
          >
            Back to admin
          </Link>
        </div>
      </div>
    </main>
  );
}
