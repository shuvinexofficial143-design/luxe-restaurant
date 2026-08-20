import LuxeShell from "@/components/luxe/LuxeShell";
import HomeHero from "@/components/luxe/HomeHero";
import HomeSections from "@/components/luxe/HomeSections";

export default function HomePage() {
  return (
    <LuxeShell>
      <HomeHero />
      <HomeSections />
    </LuxeShell>
  );
}
