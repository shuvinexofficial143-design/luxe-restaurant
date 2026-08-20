export default function I18nStatusCard(){
 return <div className="rounded-[26px] bg-[#201713] p-5 text-white"><p className="text-[9px] text-[#efc28b]">INTERNATIONALIZATION</p><h2 className="lx-serif mt-2 text-3xl">English + हिन्दी foundation.</h2><div className="mt-5 grid grid-cols-2 gap-2">{[["2","locales"],["EN / HI","routes"],["INR","currency"],["IST","time zone"]].map(([v,l])=><div key={l} className="rounded-[15px] bg-white/[.06] p-3"><p className="lx-serif text-2xl text-[#efc28b]">{v}</p><p className="text-[8px] text-white/40">{l}</p></div>)}</div></div>;
}
