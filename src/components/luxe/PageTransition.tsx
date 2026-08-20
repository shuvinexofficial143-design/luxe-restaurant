"use client";
import type{ReactNode}from"react";import{usePathname}from"next/navigation";
export default function PageTransition({children}:{children:ReactNode}){const p=usePathname();return <div key={p} className="lx-route-enter">{children}</div>}
