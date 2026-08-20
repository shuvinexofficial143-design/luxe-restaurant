import LuxeShell from "@/components/luxe/LuxeShell";
import ReviewSuccess from "@/components/reviews/ReviewSuccess";

export const metadata = { title: "Thank You" };

export default async function ReviewThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id = "" } = await searchParams;

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[720px]">
          <ReviewSuccess id={id} />
        </div>
      </section>
    </LuxeShell>
  );
}
