import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/types";
import { localePath } from "@/lib/i18n/links";
import type { PublicContentItem } from "./types";

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://luxe-restaurant.example.com"
  ).replace(/\/$/, "");
}

export function buildPublicMetadata(input: {
  locale: Locale;
  item?: PublicContentItem | null;
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonicalPath =
    input.item?.canonical_path || localePath(input.locale, input.path);
  const canonical = `${siteUrl()}${canonicalPath}`;
  const image =
    input.item?.og_image_url || input.item?.image_url || undefined;

  return {
    title: input.item?.seo_title || input.title,
    description: input.item?.seo_description || input.description,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl()}${localePath("en", input.path)}`,
        hi: `${siteUrl()}${localePath("hi", input.path)}`,
      },
    },
    robots: input.item?.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      title: input.item?.seo_title || input.title,
      description: input.item?.seo_description || input.description,
      url: canonical,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export function publicSiteUrl() {
  return siteUrl();
}
