import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative isolate grid min-h-screen place-items-center overflow-hidden bg-[#170c09] px-5 text-center text-white">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-35"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=90")',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(120,40,28,.25),rgba(15,7,5,.94)_70%)]" />

      <div className="max-w-4xl">
        <p className="text-[10px] uppercase tracking-[.36em] text-[#efb36c]">404 · table not found</p>
        <h1 className="lx-serif mt-6 text-[clamp(5rem,13vw,12rem)] leading-[.78] tracking-[-.07em]">
          Wrong room.
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-white/58">
          The page you were looking for has moved, closed for service or never existed.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="lx-button bg-[#6b231d]">Return home →</Link>
          <Link href="/reservations" className="lx-button">Reserve a table ↗</Link>
        </div>
      </div>
    </main>
  );
}
