
import MenuTile from "./MenuTile";

const menus = [
  {
    label: "SIGNATURES",
    title: "Fire & finesse",
    accent: "Tonight's plates",
    items: [
      [
        "Fire Trout",
        "saffron · charred lemon",
        "₹1,280",
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=86",
      ],
      [
        "Ember Cauliflower",
        "miso · plum · chilli",
        "₹760",
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=400&q=86",
      ],
    ],
  },
  {
    label: "EXPERIENCE",
    title: "Chef's fire table",
    accent: "8 seats · 7 courses",
    items: [
      [
        "Open Flame",
        "chef-led tasting",
        "₹4,900",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=86",
      ],
      [
        "Cellar Pairing",
        "curated wine flight",
        "₹2,200",
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=86",
      ],
    ],
  },
  {
    label: "SWEET",
    title: "After the fire",
    accent: "quiet finishes",
    items: [
      [
        "Burnt Honey",
        "sesame · milk ice cream",
        "₹620",
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=86",
      ],
      [
        "Dark Cacao",
        "smoke · coffee · salt",
        "₹690",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=86",
      ],
    ],
  },
];

export default function FloatingMenuDeck() {
  return (
    <div className="lx-menu-deck -mx-3 flex snap-x gap-4 overflow-x-auto px-3 pb-8 pt-5 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
      {menus.map((menu, index) => (
        <article
          key={menu.label}
          className="lx-menu-board lx-gold-glow min-w-[82vw] snap-center rounded-[27px] border border-[#e7c58f]/14 bg-[#0e0c09] p-4 md:min-w-0"
          style={{ animationDelay: `${index * -1.7}s` }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[7px] uppercase tracking-[.22em] text-[#c9944b]">
              {menu.label}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#d9ad6a] shadow-[0_0_16px_#c7813c]" />
          </div>

          <h3 className="lx-serif mt-4 text-3xl leading-none text-[#f2e5d3]">
            {menu.title}
          </h3>
          <p className="mt-2 text-[9px] uppercase tracking-[.14em] text-white/28">
            {menu.accent}
          </p>

          <div className="mt-5 space-y-2">
            {menu.items.map(([title, note, price, image]) => (
              <MenuTile
                key={title}
                title={title}
                note={note}
                price={price}
                image={image}
              />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
