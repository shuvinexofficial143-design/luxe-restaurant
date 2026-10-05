
import LuxeShell from "@/components/luxe/LuxeShell";
import HomeHero from "@/components/luxe/HomeHero";
import HomeSections from "@/components/luxe/HomeSections";

export const metadata = {
  title: "LUXE · Modern Fire Dining",
  description:
    "Modern fire dining in Indore — seasonal plates, curated wine and thoughtful hospitality.",
};

export default function HomePage() {
  return (
    <LuxeShell>
      <HomeHero />
      <HomeSections />
    </LuxeShell>
  );
}
