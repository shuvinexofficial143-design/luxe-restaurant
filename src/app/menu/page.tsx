
import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import MenuClient from "@/components/menu/MenuClient";
import MenuStats from "@/components/menu/MenuStats";
import MenuHeroActions from "@/components/menu/MenuHeroActions";
import AllergenNotice from "@/components/menu/AllergenNotice";
import FloatingMenuDeck from "@/components/luxe/redesign/FloatingMenuDeck";
import LuxurySectionHeading from "@/components/luxe/redesign/LuxurySectionHeading";
import { dishes } from "@/lib/menu/data";

export const metadata = {
  title: "Menu · LUXE",
};

export default function MenuPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Our menu"
        title="Fire & finesse"
        text="A premium menu experience with curated signatures, dietary filters, favourites and full dish details."
        image="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1800&q=82"
      />

      <section className="px-3 py-8 md:px-5 md:py-14">
        <div className="mx-auto max-w-[1240px]">
          <LuxurySectionHeading
            eyebrow="Animated menu showcase"
            title="Tonight's menu"
            italic="in motion."
            text="Dark floating boards and compact food moments bring the promo-video feel into the website without filling the page with giant images."
          />
          <FloatingMenuDeck />
        </div>
      </section>

      <section className="px-3 pb-10 md:px-5 md:pb-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="rounded-[28px] border border-[#e7c58f]/12 bg-[#0d0b08] p-3 md:p-6">
            <MenuStats dishes={dishes} />
            <div className="mt-4">
              <MenuHeroActions />
            </div>
            <div className="mt-4">
              <AllergenNotice />
            </div>
            <div className="mt-6">
              <MenuClient dishes={dishes} />
            </div>
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
