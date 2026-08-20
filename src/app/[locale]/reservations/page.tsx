import Link from "next/link";
import {notFound} from "next/navigation";
import {getDictionary} from "@/lib/i18n/get-dictionary";
import {isLocale} from "@/lib/i18n/config";
import LocalizedPageIntro from "@/components/i18n/LocalizedPageIntro";
export default async function Page({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params; if(!isLocale(locale))notFound(); const d=await getDictionary(locale); const s=d.reservations;
 return <LocalizedPageIntro eyebrow={s.eyebrow} title={s.title} text={s.body}><Link href="/reservations/live" className="inline-flex rounded-full bg-[#7c241e] px-5 py-4 text-[9px] text-white">{s.cta} ↗</Link></LocalizedPageIntro>;
}