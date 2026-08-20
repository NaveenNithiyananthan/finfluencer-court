export type Horizon = "short" | "medium" | "long";
export type Driver = "conviction" | "hype" | "curiosity" | "fear-of-missing-out";
export type LossCapacity = "none" | "limited" | "manageable" | "high";

export interface Declaration {
  idea: string;
  amount: number;
  horizon: Horizon | null;
  driver: Driver | null;
  lossCapacity: LossCapacity | null;
}

export const emptyDeclaration: Declaration = {
  idea: "",
  amount: 500,
  horizon: null,
  driver: null,
  lossCapacity: null,
};

export const horizonOptions = [
  {
    id: "short" as const,
    label: "Less than a year",
    hint: "A short-term decision can leave less time to recover from a fall.",
  },
  {
    id: "medium" as const,
    label: "One to five years",
    hint: "You have some time, but the outcome can still be uneven.",
  },
  {
    id: "long" as const,
    label: "More than five years",
    hint: "A longer horizon may help, but it does not remove the risk of loss.",
  },
];

export const driverOptions = [
  {
    id: "conviction" as const,
    label: "I believe in the idea",
    hint: "Strong conviction can make downside feel easier to overlook.",
  },
  {
    id: "hype" as const,
    label: "It is getting a lot of attention",
    hint: "Popularity is not the same thing as evidence.",
  },
  {
    id: "curiosity" as const,
    label: "I want to learn by trying",
    hint: "Learning with money still needs a clear limit.",
  },
  {
    id: "fear-of-missing-out" as const,
    label: "I do not want to miss out",
    hint: "FOMO can compress the time available for a calm decision.",
  },
];

export const lossCapacityOptions = [
  {
    id: "none" as const,
    label: "I could not afford to lose it",
    hint: "That is a strong signal to pause before committing.",
  },
  {
    id: "limited" as const,
    label: "It would make things difficult",
    hint: "A loss could affect near-term plans or essentials.",
  },
  {
    id: "manageable" as const,
    label: "It would be uncomfortable but manageable",
    hint: "You have some room, but the loss would still matter.",
  },
  {
    id: "high" as const,
    label: "It would not change my plans",
    hint: "You may have more capacity, but the investment can still fall.",
  },
];

export const lossScenarios = [0, 10, 25, 50, 75];

export const formatGBP = (amount: number) =>
  amount.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export const recoveryGain = (lossPct: number) =>
  lossPct >= 100 ? Infinity : (lossPct / (100 - lossPct)) * 100;

export function scenarioCopy(declaration: Declaration) {
  const highPressure =
    declaration.lossCapacity === "none" || declaration.lossCapacity === "limited";
  return {
    eyebrow: highPressure ? "The downside matters" : "Stress test",
    title: highPressure ? "Could this loss change your plans?" : "What happens if it falls?",
    subtitle:
      "Move the scenario slider to see the part of the decision that excitement often hides.",
    visualiser: { prefix: "If it falls", recoveryMode: "market" },
    snapshotHeading: "Risk snapshot",
    reasoningTitle: "Why this deserves a pause",
    reasoningSubtitle:
      "The concern is not that the idea must fail. It is that several risks can stack together.",
  };
}

export function buildRiskSnapshot(declaration: Declaration) {
  return [
    {
      label: "Amount at risk",
      level: declaration.amount > 500 ? "High" : "Medium",
      note: "The full amount can be exposed to the outcome.",
    },
    {
      label: "Concentration",
      level: "High",
      note: "One decision may be carrying most of the expected result.",
    },
    {
      label: "Loss capacity",
      level:
        declaration.lossCapacity === "none"
          ? "Very High"
          : declaration.lossCapacity === "limited"
            ? "High"
            : "Medium",
      note: "A loss matters more when it competes with essential plans.",
    },
    {
      label: "Time pressure",
      level: declaration.driver === "fear-of-missing-out" ? "High" : "Medium",
      note: "Urgency can make it harder to test the original assumption.",
    },
  ];
}

export function buildReasoningCards(declaration: Declaration) {
  return [
    {
      title: "One outcome can decide everything",
      body: `If ${formatGBP(declaration.amount)} is tied to one idea, a disappointing result affects the whole amount rather than one part of it.`,
    },
    {
      title: "A loss needs a bigger recovery",
      body: "A 50% fall needs a 100% gain just to get back to where you started. The path down and the path back are not symmetrical.",
    },
    {
      title: "Your reason for acting is part of the risk",
      body:
        declaration.driver === "fear-of-missing-out"
          ? "When the main driver is fear of missing out, slowing down is a useful test of whether the decision still stands."
          : "Conviction can be useful, but it is strongest when paired with a plan for being wrong.",
    },
  ];
}

export const motivationOptions = [
  "Build long-term wealth",
  "Support something I care about",
  "Learn how markets work",
  "Feel part of a community",
];
