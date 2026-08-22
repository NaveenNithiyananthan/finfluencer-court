import { useState } from "react";
import { AmountInput } from "../AmountInput";
import { CtaButton } from "../CtaButton";
import { OptionCard } from "../OptionCard";
import { SectionHeader } from "../SectionHeader";
import {
  decisionTypeOptions,
  driverOptions,
  emptyDeclaration,
  horizonOptions,
  lossCapacityOptions,
  type Declaration,
} from "@/lib/zuno-data";

export function DeclareWizard({ onComplete }: { onComplete: (declaration: Declaration) => void }) {
  const [draft, setDraft] = useState<Declaration>({ ...emptyDeclaration });

  const submit = () => {
    if (!draft.idea.trim()) return;
    onComplete(draft);
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Declare"
        subtitle="Tell ZUNO what you are considering."
        title="What are you thinking of doing?"
      />

      <div className="space-y-4">
        <textarea
          autoFocus
          value={draft.idea}
          onChange={(event) => setDraft({ ...draft, idea: event.target.value })}
          rows={5}
          className="surface-card w-full resize-none p-5 text-base outline-none transition-shadow duration-200 focus:border-primary focus:shadow-glow placeholder:text-muted-foreground/50"
          placeholder="Describe the decision in your own words"
        />
        <input
          value={draft.assetOrOpportunity}
          onChange={(event) => setDraft({ ...draft, assetOrOpportunity: event.target.value })}
          className="surface-card w-full p-4 text-base outline-none transition-shadow duration-200 focus:border-primary focus:shadow-glow placeholder:text-muted-foreground/50"
          placeholder="Name the asset, team, company or opportunity (optional)"
        />
      </div>

      <section className="animate-fade-up space-y-3" style={{ animationDelay: "60ms" }}>
        <p className="zuno-eyebrow">How much?</p>
        <AmountInput value={draft.amount} onChange={(amount) => setDraft({ ...draft, amount })} />
      </section>

      <section className="grid gap-x-6 gap-y-8 md:grid-cols-2">
        <div className="animate-fade-up space-y-3" style={{ animationDelay: "120ms" }}>
          <p className="zuno-eyebrow">Decision type</p>
          <div className="grid gap-2.5">
            {decisionTypeOptions.map((option, i) => (
              <div
                key={option.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <OptionCard
                  label={option.label}
                  hint={option.hint}
                  selected={draft.decisionType === option.id}
                  onSelect={() => setDraft({ ...draft, decisionType: option.id })}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-up space-y-3" style={{ animationDelay: "180ms" }}>
          <p className="zuno-eyebrow">Time horizon</p>
          <div className="grid gap-2.5">
            {horizonOptions.map((option, i) => (
              <div
                key={option.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <OptionCard
                  label={option.label}
                  hint={option.hint}
                  selected={draft.horizon === option.id}
                  onSelect={() => setDraft({ ...draft, horizon: option.id })}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-up space-y-3" style={{ animationDelay: "240ms" }}>
          <p className="zuno-eyebrow">Motivation</p>
          <div className="grid gap-2.5">
            {driverOptions.map((option, i) => (
              <div
                key={option.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <OptionCard
                  label={option.label}
                  hint={option.hint}
                  selected={draft.driver === option.id}
                  onSelect={() => setDraft({ ...draft, driver: option.id })}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-up space-y-3" style={{ animationDelay: "300ms" }}>
          <p className="zuno-eyebrow">Loss capacity</p>
          <div className="grid gap-2.5">
            {lossCapacityOptions.map((option, i) => (
              <div
                key={option.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <OptionCard
                  label={option.label}
                  hint={option.hint}
                  selected={draft.lossCapacity === option.id}
                  onSelect={() => setDraft({ ...draft, lossCapacity: option.id })}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="animate-fade-up pt-2" style={{ animationDelay: "360ms" }}>
        <CtaButton onClick={submit}>Stress-test this idea</CtaButton>
      </div>
    </div>
  );
}
