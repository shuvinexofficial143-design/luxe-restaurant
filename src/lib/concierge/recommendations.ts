import { dishes } from "@/lib/menu/data";
import { wines } from "@/lib/wine/data";
export function dishPicks(q:string){
  const v=q.toLowerCase();
  if(v.includes("vegan")||v.includes("वीगन")) return dishes.filter(d=>d.dietary.includes("Vegan")).slice(0,3);
  if(v.includes("vegetarian")||v.includes("वेज")) return dishes.filter(d=>d.dietary.includes("Vegetarian")).slice(0,3);
  if(v.includes("gluten")) return dishes.filter(d=>d.dietary.includes("Gluten Free")).slice(0,3);
  return dishes.filter(d=>d.chefChoice).slice(0,3);
}
export function winePicks(q:string){
  const v=q.toLowerCase();
  if(v.includes("red")) return wines.filter(w=>w.type==="Red").slice(0,3);
  if(v.includes("white")) return wines.filter(w=>w.type==="White").slice(0,3);
  return wines.filter(w=>w.sommelierChoice).slice(0,3);
}
