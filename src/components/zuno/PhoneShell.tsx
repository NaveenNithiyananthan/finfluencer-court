import type { ReactNode } from "react";

interface PhoneShellProps {
  children: ReactNode;
  onBack?: (() => void) | undefined;
  step?: ReactNode | undefined;
}

export function PhoneShell({ children, onBack, step }: PhoneShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-12 pt-6 sm:max-w-lg">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                aria-label="Go back"
                className="grid size-9 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
              >
                ←
              </button>
            ) : null}
            <span className="font-display text-lg font-bold tracking-[0.3em] text-foreground">
              ZUNO
            </span>
          </div>
          {step}
        </div>
        <main className="flex-1">{children}</main>
        <p className="mt-10 text-center text-[11px] leading-relaxed text-muted-foreground">
          ZUNO is a decision-training prototype. Nothing here is financial advice or a personalised
          recommendation. Figures are illustrative demo data.
        </p>
      </div>
    </div>
  );
}
