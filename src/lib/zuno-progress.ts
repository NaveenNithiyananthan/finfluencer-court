export type ZunoProgress = {
  returning: boolean;
  declared: boolean;
  stressTested: boolean;
  fanPortfolioViewed: boolean;
  courtChallengesCompleted: number;
  riskRecognitionScore: number;
  riskRecognitionMax: number;
  lastDecision: string;
  concepts: { label: string; level: "New" | "Improving" | "Strong" }[];
};

import { formatGBP } from "./zuno-data";
import { useZunoSession } from "./zuno-session";

export function useZunoProgress(): ZunoProgress {
  const { session } = useZunoSession();
  const court = session.courtProgress;
  const concepts = session.educationalConcepts.map(
    (label, index) =>
      ({
        label,
        level: index === 0 && court.score > 0 ? "Improving" : "New",
      }) as const,
  );
  return {
    returning: Boolean(session.declaration),
    declared: Boolean(session.declaration),
    stressTested: session.stressTestCompleted,
    fanPortfolioViewed: session.portfolioViewed,
    courtChallengesCompleted: court.completed,
    riskRecognitionScore: court.score,
    riskRecognitionMax: court.max,
    lastDecision: session.declaration
      ? `${formatGBP(session.declaration.amount)} ${session.declaration.decisionType ?? "decision"}`
      : "",
    concepts,
  };
}
