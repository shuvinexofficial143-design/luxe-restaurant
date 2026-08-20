import { careerBenefits } from "@/lib/careers/data";

export default function BenefitsGrid() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {careerBenefits.map(([title, text]) => (
        <div key={title} className="rounded-[20px] bg-[#fffaf4] p-4">
          <p className="lx-serif text-2xl">{title}</p>
          <p className="mt-2 text-xs leading-6 text-[#75645d]">{text}</p>
        </div>
      ))}
    </div>
  );
}
