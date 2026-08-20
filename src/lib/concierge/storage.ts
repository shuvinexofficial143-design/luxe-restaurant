import type { Message } from "./types";
const KEY="luxe-concierge-v1", EMPTY:Message[]=[];
const listeners=new Set<()=>void>(); let cache:Message[]|null=null;
function read():Message[]{ if(typeof window==="undefined")return EMPTY; if(cache)return cache;
  try{const p=JSON.parse(localStorage.getItem(KEY)||"[]"); cache=Array.isArray(p)?p:EMPTY;}catch{cache=EMPTY;} return cache;}
function write(v:Message[]){cache=v; if(typeof window!=="undefined")localStorage.setItem(KEY,JSON.stringify(v)); listeners.forEach(f=>f());}
export const conciergeStore={subscribe(f:()=>void){listeners.add(f);return()=>listeners.delete(f);},getSnapshot(){return read();},getServerSnapshot(){return EMPTY;},add(m:Message){write([...read(),m]);},clear(){write([]);}};
