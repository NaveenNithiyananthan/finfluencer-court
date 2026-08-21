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
    <div className="animate-fade-up space-y-2">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span>{label}</span>
        <span className="zuno-num tracking-normal">
          {current} / {total}
        </span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            style={{ transitionDelay: `${index * 50}ms` }}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              index < current ? "bg-primary" : "bg-surface-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
