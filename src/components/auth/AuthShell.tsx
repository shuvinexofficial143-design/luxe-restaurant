import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthShell({
  children,
  title,
  text,
}: {
  children: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <main className="min-h-screen bg-[#201713] p-3 text-[#201713] md:p-6">
      <div className="mx-auto grid min-h-[94vh] max-w-[1080px] items-center gap-4 lg:grid-cols-[1fr_470px]">
        <div className="hidden rounded-[34px] bg-[#335f50] p-8 text-white lg:block">
          <Link
            href="/"
            className="text-[9px] uppercase tracking-[.16em] text-[#efc99a]"
          >
            LUXE Restaurant
          </Link>
          <h2 className="lx-serif mt-4 text-7xl leading-[.9]">{title}</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
            {text}
          </p>
        </div>

        {children}
      </div>
    </main>
  );
}
