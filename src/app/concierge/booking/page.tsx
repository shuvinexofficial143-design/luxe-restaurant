import LuxeShell from "@/components/luxe/LuxeShell"; import BookingAssistant from "@/components/concierge/BookingAssistant";
export const metadata={title:"Booking Assistant"};
export default function Page(){return <LuxeShell><section className="px-3 pt-[100px] md:px-5 md:pt-[120px]"><div className="mx-auto max-w-[900px]"><p className="lx-kicker">Reservation guide</p><h1 className="lx-serif mt-2 text-5xl md:text-7xl">Booking Assistant.</h1><div className="mt-6"><BookingAssistant/></div></div></section></LuxeShell>;}
