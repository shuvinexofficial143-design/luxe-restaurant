import type { PublicContentItem } from "@/lib/public-content/types";

export default function CMSHero({
  item,
  kicker,
}: {
  item: PublicContentItem;
  kicker: string;
}) {
  return (
    <section className="overflow-hidden rounded-[30px] bg-[#201713] text-white">
      <div
        className="min-h-[420px] bg-cover bg-center p-6 md:p-10"
        style={{
          backgroundImage: item.image_url
            ? `linear-gradient(90deg,rgba(32,23,19,.9),rgba(32,23,19,.2)),url("${item.image_url}")`
            : undefined,
        }}
      >
        <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
          {kicker}
        </p>
        <h1 className="lx-serif mt-3 max-w-3xl text-6xl md:text-8xl">
          {item.title}
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
          {item.excerpt}
        </p>
      </div>
    </section>
  );
}
