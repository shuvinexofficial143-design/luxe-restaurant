import type {VisitPlan} from "./types";const KEY="luxe-visit-plans-v1";
function read():VisitPlan[]{if(typeof window==="undefined")return[];try{const v=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(v)?v:[]}catch{return[]}}
export const visitPlanStorage={list(){return read()},save(plan:VisitPlan){const x=read();localStorage.setItem(KEY,JSON.stringify([plan,...x.filter(i=>i.id!==plan.id)]));return plan}};
