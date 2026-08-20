import {restaurantLocation} from "./data";
export function googleMapsSearchUrl(q=restaurantLocation.fullAddress){return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`}
export function googleMapsDirectionsUrl(origin=""){const d=encodeURIComponent(restaurantLocation.fullAddress);return origin.trim()?`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${d}`:`https://www.google.com/maps/dir/?api=1&destination=${d}`}
export function whatsappUrl(message:string){return `https://wa.me/${restaurantLocation.whatsappNumber}?text=${encodeURIComponent(message)}`}
export function mailtoUrl(subject:string){return `mailto:${restaurantLocation.email}?subject=${encodeURIComponent(subject)}`}
