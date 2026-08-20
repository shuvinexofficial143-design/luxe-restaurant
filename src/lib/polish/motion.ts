export function prefersReducedMotion(){return typeof window!=="undefined"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}
export function clamp(v:number,min:number,max:number){return Math.min(max,Math.max(min,v))}
