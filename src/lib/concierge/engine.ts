import { detectIntent } from "./intent";
import { dishPicks, winePicks } from "./recommendations";
import type { Lang, Reply } from "./types";
export function replyTo(text:string,lang:Lang):Reply{
  const intent=detectIntent(text), hi=lang==="hi";
  if(intent==="DIETARY"||intent==="MENU"){
    const names=dishPicks(text).map(d=>d.name).join(", ");
    return {intent,text:hi?`आपके लिए ${names} अच्छे विकल्प हैं। गंभीर allergy हो तो staff से direct confirm करें।`:`Good matches are ${names}. For serious allergies, confirm directly with staff.`,links:[{label:hi?"मेन्यू":"Menu",href:"/menu"},{label:hi?"बुक करें":"Book",href:"/reservations"}]};
  }
  if(intent==="BOOKING") return {intent,text:hi?"Guest, date, time, dining area और table चुनकर booking कर सकते हैं।":"Choose guests, date, time, dining area and even a table.",links:[{label:hi?"बुकिंग":"Reservations",href:"/reservations"}]};
  if(intent==="WINE"){
    const names=winePicks(text).map(w=>w.name).join(", ");
    return {intent,text:hi?`Sommelier picks: ${names}.`:`Sommelier picks: ${names}.`,links:[{label:hi?"वाइन फाइंडर":"Wine finder",href:"/wine/sommelier"}]};
  }
  if(intent==="EVENTS") return {intent,text:hi?"Chef dinners, wine dinners, brunch और workshops उपलब्ध हैं।":"Chef dinners, wine dinners, brunches and workshops are available.",links:[{label:hi?"इवेंट":"Events",href:"/events"}]};
  if(intent==="PRIVATE") return {intent,text:hi?"Private dining rooms, packages और instant estimate उपलब्ध हैं।":"Private dining rooms, packages and instant estimates are available.",links:[{label:hi?"प्राइवेट डाइनिंग":"Private dining",href:"/private-dining"}]};
  if(intent==="ORDER") return {intent,text:hi?"Pickup और table ordering दोनों demo flow में हैं।":"Pickup and table ordering are both available in the demo flow.",links:[{label:hi?"ऑर्डर":"Order",href:"/order"}]};
  return {intent:"GENERAL",text:hi?"मैं menu, wine, booking, events, ordering और private dining में मदद कर सकता हूँ।":"I can help with menu, wine, reservations, events, ordering and private dining.",links:[{label:"Menu",href:"/menu"},{label:"Book",href:"/reservations"}]};
}
