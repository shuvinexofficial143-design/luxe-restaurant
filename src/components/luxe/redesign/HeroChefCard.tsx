
import Link from "next/link";

export default function HeroChefCard() {
  return (
    <Link
      href="/chefs"
      className="group block rounded-[22px] border border-[#e7c58f]/12 bg-black/22 p-4 backdrop-blur-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[7px] uppercase tracking-[.18em] text-[#c9944b]">
            Executive chef
          </p>
          <p className="lx-serif mt-2 text-xl text-[#f2e4d2]">Aarav Mehra</p>
          <p className="mt-2 max-w-[210px] text-[9px] leading-5 text-white/42">
            Fire-led cooking, sharp acidity, deep stock work and restraint.
          </p>
        </div>
        <span className="text-[#d9ad6a] transition-transform group-hover:translate-x-1">
          ↗
        </span>
      </div>
    </Link>
  );
}
