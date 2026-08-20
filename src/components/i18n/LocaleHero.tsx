import Link from "next/link";
import type {Locale,Dictionary} from "@/lib/i18n/types";
import {localePath} from "@/lib/i18n/links";
export default function LocaleHero({locale,dictionary}:{locale:Locale;dictionary:Dictionary}){
 return <section className="rounded-[32px] bg-[#7c241e] p-6 text-white md:p-10">
  <p className="text-[9px] uppercase tracking-[.15em] text-[#ffd0aa]">{dictionary.home.eyebrow}</p>
  <h1 className="lx-serif mt-3 max-w-4xl text-5xl md:text-8xl">{dictionary.home.title}</h1>
  <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60">{dictionary.home.body}</p>
  <div className="mt-6 flex flex-wrap gap-2">
   <Link href={localePath(locale,"/menu")} className="rounded-full bg-[#efc28b] px-5 py-4 text-[9px] text-[#201713]">{dictionary.home.menuCta}</Link>
   <Link href={localePath(locale,"/reservations")} className="rounded-full border border-white/15 px-5 py-4 text-[9px]">{dictionary.home.bookCta}</Link>
  </div>
 </section>;
}
