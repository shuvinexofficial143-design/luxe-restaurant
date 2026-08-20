import { notFound } from "next/navigation";
import LuxeShell from "@/components/luxe/LuxeShell";
import ReceiptCard from "@/components/payments/ReceiptCard";
import PrintReceiptButton from "@/components/payments/PrintReceiptButton";
import { supabaseBillingReceipts } from "@/lib/server/supabase/billing-receipts";

export const dynamic = "force-dynamic";

export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const receipt =
    await supabaseBillingReceipts.findById(
      id
    );

  if (!receipt) notFound();

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px] print:p-0">
        <div className="mx-auto max-w-[760px]">
          <ReceiptCard
            receipt={receipt}
          />
          <div className="mt-3">
            <PrintReceiptButton />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
