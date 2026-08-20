import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { OptionCard } from "../OptionCard";
import { SectionHeader } from "../SectionHeader";
import { motivationOptions } from "@/lib/zuno-data";
import { useZunoSession } from "@/lib/zuno-session";

export function PauseScreen() {
  const [motivation, setMotivation] = useState<string | null>(null);
  const { session, saveGoal } = useZunoSession();
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="The pause"
        subtitle="What are you actually trying to achieve?"
        title="Before you act, ask one more question."
      />
      <div className="space-y-3">
        {motivationOptions.map((option) => (
          <OptionCard
            key={option.id}
            label={option.label}
            selected={motivation === option.id}
            onSelect={() => {
              setMotivation(option.id);
              saveGoal(option.id);
            }}
          />
        ))}
      </div>
      {motivation && session.declaration ? (
        <div className="surface-card bg-hero space-y-4 p-6">
          <p className="font-display text-2xl leading-snug font-semibold">
            There may be more than one way to achieve the same goal.
          </p>
          <Link
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 font-display text-base font-semibold text-primary-foreground"
            to="/portfolio"
          >
            Explore an alternative
          </Link>
        </div>
      ) : null}
    </div>
  );
}
