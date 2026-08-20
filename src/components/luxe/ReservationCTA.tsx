import Link from "next/link";
import Reveal from "./Reveal";

export default function ReservationCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-[#170c09] py-24 text-white md:py-32">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-45"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2200&q=90")',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(20,8,5,.94),rgba(20,8,5,.76),rgba(20,8,5,.54))]" />

      <div className="lx-container">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[.35em] text-[#efb36c]">Your evening at LUXE</p>
          <h2 className="lx-serif mt-6 max-w-5xl text-[clamp(4rem,8vw,8.6rem)] leading-[.84] tracking-[-.055em]">
            Come hungry.
            <span className="block italic text-[#f0c28e]">Stay a while.</span>
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/reservations" className="lx-button bg-[#7d271f]/90">
              Reserve a table ↗
            </Link>
            <Link href="/menu" className="lx-button">
              View tonight’s menu →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
