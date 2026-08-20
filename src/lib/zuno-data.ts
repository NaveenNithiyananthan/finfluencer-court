export type Horizon = "short" | "medium" | "long";
export type Driver = "conviction" | "hype" | "curiosity" | "fear-of-missing-out";
export type LossCapacity = "none" | "limited" | "manageable" | "high";
export type DecisionType = "crypto" | "stock" | "gambling" | "etf";
export type UserGoal =
  "make-money-quickly" | "exposure" | "understand" | "trend" | "support" | "entertainment";

export interface Declaration {
  idea: string;
  amount: number;
  decisionType: DecisionType | null;
  assetOrOpportunity: string;
  horizon: Horizon | null;
  driver: Driver | null;
  lossCapacity: LossCapacity | null;
  userGoal: UserGoal | null;
}

export const emptyDeclaration: Declaration = {
  idea: "",
  amount: 500,
  decisionType: null,
  assetOrOpportunity: "",
  horizon: null,
  driver: null,
  lossCapacity: null,
  userGoal: null,
};

export const decisionTypeOptions = [
  {
    id: "crypto" as const,
    label: "Crypto or a speculative asset",
    hint: "A price-driven opportunity with high uncertainty.",
  },
  {
    id: "stock" as const,
    label: "One individual stock",
    hint: "Your outcome depends heavily on one company and one thesis.",
  },
  {
    id: "gambling" as const,
    label: "Sports betting or gambling",
    hint: "An outcome shaped by probability, odds and repeated decisions.",
  },
  {
    id: "etf" as const,
    label: "A diversified fund or ETF",
    hint: "A spread of holdings that still carries market risk.",
  },
];

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

export const lossScenarios = [0, 20, 50, 80, 100];

export const formatGBP = (amount: number) =>
  amount.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export const recoveryGain = (lossPct: number) =>
  lossPct >= 100 ? Infinity : (lossPct / (100 - lossPct)) * 100;

const typeLabel: Record<DecisionType, string> = {
  crypto: "crypto or a speculative asset",
  stock: "one individual stock",
  gambling: "sports betting",
  etf: "a diversified fund or ETF",
};

export function scenarioCopy(declaration: Declaration) {
  const highPressure =
    declaration.lossCapacity === "none" || declaration.lossCapacity === "limited";
  const type = declaration.decisionType ?? "crypto";
  if (type === "gambling") {
    return {
      eyebrow: highPressure ? "Affordability matters" : "Test the odds",
      title: highPressure
        ? "Could a losing run change your plans?"
        : "What happens when probability goes against you?",
      subtitle:
        declaration.driver === "fear-of-missing-out"
          ? "Urgency can turn one bet into a sequence. Test the cost of being wrong more than once."
          : "A sporting outcome is uncertain. Stress-test the probability, the odds and the temptation to chase losses.",
      visualiser: { prefix: "If the bet loses", recoveryMode: "gambling" },
      snapshotHeading: "Probability snapshot",
      reasoningTitle: "Why this deserves a pause",
      reasoningSubtitle:
        "The risk is not a market metric. It is how probability, repetition and emotion can compound.",
    };
  }
  if (type === "etf") {
    return {
      eyebrow: highPressure ? "Capacity still matters" : "Stress test the horizon",
      title: highPressure
        ? "Could a drawdown disrupt your plans?"
        : "What does a market fall mean over your horizon?",
      subtitle:
        "Diversification can reduce single-company exposure, but it cannot make market losses impossible.",
      visualiser: { prefix: "If the fund falls", recoveryMode: "market" },
      snapshotHeading: "Market snapshot",
      reasoningTitle: "Why this deserves a pause",
      reasoningSubtitle:
        "A diversified decision changes the shape of risk, not the fact that prices can fall.",
    };
  }
  if (type === "stock") {
    return {
      eyebrow: highPressure ? "The single thesis matters" : "Stress test the prediction",
      title: highPressure
        ? "What if this one company disappoints?"
        : "What happens if your one prediction is wrong?",
      subtitle:
        "A single stock can be a strong belief and still leave the whole amount dependent on one company.",
      visualiser: { prefix: "If the stock falls", recoveryMode: "market" },
      snapshotHeading: "Company snapshot",
      reasoningTitle: "Why this deserves a pause",
      reasoningSubtitle:
        "The question is not whether the company is good. It is how much of the outcome rests on one thesis.",
    };
  }
  return {
    eyebrow: highPressure ? "The downside matters" : "Stress test",
    title: highPressure ? "Could this loss change your plans?" : "What happens if it falls?",
    subtitle: `Move the scenario slider to see what a fall in ${typeLabel[type]} could mean for your money.`,
    visualiser: { prefix: "If it falls", recoveryMode: "market" },
    snapshotHeading: "Risk snapshot",
    reasoningTitle: "Why this deserves a pause",
    reasoningSubtitle:
      "The concern is not that the idea must fail. It is that several risks can stack together.",
  };
}

export function buildRiskSnapshot(declaration: Declaration) {
  const type = declaration.decisionType ?? "crypto";
  if (type === "gambling") {
    return [
      {
        label: "Probability exposure",
        level: "High",
        note: "The odds describe likelihood, not a promise that this outcome will happen.",
      },
      {
        label: "Repeated-loss risk",
        level: declaration.driver === "fear-of-missing-out" ? "Very High" : "High",
        note: "One loss can create pressure to place another bet to get back to even.",
      },
      {
        label: "Emotional pressure",
        level: declaration.driver === "fear-of-missing-out" ? "High" : "Medium",
        note: "Urgency and a favourite team can make entertainment feel like a plan.",
      },
      {
        label: "Affordability",
        level:
          declaration.lossCapacity === "none"
            ? "Very High"
            : declaration.lossCapacity === "limited"
              ? "High"
              : "Medium",
        note: "A stake is not entertainment money if losing it changes essential plans.",
      },
    ];
  }
  if (type === "etf") {
    return [
      {
        label: "Diversification",
        level: "Lower",
        note: "Several holdings reduce dependence on one company, but all can fall together.",
      },
      {
        label: "Market volatility",
        level: "Medium",
        note: "Prices can move unevenly even when the fund is diversified.",
      },
      {
        label: "Drawdown exposure",
        level: declaration.horizon === "short" ? "High" : "Medium",
        note: "A short horizon leaves less time for a fall to recover.",
      },
      {
        label: "Loss capacity",
        level:
          declaration.lossCapacity === "none"
            ? "Very High"
            : declaration.lossCapacity === "limited"
              ? "High"
              : "Medium",
        note: "Diversification does not make a loss harmless to your plans.",
      },
    ];
  }
  if (type === "stock") {
    return [
      {
        label: "Company-specific risk",
        level: "High",
        note: "One company's results, decisions or setbacks can drive the whole outcome.",
      },
      {
        label: "Concentration",
        level: "High",
        note: `Your ${formatGBP(declaration.amount)} is concentrated behind one thesis.`,
      },
      {
        label: "Confirmation bias",
        level: declaration.driver === "conviction" ? "High" : "Medium",
        note: "Research can become a search for evidence that agrees with the original story.",
      },
      {
        label: "Time horizon",
        level: declaration.horizon === "short" ? "High" : "Medium",
        note: "A short deadline gives one prediction less room to be tested over time.",
      },
    ];
  }
  return [
    {
      label: "Amount at risk",
      level: declaration.amount > 500 ? "High" : "Medium",
      note: "The full amount can be exposed to the outcome.",
    },
    {
      label: "Concentration",
      level: "Very High",
      note: `Your ${formatGBP(declaration.amount)} is concentrated in one speculative outcome.`,
    },
    {
      label: "Loss capacity",
      level:
        declaration.lossCapacity === "none"
          ? "Very High"
          : declaration.lossCapacity === "limited"
            ? "High"
            : "Medium",
      note:
        declaration.lossCapacity === "none" || declaration.lossCapacity === "limited"
          ? "A loss matters more when it competes with essential plans."
          : "Capacity can soften the impact, but it does not change the possibility of loss.",
    },
    {
      label: "Time pressure",
      level: declaration.driver === "fear-of-missing-out" ? "High" : "Medium",
      note:
        declaration.driver === "fear-of-missing-out"
          ? "FOMO compresses the time available to test the original assumption."
          : "Social proof and excitement can still make a speculative decision feel more certain than it is.",
    },
  ];
}

export function buildReasoningCards(declaration: Declaration) {
  const type = declaration.decisionType ?? "crypto";
  const pressure = declaration.driver === "fear-of-missing-out";
  if (type === "gambling") {
    return [
      {
        title: "Odds are not a promise",
        body: "Even a favourite can lose. Probability describes a range of possible outcomes, not certainty.",
      },
      {
        title: pressure
          ? "Urgency can become loss chasing"
          : "One loss can change the next decision",
        body: pressure
          ? "When the reason to act is FOMO, a losing result can create pressure to place another bet quickly."
          : "Sunk-cost thinking can make a person increase the stake simply because the first bet lost.",
      },
      {
        title: "Entertainment is not wealth-building",
        body: `Your ${formatGBP(declaration.amount)} needs to be affordable as entertainment, because the expected outcome is uncertain and repeated losses are possible.`,
      },
    ];
  }
  if (type === "etf") {
    return [
      {
        title: "Diversification changes the dependence",
        body: `Your ${formatGBP(declaration.amount)} is spread across holdings rather than resting on one company, but the market can still fall together.`,
      },
      {
        title: "A drawdown tests the horizon",
        body:
          declaration.horizon === "short"
            ? "A short horizon gives a fall less time to recover before you need the money."
            : "A longer horizon may give a drawdown more time to recover, without guaranteeing that it will.",
      },
      {
        title: "Spread is not certainty",
        body: "Diversification can reduce concentration risk. It cannot promise returns or remove market volatility.",
      },
    ];
  }
  if (type === "stock") {
    return [
      {
        title: "One company can decide everything",
        body: `Because ${formatGBP(declaration.amount)} is behind one company, one earnings miss, scandal or broken thesis can affect the full amount.`,
      },
      {
        title: "Conviction can filter the evidence",
        body:
          declaration.driver === "conviction"
            ? "Personal research is useful, but confirmation bias can make supporting evidence louder than evidence that would change your mind."
            : "A compelling narrative can make a single-company bet feel more understood than it really is.",
      },
      {
        title: "Ask what would prove you wrong",
        body: "A clear disconfirming condition is a stronger test than a story about why the price should rise.",
      },
    ];
  }
  return [
    {
      title: "One outcome can decide everything",
      body: `Because ${formatGBP(declaration.amount)} is concentrated in one speculative asset, most of the outcome depends on that single position.`,
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
          : pressure
            ? "FOMO compresses the decision and makes the upside story feel more urgent than the downside."
            : "Conviction can be useful, but it is strongest when paired with a plan for being wrong.",
    },
  ];
}

export function buildEducationalConcepts(declaration: Declaration) {
  const type = declaration.decisionType ?? "crypto";
  if (type === "gambling") {
    return declaration.driver === "fear-of-missing-out"
      ? ["Probability / odds", "Loss chasing", "Emotional pressure"]
      : ["Probability / odds", "Loss chasing", "Sunk-cost thinking"];
  }
  if (type === "etf") return ["Diversification", "Drawdowns", "Time horizon"];
  if (type === "stock") {
    return declaration.driver === "conviction"
      ? ["Company-specific risk", "Concentration", "Confirmation bias"]
      : ["Company-specific risk", "Concentration", "Narrative investing"];
  }
  return declaration.driver === "fear-of-missing-out"
    ? ["FOMO", "Concentration", "Volatility"]
    : ["Volatility", "Concentration", "Liquidity risk"];
}

export const motivationOptions = [
  { id: "make-money-quickly" as const, label: "Make money quickly" },
  { id: "exposure" as const, label: "Get exposure to something I believe in" },
  { id: "understand" as const, label: "Invest in something I understand" },
  { id: "trend" as const, label: "Participate in a trend" },
  { id: "support" as const, label: "Support something I care about" },
  { id: "entertainment" as const, label: "Entertainment" },
];
