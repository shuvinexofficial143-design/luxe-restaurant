import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getPublishedCollection } from "@/lib/public-content/service";
import { buildPublicMetadata } from "@/lib/public-content/seo";
import CMSJournalPreview from "@/components/public/CMSJournalPreview";
import CMSContentFallback from "@/components/public/CMSContentFallback";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return buildPublicMetadata({
    locale,
    title: locale === "hi" ? "LUXE जर्नल" : "LUXE Journal",
    description:
      locale === "hi"
        ? "LUXE के प्रकाशित जर्नल और कहानियाँ।"
        : "Published stories and journal entries from LUXE.",
    path: "/journal/live",
  });
}

export default async function LiveJournalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const collection = await getPublishedCollection("journal", locale, 100);

  return (
    <section>
      <div className="rounded-[30px] bg-[#335f50] p-6 text-white">
        <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
          {locale === "hi" ? "LUXE जर्नल" : "LUXE Journal"}
        </p>
        <h1 className="lx-serif mt-2 text-5xl">
          {locale === "hi"
            ? "CMS से प्रकाशित कहानियाँ।"
            : "Stories published from CMS."}
        </h1>
      </div>

      <div className="mt-4">
        {collection.items.length ? (
          <CMSJournalPreview items={collection.items} locale={locale} />
        ) : (
          <CMSContentFallback />
        )}
      </div>
    </section>
  );
}
