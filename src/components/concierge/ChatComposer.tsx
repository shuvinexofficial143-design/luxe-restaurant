"use client";
import { FormEvent,useState } from "react";
import type { Lang } from "@/lib/concierge/types";
import { tr } from "@/lib/concierge/translations";
import VoiceButton from "./VoiceButton";
export default function ChatComposer({lang,disabled,onSend}:{lang:Lang;disabled:boolean;onSend:(v:string)=>void}){const [v,setV]=useState("");function submit(e:FormEvent){e.preventDefault();const x=v.trim();if(!x||disabled)return;onSend(x);setV("");}return <form onSubmit={submit} className="flex items-end gap-2"><VoiceButton lang={lang} onText={setV}/><textarea rows={1} value={v} onChange={e=>setV(e.target.value)} placeholder={tr(lang,"placeholder")} className="min-h-11 flex-1 resize-none rounded-[18px] border border-[#4a3025]/10 bg-white px-4 py-3 text-sm outline-none"/><button disabled={!v.trim()||disabled} className="h-11 rounded-[16px] bg-[#7c241e] px-4 text-[9px] uppercase tracking-[.12em] text-white disabled:opacity-35">{tr(lang,"send")}</button></form>;}
