import type {DayHours,NearbyPlace} from "./types";
export const restaurantLocation={name:"LUXE Restaurant",addressLine1:"Vijay Nagar",addressLine2:"Indore, Madhya Pradesh 452010",country:"India",fullAddress:"LUXE Restaurant, Vijay Nagar, Indore, Madhya Pradesh 452010, India",latitude:22.7533,longitude:75.8937,phoneDisplay:"+91 731 555 0147",phoneHref:"+917315550147",whatsappNumber:"917315550147",email:"hello@luxe-restaurant.example.com",valet:true,parking:true,accessibility:true,note:"Vijay Nagar location with valet, parking and accessible arrival support."};
export const weeklyHours:DayHours[]=[
{day:"Monday",open:"18:00",close:"23:00"},{day:"Tuesday",open:"18:00",close:"23:00"},{day:"Wednesday",open:"18:00",close:"23:00"},{day:"Thursday",open:"18:00",close:"23:00"},{day:"Friday",open:"18:00",close:"23:30"},{day:"Saturday",open:"12:00",close:"23:30"},{day:"Sunday",open:"11:30",close:"22:30"}];
export const nearbyPlaces:NearbyPlace[]=[
{id:"n1",name:"Vijay Nagar Square",category:"Landmark",distanceKm:.7,walkMinutes:9,driveMinutes:4,note:"Useful landmark for cab pickup and drop-off.",query:"Vijay Nagar Square Indore"},
{id:"n2",name:"Radisson Blu Hotel Indore",category:"Hotel",distanceKm:1.8,walkMinutes:24,driveMinutes:8,note:"Nearby hotel reference for out-of-town guests.",query:"Radisson Blu Hotel Indore"},
{id:"n3",name:"Brilliant Convention Centre",category:"Landmark",distanceKm:2.5,walkMinutes:34,driveMinutes:10,note:"Common event and conference reference point.",query:"Brilliant Convention Centre Indore"},
{id:"n4",name:"Vijay Nagar Transit Area",category:"Transit",distanceKm:1.1,walkMinutes:14,driveMinutes:6,note:"Transit reference for the demo planner.",query:"Vijay Nagar Indore"},
{id:"n5",name:"Public Parking — Vijay Nagar",category:"Parking",distanceKm:.4,walkMinutes:5,driveMinutes:2,note:"Fallback public-parking reference in demo mode.",query:"parking Vijay Nagar Indore"}];
