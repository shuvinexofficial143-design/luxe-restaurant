import Link from "next/link";
import Reveal from "./Reveal";

export default function CareersCTA() {
  return (
    <section className="bg-[#6b231d] py-20 text-white md:py-24">
      <div className="lx-container">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[.32em] text-[#ffd19c]">Join the team</p>
              <h2 className="lx-serif mt-5 max-w-4xl text-5xl leading-[.95] md:text-7xl">
                Serious about the work. Generous with the team.
              </h2>
            </div>
            <div>
              <p className="max-w-xl text-sm leading-7 text-white/66">
                Kitchen, pastry, wine and front-of-house roles for people who care about detail without losing warmth.
              </p>
              <Link href="/careers" className="lx-button mt-8">
                View careers ↗
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
