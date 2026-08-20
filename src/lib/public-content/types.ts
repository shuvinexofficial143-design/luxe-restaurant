import type { Locale } from "@/lib/i18n/types";

export type PublicContentItem = {
  id: string;
  collection: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image_url: string;
  price: number | null;
  status: string;
  featured: boolean;
  sort_order: number;
  translations_json?: Record<
    string,
    Partial<{
      title: string;
      excerpt: string;
      category: string;
    }>
  > | null;
  seo_title?: string | null;
  seo_description?: string | null;
  canonical_path?: string | null;
  og_image_url?: string | null;
  noindex?: boolean;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type PublicCollection = {
  collection: string;
  locale: Locale;
  items: PublicContentItem[];
};
