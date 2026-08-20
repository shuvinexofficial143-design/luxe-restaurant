export type DayHours={day:string;open:string;close:string;closed?:boolean};
export type NearbyPlace={id:string;name:string;category:"Hotel"|"Landmark"|"Parking"|"Transit";distanceKm:number;walkMinutes:number;driveMinutes:number;note:string;query:string};
export type VisitPreference={transport:"Car"|"Cab"|"Walk"|"Transit";arrivalBuffer:number;parking:boolean;accessibility:boolean};
export type VisitPlan={id:string;date:string;bookingTime:string;leaveTime:string;transport:VisitPreference["transport"];parking:boolean;accessibility:boolean;createdAt:string};
