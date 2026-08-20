import { cn } from "@/lib/utils";
import AnimatedText from "./AnimatedText";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
  description?: string;
}

/** Editorial section header: eyebrow rule + oversized serif title */
export default function SectionHeading({
  eyebrow,
  title,
  titleItalic,
  dark = false,
  align = "left",
  className,
  description,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Reveal y={16}>
        <p
          className={cn(
            "eyebrow flex items-center gap-4",
            align === "center" && "justify-center",
            dark ? "text-gold-400" : "text-wine-600"
          )}
        >
          <span aria-hidden className={cn("inline-block h-px w-10", dark ? "bg-gold-400/60" : "bg-wine-600/50")} />
          {eyebrow}
          {align === "center" && (
            <span aria-hidden className={cn("inline-block h-px w-10", dark ? "bg-gold-400/60" : "bg-wine-600/50")} />
          )}
        </p>
      </Reveal>
      <h2
        className={cn(
          "mt-6 font-display text-[clamp(2.4rem,5.5vw,4.75rem)] leading-[1.02] font-light tracking-[-0.01em]",
          dark ? "text-cream-50" : "text-ink-900"
        )}
      >
        <AnimatedText text={title} />
        {titleItalic && (
          <>
            {" "}
            <em className={cn("font-normal", dark ? "text-gold-300" : "text-wine-600")}>
              <AnimatedText text={titleItalic} delay={0.15} />
            </em>
          </>
        )}
      </h2>
      {description && (
        <Reveal delay={0.25}>
          <p
            className={cn(
              "mt-6 max-w-xl text-base leading-relaxed font-light",
              align === "center" && "mx-auto",
              dark ? "text-cream-100/70" : "text-ink-600"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
