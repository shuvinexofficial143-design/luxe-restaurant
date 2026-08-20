import type {VisitPreference} from "./types";
function parse(v:string){const m=v.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);if(!m)return null;let h=Number(m[1]);const mi=Number(m[2]),ap=m[3].toUpperCase();if(ap==="PM"&&h!==12)h+=12;if(ap==="AM"&&h===12)h=0;return h*60+mi}
function fmt(total:number){const n=((total%1440)+1440)%1440;let h=Math.floor(n/60);const m=n%60,ap=h>=12?"PM":"AM";h%=12;if(!h)h=12;return `${h}:${String(m).padStart(2,"0")} ${ap}`}
export function travelEstimate(t:VisitPreference["transport"]){return t==="Walk"?25:t==="Transit"?30:t==="Cab"?18:20}
export function suggestedLeaveTime(time:string,p:VisitPreference){const b=parse(time);if(b===null)return"Plan manually";return fmt(b-travelEstimate(p.transport)-p.arrivalBuffer-(p.parking?10:0)-(p.accessibility?10:0))}
