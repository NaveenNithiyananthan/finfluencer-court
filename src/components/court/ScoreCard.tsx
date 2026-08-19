export type CategoryResult = { label: string; strength: "Strong" | "Improving" };

export function ScoreCard({
  score,
  total,
  categories,
}: {
  score: number;
  total: number;
  categories: CategoryResult[];
}) {
  const pct = Math.round((score / total) * 100);

  return (
    <div className="rounded-3xl border border-border bg-card p-8 shadow-elevated">
      <p className="label-mono text-muted-foreground">Risk recognition score</p>
      <div className="mt-3 flex items-end gap-3">
        <span className="text-gradient-primary font-display text-6xl font-bold">{score}</span>
        <span className="pb-2 font-display text-2xl text-muted-foreground">/ {total}</span>
      </div>

      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="mt-5 font-display text-lg font-semibold">
        You're getting better at spotting the signals.
      </p>

      <ul className="mt-6 space-y-2.5">
        {categories.map((c) => (
          <li
            key={c.label}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3"
          >
            <span className="text-sm text-foreground">{c.label}</span>
            <span
              className={`label-mono rounded-full px-2.5 py-1 ${
                c.strength === "Strong"
                  ? "bg-primary/15 text-primary"
                  : "bg-caution/15 text-caution"
              }`}
            >
              {c.strength}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
