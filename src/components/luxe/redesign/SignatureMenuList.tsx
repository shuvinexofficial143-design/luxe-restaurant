
import Link from "next/link";

const dishes = [
  ["Fire Trout", "Saffron whey · lemon · trout roe", "₹1,280"],
  ["Short Rib", "Bone marrow · smoked onion · black garlic", "₹1,460"],
  ["Miso Butter Cod", "Kombu · broccolini · yuzu", "₹1,320"],
  ["Ember Cauliflower", "Miso tahini · plum · chilli oil", "₹760"],
];

export default function SignatureMenuList() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-[#e7c58f]/12 bg-[#100e0b]">
      {dishes.map(([name, note, price], index) => (
        <Link
          href="/menu"
          key={name}
          className={`group flex items-center gap-4 p-4 transition-colors hover:bg-white/[.025] md:p-5 ${
            index ? "border-t border-[#e7c58f]/10" : ""
          }`}
        >
          <span className="text-[8px] text-[#7f6a50]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <p className="lx-serif text-xl text-[#efe0cc] md:text-2xl">{name}</p>
            <p className="mt-1 truncate text-[9px] text-white/34">{note}</p>
          </div>
          <span className="lx-serif text-lg text-[#c9944b]">{price}</span>
          <span className="text-[#a98252] transition-transform group-hover:translate-x-1">
            +
          </span>
        </Link>
      ))}
    </div>
  );
}
