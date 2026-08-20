import type { DietaryTag } from "@/lib/menu/types";

const short: Record<DietaryTag, string> = {
  Vegetarian: "VEG",
  Vegan: "VGN",
  "Gluten Free": "GF",
  "Contains Nuts": "NUTS",
};

export default function DietaryBadges({ tags }: { tags: DietaryTag[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          title={tag}
          className="rounded-full bg-[#f0e1d3] px-2.5 py-1 text-[8px] font-medium tracking-[.1em] text-[#7c241e]"
        >
          {short[tag]}
        </span>
      ))}
    </div>
  );
}
