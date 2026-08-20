import {notFound} from "next/navigation";
import type {ReactNode} from "react";
import {getDictionary} from "@/lib/i18n/get-dictionary";
import {isLocale} from "@/lib/i18n/config";
import LocaleShell from "@/components/i18n/LocaleShell";
export default async function LocaleLayout({children,params}:{children:ReactNode;params:Promise<{locale:string}>}){
 const {locale}=await params; if(!isLocale(locale))notFound();
 return <LocaleShell locale={locale} dictionary={await getDictionary(locale)}>{children}</LocaleShell>;
}
