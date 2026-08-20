import type {Locale} from "./types";
import {supportedLocales} from "./types";
export const defaultLocale:Locale="en";
export const localeCookieName="luxe_locale";
export function isLocale(v:string):v is Locale{return supportedLocales.includes(v as Locale)}
export function normalizeLocale(v?:string|null):Locale{return v&&isLocale(v)?v:defaultLocale}
