import { useMemo } from "react";
import type { Declaration } from "@/lib/zuno-data";
import { Link } from "@tanstack/react-router";
import { AllocationControls } from "../AllocationControls";
import { AllocationLegend, AllocationRing } from "../AllocationRing";
import { ConcentrationMeter } from "../ConcentrationMeter";
import {
  BulletList,
  Callout,
  DemoTag,
  SectionHeader,
  Stat,
  ZunoButton,
  ZunoCard,
} from "../primitives";
import {
  applyReturn,
  activeExposures,
  concentrationLabel,
  CONCENTRATED_POSITION,
  defaultWeights,
  diversificationScore,
  FAN_CATEGORIES,
  formatMoney,
  formatPct,
  portfolioReturn,
  SIMULATED_AMOUNT,
  type CategoryId,
  type Weights,
} from "@/lib/fan-portfolio";
export { DeclareWizard } from "./DeclareWizard";
export { StressTest } from "./StressTest";
export { WhyRisky } from "./WhyRisky";
export { PauseScreen } from "./PauseScreen";

export function AlternativeIntro({
  decision,
  onNext,
}: {
  decision: Declaration | null;
  onNext: () => void;
}) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="From stress test to alternative"
        title="You do not have to stop caring about what excites you."
        supporting={
          decision?.userGoal === "entertainment"
            ? "You can keep the interest as entertainment without making one outcome carry the whole stake."
            : "The question is how you choose to get exposure."
        }
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <ZunoCard tone="danger">
          <p className="font-display text-lg font-semibold">Concentrated position</p>
          <BulletList
            tone="danger"
            items={["Highly dependent on one outcome", "One prediction decides the range"]}
          />
        </ZunoCard>
        <ZunoCard tone="primary">
          <p className="font-display text-lg font-semibold">Fan Portfolio</p>
          <BulletList
            tone="primary"
            items={["More diversified exposures", "Several parts of one ecosystem"]}
          />
        </ZunoCard>
      </div>
      <ZunoButton onClick={onNext}>Explore the Fan Portfolio</ZunoButton>
    </div>
  );
}
export function MeetFanPortfolio({
  decision,
  onNext,
}: {
  decision: Declaration | null;
  onNext: () => void;
}) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="The alternative"
        title="Meet the Fan Portfolio"
        supporting={
          decision?.assetOrOpportunity
            ? `A simulated alternative for staying connected to ${decision.assetOrOpportunity}.`
            : "A simulated portfolio built around the sports and entertainment ecosystem."
        }
      />
      <div className="space-y-3">
        {[
          "Same interest, different shape",
          "See how diversification changes the risk profile",
          "This is a simulation, not a shopping list",
        ].map((title, i) => (
          <div
            key={title}
            className="surface-card animate-fade-up flex items-center gap-3 p-4"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-primary/25 bg-gradient-to-br from-primary/20 to-primary/5 font-display text-sm font-semibold text-primary">
              {i + 1}
            </span>
            <p className="font-display text-base font-semibold">{title}</p>
          </div>
        ))}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        You can care about sport and still spread how you are exposed to it.
      </p>
      <ZunoButton onClick={onNext}>See the simulated portfolio</ZunoButton>
    </div>
  );
}
export function PortfolioDashboard({ amount, onNext }: { amount: number; onNext: () => void }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Portfolio dashboard"
        title="Fan Portfolio"
        supporting={`${formatMoney(amount)} simulated`}
      />
      <ZunoCard className="space-y-6">
        <AllocationRing
          centerBottom="Illustrative exposures"
          centerTop="6"
          weights={defaultWeights}
        />
        <AllocationLegend weights={defaultWeights} />
      </ZunoCard>
      <ul className="space-y-3">
        {FAN_CATEGORIES.map((category) => (
          <li
            key={category.id}
            className="flex items-start gap-3 rounded-2xl border border-border bg-surface/60 p-4"
          >
            <span
              className="mt-1 size-2.5 shrink-0 rounded-full"
              style={{ background: category.colorVar }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-medium">{category.name}</p>
                <span className="zuno-num text-sm">{category.defaultWeight}%</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{category.blurb}</p>
            </div>
          </li>
        ))}
      </ul>
      <DemoTag />
      <ZunoButton onClick={onNext}>Compare concentrated vs diversified</ZunoButton>
    </div>
  );
}
export function ConcentratedVsDiversified({
  amount = SIMULATED_AMOUNT,
  onNext,
}: {
  amount?: number;
  onNext: () => void;
}) {
  const result = portfolioReturn(defaultWeights);
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Concentrated vs diversified"
        title="What does diversification actually change?"
        supporting={`Two illustrative scenarios from the same ${formatMoney(amount)} starting amount.`}
      />
      <ZunoCard tone="danger" className="space-y-4">
        <p className="font-display text-lg font-semibold">One concentrated position</p>
        <div className="grid grid-cols-2 gap-4">
          <Stat label="If it falls 50%" tone="down" value={formatMoney(amount * 0.5)} />
          <Stat label="If it rises 50%" tone="up" value={formatMoney(amount * 1.5)} />
        </div>
      </ZunoCard>
      <ZunoCard tone="primary" className="space-y-4">
        <p className="font-display text-lg font-semibold">Fan Portfolio</p>
        <div className="grid grid-cols-2 gap-4">
          <Stat label="Weighted outcome" tone="up" value={formatPct(result)} />
          <Stat label="Starting amount becomes" value={formatMoney(applyReturn(amount, result))} />
        </div>
      </ZunoCard>
      <Callout label="The point">
        Diversification does not remove risk. It can change how much the result depends on one
        prediction.
      </Callout>
      <ZunoButton onClick={onNext}>Build your own version</ZunoButton>
    </div>
  );
}
export function BuildYourPortfolio({
  weights,
  setWeights,
  onNext,
}: {
  weights: Weights;
  setWeights: (weights: Weights) => void;
  onNext: () => void;
}) {
  const result = useMemo(() => portfolioReturn(weights), [weights]);
  const score = diversificationScore(weights);
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Build your Fan Portfolio"
        title="Move the weights and watch concentration change"
        supporting="There is no correct allocation here. The point is to feel the relationship between concentration and diversification."
      />
      <ZunoCard className="space-y-6">
        <AllocationRing
          centerBottom="Diversification score"
          centerTop={`${Math.round(score)}`}
          weights={weights}
        />
        <div className="grid grid-cols-2 gap-4">
          <Stat label="Exposures in play" value={`${activeExposures(weights)} of 6`} />
          <Stat
            label="Scenario outcome"
            tone={result >= 0 ? "up" : "down"}
            value={formatPct(result)}
          />
        </div>
      </ZunoCard>
      <ConcentrationMeter weights={weights} />
      <AllocationControls
        weights={weights}
        onChange={(id: CategoryId, value: number) => setWeights({ ...weights, [id]: value })}
        onReset={() => setWeights({ ...defaultWeights })}
      />
      <ZunoButton onClick={onNext}>Compare with your original decision</ZunoButton>
    </div>
  );
}
export function CompareDecision({
  amount,
  decision,
  weights,
  onNext,
}: {
  amount: number;
  decision: Declaration | null;
  weights: Weights;
  onNext: () => void;
}) {
  const score = diversificationScore(weights);
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Compare your decision"
        title="Two ways to express the same belief"
        supporting="Same interest in the industry. Very different dependence on being right about one thing."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <ZunoCard tone="danger" className="space-y-4">
          <p className="font-display text-lg font-semibold">Original idea</p>
          <Stat label="Exposures" value="1" />
          <Stat label="Amount" value={formatMoney(amount)} />
          <BulletList
            tone="danger"
            items={["Highly concentrated", decision?.idea || CONCENTRATED_POSITION.description]}
          />
        </ZunoCard>
        <ZunoCard tone="primary" className="space-y-4">
          <p className="font-display text-lg font-semibold">Fan Portfolio</p>
          <Stat label="Exposures" value={`${activeExposures(weights)}`} />
          <BulletList
            tone="primary"
            items={[concentrationLabel(score), "Spread across an ecosystem"]}
          />
        </ZunoCard>
      </div>
      <ZunoCard tone="quiet">
        <p className="text-[15px] leading-relaxed">
          The goal is not to tell you what to choose. It is to show that there are different ways to
          express the same financial belief.
        </p>
      </ZunoCard>
      <ZunoButton onClick={onNext}>What's next?</ZunoButton>
    </div>
  );
}
export function LearningTakeaway() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="What's next"
        title="Want to learn how portfolios are actually built?"
        supporting="Everything you just explored was a simulation."
      />
      <div className="bg-hero surface-card animate-scale-in space-y-4 p-6">
        <p className="font-display text-2xl font-semibold leading-snug tracking-tight">
          You've felt the difference between one outcome and a spread of them.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          The real skill is learning how investors choose, weight and review holdings over time —
          turning today's instinct into a repeatable process you could one day use with real money.
        </p>
      </div>
      <Link className="block" to="/">
        <ZunoButton>Back to home</ZunoButton>
      </Link>
    </div>
  );
}
