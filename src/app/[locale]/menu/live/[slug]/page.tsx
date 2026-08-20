import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getPublishedContentItem } from "@/lib/public-content/service";
import { buildPublicMetadata } from "@/lib/public-content/seo";
import CMSHero from "@/components/public/CMSHero";
import StructuredDataScript from "@/components/public/StructuredDataScript";
import { menuItemStructuredData } from "@/lib/public-content/structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const item = await getPublishedContentItem("menu", slug, locale);
  if (!item) return {};

  return buildPublicMetadata({
    locale,
    item,
    title: `${item.title} · LUXE`,
    description: item.excerpt,
    path: `/menu/live/${slug}`,
  });
}

export default async function LiveMenuItemPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const item = await getPublishedContentItem("menu", slug, locale);
  if (!item) notFound();

  return (
    <>
      <StructuredDataScript data={menuItemStructuredData(item)} />
      <CMSHero
        item={item}
        kicker={locale === "hi" ? "प्रकाशित मेन्यू आइटम" : "Published menu item"}
      />
      <div className="mt-4 rounded-[24px] bg-[#fffaf4] p-5">
        <p className="text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
          {item.category}
        </p>
        {typeof item.price === "number" ? (
          <p className="lx-serif mt-2 text-4xl text-[#335f50]">
            ₹{item.price.toLocaleString("en-IN")}
          </p>
        ) : null}
      </div>
    </>
  );
}
