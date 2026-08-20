import LuxeShell from "@/components/luxe/LuxeShell"; import WineAssistant from "@/components/concierge/WineAssistant";
export const metadata={title:"Wine Assistant"};
export default function Page(){return <LuxeShell><section className="px-3 pt-[100px] md:px-5 md:pt-[120px]"><div className="mx-auto max-w-[1100px]"><p className="lx-kicker">Sommelier intelligence</p><h1 className="lx-serif mt-2 text-5xl md:text-7xl">Wine Assistant.</h1><div className="mt-6"><WineAssistant/></div></div></section></LuxeShell>;}
