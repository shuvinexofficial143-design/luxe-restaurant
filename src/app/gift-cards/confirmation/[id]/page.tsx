import LuxeShell from "@/components/luxe/LuxeShell";
import GiftConfirmation from "@/components/gifts/GiftConfirmation";

export const metadata = { title: "Gift Confirmation" };

export default async function GiftConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[720px]">
          <GiftConfirmation id={id} />
        </div>
      </section>
    </LuxeShell>
  );
}
