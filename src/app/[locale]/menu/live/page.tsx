import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getPublishedCollection } from "@/lib/public-content/service";
import { buildPublicMetadata } from "@/lib/public-content/seo";
import CMSMenuPreview from "@/components/public/CMSMenuPreview";
import CMSContentFallback from "@/components/public/CMSContentFallback";
import StructuredDataScript from "@/components/public/StructuredDataScript";
import { restaurantStructuredData } from "@/lib/public-content/structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return buildPublicMetadata({
    locale,
    title: locale === "hi" ? "लाइव मेन्यू · LUXE" : "Live Menu · LUXE",
    description:
      locale === "hi"
        ? "LUXE के प्रकाशित CMS मेन्यू को देखें।"
        : "Browse the published LUXE CMS menu.",
    path: "/menu/live",
  });
}

export default async function LiveCMSMenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const collection = await getPublishedCollection("menu", locale, 100);

  return (
    <>
      <StructuredDataScript data={restaurantStructuredData()} />
      <section className="rounded-[30px] bg-[#7c241e] p-6 text-white">
        <p className="text-[9px] uppercase tracking-[.14em] text-[#ffd0aa]">
          {locale === "hi" ? "प्रकाशित CMS मेन्यू" : "Published CMS menu"}
        </p>
        <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
          {locale === "hi"
            ? "डेटाबेस से लाइव मेन्यू।"
            : "The menu, live from CMS."}
        </h1>
      </section>

      <div className="mt-4">
        {collection.items.length ? (
          <CMSMenuPreview items={collection.items} />
        ) : (
          <CMSContentFallback />
        )}
      </div>
    </>
  );
}
