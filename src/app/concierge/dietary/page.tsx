import LuxeShell from "@/components/luxe/LuxeShell"; import DietaryAssistant from "@/components/concierge/DietaryAssistant";
export const metadata={title:"Dietary Assistant"};
export default function Page(){return <LuxeShell><section className="px-3 pt-[100px] md:px-5 md:pt-[120px]"><div className="mx-auto max-w-[1100px]"><p className="lx-kicker">Preference-aware dining</p><h1 className="lx-serif mt-2 text-5xl md:text-7xl">Dietary Assistant.</h1><div className="mt-6"><DietaryAssistant/></div></div></section></LuxeShell>;}
