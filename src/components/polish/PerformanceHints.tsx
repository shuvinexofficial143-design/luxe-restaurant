"use client";
import{useEffect}from"react";
export default function PerformanceHints(){useEffect(()=>{const r=document.documentElement;const n=navigator as unknown as{connection?:{saveData?:boolean}};r.dataset.saveData=n.connection?.saveData?"true":"false";return()=>{delete r.dataset.saveData}},[]);return null}
