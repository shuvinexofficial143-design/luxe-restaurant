import type {ReactNode} from "react";
export default function LocalizedPageIntro({eyebrow,title,text,children}:{eyebrow:string;title:string;text:string;children?:ReactNode}){
 return <section className="rounded-[30px] bg-[#fffaf4] p-6 md:p-9"><p className="text-[9px] uppercase tracking-[.14em] text-[#7c241e]">{eyebrow}</p><h1 className="lx-serif mt-2 text-5xl md:text-7xl">{title}</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-[#75645d]">{text}</p>{children?<div className="mt-6">{children}</div>:null}</section>;
}
