/**
 * Curated imagery registry.
 * All photographs are served from Unsplash (free to use under the Unsplash
 * licence) with consistent art-direction parameters. Every image used on the
 * site is registered here so aspect ratios and treatments stay consistent.
 */

const u = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

/** Neutral dark shimmer used while remote images load */
export const BLUR_DATA_URL = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#241b15'/><stop offset='1' stop-color='#3d2c22'/></linearGradient></defs><rect width='16' height='16' fill='url(#g)'/></svg>`
)}`;

export const img = {
  /* ----- Hero & atmosphere ----- */
  heroTable: u("1414235077428-338989a2e8c0", 2200),
  heroDish: u("1551218808-94e220e084d2", 2200),
  candleTable: u("1428515613728-6b4607e44363", 1800),

  /* ----- Dishes ----- */
  scallop: u("1551218808-94e220e084d2"),
  salmon: u("1467003909585-2f8a72700288"),
  steak: u("1544025162-d76694265947"),
  duck: u("1432139555190-58524dae6a55"),
  platedGreen: u("1546069901-ba9599a7e63c"),
  platedFine: u("1559339352-11d035aa65de"),
  platedMinimal: u("1540189549336-e6e99c3679fe"),
  platedArt: u("1600565193348-f74bd3c7ccdf"),
  pasta: u("1473093295043-cdd812d0e601"),
  dessertChocolate: u("1551024506-0bccd828d307"),
  dessertPanna: u("1488477181946-6428a0291777"),
  dessertPlate: u("1565958011703-44f9829ba187"),
  bread: u("1509440159596-0249088772ff"),
  salad: u("1512621776951-a57141f2eefd"),
  soup: u("1547592166-23ac45744acd"),
  cheeseBoard: u("1452195100486-9cc805987862"),
  grillFire: u("1555939594-58d7cb561ad1"),
  brunchPlate: u("1555244162-803834f70033"),

  /* ----- Interior ----- */
  interiorMain: u("1517248135467-4c7edcad34c4", 2000),
  interiorWarm: u("1552566626-52f8b828add9", 2000),
  interiorBooth: u("1550966871-3ed3cdb5ed0c"),
  interiorDining: u("1466978913421-dad2ebd01d17"),
  interiorTable: u("1592861956120-e524fc739696"),
  barShelves: u("1470337458703-46ad1756a187"),
  barCounter: u("1514933651103-005eec06c04b"),
  restaurantFront: u("1555396273-367ea4eb4db5"),

  /* ----- Kitchen & craft ----- */
  chefPlating: u("1577219491135-ce391730fb2c"),
  chefPan: u("1556910103-1c02745aae4d"),
  chefFire: u("1533089860892-a7c6f0a88666"),
  kitchenTeam: u("1577106263724-2c8e03bfe9cf"),
  chefPortraitMain: u("1583394293214-28ded15ee548", 1400),
  chefPortraitApron: u("1581299894007-aaa50297cf16", 1400),
  chefCooking: u("1606491956689-2ea866880c84"),
  chefWoman: u("1595273670150-bd0c3c392e46", 1400),

  /* ----- Wine & drinks ----- */
  wineGlasses: u("1510812431401-41d2bd2722f3"),
  wineCellar: u("1547595628-c61a29f496f0"),
  wineVineyard: u("1506377247377-2a5b3b417ebb"),
  wineBottle: u("1568213816046-0ee1c42bd559"),
  cocktailAmber: u("1551538827-9c037cb4f32a"),
  cocktailCoupe: u("1514362545857-3bc16c4c7d1b"),
  cocktailSmoke: u("1536935338788-846bb9981813"),
  champagne: u("1578911373434-0cb395d2cbfb"),

  /* ----- People & events ----- */
  friendsDining: u("1528605248644-14dd04022da1"),
  dinnerParty: u("1464366400600-7168b8af9bc3"),
  weddingTable: u("1519225421980-715cb0215aed"),
  eventTable: u("1511795409834-ef04bbd61622"),
  sommelierPour: u("1566554273541-37a9ca77b91f"),
  portraitMan: u("1560250097-0b93528c311a", 1200),
  portraitWoman: u("1573496359142-b8d87734a5a2", 1200),
  portraitWomanTwo: u("1580489944761-15a19d654956", 1200),

  /* ----- Ingredients & sourcing ----- */
  vegetables: u("1466637574441-749b8f19452f"),
  spices: u("1596040033229-a9821ebd058d"),
  market: u("1488459716781-31db52582fe9"),
  coffee: u("1495474472287-4d71bcdd2085"),

  /* ----- City ----- */
  londonStreet: u("1513635269975-59663e0ac1ad"),
} as const;

export type ImageKey = keyof typeof img;
