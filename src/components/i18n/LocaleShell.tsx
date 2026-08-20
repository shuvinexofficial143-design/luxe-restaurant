import type {ReactNode} from "react";
import type {Locale,Dictionary} from "@/lib/i18n/types";
import LanguageSwitcher from "./LanguageSwitcher";
import LocalizedNav from "./LocalizedNav";
export default function LocaleShell({locale,dictionary,children}:{locale:Locale;dictionary:Dictionary;children:ReactNode}){
 return <main lang={locale} className="min-h-screen bg-[#efe5da] p-3 text-[#201713] md:p-5"><div className="mx-auto max-w-[1180px]">
  <header className="rounded-[24px] bg-[#201713] p-3 text-white">
   <div className="flex items-center justify-between gap-3"><p className="lx-serif text-2xl text-[#efc28b]">{dictionary.brand}</p><LanguageSwitcher locale={locale}/></div>
   <div className="mt-3"><LocalizedNav locale={locale} dictionary={dictionary}/></div>
  </header>
  <div className="mt-3">{children}</div>
 </div></main>;
}
