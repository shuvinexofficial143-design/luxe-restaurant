"use client";
import{useEffect,useState}from"react";
export default function BackToTopFab(){const[v,setV]=useState(false);useEffect(()=>{const u=()=>setV(window.scrollY>720);u();window.addEventListener("scroll",u,{passive:true});return()=>window.removeEventListener("scroll",u)},[]);if(!v)return null;return <button type="button" aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className="fixed bottom-[92px] right-4 z-[80] hidden h-11 w-11 place-items-center rounded-full bg-[#201713] text-[#efc28b] shadow-xl md:grid">↑</button>}
