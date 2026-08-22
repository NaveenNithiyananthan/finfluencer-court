import { BadgeCheck, Heart, MessageCircle, Repeat2 } from "lucide-react";
import type { Scenario } from "@/data/court-scenarios";

export function ClaimCard({ scenario, locked }: { scenario: Scenario; locked?: boolean }) {
  return (
    <div
      className={`surface-card animate-scale-in relative overflow-hidden p-6 transition-all duration-500 sm:p-8 ${
        locked ? "opacity-60 saturate-50" : ""
      }`}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="label-mono text-muted-foreground">Simulated post · {scenario.tag}</span>
        <span className="label-mono rounded-full border border-border bg-surface-2 px-3 py-1 text-muted-foreground">
          {scenario.difficulty}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-court/10 font-display text-court grid size-11 items-center justify-center rounded-full text-base font-bold">
          {scenario.displayName
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-display truncate text-base font-semibold">
              {scenario.displayName}
            </span>
            <BadgeCheck className="text-accent size-4 shrink-0" aria-hidden />
          </div>
          <p className="text-sm text-muted-foreground">
            {scenario.handle} · {scenario.followers}
          </p>
        </div>
      </div>

      <blockquote className="font-display mt-6 text-xl leading-snug font-medium tracking-tight sm:text-2xl">
        “{scenario.claim}”
      </blockquote>

      <div className="mt-7 flex items-center gap-6 border-t border-border pt-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-2 transition-colors hover:text-danger">
          <Heart className="size-4" aria-hidden /> {scenario.metrics.likes}
        </span>
        <span className="flex items-center gap-2 transition-colors hover:text-accent">
          <MessageCircle className="size-4" aria-hidden /> {scenario.metrics.comments}
        </span>
        <span className="flex items-center gap-2 transition-colors hover:text-primary">
          <Repeat2 className="size-4" aria-hidden /> {scenario.metrics.shares}
        </span>
      </div>
    </div>
  );
}
