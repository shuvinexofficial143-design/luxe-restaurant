import type { ReactNode } from "react";

export default function AuthCard({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-[#4a3025]/10 bg-[#fffaf4] shadow-[0_24px_70px_rgba(70,40,26,.08)]">
      <div className="bg-[#335f50] p-6 text-white md:p-8">
        <p className="text-[9px] uppercase tracking-[.16em] text-[#efc99a]">{eyebrow}</p>
        <h1 className="lx-serif mt-2 text-5xl">{title}</h1>
        <p className="mt-3 text-sm leading-7 text-white/58">{text}</p>
      </div>
      <div className="p-5 md:p-8">{children}</div>
    </div>
  );
}
