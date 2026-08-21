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

    <div className="surface-card animate-fade-up p-8">
      <p className="label-mono text-muted-foreground">Risk recognition score</p>
      <div className="mt-3 flex items-end gap-3">
        <span className="text-gradient-primary font-display text-6xl font-bold">{score}</span>

        <span className="font-display pb-2 text-2xl text-muted-foreground">/ {total}</span>
      </div>


      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div

          className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>


      <p className="font-display mt-5 text-lg font-semibold tracking-tight">
        You're getting better at spotting the signals.
      </p>

      <ul className="mt-6 space-y-2.5">

        {categories.map((c, i) => (
          <li
            key={c.label}

            className="animate-fade-up flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-2/50 px-4 py-3 transition-colors hover:border-primary/30"
            style={{ animationDelay: `${i * 70}ms` }}
          >

            <span className="text-sm">{c.label}</span>
            <span
              className={`label-mono rounded-full px-2.5 py-1 ${
                c.strength === "Strong"
                  ? "bg-primary/15 text-primary"

                  : "bg-caution/25 text-caution-foreground"
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
