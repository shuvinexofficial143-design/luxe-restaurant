import LuxeShell from "@/components/luxe/LuxeShell";
import ApplicationConfirmation from "@/components/careers/ApplicationConfirmation";

export const metadata = { title: "Application Confirmation" };

export default async function ApplicationConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[760px]">
          <ApplicationConfirmation id={id} />
        </div>
      </section>
    </LuxeShell>
  );
}
