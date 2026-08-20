import Link from "next/link";
import Reveal from "./Reveal";

const posts = [
  {
    slug: "behind-the-menu",
    category: "Behind the Menu",
    title: "Smoke, citrus and the first green almonds.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=90",
  },
  {
    slug: "meet-aarav-mehra",
    category: "Meet the Chef",
    title: "Aarav Mehra on cooking with restraint.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=90",
  },
  {
    slug: "five-bottles",
    category: "Wine Notes",
    title: "Five bottles that change once food arrives.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=90",
  },
];

export default function JournalPreview() {
  return (
    <section className="bg-[#f5ead5] py-24 md:py-32">
      <div className="lx-container">
        <Reveal>
          <div className="grid gap-8 border-b border-[#5b3429]/16 pb-9 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="lx-kicker">From the journal</p>
              <h2 className="lx-serif mt-5 text-5xl md:text-6xl">Stories behind the plate.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#67534b] lg:ml-auto">
              Notes from the kitchen, the cellar, our growers and the people shaping each season.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-7 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 90}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="lx-image-zoom">
                  <div
                    className={`bg-cover bg-center ${index === 1 ? "h-[520px]" : "h-[430px]"}`}
                    style={{ backgroundImage: `url("${post.image}")` }}
                  />
                </div>
                <div className="border-b border-[#5b3429]/16 py-6">
                  <p className="text-[9px] uppercase tracking-[.25em] text-[#8d3a25]">{post.category}</p>
                  <h3 className="lx-serif mt-4 text-3xl leading-tight">{post.title}</h3>
                  <span className="mt-5 inline-flex text-[9px] uppercase tracking-[.22em] text-[#7a2d21]">
                    Read story →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 text-right">
            <Link href="/journal" className="lx-button lx-button--dark">
              All journal stories →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
