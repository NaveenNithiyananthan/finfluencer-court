import type { ReactNode } from "react";
import { DISCLAIMER } from "@/lib/fan-portfolio";
import { cn } from "@/lib/utils";

interface ZunoShellProps {
  moduleLabel: string;
  stepLabel: string;
  step: number;
  totalSteps: number;
  children: ReactNode;
}

export function ZunoShell({ moduleLabel, stepLabel, step, totalSteps, children }: ZunoShellProps) {
  return (
    <div className="relative min-h-screen">
      <div className="zuno-hero-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
      <div className="zuno-court-lines pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-40" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 pb-10 pt-6 sm:px-8">
        <header className="flex items-center justify-between gap-3">
          <span className="font-display text-lg font-bold tracking-[0.3em] text-foreground">
            ZUNO
          </span>
          <span className="rounded-full border border-border bg-surface/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {moduleLabel}
          </span>
        </header>

        <div className="mt-6">
          <div className="flex items-baseline justify-between">
            <span className="zuno-eyebrow">{stepLabel}</span>
            <span className="text-xs tracking-[0.14em] text-muted-foreground">
              {step} / {totalSteps}
            </span>
          </div>
          <div className="mt-3 flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-500",
                  i < step ? "bg-primary" : "bg-surface-2",
                )}
              />
            ))}
          </div>
        </div>

        <main className="flex-1 pt-8">{children}</main>

        <footer className="pt-12">
          <p className="text-center text-xs leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
        </footer>
      </div>
    </div>
  );
}
