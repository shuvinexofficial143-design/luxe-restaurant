import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getPublishedContentItem } from "@/lib/public-content/service";
import { buildPublicMetadata } from "@/lib/public-content/seo";
import CMSHero from "@/components/public/CMSHero";
import StructuredDataScript from "@/components/public/StructuredDataScript";
import { articleStructuredData } from "@/lib/public-content/structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const item = await getPublishedContentItem("journal", slug, locale);
  if (!item) return {};

  return buildPublicMetadata({
    locale,
    item,
    title: `${item.title} · LUXE Journal`,
    description: item.excerpt,
    path: `/journal/live/${slug}`,
  });
}

export default async function LiveJournalArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const item = await getPublishedContentItem("journal", slug, locale);
  if (!item) notFound();

  return (
    <>
      <StructuredDataScript data={articleStructuredData(item)} />
      <CMSHero
        item={item}
        kicker={locale === "hi" ? "प्रकाशित जर्नल" : "Published journal"}
      />
      <article className="mt-4 rounded-[24px] bg-[#fffaf4] p-6">
        <p className="text-sm leading-8 text-[#5f514b]">{item.excerpt}</p>
        <p className="mt-5 text-[9px] uppercase tracking-[.1em] text-[#8a756b]">
          {item.published_at
            ? new Date(item.published_at).toLocaleDateString("en-IN")
            : "Published"}
        </p>
      </article>
    </>
  );
}
