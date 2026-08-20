import {
  activeExposures,
  concentrationLabel,
  concentrationNote,
  diversificationScore,
  type Weights,
} from "@/lib/fan-portfolio";

export function ConcentrationMeter({ weights }: { weights: Weights }) {
  const score = diversificationScore(weights);
  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="zuno-eyebrow">Concentration indicator</p>
        <span className="font-display text-sm font-semibold">{concentrationLabel(score)}</span>
      </div>
      <div
        className="relative mt-4 h-2 rounded-full"
        style={{ background: "var(--gradient-risk)" }}
      >
        <span
          className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-foreground"
          style={{ left: `${100 - score}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        <span>More diversified</span>
        <span>More concentrated</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {concentrationNote(score)}
      </p>
      <p className="mt-3 text-xs text-muted-foreground">
        {activeExposures(weights)} of 6 illustrative exposures in play
      </p>
    </div>
  );
}
