import { giftFeatures } from "@/lib/gifts/data";

export default function GiftFeatures() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {giftFeatures.map((feature, index) => (
        <div key={feature} className="rounded-[20px] bg-[#fffaf4] p-4">
          <span className="text-[9px] text-[#7c241e]">0{index + 1}</span>
          <p className="lx-serif mt-2 text-2xl">{feature}</p>
        </div>
      ))}
    </div>
  );
}
