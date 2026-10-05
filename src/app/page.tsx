
import LuxeShell from "@/components/luxe/LuxeShell";
import HomeHero from "@/components/luxe/HomeHero";
import HomeSections from "@/components/luxe/HomeSections";
import StructuredDataScript from "@/components/public/StructuredDataScript";
import { restaurantStructuredData } from "@/lib/public-content/structured-data";

export const metadata = {
  title: "LUXE · Modern Fire Dining",
  description:
    "Modern fire dining in Indore — seasonal plates, curated wine and thoughtful hospitality.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <LuxeShell>
      <StructuredDataScript data={restaurantStructuredData()} />
      <HomeHero />
      <HomeSections />
    </LuxeShell>
  );
}
