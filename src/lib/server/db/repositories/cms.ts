import { BaseRepository } from "../repository";
import { getDatabase } from "../client";
import type { DBRecord } from "../types";

export type CMSContentRow = DBRecord & {
  id: string;
  collection: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  category: string;
  status: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export class CMSRepository extends BaseRepository<CMSContentRow> {
  constructor() {
    super(getDatabase(), "cms_content");
  }

  async listPublished(collection: string) {
    const result = await this.db.query<CMSContentRow>({
      text:
        "select * from cms_content where collection = $1 and status = 'PUBLISHED' order by sort_order asc, created_at desc",
      values: [collection],
    });
    return result.rows;
  }
}

export const cmsRepository = new CMSRepository();
