import Link from "next/link";
import Reveal from "./Reveal";

const dishes=[
  ["Fire Trout","saffron whey · lemon","https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=90"],
  ["Ember Duck","plum · chicory","https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=90"],
  ["Burnt Honey","sesame · milk ice cream","https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=90"],
];

const experiences=[
  ["Chef's Table","8 seats · Thu–Sun","https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=90","/experiences/chefs-table"],
  ["Wine Night","monthly cellar dinner","https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=90","/experiences/wine-pairing-evening"],
  ["Sunday Brunch","slow daytime service","https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=90","/experiences/sunday-brunch"],
];

export default function HomeSections(){
  return(
    <>
      <section className="px-3 py-5 md:px-5 md:py-8">
        <div className="mx-auto grid max-w-[1180px] grid-cols-3 gap-2">
          {[
            ["4.9","guest love"],
            ["7","course tasting"],
            ["12","intimate tables"],
          ].map(([n,l])=>(
            <div key={l} className="lx-card p-4 text-center md:p-6">
              <p className="lx-serif text-3xl text-[#7c241e] md:text-5xl">{n}</p>
              <p className="mt-1 text-[8px] uppercase tracking-[.16em] text-[#7a685f]">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-3 py-8 md:px-5 md:py-14">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="lx-kicker">Tonight</p>
                <h2 className="lx-serif mt-2 text-4xl leading-none md:text-6xl">Signature plates</h2>
              </div>
              <Link href="/menu" className="text-[9px] uppercase tracking-[.16em] text-[#7c241e]">Full menu →</Link>
            </div>
          </Reveal>

          <div className="-mx-3 mt-5 flex snap-x gap-3 overflow-x-auto px-3 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {dishes.map(([name,note,image],i)=>(
              <Reveal key={name} delay={i*70}>
                <article className="lx-card w-[78vw] max-w-[340px] shrink-0 snap-start md:w-auto md:max-w-none">
                  <div className="lx-image-zoom">
                    <div className="h-[330px] bg-cover bg-center md:h-[430px]" style={{backgroundImage:`url("${image}")`}}/>
                  </div>
                  <div className="p-5">
                    <p className="lx-serif text-2xl">{name}</p>
                    <p className="mt-2 text-xs text-[#76635b]">{note}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-3 py-4 md:px-5 md:py-10">
        <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[32px] bg-[#335f50] text-white md:grid md:grid-cols-2 md:rounded-[40px]">
          <div
            className="h-[360px] bg-cover bg-center md:h-full md:min-h-[560px]"
            style={{backgroundImage:'url("https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1400&q=90")'}}
          />
          <div className="p-6 md:flex md:items-center md:p-10 lg:p-14">
            <div>
              <p className="text-[9px] uppercase tracking-[.22em] text-[#f1c88f]">Chef Aarav Mehra</p>
              <h2 className="lx-serif mt-3 text-4xl leading-[.92] md:text-6xl">
                Big flavour.
                <span className="block italic text-[#f1c88f]">Less noise.</span>
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/64">
                Smoke, acidity and deep stock work — presented in a way that still feels easy to enjoy.
              </p>
              <Link href="/chefs" className="mt-6 inline-flex lx-pill border-white/20 bg-white/10 text-white">Meet the chefs</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 py-10 md:px-5 md:py-16">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <p className="lx-kicker">Pick your night</p>
            <h2 className="lx-serif mt-2 text-4xl leading-none md:text-6xl">Experiences worth booking</h2>
          </Reveal>

          <div className="-mx-3 mt-5 flex gap-3 overflow-x-auto px-3 pb-2 md:mx-0 md:grid md:grid-cols-3 md:px-0">
            {experiences.map(([title,meta,image,href])=>(
              <Link key={title} href={href} className="lx-card w-[84vw] max-w-[360px] shrink-0 md:w-auto md:max-w-none">
                <div className="h-[280px] bg-cover bg-center md:h-[360px]" style={{backgroundImage:`url("${image}")`}}/>
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <p className="lx-serif text-2xl">{title}</p>
                    <p className="mt-2 text-xs text-[#76635b]">{meta}</p>
                  </div>
                  <span className="text-xl text-[#7c241e]">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-3 py-4 md:px-5 md:py-10">
        <div className="mx-auto max-w-[1180px] rounded-[32px] bg-[#7c241e] p-6 text-white md:flex md:items-end md:justify-between md:gap-8 md:p-10 lg:p-12">
          <div>
            <p className="text-[9px] uppercase tracking-[.22em] text-[#ffd19a]">Ready?</p>
            <h2 className="lx-serif mt-3 text-4xl leading-[.9] md:text-6xl">Your table is waiting.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/62">
              Dinner, tasting menu or chef’s table — choose the pace that fits your night.
            </p>
          </div>
          <Link href="/reservations" className="mt-6 inline-flex lx-pill border-white/20 bg-white text-[#7c241e] md:mt-0">
            Reserve now ↗
          </Link>
        </div>
      </section>
    </>
  )
}
