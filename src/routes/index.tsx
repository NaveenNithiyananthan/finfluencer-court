import { createFileRoute } from "@tanstack/react-router";
import { ZunoShell } from "@/components/zuno/ZunoNav";
import { Hero } from "@/components/zuno/Hero";
import { ThemeTicker } from "@/components/zuno/ThemeTicker";
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
        <Hero />
        <ThemeTicker />

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
