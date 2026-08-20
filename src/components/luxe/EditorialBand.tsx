import Link from "next/link";

export default function EditorialBand({
  eyebrow,
  title,
  text,
  href,
  cta,
  tone = "wine",
}: {
  eyebrow: string;
  title: string;
  text: string;
  href?: string;
  cta?: string;
  tone?: "wine" | "emerald" | "ink";
}) {
  const tones = {
    wine: "bg-[#6b231d]",
    emerald: "bg-[#24493f]",
    ink: "bg-[#180d0a]",
  };

  return (
    <section className={`${tones[tone]} relative overflow-hidden py-20 text-white md:py-28`}>
      <div className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />
      <div className="lx-container relative grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[.34em] text-[#ffd09a]">{eyebrow}</p>
          <h2 className="lx-serif mt-6 max-w-5xl text-[clamp(3.7rem,7vw,7.5rem)] leading-[.86] tracking-[-.05em]">
            {title}
          </h2>
        </div>
        <div className="lg:pb-2">
          <p className="max-w-xl text-base leading-8 text-white/67">{text}</p>
          {href && cta ? (
            <Link href={href} className="lx-button mt-8">
              {cta} <span>↗</span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
