import Link from "next/link";
import Reveal from "./Reveal";

export default function ServiceDetails() {
  const details = [
    ["Dinner", "Tue–Sun · 6:00 PM–11:30 PM"],
    ["Tasting menu", "Seven courses · approx. 2 hours"],
    ["Dress", "Smart evening wear"],
    ["Dietary", "Please tell us 24 hours ahead"],
  ];

  return (
    <section className="bg-[#fff8ed] py-20 md:py-24">
      <div className="lx-container grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <Reveal>
          <div>
            <p className="lx-kicker">Plan your visit</p>
            <h2 className="lx-serif mt-5 max-w-lg text-5xl leading-[.95] md:text-6xl">
              Everything you need before dinner.
            </h2>
            <Link href="/contact" className="lx-button lx-button--dark mt-8">
              Contact the team →
            </Link>
          </div>
        </Reveal>

        <div className="divide-y divide-[#5b3429]/16 border-y border-[#5b3429]/16">
          {details.map(([label, value], index) => (
            <Reveal key={label} delay={index * 70}>
              <div className="grid gap-3 py-7 sm:grid-cols-[180px_1fr]">
                <p className="text-[9px] uppercase tracking-[.24em] text-[#8d3a25]">{label}</p>
                <p className="lx-serif text-2xl text-[#2d1a15]">{value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
