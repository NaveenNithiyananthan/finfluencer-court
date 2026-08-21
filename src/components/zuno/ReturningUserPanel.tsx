import { CtaButton } from "./CtaButton";
import type { ZunoProgress } from "@/lib/zuno-progress";

export function ReturningUserPanel({ progress }: { progress: ZunoProgress }) {
  return (
    <section>
      <p className="zuno-eyebrow">Welcome back</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="surface-card card-hover animate-fade-up p-6" style={{ animationDelay: "60ms" }}>
          <p className="zuno-eyebrow">Decision support</p>
          <h3 className="mt-3 text-xl font-bold tracking-tight">Continue a decision</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Your last decision: <span className="font-medium text-foreground">{progress.lastDecision}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Next: Explore Fan Portfolio</p>
          <CtaButton to="/portfolio" className="mt-5">
            Continue
          </CtaButton>
        </div>
        <div className="surface-card card-hover animate-fade-up border-court/20 p-6" style={{ animationDelay: "140ms" }}>
          <p className="zuno-eyebrow text-court/80">Learning</p>
          <h3 className="mt-3 text-xl font-bold tracking-tight">Keep training</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Risk Recognition Score:{" "}
            <span className="zuno-num font-medium text-court">
              {progress.riskRecognitionScore + 1} / {progress.riskRecognitionMax}
            </span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">A new Court challenge is waiting.</p>
          <CtaButton to="/court" tone="court" className="mt-5">
            Play Court
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
