import Reveal from "./Reveal";

export default function BrandManifesto() {
  return (
    <section className="relative overflow-hidden bg-[#fff8ed] py-24 md:py-32">
      <div className="absolute left-1/2 top-0 h-px w-[90%] -translate-x-1/2 bg-[#5b3429]/14" />
      <div className="lx-container">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
            <div>
              <p className="lx-kicker">The LUXE idea</p>
              <p className="mt-5 text-sm leading-7 text-[#6a554c]">
                A restaurant should feel memorable without trying to impress you every second.
              </p>
            </div>
            <div>
              <p className="lx-serif max-w-5xl text-[clamp(3.3rem,6vw,6.2rem)] leading-[.94] tracking-[-.045em]">
                Less performance.
                <span className="block italic text-[#7a2d21]">More presence.</span>
              </p>
              <p className="mt-8 max-w-2xl text-base leading-8 text-[#5e4c44]">
                Warm service, strong ingredients, considered wine and enough space for the evening to become your own.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
