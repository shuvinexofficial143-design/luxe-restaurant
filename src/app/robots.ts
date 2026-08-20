import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const site = (
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://luxe-restaurant.example.com"
  ).replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/account/secure/"],
      },
    ],
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}
