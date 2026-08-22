import { formatGBP, lossScenarios, recoveryGain } from "@/lib/zuno-data";

export function LossScenarioVisualiser({
  amount,
  lossPct,
  onChange,
  prefix,
}: {
  amount: number;
  lossPct: number;
  onChange: (nextLossPct: number) => void;
  prefix: string;
}) {
  const remaining = Math.round(amount * (1 - lossPct / 100));
  const lost = amount - remaining;
  const gainNeeded = recoveryGain(lossPct);
  const sliderIdx = Math.max(0, lossScenarios.indexOf(lossPct));

  return (
    <div className="surface-card animate-fade-up overflow-hidden">
      <div className="bg-hero p-6">
        <p className="zuno-eyebrow">
          {prefix} {lossPct}%
        </p>
        <p className="zuno-num mt-2 text-5xl font-semibold">{formatGBP(remaining)}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Your {formatGBP(amount)} becomes {formatGBP(remaining)}.{" "}
          <span className="font-medium text-danger">{formatGBP(lost)} gone</span>
        </p>
        <div className="mt-6 flex h-14 overflow-hidden rounded-2xl bg-surface-2">
          <div
            className="bg-primary transition-all duration-500 ease-out"
            style={{ width: `${100 - lossPct}%` }}
          />
          <div
            className="bg-danger/80 transition-all duration-500 ease-out"
            style={{ width: `${lossPct}%` }}
          />
        </div>
      </div>
      <div className="space-y-4 p-5">
        <input
          aria-label="Loss scenario"
          type="range"
          min={0}
          max={lossScenarios.length - 1}
          value={sliderIdx}
          onChange={(event) => onChange(lossScenarios[Number(event.target.value)] ?? 0)}
          style={{ ["--fill" as string]: `${(sliderIdx / (lossScenarios.length - 1)) * 100}` }}
          className="h-1.5 w-full"
        />
        <div className="grid grid-cols-5 gap-1.5">
          {lossScenarios.map((scenario) => (
            <button
              type="button"
              key={scenario}
              onClick={() => onChange(scenario)}
              className={`rounded-xl border px-1 py-2 text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                scenario === lossPct
                  ? "border-primary bg-primary text-primary-foreground shadow-glow"
                  : "border-border bg-surface-2 text-muted-foreground hover:border-primary/40"
              }`}
            >
              -{scenario}%
            </button>
          ))}
        </div>
        {Number.isFinite(gainNeeded) && lossPct > 0 ? (
          <p className="text-xs text-muted-foreground">
            A {lossPct}% fall needs a{" "}
            <span className="font-medium text-caution-foreground">{gainNeeded.toFixed(0)}% gain</span>{" "}
            to recover.
          </p>
        ) : null}
      </div>
    </div>
  );
}
