import { CtaButton } from "./CtaButton";
import type { ZunoProgress } from "@/lib/zuno-progress";

export function ContinueJourneyCard({ progress }: { progress: ZunoProgress }) {
  const afterFanPortfolio = progress.fanPortfolioViewed;
  return (
    <section className="surface-card animate-fade-up p-6 transition-shadow duration-300 hover:shadow-elevated sm:p-8">
      <p className="zuno-eyebrow">Continue your journey</p>
      {afterFanPortfolio ? (
        <>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            You've explored concentration and diversification.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            That completes the core decision journey. Optional next: keep training your judgement.
          </p>
          <div className="mt-5 rounded-2xl border border-court/20 bg-[color-mix(in_oklab,var(--court)_4%,var(--surface))] p-4">
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
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            You've stress-tested your decision.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
