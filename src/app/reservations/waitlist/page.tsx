import LuxeShell from "@/components/luxe/LuxeShell";
import WaitlistForm from "@/components/reservations/WaitlistForm";

export const metadata = { title: "Reservation Waitlist" };

export default function WaitlistPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[760px]">
          <p className="lx-kicker">No table? No problem.</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Join waitlist.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Save your preferred date, time and party size to join the table waitlist.
          </p>
          <div className="mt-7"><WaitlistForm /></div>
        </div>
      </section>
    </LuxeShell>
  );
}
