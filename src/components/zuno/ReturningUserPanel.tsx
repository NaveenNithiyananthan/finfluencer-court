import { CtaButton } from "./CtaButton";
import type { ZunoProgress } from "@/lib/zuno-progress";

export function ReturningUserPanel({ progress }: { progress: ZunoProgress }) {
  return (
    <section>
      <p className="zuno-eyebrow">Welcome back</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-primary/25 bg-card p-6">
          <p className="zuno-eyebrow">Decision support</p>
          <h3 className="mt-3 text-xl font-bold">Continue a decision</h3>
          <p className="mt-3 text-sm text-muted-foreground">Your last decision: <span className="text-foreground">{progress.lastDecision}</span></p>
          <p className="mt-1 text-sm text-muted-foreground">Next: Explore Fan Portfolio</p>
          <CtaButton to="/portfolio" className="mt-5">Continue</CtaButton>
        </div>
        <div className="rounded-3xl border border-court/25 bg-card p-6">
          <p className="zuno-eyebrow">Learning</p>
          <h3 className="mt-3 text-xl font-bold">Keep training</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Risk Recognition Score: <span className="text-foreground">{progress.riskRecognitionScore + 1} / {progress.riskRecognitionMax}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">A new Court challenge is waiting.</p>
          <CtaButton to="/court" tone="court" className="mt-5">Play Court</CtaButton>
        </div>
      </div>
    </section>
  );
}