import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://luxe-restaurant.example.com"),
  title: {
    default: "LUXE — Fine Dining",
    template: "%s · LUXE",
  },
  description:
    "LUXE is a contemporary fine-dining restaurant shaped by fire, season, provenance and warm hospitality.",
  keywords: [
    "LUXE restaurant",
    "fine dining",
    "tasting menu",
    "private dining",
    "chef's table",
    "luxury restaurant",
  ],
  openGraph: {
    title: "LUXE — Fine Dining",
    description:
      "Contemporary fine dining shaped by fire, season and provenance.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=90",
        width: 1600,
        height: 900,
        alt: "LUXE fine-dining experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXE — Fine Dining",
    description:
      "Contemporary fine dining shaped by fire, season and provenance.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
