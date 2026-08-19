export type Verdict = "LEGITIMATE" | "RISKY" | "MISLEADING";

export type WarningSign = {
  label: string;
  detail: string;
};

export type ReasoningCard = {
  title: string;
  detail: string;
};

export type Scenario = {
  id: string;
  caseNumber: string;
  handle: string;
  displayName: string;
  followers: string;
  tag: "Trending" | "Sponsored" | "Viral";
  claim: string;
  metrics: { likes: string; comments: string; shares: string };
  verdict: Verdict;
  headline: string;
  summary: string;
  reasoning: ReasoningCard[];
  warningSigns: WarningSign[];
  concept: string;
  conceptLabel: string;
  skill: string;
  difficulty: "Warm-up" | "Standard" | "Tricky";
};

export const scenarios: Scenario[] = [
  {
    id: "guaranteed-crypto",
    caseNumber: "CASE #001",
    handle: "@MarketKing",
    displayName: "Market King",
    followers: "128K followers",
    tag: "Trending",
    claim:
      "I've made 300% this year doing this. This crypto is going to 10x before the end of the month. Don't miss it.",
    metrics: { likes: "42.1K", comments: "3,204", shares: "8,911" },
    verdict: "MISLEADING",
    headline: "A future price is being sold as a fact.",
    summary:
      "The claim isn't wrong because crypto is bad. It's misleading because a prediction is presented as a certainty, with no evidence and no downside.",
    reasoning: [
      {
        title: "Unrealistic certainty",
        detail:
          "A future price is stated as if it were already decided. Nobody can know that a specific asset will 10x in a specific month.",
      },
      {
        title: "FOMO",
        detail:
          "\u201cDon't miss it\u201d exists to compress your thinking time. Urgency is a persuasion tool, not evidence.",
      },
      {
        title: "Missing downside",
        detail:
          "An asset that can move 10x up can also fall 80%. The post never mentions what happens if it goes the other way.",
      },
      {
        title: "Cherry-picked evidence",
        detail:
          "One past return is used to imply future accuracy. You never see the trades that lost money.",
      },
    ],
    warningSigns: [
      {
        label: "Guaranteed returns",
        detail: "No legitimate investment can promise a specific outcome by a specific date.",
      },
      {
        label: "Urgency",
        detail: "\u201cDon't miss out\u201d is designed to trigger a fast decision, not a good one.",
      },
      {
        label: "Upside without downside",
        detail: "The gain is loud, the possible loss is silent.",
      },
      {
        label: "Influencer authority",
        detail: "128K followers is a measure of attention, not of accuracy.",
      },
    ],
    concept: "certainty-and-fomo",
    conceptLabel: "Guaranteed returns",
    skill: "Question the reasoning, not the hype.",
    difficulty: "Warm-up",
  },
  {
    id: "earnings-fomo",
    caseNumber: "CASE #002",
    handle: "@StockSprint",
    displayName: "Stock Sprint",
    followers: "94K followers",
    tag: "Viral",
    claim:
      "Everyone is buying this stock before earnings. Analysts are saying it can't lose. Get in before the announcement Thursday.",
    metrics: { likes: "18.7K", comments: "1,442", shares: "2,318" },
    verdict: "MISLEADING",
    headline: "Same pattern, new outfit.",
    summary:
      "Different asset, identical reasoning: a deadline, a crowd, and a claim that losing isn't possible. Earnings are one of the least predictable events for a single stock.",
    reasoning: [
      {
        title: "Deadline pressure",
        detail:
          "A date is used to force action before you can do your own thinking. That's the same FOMO mechanic as case #001.",
      },
      {
        title: "\u201cCan't lose\u201d is not a real category",
        detail:
          "Analyst expectations are already reflected in the price. A beat can still be followed by a fall.",
      },
      {
        title: "Crowd as evidence",
        detail:
          "\u201cEveryone is buying\u201d describes popularity, not value. Popularity is not a reason.",
      },
      {
        title: "Single-outcome exposure",
        detail:
          "The whole position depends on one announcement on one day. That is concentration, not a strategy.",
      },
    ],
    warningSigns: [
      { label: "Urgency", detail: "A hard deadline replaces analysis with adrenaline." },
      { label: "Social proof", detail: "\u201cEveryone is buying\u201d tells you nothing about the business." },
      { label: "Guaranteed returns", detail: "\u201cCan't lose\u201d is the tell, every time." },
      { label: "One prediction", detail: "One event decides the whole outcome." },
    ],
    concept: "certainty-and-fomo",
    conceptLabel: "FOMO recognition",
    skill: "A deadline is not evidence.",
    difficulty: "Standard",
  },
  {
    id: "passive-income",
    caseNumber: "CASE #003",
    handle: "@FreedomFlowHQ",
    displayName: "Freedom Flow",
    followers: "312K followers",
    tag: "Sponsored",
    claim:
      "I make \u00a34,000 a month in truly passive income. Zero effort, zero risk. Full breakdown in my \u00a3199 course \u2014 link in bio.",
    metrics: { likes: "63.4K", comments: "5,870", shares: "12.2K" },
    verdict: "MISLEADING",
    headline: "The product being sold isn't the income. It's the course.",
    summary:
      "The strongest signal here isn't the number, it's the incentive. The creator earns money whether or not the strategy works for you.",
    reasoning: [
      {
        title: "Misaligned incentive",
        detail:
          "Income comes from selling the method, not from the method. That changes what the post is optimised for.",
      },
      {
        title: "\u201cZero risk\u201d does not exist",
        detail:
          "Every return is compensation for some risk. A claim of zero risk with high return is a contradiction.",
      },
      {
        title: "Unverifiable numbers",
        detail:
          "A revenue screenshot is not profit, and no costs, taxes or failed months are shown.",
      },
      {
        title: "Omitted information",
        detail: "You aren't told how many buyers reproduced the result. Almost none usually do.",
      },
    ],
    warningSigns: [
      { label: "Follow the incentive", detail: "Ask who gets paid when you act." },
      { label: "Zero-risk framing", detail: "Risk-free plus high return is a marketing sentence." },
      { label: "Upside without downside", detail: "No failed months are ever shown." },
      { label: "Paywalled proof", detail: "Evidence you must buy is not evidence." },
    ],
    concept: "incentives",
    conceptLabel: "Incentives & omissions",
    skill: "Ask who profits from your decision.",
    difficulty: "Standard",
  },
  {
    id: "celebrity-token",
    caseNumber: "CASE #004",
    handle: "@TheHypeDesk",
    displayName: "The Hype Desk",
    followers: "540K followers",
    tag: "Trending",
    claim:
      "A massive footballer just backed this new token. If he's in, it's happening. This is the easiest call of the year.",
    metrics: { likes: "88.9K", comments: "9,013", shares: "21.4K" },
    verdict: "MISLEADING",
    headline: "An endorsement is attention, not analysis.",
    summary:
      "A famous name tells you about marketing spend, not about the asset. Endorsers are often paid, and they're rarely exposed to your downside.",
    reasoning: [
      {
        title: "Borrowed authority",
        detail:
          "Fame in one field does not transfer to financial judgement. Being good at sport says nothing about a token.",
      },
      {
        title: "Undisclosed payment",
        detail: "Endorsements are frequently paid promotions. The endorser's upside is the fee.",
      },
      {
        title: "No underlying evidence",
        detail:
          "Nothing is said about what the asset does, who uses it, or how it could be worth anything.",
      },
      {
        title: "\u201cEasiest call\u201d framing",
        detail: "Confidence is being used as a substitute for reasoning.",
      },
    ],
    warningSigns: [
      { label: "Influencer authority", detail: "A big name is not a due-diligence process." },
      { label: "Hidden incentive", detail: "You may be reading an advert." },
      { label: "No fundamentals", detail: "Nothing explains why the asset has value." },
      { label: "Certainty language", detail: "\u201cEasiest call of the year\u201d is a feeling, not a fact." },
    ],
    concept: "authority",
    conceptLabel: "Influencer authority",
    skill: "Judge the claim, not the name attached to it.",
    difficulty: "Standard",
  },
  {
    id: "leverage",
    caseNumber: "CASE #005",
    handle: "@LeverageLab",
    displayName: "Leverage Lab",
    followers: "76K followers",
    tag: "Viral",
    claim:
      "Why buy \u00a31,000 of an index when you can control \u00a310,000 with 10x leverage? Same idea, ten times the result. Risk management is just fear.",
    metrics: { likes: "12.3K", comments: "2,109", shares: "1,884" },
    verdict: "MISLEADING",
    headline: "Leverage multiplies both directions \u2014 only one is mentioned.",
    summary:
      "This one sounds technical, which makes it more persuasive. But a 10% move against a 10x position removes the entire stake.",
    reasoning: [
      {
        title: "Symmetry removed",
        detail:
          "Leverage multiplies losses exactly as it multiplies gains. Only the gain half is described.",
      },
      {
        title: "Liquidation is not mentioned",
        detail:
          "With 10x, a 10% adverse move can wipe out the position before any thesis has time to play out.",
      },
      {
        title: "Risk framed as weakness",
        detail:
          "Calling risk management \u201cfear\u201d discourages the exact behaviour that keeps you solvent.",
      },
      {
        title: "Timing dependence",
        detail:
          "Leverage turns a long-term view into a short-term bet on when the move happens, not whether it does.",
      },
    ],
    warningSigns: [
      { label: "Amplified downside", detail: "10x up also means 10x down." },
      { label: "Risk dismissed", detail: "Anyone mocking caution is not managing your money." },
      { label: "Missing mechanics", detail: "Costs, margin calls and liquidation are left out." },
      { label: "Timing bet", detail: "Being right too late is the same as being wrong." },
    ],
    concept: "leverage",
    conceptLabel: "Missing downside",
    skill: "Always ask what happens if it moves against you.",
    difficulty: "Tricky",
  },
];

export const verdictOptions: Verdict[] = ["LEGITIMATE", "RISKY", "MISLEADING"];
