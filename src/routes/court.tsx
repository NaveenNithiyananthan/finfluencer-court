import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Gavel, HelpCircle, RotateCcw, Sparkles } from "lucide-react";
import { ClaimCard } from "@/components/court/ClaimCard";
import { CourtButton } from "@/components/court/CourtButton";
import { DecisionLock } from "@/components/court/DecisionLock";
import { LearningTakeaway } from "@/components/court/LearningTakeaway";
import { ScenarioProgress } from "@/components/court/ScenarioProgress";
import { ScoreCard, type CategoryResult } from "@/components/court/ScoreCard";
import { VerdictButton } from "@/components/court/VerdictButton";
import { VerdictReveal } from "@/components/court/VerdictReveal";
import { ReasoningCardView, WarningSignCard } from "@/components/court/WarningSignCard";
import { scenarios, verdictOptions, type Verdict } from "@/data/court-scenarios";

const title = "Finfluencer Court — ZUNO";
const description =
  "Judge viral financial claims before ZUNO reveals the reasoning. A game that trains you to spot hype, missing downside and false certainty.";

export const Route = createFileRoute("/court")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CourtPage,
});

type Stage = "intro" | "claim" | "reveal" | "summary" | "final";

function CourtPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [round, setRound] = useState(0);
  const [choice, setChoice] = useState<Verdict | null>(null);
  const [answers, setAnswers] = useState<{ scenarioId: string; choice: Verdict; correct: boolean }[]>(
    [],
  );

  const scenario = scenarios[round];
  const total = scenarios.length;
  const score = answers.filter((a) => a.correct).length;
  const streak = useMemo(() => {
    let s = 0;
    for (let i = answers.length - 1; i >= 0; i--) {
      if (!answers[i].correct) break;
      s++;
    }
    return s;
  }, [answers]);

  const categories: CategoryResult[] = useMemo(() => {
    const map = new Map<string, { hit: number; seen: number }>();
    answers.forEach((a) => {
      const s = scenarios.find((x) => x.id === a.scenarioId)!;
      const entry = map.get(s.conceptLabel) ?? { hit: 0, seen: 0 };
      entry.seen += 1;
      if (a.correct) entry.hit += 1;
      map.set(s.conceptLabel, entry);
    });
    return [...map.entries()].map(([label, v]) => ({
      label,
      strength: v.hit === v.seen ? "Strong" : "Improving",
    }));
  }, [answers]);

  function lockIn(v: Verdict) {
    if (choice) return;
    setChoice(v);
    const correct = v === scenario.verdict;
    setAnswers((prev) => [...prev, { scenarioId: scenario.id, choice: v, correct }]);
    window.setTimeout(() => setStage("reveal"), 900);
  }

  function next() {
    if (round + 1 >= total) {
      setStage("summary");
      return;
    }
    setRound((r) => r + 1);
    setChoice(null);
    setStage("claim");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restart() {
    setRound(0);
    setChoice(null);
    setAnswers([]);
    setStage("intro");
    window.scrollTo({ top: 0 });
  }

  return (
    <main className="court-backdrop min-h-screen">
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:py-16">
        <header className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-lg font-bold tracking-tight">ZUNO</span>
            <span className="label-mono text-muted-foreground">/ court</span>
          </Link>
          {stage !== "intro" && (
            <span className="label-mono rounded-full border border-border bg-surface px-3 py-1 text-muted-foreground">
              {scenario.caseNumber}
            </span>
          )}
        </header>

        {stage === "intro" && <Intro onEnter={() => setStage("claim")} rounds={total} />}

        {stage !== "intro" && stage !== "summary" && stage !== "final" && (
          <div className="mb-6">
            <ScenarioProgress current={round + 1} total={total} score={score} streak={streak} />
          </div>
        )}

        {stage === "claim" && (
          <section className="space-y-6">
            <ClaimCard scenario={scenario} locked={Boolean(choice)} />

            <div>
              <h2 className="font-display text-2xl font-semibold">What's your judgement?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                No hints yet. Decide first — the reasoning comes after.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {verdictOptions.map((v) => (
                  <VerdictButton
                    key={v}
                    verdict={v}
                    chosen={choice === v}
                    disabled={Boolean(choice)}
                    onSelect={lockIn}
                  />
                ))}
              </div>
            </div>

            {choice && <DecisionLock choice={choice} />}
          </section>
        )}

        {stage === "reveal" && choice && (
          <section className="space-y-8">
            <VerdictReveal scenario={scenario} choice={choice} correct={choice === scenario.verdict} />

            <div>
              <div className="flex items-center gap-2">
                <HelpCircle className="size-4 text-accent" aria-hidden />
                <h2 className="font-display text-2xl font-semibold">Why?</h2>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{scenario.headline}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {scenario.reasoning.map((r, i) => (
                  <ReasoningCardView key={r.title} index={i} title={r.title} detail={r.detail} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold">The warning signs</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                What you should have noticed in this claim.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {scenario.warningSigns.map((w, i) => (
                  <WarningSignCard key={w.label} index={i} label={w.label} detail={w.detail} />
                ))}
              </div>
            </div>

            <LearningTakeaway skill={scenario.skill} />

            <div className="flex justify-center">
              <CourtButton size="lg" onClick={next}>
                {round + 1 >= total ? "See your score" : "Try another claim"}
                <ArrowRight className="size-4" aria-hidden />
              </CourtButton>
            </div>
          </section>
        )}

        {stage === "summary" && (
          <section className="space-y-8">
            <ScoreCard score={score} total={total} categories={categories} />
            <div className="flex flex-wrap justify-center gap-3">
              <CourtButton size="lg" onClick={() => setStage("final")}>
                Final takeaway
                <ArrowRight className="size-4" aria-hidden />
              </CourtButton>
              <CourtButton variant="outline" size="lg" onClick={restart}>
                <RotateCcw className="size-4" aria-hidden />
                Play again
              </CourtButton>
            </div>
          </section>
        )}

        {stage === "final" && <Final onRestart={restart} />}

        <p className="mt-14 text-center text-xs leading-relaxed text-muted-foreground">
          All creators, posts and figures in Finfluencer Court are fictional and simulated for
          education. ZUNO does not give investment advice or recommend any asset.
        </p>
      </div>
    </main>
  );
}

function Intro({ onEnter, rounds }: { onEnter: () => void; rounds: number }) {
  const rules = [
    { n: "01", t: "You'll see a claim.", d: "A real-looking post from a fictional creator." },
    { n: "02", t: "Make your judgement.", d: "Legitimate, risky or misleading. No hints." },
    { n: "03", t: "Then we'll reveal what you missed.", d: "The reasoning, not just the answer." },
  ];

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-elevated sm:p-12">
        <span className="label-mono inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-primary">
          <Gavel className="size-3.5" aria-hidden />
          Now in session · {rounds} cases
        </span>
        <h1 className="mt-6 font-display text-4xl leading-[1.05] font-bold sm:text-6xl">
          Welcome to <span className="text-gradient-primary">Finfluencer Court</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          The internet is full of financial advice. Can you spot what's actually risky?
        </p>

        <div className="mt-8 grid gap-3">
          {rules.map((r) => (
            <div
              key={r.n}
              className="flex items-start gap-4 rounded-2xl border border-border bg-surface px-5 py-4"
            >
              <span className="label-mono mt-1 text-primary">{r.n}</span>
              <div>
                <p className="font-display text-base font-semibold">{r.t}</p>
                <p className="text-sm text-muted-foreground">{r.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <CourtButton size="lg" onClick={onEnter} className="animate-pulse-ring">
            Enter the Court
            <ArrowRight className="size-4" aria-hidden />
          </CourtButton>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        You're not being tested on markets. You're being tested on reasoning.
      </p>
    </section>
  );
}

function Final({ onRestart }: { onRestart: () => void }) {
  const questions = [
    "Where's the evidence?",
    "Where's the downside?",
    "Why am I being rushed?",
    "What am I not being told?",
  ];

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-elevated sm:p-12">
        <Sparkles className="size-6 text-primary" aria-hidden />
        <h2 className="mt-5 font-display text-3xl leading-tight font-bold sm:text-4xl">
          The goal isn't to know every investment. It's to recognise bad reasoning before you act.
        </h2>
        <p className="mt-6 text-base text-muted-foreground">
          The next time you see a viral financial claim, pause and ask:
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {questions.map((q, i) => (
            <div
              key={q}
              className="animate-rise rounded-2xl border border-border bg-surface px-5 py-4 font-display text-lg font-semibold"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {q}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/">
          <CourtButton size="lg">Back to ZUNO</CourtButton>
        </Link>
        <CourtButton variant="outline" size="lg" onClick={onRestart}>
          <RotateCcw className="size-4" aria-hidden />
          Play again
        </CourtButton>
      </div>
    </section>
  );
}
