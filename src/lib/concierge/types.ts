export type Lang = "en" | "hi";
export type Role = "user" | "assistant";
export type Intent = "MENU" | "DIETARY" | "BOOKING" | "WINE" | "EVENTS" | "PRIVATE" | "ORDER" | "GENERAL";
export type Message = { id:string; role:Role; text:string; createdAt:string };
export type Reply = { text:string; intent:Intent; links:{label:string; href:string}[] };
