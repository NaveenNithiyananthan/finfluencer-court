export function OptionCard({
  label,
  hint,
  selected,
  onSelect,
}: {
  label: string;
  hint?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group w-full rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
        selected
          ? "shadow-glow border-primary bg-[color-mix(in_oklab,var(--primary)_6%,var(--surface))]"
          : "surface-card shadow-none hover:border-primary/40"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`font-display text-base font-medium ${selected ? "text-primary" : ""}`}>
            {label}
          </p>
          {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
        </div>
        <span
          className={`mt-1 grid size-5 shrink-0 place-items-center rounded-full border transition-all duration-200 ${
            selected ? "border-primary bg-primary" : "border-border group-hover:border-primary/50"
          }`}
        >
          <span
            className={`size-2 scale-0 rounded-full bg-primary-foreground transition-transform duration-200 ${selected ? "scale-100" : ""}`}
          />
        </span>
      </div>
    </button>
  );
}
