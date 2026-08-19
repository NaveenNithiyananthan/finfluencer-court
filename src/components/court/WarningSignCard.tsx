import { AlertTriangle } from "lucide-react";

export function WarningSignCard({
  index,
  label,
  detail,
}: {
  index: number;
  label: string;
  detail: string;
}) {
  return (
    <div
      className="animate-rise rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-caution/50 hover:bg-surface-raised"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-center gap-2">
        <AlertTriangle className="size-4 text-caution" aria-hidden />
        <span className="label-mono text-caution">Warning sign 0{index + 1}</span>
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold">{label}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{detail}</p>
    </div>
  );
}

export function ReasoningCardView({
  index,
  title,
  detail,
}: {
  index: number;
  title: string;
  detail: string;
}) {
  return (
    <div
      className="animate-rise rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/50 hover:bg-surface-raised"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <span className="label-mono text-accent">Evidence 0{index + 1}</span>
      <h3 className="mt-3 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{detail}</p>
    </div>
  );
}
