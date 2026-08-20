"use client";
import {usePathname,useRouter} from "next/navigation";
import type {Locale} from "@/lib/i18n/types";
import {swapLocalePath} from "@/lib/i18n/links";
export default function LanguageSwitcher({locale}:{locale:Locale}){
 const pathname=usePathname(); const router=useRouter();
 async function change(next:Locale){
  if(next===locale)return;
  await fetch("/api/v1/locale",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({locale:next})}).catch(()=>undefined);
  router.push(swapLocalePath(pathname,next)); router.refresh();
 }
 return <div role="group" aria-label="Language" className="inline-flex rounded-full bg-white/[.08] p-1">
  {(["en","hi"] as Locale[]).map(x=><button key={x} type="button" aria-pressed={locale===x} onClick={()=>void change(x)} className={`rounded-full px-3 py-2 text-[8px] ${locale===x?"bg-[#efc28b] text-[#201713]":"text-white/60"}`}>{x==="en"?"EN":"हिन्दी"}</button>)}
 </div>;
}
