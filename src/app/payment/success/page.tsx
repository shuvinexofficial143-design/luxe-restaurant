import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";

export const metadata = {
  title: "Payment Successful · LUXE",
};

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    intent?: string;
    receipt?: string;
  }>;
}) {
  const {
    intent = "",
    receipt = "",
  } = await searchParams;

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[760px]">
          <div className="rounded-[32px] bg-[#335f50] p-7 text-white">
            <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
              Verified payment
            </p>
            <h1 className="lx-serif mt-2 text-6xl">
              Payment confirmed.
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/55">
              The browser callback was verified on the server before this
              success state was returned. Razorpay webhook reconciliation
              remains available as a second confirmation path.
            </p>

            <div className="mt-6 rounded-[18px] bg-white/[.07] p-4">
              <p className="text-[8px] text-white/40">
                PAYMENT INTENT
              </p>
              <p className="mt-1 text-xs">
                {intent || "—"}
              </p>
            </div>

            {receipt ? (
              <Link
                href={`/billing/receipt/${encodeURIComponent(
                  receipt
                )}`}
                className="mt-4 flex h-12 items-center justify-center rounded-[16px] bg-[#efc99a] text-[9px] uppercase tracking-[.11em] text-[#201713]"
              >
                Open receipt
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
