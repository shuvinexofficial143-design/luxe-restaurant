import Link from "next/link";
export const metadata={title:"Choose Language · LUXE"};
export default function Page(){
 return <main className="min-h-screen bg-[#201713] p-4 text-white"><div className="mx-auto grid min-h-[90vh] max-w-[900px] place-items-center"><div className="w-full rounded-[34px] bg-[#fffaf4] p-8 text-[#201713]">
  <p className="text-[9px] text-[#7c241e]">LUXE Restaurant</p><h1 className="lx-serif mt-3 text-6xl">Choose your language.</h1><p className="mt-2 text-sm text-[#75645d]">अपनी पसंद की भाषा चुनें।</p>
  <div className="mt-7 grid gap-3 sm:grid-cols-2"><Link href="/en" className="rounded-[24px] bg-[#201713] p-6 text-white"><p className="lx-serif text-4xl">English</p></Link><Link href="/hi" className="rounded-[24px] bg-[#7c241e] p-6 text-white"><p className="lx-serif text-4xl">हिन्दी</p></Link></div>
 </div></div></main>;
}
