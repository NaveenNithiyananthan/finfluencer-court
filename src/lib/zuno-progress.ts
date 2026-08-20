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

export const mockProgress: ZunoProgress = {
  returning: true,
  declared: true,
  stressTested: true,
  fanPortfolioViewed: false,
  courtChallengesCompleted: 2,
  riskRecognitionScore: 3,
  riskRecognitionMax: 5,
  lastDecision: "£500 speculative investment",
  concepts: [
    { label: "FOMO recognition", level: "Strong" },
    { label: "Downside awareness", level: "Improving" },
    { label: "Concentration", level: "Improving" },
    { label: "Influencer claims", level: "New" },
  ],
};

export function useZunoProgress(): ZunoProgress {
  return mockProgress;
}