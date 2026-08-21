import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "court" | "ghost" | "outline";

type CtaButtonProps = {
  to?: string;
  children: ReactNode;
  tone?: Tone;
  variant?: Tone;
  withArrow?: boolean;
  className?: string;
  onClick?: () => void;
};

const toneClasses: Record<Tone, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-glow hover:brightness-110 disabled:opacity-40",
  court:
    "bg-court text-court-foreground shadow-[0_0_0_1px_color-mix(in_oklab,var(--court)_22%,transparent),0_12px_32px_-14px_color-mix(in_oklab,var(--court)_55%,transparent)] hover:brightness-110",
  ghost: "surface-card text-muted-foreground hover:text-foreground hover:border-primary/40",
  outline: "surface-card hover:border-primary/50 hover:text-primary",
};

export function CtaButton({
  to,
  children,
  tone = "primary",
  variant,
  withArrow = true,
  className,
  onClick,
}: CtaButtonProps) {
  const activeTone = variant || tone;
  const baseClasses =
    "group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-display text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40";

  if (to) {
    return (
      <Link to={to} className={cn(baseClasses, toneClasses[activeTone as Tone], className)}>
        {children}
        {withArrow && (
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(baseClasses, toneClasses[activeTone as Tone], className)}
    >
      {children}
    </button>
  );
}
