const levelTone: Record<string, string> = {
  None: "text-safe",
  Low: "text-safe",
  Medium: "text-caution-foreground",
  High: "text-danger",
  "Very High": "text-danger",
};
const levelFill: Record<string, number> = {
  None: 0.08,
  Low: 0.3,
  Medium: 0.55,
  High: 0.8,
  "Very High": 1,
};
const levelBar: Record<string, string> = {
  None: "bg-safe",
  Low: "bg-safe",
  Medium: "bg-caution",
  High: "bg-danger",
  "Very High": "bg-danger",
};
export function RiskMetricCard({
  label,
  level,
  note,
}: {
  label: string;
  level: string;
  note?: string;
}) {
  return (
    <div className="surface-card h-full p-4 transition-shadow duration-200 hover:shadow-elevated">
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p
        className={`font-display mt-1 text-lg font-semibold ${levelTone[level] ?? "text-foreground"}`}
      >
        {level}
      </p>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${levelBar[level] ?? "bg-primary"}`}
          style={{ width: `${(levelFill[level] ?? 0.5) * 100}%` }}
        />
      </div>
      {note ? <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{note}</p> : null}
    </div>
  );
}
