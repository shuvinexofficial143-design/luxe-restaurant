import LuxeShell from "@/components/luxe/LuxeShell";
import AccountNav from "@/components/account/AccountNav";
import ProfileCard from "@/components/account/ProfileCard";
import ProfileEditor from "@/components/account/ProfileEditor";
import DietaryPreferenceEditor from "@/components/account/DietaryPreferenceEditor";
import OccasionEditor from "@/components/account/OccasionEditor";

export const metadata = { title: "Guest Profile" };

export default function ProfilePage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1000px]">
          <p className="lx-kicker">Guest profile</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Know me better.</h1>
          <div className="mt-5"><AccountNav /></div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <ProfileCard />
            <ProfileEditor />
            <DietaryPreferenceEditor />
            <OccasionEditor />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
