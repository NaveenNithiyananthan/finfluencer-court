import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "court" | "ghost" | "outline";

const toneClasses: Record<Tone, string> = {
  primary: "bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:brightness-105 disabled:opacity-40",
  court: "bg-court text-court-foreground hover:brightness-105",
  ghost: "text-muted-foreground hover:text-foreground border border-border bg-surface/60",
  outline: "border border-border bg-surface text-foreground hover:border-primary/60",
};

export function CtaButton({
  to,
  children,
  tone = "primary",
  variant,
  withArrow = true,
  className,
  ...props
}: any) {
  const activeTone = variant || tone;
  const baseClasses = "group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-display text-base font-semibold transition-all active:scale-[0.985] disabled:cursor-not-allowed";

  if (to) {
    return (
      <Link to={to} className={cn(baseClasses, toneClasses[activeTone as Tone], className)}>
        {children}
        {withArrow && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />}
      </Link>
    );
  }

  return (
    <button {...props} className={cn(baseClasses, toneClasses[activeTone as Tone], className)}>
      {children}
    </button>
  );
}