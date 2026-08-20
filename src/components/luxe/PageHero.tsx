export default function PageHero({
  eyebrow,title,text,image
}:{
  eyebrow:string;title:string;text:string;image:string;
}){
  return(
    <section className="px-3 pt-[86px] md:px-5 md:pt-[98px]">
      <div className="relative mx-auto min-h-[58svh] max-w-[1180px] overflow-hidden rounded-[32px] bg-[#241511] text-white md:min-h-[62vh] md:rounded-[40px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url("${image}")`}}/>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,10,7,.15),rgba(20,10,7,.86))]"/>
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-9 lg:p-12">
          <p className="text-[9px] uppercase tracking-[.24em] text-[#ffd198]">{eyebrow}</p>
          <h1 className="lx-serif mt-3 text-[clamp(3.8rem,15vw,8rem)] leading-[.82] tracking-[-.055em]">{title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/66 md:text-base">{text}</p>
        </div>
      </div>
    </section>
  )
}
