import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getPublishedCollection } from "@/lib/public-content/service";
import { buildPublicMetadata } from "@/lib/public-content/seo";
import CMSEventPreview from "@/components/public/CMSEventPreview";
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
    title: locale === "hi" ? "LUXE इवेंट्स" : "LUXE Events",
    description:
      locale === "hi"
        ? "LUXE के प्रकाशित इवेंट्स देखें।"
        : "Browse published LUXE events.",
    path: "/events/live",
  });
}

export default async function LiveEventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const collection = await getPublishedCollection("events", locale, 100);

  return (
    <section>
      <div className="rounded-[30px] bg-[#7c241e] p-6 text-white">
        <p className="text-[9px] uppercase tracking-[.14em] text-[#ffd0aa]">
          {locale === "hi" ? "लाइव इवेंट्स" : "Live events"}
        </p>
        <h1 className="lx-serif mt-2 text-5xl">
          {locale === "hi" ? "CMS से प्रकाशित इवेंट्स।" : "Events published from CMS."}
        </h1>
      </div>

      <div className="mt-4">
        {collection.items.length ? (
          <CMSEventPreview items={collection.items} locale={locale} />
        ) : (
          <CMSContentFallback />
        )}
      </div>
    </section>
  );
}
