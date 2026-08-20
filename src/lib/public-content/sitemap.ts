import { supabasePublicCMS } from "@/lib/server/supabase/public-cms";

export async function publicCmsSitemapEntries() {
  const collections = ["menu", "journal", "events"];

  const rows = (
    await Promise.all(
      collections.map((collection) =>
        supabasePublicCMS.listPublished(collection, 500)
      )
    )
  ).flat();

  return rows.map((item) => ({
    collection: item.collection,
    slug: item.slug,
    updatedAt:
      item.updated_at || item.published_at || new Date().toISOString(),
  }));
}
