import AdminShell from "@/components/admin/AdminShell";
import I18nStatusCard from "@/components/admin/I18nStatusCard";
import LocalizedFormatDemo from "@/components/admin/LocalizedFormatDemo";
export const metadata={title:"LUXE Languages"};
export default function Page(){
 return <AdminShell title="Languages" eyebrow="Localization"><div className="mx-auto max-w-[1050px]"><div className="grid gap-4 lg:grid-cols-[1fr_320px]"><div className="rounded-[28px] bg-[#fffaf4] p-6"><p className="text-[9px] text-[#7c241e]">TRANSLATION ARCHITECTURE</p><h2 className="lx-serif mt-2 text-4xl">Shared operations, localized content.</h2><p className="mt-4 text-sm leading-7 text-[#75645d]">Prices, availability, reservations and orders remain one source of truth. Human-facing CMS fields can have Hindi translations without duplicating operational records.</p><div className="mt-5"><LocalizedFormatDemo/></div></div><I18nStatusCard/></div><div className="mt-5 rounded-[20px] bg-[#fff4de] p-4 text-xs text-[#75645d]">Apply database/migrations/009_i18n.sql before saving locale preferences or CMS translations.</div></div></AdminShell>;
}
