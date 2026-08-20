import {nearbyPlaces} from "@/lib/visit/data";import NearbyPlaceCard from "./NearbyPlaceCard";
export default function NearbyPlaces(){return <div className="grid gap-3 md:grid-cols-2">{nearbyPlaces.map(p=><NearbyPlaceCard key={p.id} place={p}/>)}</div>}
