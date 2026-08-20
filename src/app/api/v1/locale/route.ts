import {NextResponse} from "next/server";
import {localeCookieName,normalizeLocale} from "@/lib/i18n/config";
export async function POST(request:Request){
 let b:unknown={}; try{b=await request.json()}catch{}
 const r=b&&typeof b==="object"&&!Array.isArray(b)?b as Record<string,unknown>:{};
 const locale=normalizeLocale(typeof r.locale==="string"?r.locale:null);
 const res=NextResponse.json({ok:true,locale});
 res.cookies.set(localeCookieName,locale,{sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:31536000});
 return res;
}
