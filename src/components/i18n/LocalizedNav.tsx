import Link from "next/link";
import type {Locale,Dictionary} from "@/lib/i18n/types";
import {localePath} from "@/lib/i18n/links";
export default function LocalizedNav({locale,dictionary}:{locale:Locale;dictionary:Dictionary}){
 const links=[[dictionary.nav.home,""],[dictionary.nav.menu,"/menu"],[dictionary.nav.book,"/reservations"],[dictionary.nav.visit,"/visit"],[dictionary.nav.account,"/account"]];
 return <nav aria-label="Localized navigation" className="flex gap-2 overflow-x-auto pb-1">{links.map(([label,path])=><Link key={path} href={localePath(locale,path)} className="shrink-0 rounded-full border border-white/10 bg-white/[.06] px-4 py-3 text-[8px] text-white/70">{label}</Link>)}</nav>;
}
