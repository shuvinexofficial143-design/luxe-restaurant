import { cn } from "@/lib/utils";
import { Diamond } from "./icons";

interface MarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  slow?: boolean;
}

/** Infinite editorial marquee — content duplicated for a seamless loop */
export default function Marquee({ items, className, itemClassName, slow }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className={cn("overflow-hidden", className)} aria-hidden>
      <div
        className={cn(
          "flex w-max items-center",
          slow ? "animate-marquee [animation-duration:64s]" : "animate-marquee"
        )}
      >
        {row.map((item, i) => (
          <span key={i} className={cn("flex items-center gap-8 pr-8 whitespace-nowrap", itemClassName)}>
            <span>{item}</span>
            <Diamond width={10} height={10} className="opacity-50" />
          </span>
        ))}
      </div>
    </div>
  );
}
