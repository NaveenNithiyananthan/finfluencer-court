import { createFileRoute } from "@tanstack/react-router";
import { ZunoShell } from "@/components/zuno/ZunoNav";
import { CtaButton } from "@/components/zuno/CtaButton";
import { JourneyTracker } from "@/components/zuno/JourneyTracker";
import { FanPortfolioCard } from "@/components/zuno/FanPortfolioCard";
import { CourtEntryCard } from "@/components/zuno/CourtEntryCard";
import { RiskRecognitionCard } from "@/components/zuno/RiskRecognitionCard";
import { ContinueJourneyCard } from "@/components/zuno/ContinueJourneyCard";
import { ReturningUserPanel } from "@/components/zuno/ReturningUserPanel";
import { useZunoProgress } from "@/lib/zuno-progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZUNO — Think before you win." },
      {
        name: "description",
        content:
          "Understand the risk behind the hype before you act. Stress-test a decision, explore the Fan Portfolio, or train your judgement in Finfluencer Court.",
      },
      { property: "og:title", content: "ZUNO — Think before you win." },
      {
        property: "og:description",
        content: "Understand the risk behind the hype before you act.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const progress = useZunoProgress();

  return (
    <ZunoShell>
      <div className="space-y-12 lg:space-y-16">
        <section>
          <p className="font-display text-sm font-bold tracking-[0.28em] text-muted-foreground">
            ZUNO
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Think before you <span className="text-primary">win.</span>
          </h1>
          <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
            Understand the risk behind the hype before you act. ZUNO helps you think — it never
            tells you what to invest in.
          </p>

          <div className="mt-8 rounded-3xl border border-primary/30 bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
            <p className="zuno-eyebrow">Decision support</p>
            <h2 className="mt-3 text-2xl font-bold">Test a decision</h2>
            <p className="mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
              Thinking about putting your money into something? Stress-test it first.
            </p>
            <CtaButton to="/test" className="mt-6">
              Test a decision
            </CtaButton>
          </div>
        </section>

        <CourtEntryCard variant="hero" />

        {progress.returning ? <ReturningUserPanel progress={progress} /> : null}

        <JourneyTracker />

        <FanPortfolioCard />

        <CourtEntryCard variant="feature" />

        <ContinueJourneyCard progress={progress} />

        <RiskRecognitionCard progress={progress} />

        <p className="text-xs leading-relaxed text-muted-foreground/80">
          ZUNO is an education prototype. It uses simulated data and does not provide investment
          advice, personalised recommendations, or any assessment of your financial suitability.
        </p>
      </div>
    </ZunoShell>
  );
}