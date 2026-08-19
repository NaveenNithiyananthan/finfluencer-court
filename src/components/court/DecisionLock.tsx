import { Lock } from "lucide-react";
import type { Verdict } from "@/data/court-scenarios";

export function DecisionLock({ choice }: { choice: Verdict }) {
  return (
    <div className="animate-rise flex items-center justify-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 px-5 py-4">
      <Lock className="size-4 text-primary" aria-hidden />
      <p className="label-mono text-primary">Decision locked · {choice}</p>
    </div>
  );
}
