import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";

const experiences=[
  ["Chef's Table","8 seats · kitchen-side","https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=90","/experiences/chefs-table"],
  ["Seasonal Tasting","7 courses · nightly","https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90","/experiences/seasonal-tasting"],
  ["Wine Pairing Night","monthly cellar dinner","https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=90","/experiences/wine-pairing-evening"],
  ["Sunday Brunch","11:30 AM onwards","https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=90","/experiences/sunday-brunch"],
];

export const metadata={title:"Experiences"};

export default function ExperiencesPage(){
  return(
    <LuxeShell>
      <PageHero
        eyebrow="Choose your vibe"
        title="Experiences"
        text="Four different ways to spend the evening."
        image="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="px-3 py-8 md:px-5 md:py-14">
        <div className="mx-auto grid max-w-[1180px] gap-4 md:grid-cols-2">
          {experiences.map(([title,meta,image,href],index)=>(
            <Link key={href} href={href} className="lx-card group">
              <div className="relative h-[360px] bg-cover bg-center md:h-[460px]" style={{backgroundImage:`url("${image}")`}}>
                <span className="absolute left-4 top-4 rounded-full bg-[#201713]/82 px-3 py-2 text-[8px] uppercase tracking-[.16em] text-white">
                  0{index+1}
                </span>
              </div>
              <div className="flex items-end justify-between gap-4 p-5 md:p-7">
                <div>
                  <p className="lx-serif text-3xl md:text-4xl">{title}</p>
                  <p className="mt-2 text-xs text-[#75645d]">{meta}</p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#7c241e] text-white">↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </LuxeShell>
  )
}
