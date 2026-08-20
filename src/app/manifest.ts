import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LUXE Restaurant",
    short_name: "LUXE",
    description:
      "A premium mobile-first restaurant experience for menus, reservations, wine, events, ordering and guest services.",
    start_url: "/app",
    display: "standalone",
    background_color: "#f7f1e8",
    theme_color: "#201713",
    orientation: "portrait",
    categories: ["food", "lifestyle"],
    icons: [
      {
        src: "/luxe-app-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
