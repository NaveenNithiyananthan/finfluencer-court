import { Gavel } from "lucide-react";
import { CtaButton } from "./CtaButton";

const verdicts = ["Legitimate", "Risky", "Misleading"];

export function CourtEntryCard({ variant }: { variant: "hero" | "feature" }) {
  const hero = variant === "hero";
  return (
    <section className="surface-card animate-fade-up relative overflow-hidden p-6 transition-shadow duration-300 hover:shadow-elevated sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-20 size-64 rounded-full bg-court opacity-15 blur-3xl"
      />
      <div className="relative">
        <div className="flex items-center gap-2.5">
          <span className="bg-court/10 grid size-8 place-items-center rounded-full text-court">
            <Gavel className="size-4" />
          </span>
          <p className="zuno-eyebrow text-court/80">Finfluencer Court · Standalone</p>
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          {hero ? "Think you can spot the hype?" : "Can you spot a bad financial claim?"}
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          {hero
            ? "Judge viral financial claims and train your risk recognition."
            : "See the claim. Make the call. Then find out what you missed."}
        </p>
        {!hero ? (
          <div className="mt-6 rounded-2xl border border-border bg-surface-2/50 p-5">
            <p className="zuno-eyebrow">The claim</p>
            <p className="mt-2 font-display text-lg font-bold">“This stock is guaranteed to 5x.”</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {verdicts.map((v) => (
                <span
                  key={v}
                  className="surface-card rounded-full px-4 py-2 text-xs font-semibold text-muted-foreground"
                >
                  {v}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground/80">
              Verdict revealed inside the Court.
            </p>
          </div>
        ) : null}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <CtaButton to="/court" tone="court">
            {hero ? "Enter Court" : "Enter the Court"}
          </CtaButton>
          <p className="text-xs text-muted-foreground">
            No investment required. Just your judgement.
          </p>
        </div>
      </div>
    </section>
  );
}
