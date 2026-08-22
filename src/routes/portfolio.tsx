import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ZunoShell } from "@/components/zuno/ZunoShell";
import {
  AlternativeIntro,
  BuildYourPortfolio,
  CompareDecision,
  ConcentratedVsDiversified,
  LearningTakeaway,
  MeetFanPortfolio,
  PortfolioDashboard,
} from "@/components/zuno/screens";
import { defaultWeights, type Weights } from "@/lib/fan-portfolio";
import { ZunoButton, ZunoLinkButton } from "@/components/zuno/primitives";
import { useZunoSession } from "@/lib/zuno-session";

const TITLE = "ZUNO Fan Portfolio — explore a diversified alternative";
const DESCRIPTION =
  "A simulated Fan Portfolio built around the sports and entertainment ecosystem. See how concentration and diversification change what your decision depends on.";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: PortfolioModule,
});

const STEPS = [
  "Step 1 — Alternative",
  "Step 2 — Fan Portfolio",
  "Step 3 — Allocation",
  "Step 4 — Compare outcomes",
  "Step 5 — Build",
  "Step 6 — Your decision",
  "Step 7 — Learn",
];

const scrollToTop = () => {
  if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
};

function PortfolioModule() {
  const [step, setStep] = useState(1);
  const [weights, setWeights] = useState<Weights>({ ...defaultWeights });
  const { session, markPortfolioViewed } = useZunoSession();
  const decision = session.declaration;
  const amount = decision?.amount ?? 500;

  useEffect(() => {
    if (decision && !session.portfolioViewed) markPortfolioViewed();
  }, [decision, markPortfolioViewed, session.portfolioViewed]);

  const next = () => {
    setStep((s) => Math.min(s + 1, STEPS.length));
    scrollToTop();
  };
  const back = () => {
    setStep((s) => Math.max(s - 1, 1));
    scrollToTop();
  };

  return (
    <ZunoShell
      moduleLabel="Alternative · Fan Portfolio"
      stepLabel={STEPS[step - 1] ?? STEPS[0]!}
      step={step}
      totalSteps={STEPS.length}
    >
      <div key={step} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {step === 1 && <AlternativeIntro decision={decision} onNext={next} />}
        {step === 2 && <MeetFanPortfolio decision={decision} onNext={next} />}
        {step === 3 && <PortfolioDashboard amount={amount} onNext={next} />}
        {step === 4 && <ConcentratedVsDiversified amount={amount} onNext={next} />}
        {step === 5 && (
          <BuildYourPortfolio weights={weights} setWeights={setWeights} onNext={next} />
        )}
        {step === 6 && (
          <CompareDecision amount={amount} decision={decision} weights={weights} onNext={next} />
        )}
        {step === 7 && <LearningTakeaway />}
      </div>

      {step > 1 ? (
        <div className="pt-4">
          <ZunoButton variant="ghost" onClick={back}>
            Back
          </ZunoButton>
        </div>
      ) : (
        <div className="pt-4">
          <ZunoLinkButton to="/test" variant="ghost">
            Back to Stress Test
          </ZunoLinkButton>
        </div>
      )}
    </ZunoShell>
  );
}
