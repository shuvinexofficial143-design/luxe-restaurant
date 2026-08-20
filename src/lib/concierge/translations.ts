import type { Lang } from "./types";
const copy={en:{title:"LUXE Concierge",placeholder:"Ask LUXE anything...",send:"Send",clear:"Clear chat"},
hi:{title:"LUXE कॉन्सियर्ज",placeholder:"LUXE से कुछ भी पूछें...",send:"भेजें",clear:"चैट साफ करें"}} as const;
export function tr(lang:Lang,key:keyof typeof copy.en){return copy[lang][key];}
