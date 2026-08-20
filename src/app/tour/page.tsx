import LuxeShell from "@/components/luxe/LuxeShell";
import VirtualTourHome from "@/components/tour/VirtualTourHome";

export const metadata = { title: "Virtual Tour" };

export default function TourPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1180px]">
          <VirtualTourHome />
        </div>
      </section>
    </LuxeShell>
  );
}
