import type { ReactNode } from "react";

interface PhoneShellProps {
  children: ReactNode;
  onBack?: (() => void) | undefined;
  step?: ReactNode | undefined;
}

export function PhoneShell({ children, onBack, step }: PhoneShellProps) {
  return (
    <div className="bg-hero min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pt-6 pb-12 sm:max-w-lg">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                aria-label="Go back"
                className="surface-card grid size-9 place-items-center rounded-full text-muted-foreground transition-all duration-200 hover:-translate-x-0.5 hover:text-foreground active:scale-95"
              >
                ←
              </button>
            ) : null}
            <span className="font-display text-lg font-bold tracking-[0.3em]">ZUNO</span>
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
