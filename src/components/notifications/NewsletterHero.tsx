import Link from "next/link";

export default function NewsletterHero() {
  return (
    <div className="overflow-hidden rounded-[30px] bg-[#201713] text-white md:grid md:grid-cols-[1fr_.9fr]">
      <div
        className="min-h-[52svh] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=90")',
        }}
      />
      <div className="p-6 md:flex md:items-center md:p-9">
        <div>
          <p className="text-[9px] uppercase tracking-[.16em] text-[#efc28b]">
            LUXE Notes
          </p>
          <h1 className="lx-serif mt-3 text-5xl leading-[.92] md:text-7xl">
            Stay close to the table.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/55">
            Choose exactly what you want: event alerts, wine picks, offers,
            booking reminders or one weekly digest.
          </p>
          <Link
            href="/newsletter/preferences"
            className="mt-6 inline-flex rounded-full border border-white/15 px-5 py-3 text-[9px] uppercase tracking-[.12em]"
          >
            Manage preferences
          </Link>
        </div>
      </div>
    </div>
  );
}
