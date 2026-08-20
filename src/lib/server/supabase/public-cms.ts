import { SupabaseRepository } from "./repository";
import type { PublicContentItem } from "@/lib/public-content/types";

export class PublicCMSRepository extends SupabaseRepository<PublicContentItem> {
  constructor() {
    super("cms_content");
  }

  async listPublished(collection: string, limit = 100) {
    return this.list({
      limit,
      order: "sort_order.asc,published_at.desc",
      query:
        `collection=eq.${encodeURIComponent(collection)}` +
        `&status=eq.PUBLISHED&noindex=eq.false`,
    });
  }

  async findPublishedBySlug(collection: string, slug: string) {
    const rows = await this.list({
      limit: 1,
      query:
        `collection=eq.${encodeURIComponent(collection)}` +
        `&slug=eq.${encodeURIComponent(slug)}` +
        `&status=eq.PUBLISHED`,
    });

    return rows[0] || null;
  }
}

export const supabasePublicCMS = new PublicCMSRepository();
