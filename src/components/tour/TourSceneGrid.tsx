import type { TourScene } from "@/lib/media/types";
import TourSceneCard from "./TourSceneCard";

export default function TourSceneGrid({
  scenes,
}: {
  scenes: TourScene[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {scenes.map((scene, index) => (
        <TourSceneCard key={scene.slug} scene={scene} index={index} />
      ))}
    </div>
  );
}
