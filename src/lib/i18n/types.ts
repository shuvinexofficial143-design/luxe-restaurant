export const supportedLocales=["en","hi"] as const;
export type Locale=(typeof supportedLocales)[number];
export type Dictionary={
 brand:string;
 nav:{home:string;menu:string;book:string;visit:string;account:string};
 home:{eyebrow:string;title:string;body:string;menuCta:string;bookCta:string};
 menu:{eyebrow:string;title:string;body:string;cta:string};
 reservations:{eyebrow:string;title:string;body:string;cta:string};
 visit:{eyebrow:string;title:string;body:string;cta:string};
 account:{eyebrow:string;title:string;body:string;cta:string};
};
