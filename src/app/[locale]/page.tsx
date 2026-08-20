import {notFound} from "next/navigation";
import {getDictionary} from "@/lib/i18n/get-dictionary";
import {isLocale} from "@/lib/i18n/config";
import LocaleHero from "@/components/i18n/LocaleHero";
import LocalizedFeatureGrid from "@/components/i18n/LocalizedFeatureGrid";
export default async function Page({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params; if(!isLocale(locale))notFound(); const d=await getDictionary(locale);
 return <><LocaleHero locale={locale} dictionary={d}/><div className="mt-3"><LocalizedFeatureGrid locale={locale} dictionary={d}/></div></>;
}
