"use client";
import type { Lang } from "@/lib/concierge/types";
export default function LanguageToggle({value,onChange}:{value:Lang;onChange:(v:Lang)=>void}){return <div className="inline-grid grid-cols-2 rounded-full border border-[#4a3025]/10 bg-white p-1">{([["en","EN"],["hi","हिं"]] as const).map(([v,l])=><button key={v} type="button" onClick={()=>onChange(v)} className={`rounded-full px-3 py-2 text-[9px] ${value===v?"bg-[#201713] text-white":"text-[#75645d]"}`}>{l}</button>)}</div>;}
