import LuxeShell from "@/components/luxe/LuxeShell";
import RealReservationSuccess from "@/components/reservations/RealReservationSuccess";

export const metadata = { title: "Reservation Confirmation · LUXE" };

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[760px]">
          <RealReservationSuccess id={id} />
        </div>
      </section>
    </LuxeShell>
  );
}
