import type {Locale} from "./types";
const tag=(l:Locale)=>l==="hi"?"hi-IN":"en-IN";
export const formatCurrency=(v:number,l:Locale)=>new Intl.NumberFormat(tag(l),{style:"currency",currency:"INR",maximumFractionDigits:0}).format(v);
export const formatDate=(v:string|Date,l:Locale)=>new Intl.DateTimeFormat(tag(l),{day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Kolkata"}).format(new Date(v));
export const formatDateTime=(v:string|Date,l:Locale)=>new Intl.DateTimeFormat(tag(l),{day:"numeric",month:"short",hour:"numeric",minute:"2-digit",timeZone:"Asia/Kolkata"}).format(new Date(v));
