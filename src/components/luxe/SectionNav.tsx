import Link from "next/link";

const links = [
  ["Wine", "/wine"],
  ["Sustainability", "/sustainability"],
  ["Careers", "/careers"],
  ["Accessibility", "/accessibility"],
  ["FAQ", "/faq"],
  ["Gift Cards", "/gift-cards"],
];

export default function SectionNav() {
  return (
    <section className="overflow-x-auto border-y border-[#5b3429]/14 bg-[#fff8ed] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="lx-container flex min-w-max items-center">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="border-r border-[#5b3429]/14 px-6 py-5 text-[9px] uppercase tracking-[.23em] text-[#6b231d] transition hover:bg-[#6b231d] hover:text-white"
          >
            {label} ↗
          </Link>
        ))}
      </div>
    </section>
  );
}
