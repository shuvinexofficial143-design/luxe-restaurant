import { SupabaseRepository } from "./repository";

export type CMSDBRow = {
  id: string;
  collection: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  category: string;
  price: number | null;
  status: string;
  featured: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export class SupabaseCMSRepository extends SupabaseRepository<CMSDBRow> {
  constructor() {
    super("cms_content");
  }

  async listPublished(collection: string) {
    return this.list({
      limit: 200,
      order: "sort_order.asc",
      query: `collection=eq.${encodeURIComponent(
        collection
      )}&status=eq.PUBLISHED`,
    });
  }
}

export const supabaseCMS = new SupabaseCMSRepository();
