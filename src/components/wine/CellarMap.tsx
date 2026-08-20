import { wines } from "@/lib/wine/data";

export default function CellarMap() {
  const countries = [...new Set(wines.map((wine) => wine.country))];

  return (
    <div className="rounded-[28px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
        Cellar map
      </p>
      <h2 className="lx-serif mt-2 text-4xl">A world in bottles.</h2>
      <p className="mt-3 max-w-xl text-xs leading-6 text-white/55">
        Demo cellar coverage across classic and new-world regions.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {countries.map((country) => {
          const count = wines.filter((wine) => wine.country === country).length;
          return (
            <div
              key={country}
              className="rounded-[18px] bg-white/[.06] p-4"
            >
              <p className="lx-serif text-2xl text-[#efc28b]">{count}</p>
              <p className="mt-1 text-[9px] uppercase tracking-[.11em] text-white/55">
                {country}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
