import { formatGBP, lossScenarios, recoveryGain } from "@/lib/zuno-data";

export function LossScenarioVisualiser({
  amount,
  lossPct,
  onChange,
  prefix = "If it falls",
}: {
  amount: number;
  lossPct: number;
  onChange: (value: number) => void;
  prefix?: string;
  recoveryMode?: string;
}) {
  const remaining = Math.round(amount * (1 - lossPct / 100));
  const lost = amount - remaining;
  const gainNeeded = recoveryGain(lossPct);
  return (
    <div className="surface-card overflow-hidden">
      <div className="bg-hero p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {prefix} {lossPct}%
        </p>
        <p className="mt-2 font-display text-5xl font-semibold">{formatGBP(remaining)}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Your {formatGBP(amount)} becomes {formatGBP(remaining)}.{" "}
          <span className="text-danger">{formatGBP(lost)} gone</span>
        </p>
        <div className="mt-6 flex h-14 overflow-hidden rounded-2xl bg-surface-2">
          <div className="bg-primary" style={{ width: `${100 - lossPct}%` }} />
          <div className="bg-danger/70" style={{ width: `${lossPct}%` }} />
        </div>
      </div>
      <div className="space-y-4 border-t border-border p-5">
        <input
          aria-label="Loss scenario"
          type="range"
          min={0}
          max={lossScenarios.length - 1}
          value={Math.max(0, lossScenarios.indexOf(lossPct))}
          onChange={(event) => onChange(lossScenarios[Number(event.target.value)] ?? 0)}
          className="h-2 w-full accent-primary"
        />
        <div className="grid grid-cols-5 gap-1.5">
          {lossScenarios.map((scenario) => (
            <button
              type="button"
              key={scenario}
              onClick={() => onChange(scenario)}
              className={`rounded-xl border px-1 py-2 text-xs ${scenario === lossPct ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground"}`}
            >
              -{scenario}%
            </button>
          ))}
        </div>
        {Number.isFinite(gainNeeded) && lossPct > 0 ? (
          <p className="text-xs text-muted-foreground">
            A {lossPct}% fall needs a {gainNeeded.toFixed(0)}% gain to recover.
          </p>
        ) : null}
      </div>
    </div>
  );
}
