export function AmountInput({
  value,
  onChange,
  presets = [100, 250, 500, 1000],
}: {
  value: number;
  onChange: (value: number) => void;
  presets?: number[];
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 focus-within:border-primary">
        <span className="font-display text-3xl text-muted-foreground">£</span>
        <input
          inputMode="numeric"
          aria-label="Amount in pounds"
          value={Number.isFinite(value) ? value : ""}
          onChange={(event) => onChange(Number(event.target.value.replace(/[^0-9]/g, "")) || 0)}
          className="w-full bg-transparent font-display text-3xl font-semibold text-foreground outline-none"
          placeholder="500"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            type="button"
            key={preset}
            onClick={() => onChange(preset)}
            className={`rounded-full border px-4 py-2 text-sm ${value === preset ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground"}`}
          >
            £{preset}
          </button>
        ))}
      </div>
    </div>
  );
}
