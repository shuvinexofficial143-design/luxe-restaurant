import LuxeShell from "@/components/luxe/LuxeShell";
import OrderConfirmation from "@/components/orders/OrderConfirmation";

export const metadata = { title: "Order Confirmation" };

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[780px]">
          <OrderConfirmation id={id} />
        </div>
      </section>
    </LuxeShell>
  );
}
