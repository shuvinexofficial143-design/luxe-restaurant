import LuxeShell from "@/components/luxe/LuxeShell";
import BookingConfirmation from "@/components/reservations/BookingConfirmation";

export const metadata = { title: "Booking Confirmation" };

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[820px]">
          <BookingConfirmation id={id} />
        </div>
      </section>
    </LuxeShell>
  );
}
