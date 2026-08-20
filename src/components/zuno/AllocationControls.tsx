import { FAN_CATEGORIES, totalWeight, type CategoryId, type Weights } from "@/lib/fan-portfolio";

export function AllocationControls({
  weights,
  onChange,
  onReset,
}: {
  weights: Weights;
  onChange: (id: CategoryId, value: number) => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Raw total <span className="zuno-num text-foreground">{totalWeight(weights)}%</span>
        </p>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
        >
          Reset
        </button>
      </div>
      <ul className="space-y-4">
        {FAN_CATEGORIES.map((category) => (
          <li key={category.id} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5">
                <span className="size-2.5 rounded-full" style={{ background: category.colorVar }} />
                <span className="text-sm font-medium">{category.name}</span>
              </span>
              <span className="zuno-num text-base">{weights[category.id]}%</span>
            </div>
            <p className="mt-1 pl-5 text-xs text-muted-foreground">{category.blurb}</p>
            <input
              aria-label={`${category.name} allocation`}
              type="range"
              min={0}
              max={60}
              step={5}
              value={weights[category.id]}
              onChange={(event) => onChange(category.id, Number(event.target.value))}
              className="mt-3 h-2 w-full cursor-pointer accent-primary"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
