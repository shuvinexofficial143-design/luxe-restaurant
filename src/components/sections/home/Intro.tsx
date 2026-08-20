import Link from "next/link";
import { img } from "@/data/images";
import ImageReveal from "@/components/ui/ImageReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";

const stats = [
  { value: "12", label: "Tables in the room" },
  { value: "01", label: "Michelin star" },
  { value: "07", label: "Courses at dusk" },
];

export default function Intro() {
  return (
    <section className="relative bg-cream-50 py-24 lg:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Statement */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading eyebrow="The Restaurant" title="Twelve tables." titleItalic="One fire." />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-base leading-relaxed font-light text-ink-600">
                LUXE is a small dining room with a single open hearth at its
                centre. We cook modern European food shaped by the British
                seasons — no gas, no theatre of excess, only attention.
              </p>
              <p className="mt-5 max-w-md text-base leading-relaxed font-light text-ink-600">
                The menu is rewritten each morning after the market walk. What
                arrives at your table tonight did not exist this time yesterday.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <Link
                href="/about"
                className="group mt-9 inline-flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-wine-600"
              >
                <span className="link-line">Our story</span>
                <ArrowRight width={14} height={14} className="transition-transform duration-500 group-hover:translate-x-1.5" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Layered imagery */}
        <div className="relative lg:col-span-6 lg:col-start-7">
          <ImageReveal
            src={img.interiorWarm}
            alt="Warm lamplight across the LUXE dining room"
            className="aspect-[4/5] w-full"
            sizes="(min-width: 1024px) 50vw, 100vw"
            parallax={40}
          />
          <div className="relative z-10 -mt-24 ml-auto w-3/5 border-[6px] border-cream-50 sm:-mt-32 lg:-mr-6">
            <ImageReveal
              src={img.platedFine}
              alt="A plated course from the LUXE tasting menu"
              className="aspect-square w-full"
              sizes="(min-width: 1024px) 30vw, 60vw"
              parallax={24}
              delay={0.15}
            />
          </div>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xs text-[0.6875rem] leading-relaxed tracking-[0.18em] uppercase text-ink-600/70">
              The dining room at first seating — lamplight, linen, and the low
              hum of the hearth.
            </p>
          </Reveal>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-ink-900/10 pt-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.1}>
                <p className="font-display text-4xl font-light text-wine-600 lg:text-5xl">{s.value}</p>
                <p className="mt-2 text-[0.6875rem] uppercase tracking-[0.22em] text-ink-600/80">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
