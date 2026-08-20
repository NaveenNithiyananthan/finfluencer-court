import { useState } from "react";
import { AmountInput } from "../AmountInput";
import { CtaButton } from "../CtaButton";
import { OptionCard } from "../OptionCard";
import { ProgressIndicator } from "../ProgressIndicator";
import { SectionHeader } from "../SectionHeader";
import {
  driverOptions,
  decisionTypeOptions,
  emptyDeclaration,
  horizonOptions,
  lossCapacityOptions,
  type Declaration,
} from "@/lib/zuno-data";

export function DeclareWizard({ onComplete }: { onComplete: (declaration: Declaration) => void }) {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Declaration>({ ...emptyDeclaration });
  const next = () => (step === 6 ? onComplete(draft) : setStep((current) => current + 1));
  return (
    <div className="space-y-8">
      <ProgressIndicator current={step} total={5} />
      <div className="space-y-6">
        {step === 1 ? (
          <>
            <SectionHeader
              eyebrow="Step 1 - Declare"
              subtitle="Tell ZUNO what you are considering."
              title="What are you thinking of doing?"
            />
            <textarea
              autoFocus
              value={draft.idea}
              onChange={(event) => setDraft({ ...draft, idea: event.target.value })}
              rows={5}
              className="w-full resize-none rounded-2xl border border-border bg-surface p-5 text-base text-foreground outline-none focus:border-primary"
              placeholder="Describe the decision in your own words"
            />
            <input
              value={draft.assetOrOpportunity}
              onChange={(event) => setDraft({ ...draft, assetOrOpportunity: event.target.value })}
              className="w-full rounded-2xl border border-border bg-surface p-4 text-base text-foreground outline-none focus:border-primary"
              placeholder="Name the asset, team, company or opportunity (optional)"
            />
          </>
        ) : null}
        {step === 2 ? (
          <>
            <SectionHeader
              eyebrow="Step 2 - Decision type"
              title="What kind of decision is this?"
            />
            <div className="space-y-3">
              {decisionTypeOptions.map((option) => (
                <OptionCard
                  key={option.id}
                  label={option.label}
                  hint={option.hint}
                  selected={draft.decisionType === option.id}
                  onSelect={() => setDraft({ ...draft, decisionType: option.id })}
                />
              ))}
            </div>
          </>
        ) : null}
        {step === 3 ? (
          <>
            <SectionHeader
              eyebrow="Step 3 - Amount"
              title="How much are you thinking of putting in?"
            />
            <AmountInput
              value={draft.amount}
              onChange={(amount) => setDraft({ ...draft, amount })}
            />
          </>
        ) : null}
        {step === 4 ? (
          <>
            <SectionHeader eyebrow="Step 4 - Time horizon" title="How long would you hold it?" />
            <div className="space-y-3">
              {horizonOptions.map((option) => (
                <OptionCard
                  key={option.id}
                  label={option.label}
                  hint={option.hint}
                  selected={draft.horizon === option.id}
                  onSelect={() => setDraft({ ...draft, horizon: option.id })}
                />
              ))}
            </div>
          </>
        ) : null}
        {step === 5 ? (
          <>
            <SectionHeader eyebrow="Step 5 - Motivation" title="Why are you considering this?" />
            <div className="space-y-3">
              {driverOptions.map((option) => (
                <OptionCard
                  key={option.id}
                  label={option.label}
                  hint={option.hint}
                  selected={draft.driver === option.id}
                  onSelect={() => setDraft({ ...draft, driver: option.id })}
                />
              ))}
            </div>
          </>
        ) : null}
        {step === 6 ? (
          <>
            <SectionHeader
              eyebrow="Step 6 - Loss capacity"
              title="What happens if you lose the money?"
            />
            <div className="space-y-3">
              {lossCapacityOptions.map((option) => (
                <OptionCard
                  key={option.id}
                  label={option.label}
                  hint={option.hint}
                  selected={draft.lossCapacity === option.id}
                  onSelect={() => setDraft({ ...draft, lossCapacity: option.id })}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
      <div className="space-y-3 pt-2">
        <CtaButton onClick={next}>{step === 6 ? "Stress-test my decision" : "Continue"}</CtaButton>
        {step > 1 ? (
          <CtaButton
            variant="ghost"
            withArrow={false}
            onClick={() => setStep((current) => current - 1)}
          >
            Back
          </CtaButton>
        ) : null}
      </div>
    </div>
  );
}
