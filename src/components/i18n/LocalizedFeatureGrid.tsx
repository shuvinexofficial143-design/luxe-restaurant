import Link from "next/link";
import type {Locale,Dictionary} from "@/lib/i18n/types";
import {localePath} from "@/lib/i18n/links";
export default function LocalizedFeatureGrid({locale,dictionary:d}:{locale:Locale;dictionary:Dictionary}){
 const cards=[[d.menu.title,d.menu.body,d.menu.cta,"/menu"],[d.reservations.title,d.reservations.body,d.reservations.cta,"/reservations"],[d.visit.title,d.visit.body,d.visit.cta,"/visit"],[d.account.title,d.account.body,d.account.cta,"/account"]];
 return <div className="grid gap-3 md:grid-cols-2">{cards.map(([t,b,c,h],i)=><Link key={h} href={localePath(locale,h)} className={`rounded-[26px] p-5 ${i%2?"bg-[#335f50] text-white":"bg-[#fffaf4]"}`}><h2 className="lx-serif text-3xl">{t}</h2><p className="mt-3 text-xs leading-6 opacity-60">{b}</p><span className="mt-5 inline-flex text-[8px]">{c} ↗</span></Link>)}</div>;
}
