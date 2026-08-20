import LuxeShell from "@/components/luxe/LuxeShell";
import SubscriptionSuccess from "@/components/notifications/SubscriptionSuccess";

export const metadata = { title: "Newsletter Subscription" };

export default async function NewsletterSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id = "" } = await searchParams;

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[720px]">
          <SubscriptionSuccess id={id} />
        </div>
      </section>
    </LuxeShell>
  );
}
