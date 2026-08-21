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
    <div className="surface-card animate-fade-up flex flex-wrap items-center justify-between gap-4 px-5 py-4">
      <div className="flex items-center gap-3">
        <span className="label-mono text-muted-foreground">
          Round {current} / {total}
        </span>
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              style={{ transitionDelay: `${i * 50}ms` }}
              className={`h-1.5 w-7 rounded-full transition-colors duration-500 ${
                i < current - 1 ? "bg-primary" : i === current - 1 ? "bg-accent" : "bg-secondary"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="label-mono text-muted-foreground">
          Score <span className="zuno-num">{score}</span>
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1">
          <Flame
            className={`size-3.5 ${streak > 0 ? "animate-pulse text-caution" : "text-muted-foreground"}`}
            aria-hidden
          />
          <span className="label-mono">{streak} streak</span>
        </span>
      </div>
    </div>
  );
}
