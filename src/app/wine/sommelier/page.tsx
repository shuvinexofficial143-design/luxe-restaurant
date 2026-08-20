import LuxeShell from "@/components/luxe/LuxeShell";
import SommelierQuiz from "@/components/wine/SommelierQuiz";

export const metadata = { title: "Sommelier Finder" };

export default function SommelierPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1050px]">
          <p className="lx-kicker">Recommendation engine</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Find my wine.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75645d]">
            Choose your mood, dish, body and budget. This demo recommendation engine ranks cellar matches locally; a real AI sommelier can be connected later.
          </p>

          <div className="mt-7">
            <SommelierQuiz />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
