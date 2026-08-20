import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import MenuClient from "@/components/menu/MenuClient";
import MenuStats from "@/components/menu/MenuStats";
import MenuHeroActions from "@/components/menu/MenuHeroActions";
import AllergenNotice from "@/components/menu/AllergenNotice";
import { dishes } from "@/lib/menu/data";

export const metadata = { title: "Advanced Menu" };

export default function MenuPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Interactive menu"
        title="Menu"
        text="Search dishes, filter dietary needs, save favourites and open every dish for full details."
        image="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="px-3 py-6 md:px-5 md:py-10">
        <div className="mx-auto max-w-[1180px]">
          <MenuStats dishes={dishes} />
          <div className="mt-4"><MenuHeroActions /></div>
          <div className="mt-4"><AllergenNotice /></div>
          <div className="mt-6"><MenuClient dishes={dishes} /></div>
        </div>
      </section>
    </LuxeShell>
  );
}
