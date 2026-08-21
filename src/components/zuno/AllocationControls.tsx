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
    <div className="animate-fade-up space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Raw total <span className="zuno-num font-medium">{totalWeight(weights)}%</span>
        </p>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary active:scale-95"
        >
          Reset
        </button>
      </div>
      <ul className="space-y-4">
        {FAN_CATEGORIES.map((category) => (
          <li key={category.id} className="surface-card p-4 transition-shadow duration-200 hover:shadow-elevated">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5">
                <span
                  className="size-2.5 rounded-full ring-3 ring-current/10"
                  style={{ background: category.colorVar }}
                />
                <span className="text-sm font-medium">{category.name}</span>
              </span>
              <span className="zuno-num rounded-lg bg-surface-2 px-2 py-0.5 text-base tabular-nums">
                {weights[category.id]}%
              </span>
            </div>
            <p className="mt-1 pl-5 text-xs leading-relaxed text-muted-foreground">{category.blurb}</p>
            <input
              aria-label={`${category.name} allocation`}
              type="range"
              min={0}
              max={60}
              step={5}
              value={weights[category.id]}
              onChange={(event) => onChange(category.id, Number(event.target.value))}
              style={{ ["--fill" as string]: `${(weights[category.id] / 60) * 100}` }}
              className="mt-4 h-1.5 w-full cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
