import { FAN_CATEGORIES, normalisedWeights, type Weights } from "@/lib/fan-portfolio";

export function AllocationRing({
  weights,
  centerTop,
  centerBottom,
  size = 220,
}: {
  weights: Weights;
  centerTop: string;
  centerBottom: string;
  size?: number;
}) {
  const normalised = normalisedWeights(weights);
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--surface-2)"
          strokeWidth={stroke}
        />        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {FAN_CATEGORIES.map((category) => {
            const share = normalised[category.id] / 100;
            const length = share * circumference;
            const dashOffset = -offset * circumference;
            offset += share;
            return (
              <circle
                key={category.id}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={category.colorVar}
                strokeWidth={stroke}
                strokeLinecap="butt"
                strokeDasharray={`${Math.max(length - 2, 0)} ${circumference}`}
                strokeDashoffset={dashOffset}
                className="transition-all duration-500 ease-out"
              />
            );
          })}
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="zuno-num text-3xl transition-all duration-300">{centerTop}</span>
        <span className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {centerBottom}
        </span>
      </div>
    </div>
  );
}

export function AllocationLegend({ weights }: { weights: Weights }) {
  const normalised = normalisedWeights(weights);
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {FAN_CATEGORIES.map((category) => (
        <li
          key={category.id}
          className="flex items-center justify-between gap-3 rounded-xl bg-surface/70 px-3 py-2.5"
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ background: category.colorVar }}
            />
            <span className="truncate text-sm text-foreground">{category.name}</span>
          </span>
          <span className="zuno-num text-sm text-muted-foreground">
            {normalised[category.id].toFixed(0)}%
          </span>
        </li>
      ))}
    </ul>
  );
}
