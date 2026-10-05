import Image from "next/image";
import AnimatedText from "../ui/AnimatedText";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { BLUR_DATA_URL } from "@/data/images";
import { site } from "@/data/site";

interface CtaBannerProps {
  title?: string;
  titleAccent?: string;
  description?: string;
  image: string;
  imageAlt: string;
}

/** High-impact reservation call-to-action shared across pages */
export default function CtaBanner({
  title = "Reserve your",
  titleAccent = "evening",
  description = "Twelve tables. One fire. Evenings that linger long after the last glass.",
  image,
  imageAlt,
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover opacity-55"
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/30 to-ink-950/80" />

      <div className="container-x relative flex flex-col items-center py-28 text-center lg:py-40">
        <Reveal y={14}>
          <p className="eyebrow flex items-center justify-center gap-4 text-gold-400">
            <span aria-hidden className="inline-block h-px w-10 bg-gold-400/60" />
            Reservations
            <span aria-hidden className="inline-block h-px w-10 bg-gold-400/60" />
          </p>
        </Reveal>
        <h2 className="mt-8 max-w-3xl font-display text-[clamp(2.8rem,7vw,5.75rem)] leading-[1.02] font-light text-cream-50">
          <AnimatedText text={title} />{" "}
          <em className="font-normal text-gold-300">
            <AnimatedText text={titleAccent} delay={0.2} />
          </em>
        </h2>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-md text-base font-light text-cream-100/75">{description}</p>
        </Reveal>
        <Reveal delay={0.4} className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
          <Button href="/reservations" variant="gold" arrow>
            Book a Table
          </Button>
          <Button href={site.phoneHref} variant="outline" magnetic={false}>
            {site.phone}
          </Button>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mt-10 text-[0.6875rem] uppercase tracking-[0.3em] text-cream-100/50">
            Vijay Nagar, Indore · Reservations recommended
          </p>
        </Reveal>
      </div>
    </section>
  );
}
