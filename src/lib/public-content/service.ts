import type { Locale } from "@/lib/i18n/types";
import { localizeCMSItem } from "@/lib/i18n/cms-localization";
import { supabasePublicCMS } from "@/lib/server/supabase/public-cms";
import type { PublicCollection, PublicContentItem } from "./types";

export async function getPublishedCollection(
  collection: string,
  locale: Locale,
  limit = 100
): Promise<PublicCollection> {
  const rows = await supabasePublicCMS.listPublished(collection, limit);

  return {
    collection,
    locale,
    items: rows.map((item) => localizeCMSItem(item, locale)),
  };
}

export async function getPublishedContentItem(
  collection: string,
  slug: string,
  locale: Locale
): Promise<PublicContentItem | null> {
  const item = await supabasePublicCMS.findPublishedBySlug(
    collection,
    slug
  );

  return item ? localizeCMSItem(item, locale) : null;
}
