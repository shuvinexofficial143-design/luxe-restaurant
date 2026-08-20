export interface MenuItem {
  name: string;
  description: string;
  price: string;
  tags?: string[];
}

export interface MenuCategory {
  id: string;
  label: string;
  note?: string;
  items: MenuItem[];
}

export const tastingMenu = {
  title: "The Tasting Menu",
  season: "Autumn — Winter",
  price: "£145",
  pairingPrice: "£95",
  note: "Seven courses, written each dawn around the day's finest produce. Served to the entire table.",
  courses: [
    {
      name: "Warmth & Welcome",
      description: "Sourdough from our hearth, cultured butter, whipped cod roe, ember oil",
    },
    {
      name: "From the Cold Larder",
      description: "Cured sea trout, pickled fennel, buttermilk, dill flower",
    },
    {
      name: "The Garden",
      description: "Ember-baked celeriac, brown butter, aged comté, winter truffle",
    },
    {
      name: "The Sea",
      description: "Hand-dived Orkney scallop, champagne beurre blanc, oscietra caviar",
    },
    {
      name: "The Hearth",
      description: "28-day dry-aged duck, blackberry, charred allium, roasting jus",
    },
    {
      name: "A Quiet Pause",
      description: "Frozen buttermilk, verbena, green apple — a palate at rest",
    },
    {
      name: "Sweet Embers",
      description: "Valrhona 70%, smoked caramel, barley ice cream, sea salt",
    },
  ],
};

export const menuCategories: MenuCategory[] = [
  {
    id: "starters",
    label: "Starters",
    note: "To begin — light, precise, seasonal.",
    items: [
      {
        name: "Cured Sea Trout",
        description: "Pickled fennel, buttermilk, dill flower, rye crisp",
        price: "£19",
        tags: ["gf"],
      },
      {
        name: "Hand-Dived Orkney Scallop",
        description: "Champagne beurre blanc, oscietra caviar, sea herbs",
        price: "£38",
        tags: ["signature"],
      },
      {
        name: "Ember-Baked Celeriac",
        description: "Six hours in ash, brown butter, aged comté, winter truffle",
        price: "£24",
        tags: ["v", "signature"],
      },
      {
        name: "Native Lobster Raviolo",
        description: "Bisque emulsion, dragoncello, Amalfi lemon",
        price: "£42",
        tags: ["signature"],
      },
      {
        name: "Heritage Beetroot",
        description: "Smoked eel cream, horseradish, apple, seeded crumb",
        price: "£17",
        tags: ["v"],
      },
      {
        name: "Foie Gras & Quince",
        description: "Torched foie gras, quince two ways, toasted brioche",
        price: "£26",
      },
      {
        name: "Consommé of the Hearth",
        description: "Clarified roasted vegetable broth, smoked bone marrow, chive oil",
        price: "£16",
      },
    ],
  },

  {
    id: "mains",
    label: "Main Courses",
    note: "From the fire — the heart of the kitchen.",
    items: [
      {
        name: "28-Day Dry-Aged Duck",
        description: "Honey and juniper lacquer, blackberry, charred allium, roasting jus",
        price: "£46",
        tags: ["signature"],
      },
      {
        name: "Wild Turbot",
        description: "Grilled on the bone, mussel and saffron broth, sea vegetables",
        price: "£52",
        tags: ["gf"],
      },
      {
        name: "Aged Sirloin & Bone Marrow",
        description: "45-day grass-fed sirloin, ember onions, marrow crumb, sauce bordelaise",
        price: "£54",
      },
      {
        name: "Cornish Lamb, Two Ways",
        description: "Herb-crusted rack, slow shoulder, smoked aubergine, anchovy",
        price: "£48",
      },
      {
        name: "Celeriac en Croûte",
        description: "Our signature vegetable Wellington, madeira glaze, pomme purée",
        price: "£34",
        tags: ["v"],
      },
      {
        name: "Butter-Poached Halibut",
        description: "Champagne sabayon, brown shrimp, sea purslane",
        price: "£49",
        tags: ["gf"],
      },
      {
        name: "Squab Pigeon",
        description: "Dry-aged squab, blackberry gastrique, celeriac, toasted hazelnut",
        price: "£44",
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    note: "A gentle ending — or a glorious one.",
    items: [
      {
        name: "Valrhona & Ember",
        description: "70% grand cru chocolate, smoked caramel, barley ice cream",
        price: "£18",
        tags: ["signature", "v"],
      },
      {
        name: "Burnt Honey Panna Cotta",
        description: "Roasted fig, thyme, olive oil, amaretti",
        price: "£15",
        tags: ["v"],
      },
      {
        name: "Apple & Wood Smoke",
        description: "Brûlée custard, smoked apple, brown butter crumble",
        price: "£16",
        tags: ["v"],
      },
      {
        name: "Blackberry & Almond",
        description: "Frangipane tart, blackberry leaf ice cream, verbena",
        price: "£15",
        tags: ["v"],
      },
      {
        name: "The Cheese Trolley",
        description: "A tour of the British Isles and France, quince, walnut bread",
        price: "£22",
        tags: ["v"],
      },
      {
        name: "Petits Fours",
        description: "With coffee or digestif — always from the hearth",
        price: "£8",
        tags: ["v"],
      },
    ],
  },
];


export interface WineSection {
  title: string;
  items: MenuItem[];
}

export const wineSections: WineSection[] = [
  {
    title: "By the Glass",
    items: [
      { name: "Champagne — Laherte Frères 'Ultradition' NV", description: "Champagne, France · 125ml", price: "£19" },
      { name: "Riesling — Dr. Loosen 2022", description: "Mosel, Germany · 125ml", price: "£13" },
      { name: "Chardonnay — Domaine Leflaive 'Mâcon-Verzé' 2021", description: "Burgundy, France · 125ml", price: "£18" },
      { name: "Pinot Noir — Burn Cottage 2021", description: "Central Otago, New Zealand · 125ml", price: "£17" },
      { name: "Nebbiolo — G.D. Vajra 'Langhe' 2022", description: "Piedmont, Italy · 125ml", price: "£15" },
      { name: "Sauternes — Château Coutet 2018", description: "Bordeaux, France · 75ml", price: "£16" },
    ],
  },
  {
    title: "Champagne & Sparkling",
    items: [
      { name: "Krug 'Grande Cuvée' 171ème", description: "Champagne, France", price: "£290" },
      { name: "Dom Pérignon 2013", description: "Champagne, France", price: "£380" },
      { name: "Nyetimber 'Classic Cuvée' MV", description: "West Sussex, England", price: "£95" },
      { name: "Bollinger 'Special Cuvée' NV", description: "Champagne, France", price: "£120" },
    ],
  },
  {
    title: "White",
    items: [
      { name: "Chablis 1er Cru 'Montmains' — Domaine Pinson 2021", description: "Burgundy, France", price: "£88" },
      { name: "Grüner Veltliner 'Smaragd' — Emmerich Knoll 2021", description: "Wachau, Austria", price: "£64" },
      { name: "Assyrtiko — Domaine Sigalas 2022", description: "Santorini, Greece", price: "£72" },
      { name: "Meursault — Domaine Roulot 2020", description: "Burgundy, France", price: "£240" },
    ],
  },
  {
    title: "Red",
    items: [
      { name: "Barolo — Vietti 'Castiglione' 2019", description: "Piedmont, Italy", price: "£110" },
      { name: "Pinot Noir — Domaine Dujac 'Morey-Saint-Denis' 2020", description: "Burgundy, France", price: "£185" },
      { name: "Rioja Gran Reserva — La Rioja Alta '904' 2015", description: "Rioja, Spain", price: "£130" },
      { name: "Syrah — Domaine Jamet 'Côte-Rôtie' 2019", description: "Rhône, France", price: "£210" },
    ],
  },
];

export const cocktails: MenuItem[] = [
  { name: "The Berkeley", description: "Smoked barrel-aged whisky, amaro, burnt orange, cedar mist", price: "£19" },
  { name: "Fig Leaf Martini", description: "Fig-leaf gin, dry vermouth, olive brine, frozen grapes", price: "£18" },
  { name: "Golden Hour", description: "Aged rum, salted honey, chamomile, champagne float", price: "£17" },
  { name: "Emerald Negroni", description: "Pistachio gin, campari, white vermouth, basil oil", price: "£18" },
  { name: "Crimson & Smoke", description: "Mezcal, blackberry, chipotle, lime, smoked salt", price: "£17" },
  { name: "The Sommelier's Spritz", description: "Elderflower, verjus, sparkling wine, verbena", price: "£16" },
  { name: "Pear & Rye", description: "Rye whiskey, poached pear, amontillado sherry, bitters", price: "£18" },
  { name: "Zero — The Garden", description: "Seedlip garden, cucumber, white tea, citrus — alcohol free", price: "£11" },
];

export const menuNotes = [
  "A discretionary 13.5% service charge is added to your bill.",
  "Menus change with the seasons — dishes may vary on the day.",
  "Please inform us of any allergies; our kitchen adapts gladly.",
];
