import type { ReactNode } from "react";
import { ZunoShell as TopNavShell } from "@/components/zuno/ZunoNav";
import { cn } from "@/lib/utils";

interface ZunoShellProps {
  moduleLabel: string;
  stepLabel: string;
  step: number;
  totalSteps: number;
  children: ReactNode;
}

/**
 * Module shell for multi-step flows (/portfolio).
 * Wraps the shared top-navigation shell and renders the flow's
 * step tracker inside the content area.
 */
export function ZunoShell({ moduleLabel, stepLabel, step, totalSteps, children }: ZunoShellProps) {
  return (
    <TopNavShell>
      <div className="mb-8">
        <span className="surface-card inline-flex rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {moduleLabel}
        </span>

        <div className="mt-4 flex items-baseline justify-between gap-3">
          <span className="zuno-eyebrow">{stepLabel}</span>
          <span className="zuno-num text-xs tracking-[0.14em] text-muted-foreground">
            {step} / {totalSteps}
          </span>
        </div>

        <div className="mt-3 flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 overflow-hidden rounded-full transition-colors duration-500",
                i < step ? "bg-primary" : "bg-surface-2",
              )}
              style={{ transitionDelay: `${i * 40}ms` }}
            />
          ))}
        </div>
      </div>

      {children}
    </TopNavShell>
  );
}
