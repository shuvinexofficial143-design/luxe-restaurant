import Link from "next/link";
import Reveal from "./Reveal";

const experiences = [
  {
    title: "Chef's Table",
    slug: "chefs-table",
    meta: "8 seats · Thu–Sun",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=90",
  },
  {
    title: "Seasonal Tasting",
    slug: "seasonal-tasting",
    meta: "7 courses · nightly",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90",
  },
  {
    title: "Wine Pairing Evening",
    slug: "wine-pairing-evening",
    meta: "monthly · limited seats",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=90",
  },
  {
    title: "Sunday Brunch",
    slug: "sunday-brunch",
    meta: "11:30 AM–3:00 PM",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=90",
  },
];

export default function ExperienceRail() {
  return (
    <section className="overflow-hidden bg-[#180d0a] py-24 text-white md:py-32">
      <div className="lx-container">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[.34em] text-[#efb36c]">Beyond dinner</p>
              <h2 className="lx-serif mt-5 text-[clamp(3.8rem,7vw,7rem)] leading-[.9] tracking-[-.045em]">
                LUXE experiences
              </h2>
            </div>
            <Link href="/experiences" className="lx-button">
              View all experiences →
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-5 pl-[max(20px,calc((100vw-1480px)/2))] pr-5">
          {experiences.map((item, index) => (
            <Reveal key={item.slug} delay={index * 70}>
              <Link
                href={`/experiences/${item.slug}`}
                className="group block w-[78vw] max-w-[520px] shrink-0 snap-start"
              >
                <div className="lx-image-zoom">
                  <div
                    className="h-[560px] bg-cover bg-center"
                    style={{ backgroundImage: `url("${item.image}")` }}
                  />
                </div>
                <div className="border-b border-white/12 py-6">
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <p className="text-[9px] uppercase tracking-[.23em] text-[#efb36c]">0{index + 1} · {item.meta}</p>
                      <h3 className="lx-serif mt-3 text-4xl">{item.title}</h3>
                    </div>
                    <span className="text-2xl text-[#efb36c] transition group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
