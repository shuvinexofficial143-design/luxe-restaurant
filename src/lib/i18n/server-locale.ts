import {cookies} from "next/headers";
import {localeCookieName,normalizeLocale} from "./config";
export async function getServerLocale(){const c=await cookies();return normalizeLocale(c.get(localeCookieName)?.value)}
