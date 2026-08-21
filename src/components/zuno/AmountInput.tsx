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
    <div className="animate-fade-up space-y-4">
      <div className="surface-card flex items-center gap-3 px-5 py-4 transition-colors duration-200 focus-within:border-primary focus-within:shadow-glow">
        <span className="font-display text-muted-foreground/60 text-3xl">£</span>
        <input
          inputMode="numeric"
          aria-label="Amount in pounds"
          value={Number.isFinite(value) ? value : ""}
          onChange={(event) => onChange(Number(event.target.value.replace(/[^0-9]/g, "")) || 0)}
          className="font-display zuno-num w-full bg-transparent text-3xl font-semibold outline-none placeholder:text-muted-foreground/40"
          placeholder="500"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            type="button"
            key={preset}
            onClick={() => onChange(preset)}
            className={`rounded-full border px-4 py-2 text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
              value === preset
                ? "border-primary bg-primary text-primary-foreground shadow-glow"
                : "surface-card shadow-none text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            £{preset}
          </button>
        ))}
      </div>
    </div>
  );
}
