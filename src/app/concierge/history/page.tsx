import LuxeShell from "@/components/luxe/LuxeShell"; import ConversationHistory from "@/components/concierge/ConversationHistory";
export const metadata={title:"Concierge History"};
export default function Page(){return <LuxeShell><section className="px-3 pt-[100px] md:px-5 md:pt-[120px]"><div className="mx-auto max-w-[820px]"><p className="lx-kicker">Saved locally</p><h1 className="lx-serif mt-2 text-5xl md:text-7xl">Chat history.</h1><div className="mt-6"><ConversationHistory/></div></div></section></LuxeShell>;}
