
export default function LuxurySectionHeading({
  eyebrow,
  title,
  italic,
  text,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  text?: string;
}) {
  return (
    <header className="max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#c9944b]/50" />
        <p className="text-[8px] uppercase tracking-[.24em] text-[#c9944b]">
          {eyebrow}
        </p>
      </div>

      <h2 className="lx-serif mt-4 text-4xl leading-[.94] tracking-[-.035em] text-[#f2e5d3] md:text-6xl">
        {title}
        {italic ? (
          <span className="block italic text-[#d2a15d]">{italic}</span>
        ) : null}
      </h2>

      {text ? (
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/42">{text}</p>
      ) : null}
    </header>
  );
}
