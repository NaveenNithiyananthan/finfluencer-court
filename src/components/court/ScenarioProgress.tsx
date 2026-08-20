import { Flame } from "lucide-react";

export function ScenarioProgress({
  current,
  total,
  score,
  streak,
}: {
  current: number;
  total: number;
  score: number;
  streak: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-5 py-4">
      <div className="flex items-center gap-3">
        <span className="label-mono text-muted-foreground">
          Round {current} / {total}
        </span>
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-7 rounded-full transition-colors duration-300 ${
                i < current - 1 ? "bg-primary" : i === current - 1 ? "bg-accent" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="label-mono text-muted-foreground">
          Score <span className="text-foreground">{score}</span>
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-border bg-surface-raised px-3 py-1">
          <Flame
            className={`size-3.5 ${streak > 0 ? "text-caution" : "text-muted-foreground"}`}
            aria-hidden
          />
          <span className="label-mono text-foreground">{streak} streak</span>
        </span>
      </div>
    </div>
  );
}
