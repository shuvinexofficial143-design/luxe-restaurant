import { cultureValues } from "@/lib/careers/data";

export default function CultureGrid() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {cultureValues.map(([number, title, text]) => (
        <article key={number} className="rounded-[24px] bg-[#fffaf4] p-5">
          <span className="text-[9px] text-[#7c241e]">{number}</span>
          <h3 className="lx-serif mt-2 text-3xl">{title}</h3>
          <p className="mt-3 text-xs leading-6 text-[#75645d]">{text}</p>
        </article>
      ))}
    </div>
  );
}
