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
        {motivationOptions.map((option, i) => (
          <div
            key={option.id}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <OptionCard
              label={option.label}
              selected={motivation === option.id}
              onSelect={() => {
                setMotivation(option.id);
                saveGoal(option.id);
              }}
            />
          </div>
        ))}
      </div>
      {motivation && session.declaration ? (
        <div className="bg-hero surface-card animate-scale-in space-y-4 p-6">
          <p className="font-display text-2xl leading-snug font-semibold tracking-tight">
            There may be more than one way to achieve the same goal.
          </p>
          <Link
            className="shadow-glow inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 font-display text-base font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-[0.99]"
            to="/portfolio"
          >
            Explore an alternative
          </Link>
        </div>
      ) : null}
    </div>
  );
}
