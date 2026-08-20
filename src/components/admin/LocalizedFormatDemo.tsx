import {formatCurrency,formatDate} from "@/lib/i18n/format";
export default function LocalizedFormatDemo(){
 const sample="2026-08-20T12:00:00Z";
 return <div className="grid gap-2 sm:grid-cols-2"><div className="rounded-[18px] bg-[#fffaf4] p-4"><p className="text-[8px] text-[#7c241e]">EN-IN</p><p className="lx-serif mt-2 text-2xl">{formatCurrency(4850,"en")}</p><p className="mt-1 text-xs text-[#75645d]">{formatDate(sample,"en")}</p></div><div className="rounded-[18px] bg-[#fffaf4] p-4"><p className="text-[8px] text-[#7c241e]">HI-IN</p><p className="lx-serif mt-2 text-2xl">{formatCurrency(4850,"hi")}</p><p className="mt-1 text-xs text-[#75645d]">{formatDate(sample,"hi")}</p></div></div>;
}
