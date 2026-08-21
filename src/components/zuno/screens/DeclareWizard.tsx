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
  const [dir, setDir] = useState<1 | -1>(1);
  const [draft, setDraft] = useState<Declaration>({ ...emptyDeclaration });
  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };
  const next = () => (step === 6 ? onComplete(draft) : go(step + 1));
  return (
    <div className="space-y-8">
      <ProgressIndicator current={step} total={6} />
      <div key={step} className={dir === 1 ? "animate-slide-fwd" : "animate-slide-back"}>
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
                className="surface-card w-full resize-none p-5 text-base outline-none transition-shadow duration-200 focus:border-primary focus:shadow-glow placeholder:text-muted-foreground/50"
                placeholder="Describe the decision in your own words"
              />
              <input
                value={draft.assetOrOpportunity}
                onChange={(event) => setDraft({ ...draft, assetOrOpportunity: event.target.value })}
                className="surface-card w-full p-4 text-base outline-none transition-shadow duration-200 focus:border-primary focus:shadow-glow placeholder:text-muted-foreground/50"
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
            </>
          ) : null}
          {step === 5 ? (
            <>
              <SectionHeader eyebrow="Step 5 - Motivation" title="Why are you considering this?" />
              <div className="space-y-3">
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
            </>
          ) : null}
          {step === 6 ? (
            <>
              <SectionHeader
                eyebrow="Step 6 - Loss capacity"
                title="What happens if you lose the money?"
              />
              <div className="space-y-3">
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
            </>
          ) : null}
        </div>
      </div>
      <div className="animate-fade-up space-y-3 pt-2" style={{ animationDelay: "120ms" }}>
        <CtaButton onClick={next}>{step === 6 ? "Stress-test my decision" : "Continue"}</CtaButton>
        {step > 1 ? (
          <CtaButton
            variant="ghost"
            withArrow={false}
            onClick={() => go(step - 1)}
          >
            Back
          </CtaButton>
        ) : null}
      </div>
    </div>
  );
}
