import type { MetadataRoute } from "next";
import { publicCmsSitemapEntries } from "@/lib/public-content/sitemap";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = (
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://luxe-restaurant.example.com"
  ).replace(/\/$/, "");

  const rootPaths = [
    "",
    "/menu",
    "/reservations",
    "/gallery",
    "/experiences",
    "/journal",
    "/events",
    "/contact",
    "/location",
    "/about",
    "/chefs",
    "/private-dining",
    "/wine",
    "/tour",
  ];

  const rootEntries = rootPaths.map((path) => ({
    url: `${site}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.7,
  }));

  const localizedPaths = ["", "/menu", "/reservations", "/visit"];
  const locales = ["en", "hi"] as const;

  const localizedEntries = localizedPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 0.8 : 0.6,
    }))
  );

  let dynamicEntries: MetadataRoute.Sitemap = [];

  try {
    const cms = await publicCmsSitemapEntries();

    dynamicEntries = cms.flatMap((item) =>
      locales.map((locale) => {
        const path =
          item.collection === "menu"
            ? `/menu/live/${item.slug}`
            : item.collection === "journal"
              ? `/journal/live/${item.slug}`
              : `/events/live/${item.slug}`;

        return {
          url: `${site}/${locale}${path}`,
          lastModified: new Date(item.updatedAt),
          changeFrequency: "weekly" as const,
          priority: 0.65,
        };
      })
    );
  } catch {
    dynamicEntries = [];
  }

  return [...rootEntries, ...localizedEntries, ...dynamicEntries];
}
