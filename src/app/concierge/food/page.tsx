import LuxeShell from "@/components/luxe/LuxeShell"; import FoodAssistant from "@/components/concierge/FoodAssistant";
export const metadata={title:"Food Assistant"};
export default function Page(){return <LuxeShell><section className="px-3 pt-[100px] md:px-5 md:pt-[120px]"><div className="mx-auto max-w-[1100px]"><p className="lx-kicker">AI-style menu guide</p><h1 className="lx-serif mt-2 text-5xl md:text-7xl">Food Assistant.</h1><div className="mt-6"><FoodAssistant/></div></div></section></LuxeShell>;}
