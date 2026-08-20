import { CtaButton } from "./CtaButton";
import type { ZunoProgress } from "@/lib/zuno-progress";

export function ContinueJourneyCard({ progress }: { progress: ZunoProgress }) {
  const afterFanPortfolio = progress.fanPortfolioViewed;
  return (
    <section className="rounded-3xl border border-primary/25 bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
      <p className="zuno-eyebrow">Continue your journey</p>
      {afterFanPortfolio ? (
        <>
          <h2 className="mt-3 text-2xl font-bold">
            You've explored concentration and diversification.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            That completes the core decision journey. Optional next: keep training your judgement.
          </p>
          <div className="mt-5 rounded-2xl border border-court/30 bg-background/40 p-4">
            <p className="font-display text-base font-bold">Ready to test your judgement?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Optional — Court is a standalone learning loop.
            </p>
            <CtaButton to="/court" tone="court" className="mt-4">
              Enter Finfluencer Court
            </CtaButton>
          </div>
        </>
      ) : (
        <>
          <h2 className="mt-3 text-2xl font-bold">You've stress-tested your decision.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Next: explore a different way to express your interest.
          </p>
          <CtaButton to="/portfolio" className="mt-5">
            Explore Fan Portfolio
          </CtaButton>
        </>
      )}
    </section>
  );
}
