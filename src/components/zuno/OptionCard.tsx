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
      className={`group w-full rounded-2xl border p-4 text-left transition-all ${selected ? "border-primary bg-surface-2 shadow-[var(--shadow-glow)]" : "border-border bg-surface hover:border-primary/50"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-medium">{label}</p>
          {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
        </div>
        <span
          className={`mt-1 grid size-5 shrink-0 place-items-center rounded-full border ${selected ? "border-primary bg-primary" : "border-border"}`}
        >
          <span
            className={`size-2 rounded-full bg-primary-foreground ${selected ? "opacity-100" : "opacity-0"}`}
          />
        </span>
      </div>
    </button>
  );
}
