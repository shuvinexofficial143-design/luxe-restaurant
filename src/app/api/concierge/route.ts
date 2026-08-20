import { NextResponse } from "next/server";
import { replyTo } from "@/lib/concierge/engine";
import type { Lang } from "@/lib/concierge/types";
export async function POST(req:Request){
  try{const body=await req.json(); const text=typeof body.text==="string"?body.text.trim():""; const lang:Lang=body.lang==="hi"?"hi":"en";
    if(!text)return NextResponse.json({error:"Message required"},{status:400});
    return NextResponse.json(replyTo(text,lang));
  }catch{return NextResponse.json({error:"Concierge error"},{status:500});}
}
