import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import RoomGrid from "@/components/private-dining/RoomGrid";
import PrivateDiningForm from "@/components/private-dining/PrivateDiningForm";
import { privateDiningRooms } from "@/lib/private-dining/data";

export const metadata = { title: "Private Dining" };

export default function PrivateDiningPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Private celebrations"
        title="Private Dining"
        text="Choose a room, capacity and dining package — then send a full enquiry with an instant demo estimate."
        image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="px-3 py-6 md:px-5 md:py-10">
        <div className="mx-auto max-w-[1180px]">
          <div>
            <p className="lx-kicker">Four spaces</p>
            <h2 className="lx-serif mt-2 text-4xl md:text-6xl">
              A room for every kind of night.
            </h2>
            <div className="mt-5">
              <RoomGrid rooms={privateDiningRooms} />
            </div>
          </div>

          <div className="mt-12">
            <p className="lx-kicker">Build your event</p>
            <h2 className="lx-serif mt-2 text-4xl md:text-6xl">
              Plan the private experience.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#75645d]">
              Choose a space, package, guest count and date. The estimate updates before your demo enquiry is saved.
            </p>

            <div className="mt-6">
              <PrivateDiningForm />
            </div>
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
