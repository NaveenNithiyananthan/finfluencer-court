import type { Scenario, Verdict } from "@/data/court-scenarios";

const toneFor: Record<Verdict, string> = {
  LEGITIMATE: "text-primary border-primary/40 bg-primary/10",
  RISKY: "text-caution border-caution/40 bg-caution/10",
  MISLEADING: "text-verdict border-verdict/40 bg-verdict/10",
};

export function VerdictReveal({
  scenario,
  choice,
  correct,
}: {
  scenario: Scenario;
  choice: Verdict;
  correct: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-elevated sm:p-12">
      <p className="label-mono text-muted-foreground">{scenario.caseNumber} · Verdict</p>

      <h2
        className={`animate-verdict-slam mx-auto mt-5 inline-block rounded-2xl border px-6 py-3 font-display text-4xl font-bold tracking-tight sm:text-6xl ${toneFor[scenario.verdict]}`}
      >
        {scenario.verdict}
      </h2>

      <p className="animate-rise mt-6 text-sm text-muted-foreground">You chose: {choice}</p>

      <p
        className={`animate-rise mt-3 font-display text-xl font-semibold sm:text-2xl ${
          correct ? "text-primary" : "text-foreground"
        }`}
      >
        {correct ? "Good call. You spotted the warning signs." : "Not quite. Let's break down what you missed."}
      </p>

      <p className="animate-rise mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        {scenario.summary}
      </p>

      {correct && (
        <div className="animate-pulse-ring pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-1 w-40 rounded-full bg-primary" />
      )}
    </div>
  );
}
