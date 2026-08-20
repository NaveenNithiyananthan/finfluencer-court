import { cn } from "@/lib/utils";
import type { ZunoProgress } from "@/lib/zuno-progress";

const levelStyles: Record<string, string> = {
  Strong: "border-primary/40 text-primary",
  Improving: "border-accent/40 text-accent",
  New: "border-border text-muted-foreground",
};

export function RiskRecognitionCard({ progress }: { progress: ZunoProgress }) {
  const { riskRecognitionScore: score, riskRecognitionMax: max, concepts } = progress;
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="zuno-eyebrow">Learning progress</p>
          <h2 className="mt-3 text-2xl font-bold">Risk Recognition</h2>
        </div>
        <p className="font-display text-3xl font-bold text-primary">
          {score} <span className="text-lg text-muted-foreground">/ {max}</span>
        </p>
      </div>
      <div className="mt-5 flex gap-1.5" aria-hidden>
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} className={cn("h-1.5 flex-1 rounded-full", i < score ? "bg-primary" : "bg-secondary")} />
        ))}
      </div>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {concepts.map((c) => (
          <li key={c.label} className="flex items-center justify-between rounded-2xl border border-border bg-background/40 px-4 py-3">
            <span className="text-sm">{c.label}</span>
            <span className={cn("rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-widest", levelStyles[c.level])}>{c.level}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs text-muted-foreground/80">
        This is educational progress only. It is not a financial risk score and says nothing about your suitability for any investment.
      </p>
    </section>
  );
}