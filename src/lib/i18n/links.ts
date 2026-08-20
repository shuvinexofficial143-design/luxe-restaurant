import type {Locale} from "./types";
export function localePath(locale:Locale,path=""){const p=path.startsWith("/")?path:`/${path}`;return `/${locale}${p==="/"?"":p}`}
export function swapLocalePath(path:string,locale:Locale){const a=path.split("/").filter(Boolean);if(a[0]==="en"||a[0]==="hi"){a[0]=locale;return "/"+a.join("/")}return localePath(locale,path)}
