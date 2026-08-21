import type { Scenario, Verdict } from "@/data/court-scenarios";

const toneFor: Record<Verdict, string> = {
  LEGITIMATE: "text-primary border-primary/40 bg-primary/10",
  RISKY: "text-caution-foreground border-caution/50 bg-caution/15",
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
    <div className="surface-card relative overflow-hidden p-8 text-center sm:p-12">
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-20 left-1/2 size-64 -translate-x-1/2 rounded-full blur-3xl ${
          correct ? "bg-primary opacity-20" : "bg-caution opacity-20"
        }`}
      />
      <div className="relative">
        <p className="label-mono text-muted-foreground">{scenario.caseNumber} · Verdict</p>

        <h2
          className={`animate-verdict-slam mx-auto mt-5 inline-block rounded-2xl border px-6 py-3 font-display text-4xl font-bold tracking-tight sm:text-6xl ${toneFor[scenario.verdict]}`}
        >
          {scenario.verdict}
        </h2>

        <p
          className="animate-fade-up mt-6 text-sm text-muted-foreground"
          style={{ animationDelay: "150ms" }}
        >
          You chose: {choice}
        </p>

        <p
          className={`animate-fade-up font-display mt-3 text-xl font-semibold tracking-tight sm:text-2xl ${
            correct ? "text-primary" : "text-foreground"
          }`}
          style={{ animationDelay: "250ms" }}
        >
          {correct
            ? "Good call. You spotted the warning signs."
            : "Not quite. Let's break down what you missed."}
        </p>

        <p
          className="animate-fade-up mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
          style={{ animationDelay: "350ms" }}
        >
          {scenario.summary}
        </p>
      </div>
    </div>
  );
}
