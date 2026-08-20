import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import Reveal from "@/components/luxe/Reveal";

const team = [
  {
    name: "Aarav Mehra",
    role: "Executive Chef",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1400&q=90",
    quote: "Cook with fire. Finish with restraint.",
    copy: "Aarav's food balances live fire, bright acidity and slow-built sauces. His plates are precise without feeling overworked.",
  },
  {
    name: "Mira Sen",
    role: "Pastry Chef",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=1400&q=90",
    quote: "Sweetness should be the last thing you notice.",
    copy: "Mira works with cultured dairy, toasted grains, fruit and fermentation to create desserts with tension rather than heaviness.",
  },
  {
    name: "Rohan D'Souza",
    role: "Head Sommelier",
    image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&w=1400&q=90",
    quote: "Wine is at its best when it changes the food.",
    copy: "Rohan's cellar moves between Burgundy, grower Champagne, expressive new-world producers and an expanding collection from Indian vineyards.",
  },
];

export default function ChefsPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="The people behind the plate"
        title="Our Chefs"
        text="A close-knit culinary team where technique is shared, ideas are challenged and every service begins with the ingredient."
        image="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="bg-[#fff8ed] py-24 md:py-32">
        <div className="lx-container space-y-24 md:space-y-32">
          {team.map((person, index) => (
            <Reveal key={person.name}>
              <article className={`grid gap-10 lg:grid-cols-2 lg:items-center ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="lx-image-zoom">
                  <div
                    className="min-h-[650px] bg-cover bg-center"
                    style={{ backgroundImage: `url("${person.image}")` }}
                  />
                </div>
                <div className="lg:px-10">
                  <p className="lx-kicker">{person.role}</p>
                  <h2 className="lx-serif mt-5 text-[clamp(3.8rem,6vw,6.6rem)] leading-[.9] tracking-[-.04em]">
                    {person.name}
                  </h2>
                  <p className="lx-serif mt-8 max-w-xl text-3xl italic leading-tight text-[#7a2d21]">
                    “{person.quote}”
                  </p>
                  <p className="mt-7 max-w-xl text-base leading-8 text-[#5e4c44]">{person.copy}</p>
                  <div className="mt-10 h-px w-28 bg-[#8d3a25]/35" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </LuxeShell>
  );
}
