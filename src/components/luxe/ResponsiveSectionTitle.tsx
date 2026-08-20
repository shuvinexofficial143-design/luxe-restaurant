export default function ResponsiveSectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
      <div>
        <p className="lx-kicker">{eyebrow}</p>
        <h2 className="lx-serif mt-5 max-w-4xl text-[clamp(3.2rem,6vw,6.4rem)] leading-[.92] tracking-[-.045em]">
          {title}
        </h2>
      </div>
      {text ? (
        <p className="max-w-2xl text-sm leading-7 text-[#645149] lg:ml-auto md:text-base md:leading-8">
          {text}
        </p>
      ) : null}
    </div>
  );
}
