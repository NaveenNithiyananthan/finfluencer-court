export type CategoryId =
  "sportswear" | "media" | "entertainment" | "technology" | "gaming" | "venues";

export interface FanCategory {
  id: CategoryId;
  name: string;
  blurb: string;
  defaultWeight: number;
  scenarioReturn: number;
  colorVar: string;
}

export const FAN_CATEGORIES: FanCategory[] = [
  {
    id: "sportswear",
    name: "Sportswear",
    blurb: "Kit, footwear and performance apparel makers",
    defaultWeight: 20,
    scenarioReturn: 25,
    colorVar: "hsl(var(--chart-1))",
  },
  {
    id: "media",
    name: "Sports Media",
    blurb: "Broadcast rights, streaming and sports publishing",
    defaultWeight: 20,
    scenarioReturn: -10,
    colorVar: "hsl(var(--chart-2))",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    blurb: "Live events, music and wider entertainment groups",
    defaultWeight: 20,
    scenarioReturn: 8,
    colorVar: "hsl(var(--chart-3))",
  },
  {
    id: "technology",
    name: "Sports Technology",
    blurb: "Wearables, performance data and analytics",
    defaultWeight: 15,
    scenarioReturn: -5,
    colorVar: "hsl(var(--chart-5))",
  },
  {
    id: "gaming",
    name: "Gaming & Fan Engagement",
    blurb: "Sports games, fantasy leagues and fan platforms",
    defaultWeight: 15,
    scenarioReturn: 12,
    colorVar: "hsl(var(--chart-6))",
  },
  {
    id: "venues",
    name: "Venues & Infrastructure",
    blurb: "Stadiums, arenas and event infrastructure",
    defaultWeight: 10,
    scenarioReturn: -8,
    colorVar: "hsl(var(--chart-4))",
  },
];

export const SIMULATED_AMOUNT = 500;

export const CONCENTRATED_POSITION = {
  label: "One concentrated position",
  description: "£500 behind a single outcome",
  downside: -50,
  upside: 50,
};

export type Weights = Record<CategoryId, number>;

export const defaultWeights: Weights = FAN_CATEGORIES.reduce((acc, c) => {
  acc[c.id] = c.defaultWeight;
  return acc;
}, {} as Weights);

export const totalWeight = (w: Weights) => FAN_CATEGORIES.reduce((sum, c) => sum + w[c.id], 0);

export const normalisedWeights = (w: Weights): Weights => {
  const total = totalWeight(w);
  if (total <= 0) {
    return FAN_CATEGORIES.reduce(
      (a, c) => {
        a[c.id] = 0;
        return a;
      },
      {} as Weights,
    );
  }
  return FAN_CATEGORIES.reduce((a, c) => {
    a[c.id] = (w[c.id] / total) * 100;
    return a;
  }, {} as Weights);
};

export const portfolioReturn = (w: Weights) => {
  const n = normalisedWeights(w);
  return FAN_CATEGORIES.reduce((sum, c) => sum + (n[c.id] / 100) * c.scenarioReturn, 0);
};

export const applyReturn = (amount: number, pct: number) => amount * (1 + pct / 100);

export const activeExposures = (w: Weights) => FAN_CATEGORIES.filter((c) => w[c.id] > 0).length;

export const diversificationScore = (w: Weights) => {
  const n = normalisedWeights(w);
  const shares = FAN_CATEGORIES.map((c) => n[c.id] / 100).filter((s) => s > 0);
  if (shares.length === 0) return 0;
  const hhi = shares.reduce((sum, s) => sum + s * s, 0);
  const count = FAN_CATEGORIES.length;
  const score = (1 - hhi) / (1 - 1 / count);
  return Math.max(0, Math.min(100, score * 100));
};

export const concentrationLabel = (score: number) => {
  if (score < 34) return "More concentrated";
  if (score < 70) return "Partly spread";
  return "More diversified";
};

export const concentrationNote = (score: number) => {
  if (score < 34)
    return "Most of this simulated £500 sits behind a small number of exposures. The result leans heavily on one part of the ecosystem being right.";
  if (score < 70)
    return "This is spread across some of the ecosystem, but a few categories still drive most of the outcome.";
  return "This is spread across most of the ecosystem. No single category decides the result — but every category can still fall.";
};

export const formatMoney = (n: number) =>
  n.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

export const formatPct = (n: number) => `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;

export const LEARNING_STATEMENTS = [
  "I was relying heavily on one prediction",
  "I didn't realise how concentrated my decision was",
  "I understand diversification better",
  "I was mainly focused on the upside",
];

export const DISCLAIMER =
  "ZUNO is a decision-training prototype. Nothing here is financial advice or a personalised recommendation. Figures are illustrative demo data.";
