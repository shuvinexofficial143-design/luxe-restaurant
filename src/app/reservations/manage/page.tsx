import LuxeShell from "@/components/luxe/LuxeShell";
import BookingLookup from "@/components/reservations/BookingLookup";

export const metadata = { title: "Manage Reservation · LUXE" };

export default function ManageReservationPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[760px]">
          <p className="lx-kicker">Your reservation</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Manage booking.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Enter your reservation reference to review the booking. For changes
            or cancellations, contact the LUXE team with the same reference.
          </p>
          <div className="mt-7">
            <BookingLookup />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
