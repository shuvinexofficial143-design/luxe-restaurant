import type {Locale,Dictionary} from "./types";
export async function getDictionary(locale:Locale):Promise<Dictionary>{
 return locale==="hi"?(await import("./messages/hi")).default:(await import("./messages/en")).default;
}
