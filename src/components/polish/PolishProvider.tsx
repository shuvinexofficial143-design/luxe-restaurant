"use client";
import type{ReactNode}from"react";import{useEffect}from"react";
export default function PolishProvider({children}:{children:ReactNode}){useEffect(()=>{document.documentElement.dataset.luxePolish="1";return()=>{delete document.documentElement.dataset.luxePolish}},[]);return <>{children}</>}
