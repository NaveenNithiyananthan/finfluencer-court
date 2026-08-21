const copy: Record<Verdict, { hint: string; tone: string }> = {
  LEGITIMATE: {
    hint: "Reasoning holds up",
    tone: "hover:border-primary hover:text-primary data-[state=chosen]:border-primary data-[state=chosen]:text-primary",
  },
  RISKY: {
    hint: "Possible, but exposed",
    tone: "hover:border-caution hover:text-caution-foreground data-[state=chosen]:border-caution data-[state=chosen]:text-caution-foreground",
  },
  MISLEADING: {
    hint: "The reasoning is broken",
    tone: "hover:border-verdict hover:text-verdict data-[state=chosen]:border-verdict data-[state=chosen]:text-verdict",
  },
};

export function VerdictButton({
  verdict,
  chosen,
  disabled,
  onSelect,
}: {
  verdict: Verdict;
  chosen?: boolean;
  disabled?: boolean;
  onSelect: (v: Verdict) => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      data-state={chosen ? "chosen" : undefined}
      onClick={() => onSelect(verdict)}
      className={`surface-card animate-fade-up group flex flex-col items-start gap-1 px-5 py-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated disabled:cursor-default disabled:hover:translate-y-0 disabled:hover:shadow-none data-[state=chosen]:animate-lock ${copy[verdict].tone} ${
        disabled && !chosen ? "opacity-40" : ""
      }`}
    >
      <span className="font-display text-lg font-bold tracking-tight">{verdict}</span>
      <span className="text-sm text-muted-foreground">{copy[verdict].hint}</span>
    </button>
  );
}
