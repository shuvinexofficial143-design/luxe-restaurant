import { notFound } from "next/navigation";
import LuxeShell from "@/components/luxe/LuxeShell";
import PanoramaViewer from "@/components/tour/PanoramaViewer";
import TourNavigator from "@/components/tour/TourNavigator";
import TourInfoPanel from "@/components/tour/TourInfoPanel";
import { getTourScene, tourScenes } from "@/lib/media/data";

export function generateStaticParams() {
  return tourScenes.map((scene) => ({ slug: scene.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scene = getTourScene(slug);
  return { title: scene ? `${scene.name} Tour` : "Virtual Tour" };
}

export default async function TourScenePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scene = getTourScene(slug);

  if (!scene) notFound();

  return (
    <LuxeShell>
      <section className="px-3 pt-[92px] md:px-5 md:pt-[104px]">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
            <PanoramaViewer scene={scene} />
            <div className="space-y-3">
              <TourInfoPanel scene={scene} />
              <TourNavigator scene={scene} />
            </div>
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
