import LuxeShell from "@/components/luxe/LuxeShell";
import RealOrderTracker from "@/components/order/RealOrderTracker";

export const metadata = { title: "Live Order Tracking" };

export default async function LiveOrderTrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1050px]">
          <RealOrderTracker orderId={id} />
        </div>
      </section>
    </LuxeShell>
  );
}
