import Reveal from "./Reveal";

export default function ChefQuote() {
  return (
    <section className="relative isolate overflow-hidden bg-[#1a0d09] py-24 text-white md:py-32">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-35"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2200&q=90")',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(20,8,5,.96),rgba(20,8,5,.76),rgba(20,8,5,.58))]" />

      <div className="lx-container">
        <Reveal>
          <div className="max-w-5xl">
            <p className="text-[10px] uppercase tracking-[.34em] text-[#efb36c]">From the kitchen</p>
            <blockquote className="lx-serif mt-7 text-[clamp(3.2rem,6.5vw,7rem)] leading-[.94] tracking-[-.04em]">
              “The best plate is the one where the ingredient still feels like itself.”
            </blockquote>
            <p className="mt-8 text-[10px] uppercase tracking-[.25em] text-white/45">
              Aarav Mehra · Executive Chef
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
