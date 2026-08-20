
import Link from "next/link";

export default function StoryPanel() {
  return (
    <div className="lx-luxury-card overflow-hidden rounded-[30px] md:grid md:grid-cols-[.78fr_1.22fr]">
      <div className="relative min-h-[300px] overflow-hidden border-b border-[#e7c58f]/10 md:min-h-[520px] md:border-b-0 md:border-r">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale-[18%]"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=84")',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(5,4,3,.75))]" />
        <div className="absolute bottom-5 left-5">
          <p className="text-[7px] uppercase tracking-[.2em] text-[#d7a65e]">
            Executive chef
          </p>
          <p className="lx-serif mt-2 text-2xl">Aarav Mehra</p>
        </div>
      </div>

      <div className="flex items-center p-6 md:p-10 lg:p-14">
        <div>
          <p className="text-[8px] uppercase tracking-[.24em] text-[#c9944b]">
            Our philosophy
          </p>
          <h3 className="lx-serif mt-4 text-4xl leading-[.92] text-[#f2e5d3] md:text-6xl">
            Fire. Flavour.
            <span className="block italic text-[#d2a15d]">Restraint.</span>
          </h3>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/40">
            We use live fire for character, not spectacle. Seasonal ingredients,
            deep sauces and thoughtful hospitality do the rest.
          </p>

          <div className="mt-7 grid gap-2 sm:grid-cols-3">
            {[
              ["01", "Open flame"],
              ["02", "Season-led"],
              ["03", "Quiet service"],
            ].map(([number, label]) => (
              <div
                key={number}
                className="rounded-[16px] border border-[#e7c58f]/10 bg-black/20 p-3"
              >
                <p className="text-[7px] text-[#c9944b]">{number}</p>
                <p className="mt-2 text-[9px] uppercase tracking-[.1em] text-white/48">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/chefs"
            className="lx-ghost-button mt-7 inline-flex rounded-full px-5 py-3 text-[8px] uppercase tracking-[.14em]"
          >
            Meet the team ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
