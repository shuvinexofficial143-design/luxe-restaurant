import type {Locale} from "./types";
export type Localizable={title:string;excerpt:string;category:string;translations_json?:Record<string,Partial<{title:string;excerpt:string;category:string}>>|null};
export function localizeCMSItem<T extends Localizable>(item:T,locale:Locale):T{
 if(locale==="en")return item;
 const t=item.translations_json?.[locale];
 return t?{...item,title:t.title||item.title,excerpt:t.excerpt||item.excerpt,category:t.category||item.category}:item;
}
