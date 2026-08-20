import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getPublishedContentItem } from "@/lib/public-content/service";
import { buildPublicMetadata } from "@/lib/public-content/seo";
import CMSHero from "@/components/public/CMSHero";
import StructuredDataScript from "@/components/public/StructuredDataScript";
import { eventStructuredData } from "@/lib/public-content/structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const item = await getPublishedContentItem("events", slug, locale);
  if (!item) return {};

  return buildPublicMetadata({
    locale,
    item,
    title: `${item.title} · LUXE Events`,
    description: item.excerpt,
    path: `/events/live/${slug}`,
  });
}

export default async function LiveEventPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const item = await getPublishedContentItem("events", slug, locale);
  if (!item) notFound();

  return (
    <>
      <StructuredDataScript data={eventStructuredData(item)} />
      <CMSHero
        item={item}
        kicker={locale === "hi" ? "प्रकाशित इवेंट" : "Published event"}
      />
    </>
  );
}
