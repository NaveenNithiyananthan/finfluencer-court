import { CtaButton } from "./CtaButton";

export function FanPortfolioCard() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -bottom-10 size-64 rounded-full bg-primary opacity-10 blur-3xl"
      />
      <div className="relative">
        <p className="zuno-eyebrow">Fan Portfolio</p>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
          Love the idea. Think about the exposure.
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Explore the Fan Portfolio and see how diversification changes your dependence on one
          prediction.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background/50 p-5">
            <p className="font-display text-sm font-bold">Concentrated position</p>
            <div className="mt-3 h-2 rounded-full bg-secondary">
              <div className="h-2 w-full rounded-full bg-destructive/70" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              One outcome. Highly dependent on one prediction.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-background/50 p-5">
            <p className="font-display text-sm font-bold">Fan Portfolio</p>
            <div className="mt-3 flex gap-1">
              {[40, 25, 20, 15].map((w) => (
                <div
                  key={w}
                  style={{ width: `${w}%` }}
                  className="h-2 rounded-full bg-primary/70"
                />
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Multiple exposures. Less dependent on one prediction.
            </p>
          </div>
        </div>
        <CtaButton to="/portfolio" className="mt-6">
          Explore Fan Portfolio
        </CtaButton>
        <p className="mt-4 text-xs text-muted-foreground/80">
          Educational illustration of concentration versus diversification. Not a recommendation or
          financial advice.
        </p>
      </div>
    </section>
  );
}
