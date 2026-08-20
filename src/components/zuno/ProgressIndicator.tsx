export function ProgressIndicator({
  current,
  total,
  label = "Declare",
}: {
  current: number;
  total: number;
  label?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span>{label}</span>
        <span>
          {current} / {total}
        </span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={`h-1 flex-1 rounded-full ${index < current ? "bg-primary" : "bg-surface-2"}`}
          />
        ))}
      </div>
    </div>
  );
}
