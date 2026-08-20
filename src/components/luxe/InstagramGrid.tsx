import Reveal from "./Reveal";

const images = [
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=90",
];

export default function InstagramGrid() {
  return (
    <section className="bg-[#fff8ed] py-20 md:py-24">
      <div className="lx-container">
        <Reveal>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="lx-kicker">A glimpse of service</p>
              <h2 className="lx-serif mt-4 text-4xl md:text-5xl">@luxe.table</h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-[#66534b]">
              Demo social gallery. Connect verified social links before launch.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {images.map((image, index) => (
            <Reveal key={image} delay={index * 50}>
              <a
                href="#"
                aria-label={`Demo social image ${index + 1}`}
                className="lx-image-zoom group block"
              >
                <div
                  className="aspect-square bg-cover bg-center"
                  style={{ backgroundImage: `url("${image}")` }}
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
