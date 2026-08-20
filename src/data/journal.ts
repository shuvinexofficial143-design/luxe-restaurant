import { img } from "./images";

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  alt: string;
  featured?: boolean;
  blocks: ArticleBlock[];
}

export const articles: Article[] = [
  {
    slug: "the-dawn-ritual",
    title: "The Dawn Ritual: How Our Menu Is Written",
    excerpt:
      "Every morning at five, before the ovens are lit, Chef Moreau walks the market with a pencil and no plan. This is how the LUXE menu is born — again — every single day.",
    category: "Behind the Menu",
    date: "2026-02-12",
    readTime: "5 min read",
    image: img.market,
    alt: "Early morning produce at the wholesale market",
    featured: true,
    blocks: [
      {
        type: "paragraph",
        text: "There is a particular quality of light at New Covent Garden Market at five in the morning — sodium orange, breath visible, the air smelling of cut herbs and cold earth. This is where the LUXE menu begins. Not in a office, not on a spreadsheet, but on foot, with a pencil stub and an open mind.",
      },
      {
        type: "paragraph",
        text: "The discipline is simple and brutal: we do not decide what to cook and then find the ingredients. We find the ingredients and then decide what to cook. If the Cornish day boats landed beautiful turbot, turbot is on. If the celeriac is woody, it waits another week.",
      },
      { type: "heading", text: "A menu with a heartbeat" },
      {
        type: "paragraph",
        text: "By seven, the kitchen brigade gathers around the pass for what we call the reading. The day's menu is read aloud, course by course, like a short story. Everyone tastes everything. A dish does not go on because it is clever; it goes on because the room goes quiet when we taste it.",
      },
      {
        type: "quote",
        text: "A menu should have a heartbeat. If it reads the same in February as it does in June, something has died in the kitchen.",
        cite: "Julien Moreau, Executive Chef",
      },
      {
        type: "paragraph",
        text: "Guests sometimes ask why their favourite dish has disappeared. The honest answer: the season moved on, and so did we. But take heart — whatever replaced it was chosen at dawn, at its absolute peak, and cooked over fire by people who have been thinking about it all day.",
      },
    ],
  },
  {
    slug: "julien-moreau-on-fire",
    title: "Julien Moreau on Fire, Patience and the Perfect Duck",
    excerpt:
      "Twenty-eight days of ageing, six hours over embers, thirty seconds of carving. Our Executive Chef on the obsession behind LUXE's most ordered plate.",
    category: "Meet the Chef",
    date: "2026-01-28",
    readTime: "7 min read",
    image: img.chefPortraitApron,
    alt: "Julien Moreau working at the open hearth",
    blocks: [
      {
        type: "paragraph",
        text: "The duck arrives whole, from a single farm in the Wye Valley where the birds grow slowly and fly daily. It is aged for twenty-eight days — long enough for the meat to deepen, the skin to dry to parchment. Then, and only then, does it meet the fire.",
      },
      {
        type: "quote",
        text: "Everyone wants to talk about the fire. The fire is the easy part. The hard part is the twenty-seven days before, when you must simply wait and trust.",
        cite: "Julien Moreau",
      },
      {
        type: "paragraph",
        text: "Moreau cooked in three three-star kitchens before opening LUXE, and speaks about those years with gratitude and a faint wince. 'I learned everything,' he says, 'including what I would never do. I would never cook to impress a guidebook. I would never serve twenty courses when seven will do. And I would never, ever buy a tomato in January.'",
      },
      { type: "heading", text: "The last thirty seconds" },
      {
        type: "paragraph",
        text: "The duck is carved at the pass in under half a minute — a ritual the whole brigade learned by heart before being allowed near a bird. Blackberry, charred allium, a jus made from the roasting. It has been on the menu, in one seasonal disguise or another, since the day we opened.",
      },
      {
        type: "paragraph",
        text: "'People ask when I will take it off,' Moreau laughs. 'When the ducks tell me to.'",
      },
    ],
  },
  {
    slug: "six-hour-celeriac",
    title: "The Celeriac That Took Six Hours",
    excerpt:
      "It costs £24, it is entirely vegetable, and it outsells the lobster. The story of the humble root that became a LUXE signature.",
    category: "Ingredient Stories",
    date: "2026-01-15",
    readTime: "4 min read",
    image: img.vegetables,
    alt: "Winter vegetables and roots at their peak",
    blocks: [
      {
        type: "paragraph",
        text: "Celeriac is not a beautiful vegetable. It arrives muddy, gnarled, faintly apologetic. Most kitchens relegate it to a purée beneath something grander. At LUXE, it is the grand thing.",
      },
      {
        type: "paragraph",
        text: "The method is a study in patience. The whole root is rubbed with salt and buried in the embers of the hearth, where it bakes for six hours as the fire slowly dies around it. What emerges is transformed: the flesh silken, smoky, sweet — somewhere between roast chestnut and the best baked potato of your life.",
      },
      { type: "heading", text: "Luxury is attention" },
      {
        type: "paragraph",
        text: "We serve it with brown butter, aged comté and, in winter, truffle scraped at the table. Guests who order it as a curiosity reorder it as a creed. It is proof of the kitchen's founding belief: luxury is not the price of an ingredient, but the amount of attention you are willing to give it.",
      },
      {
        type: "quote",
        text: "Give a celeriac six hours and it will give you back everything.",
        cite: "Julien Moreau",
      },
    ],
  },
  {
    slug: "volcanic-soils-cellar-notes",
    title: "Volcanic Soils: This Month in the Cellar",
    excerpt:
      "From Etna to Santorini, Head Sommelier Sofia Ricci on the mineral thrill of wines grown in ancient lava — and what to drink them with.",
    category: "Wine Notes",
    date: "2025-12-18",
    readTime: "6 min read",
    image: img.wineBottle,
    alt: "A bottle from the LUXE cellar being presented",
    blocks: [
      {
        type: "paragraph",
        text: "There is a family of wines that taste, unmistakably, of the ground they came from — and that ground is black, basaltic, once molten. Volcanic wines have a tension and salinity that no other terroir quite replicates.",
      },
      {
        type: "paragraph",
        text: "This month the cellar leans into them. From Etna, a nerello mascalese that drinks like a Burgundy raised on lava; from Santorini, an assyrtiko so mineral it is practically a seafood dish by itself. Both are on the pairing menu, and both are poured by the glass for the curious.",
      },
      { type: "heading", text: "What to drink them with" },
      {
        type: "paragraph",
        text: "The rule at LUXE is simple: volcanic whites love anything from the sea — the scallop course is their natural home. Volcanic reds, with their fine tannins and smoky edge, belong beside the hearth: the duck, the lamb, anything that has met ember.",
      },
      {
        type: "quote",
        text: "Great volcanic wine is the taste of something catastrophic, transformed into something graceful. I find that very moving.",
        cite: "Sofia Ricci, Head Sommelier",
      },
    ],
  },


  {
    slug: "inside-the-wine-pairing-evening",
    title: "Inside the Wine Pairing Evening",
    excerpt:
      "Twenty guests, one long table, seven pours from the deepest corners of the cellar. Notes from our most theatrical night of the month.",
    category: "Restaurant Events",
    date: "2025-11-30",
    readTime: "5 min read",
    image: img.wineGlasses,
    alt: "Glasses raised at the LUXE wine pairing evening",
    blocks: [
      {
        type: "paragraph",
        text: "On the first Thursday of every month, The Wine Room fills with twenty people who, mostly, have never met. By the second pour — this month a grower champagne disgorged the same week — they are comparing notes like old friends.",
      },
      {
        type: "paragraph",
        text: "The format is deliberately backwards. Sofia chooses the wines first; Julien then writes a menu to meet them. 'Usually the kitchen leads and the cellar follows,' Sofia explains. 'Tonight the food is the accompaniment. It keeps both of us honest.'",
      },
      { type: "heading", text: "What guests take home" },
      {
        type: "paragraph",
        text: "Beyond the cellar book and the tasting notes, guests take home a small education: how to decant without theatre, when to serve a red cool, why the shape of a glass is physics rather than pretension. It is dinner as a masterclass — though it never once feels like a lesson.",
      },
      {
        type: "paragraph",
        text: "The next evening — Volcanic Soils II: The Islands — is on the first Thursday of next month. Seats go quickly; the waitlist for December numbered sixty.",
      },
    ],
  },
  {
    slug: "why-we-bake-at-5am",
    title: "Why We Bake Our Own Bread at 5am",
    excerpt:
      "Gabriel Fontaine arrives when the city is still asleep. By the time you sit down, his sourdough has been thinking about it for thirty-one hours.",
    category: "Behind the Menu",
    date: "2025-11-08",
    readTime: "4 min read",
    image: img.bread,
    alt: "Hearth-baked sourdough at LUXE",
    blocks: [
      {
        type: "paragraph",
        text: "The levain is older than the restaurant. Gabriel carried it from a bakery in Bordeaux in a thermos, on a ferry, in 2013. Every loaf at LUXE descends from that jar.",
      },
      {
        type: "paragraph",
        text: "Thirty-one hours pass between mixing and service: a slow, cold fermentation that builds flavour no shortcut can counterfeit. The loaves bake in the cooling hearth from the night before — residual ember heat, Gabriel insists, that no thermostat can imitate.",
      },
      {
        type: "quote",
        text: "Bread is the first thing a guest eats and the last thing they should have to think about. My job is that they remember only that it was warm.",
        cite: "Gabriel Fontaine, Boulanger",
      },
      {
        type: "paragraph",
        text: "It arrives at the table still crackling, with butter we culture ourselves and a little bowl of ember oil. It is only bread. It is never only bread.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function relatedArticles(slug: string, count = 2) {
  return articles.filter((a) => a.slug !== slug).slice(0, count);
}
