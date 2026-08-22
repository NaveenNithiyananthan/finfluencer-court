import { useState } from "react";
import { AmountInput } from "../AmountInput";
import { CtaButton } from "../CtaButton";
import { OptionCard } from "../OptionCard";
import { SectionHeader } from "../SectionHeader";
import { cn } from "@/lib/utils";
import {
  decisionTypeOptions,
  driverOptions,
  emptyDeclaration,
  horizonOptions,
  lossCapacityOptions,
  type Declaration,
} from "@/lib/zuno-data";

type DebtAnswer = "yes" | "no";
type SavingsAnswer = "solid" | "a-little" | "none";
type PurposeAnswer = "essentials" | "specific-goal" | "spare-cash";

export function DeclareWizard({ onComplete }: { onComplete: (declaration: Declaration) => void }) {
  const [draft, setDraft] = useState<Declaration>({ ...emptyDeclaration });
  const [debt, setDebt] = useState<DebtAnswer | null>(null);
  const [savings, setSavings] = useState<SavingsAnswer | null>(null);
  const [purpose, setPurpose] = useState<PurposeAnswer | null>(null);

  const foundationsComplete = debt !== null && savings !== null && purpose !== null;

  const warnings: string[] = [];
  if (debt === "yes") {
    warnings.push(
      "Before we look at the investment: paying off high-interest debt is effectively a guaranteed return. Are you sure you want to risk this cash?",
    );
  }
  if (savings === "none") {
    warnings.push(
      "With no accessible emergency savings, one unexpected bill could force you to exit at the worst possible moment.",
    );
  }
  if (purpose === "essentials" || purpose === "specific-goal") {
    warnings.push(
      "This money already has a job. If the market falls, money meant for essentials or a specific goal is the hardest to win back.",
    );
  }

  const submit = () => {
    if (!draft.idea.trim()) return;
    onComplete(draft);
  };

  return (
    <div className="space-y-8">
      <section className="animate-fade-up space-y-5">
        <SectionHeader
          eyebrow="Step 01: The Foundations"
          subtitle="Three quick questions. ZUNO uses them to frame every number that follows."
          title="Where are you starting from?"
        />
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="space-y-2.5">
            <p className="text-sm font-medium">Do you have high-interest debt?</p>
            <div className="grid gap-2">
              <OptionCard label="Yes" selected={debt === "yes"} onSelect={() => setDebt("yes")} />
              <OptionCard label="No" selected={debt === "no"} onSelect={() => setDebt("no")} />
            </div>
          </div>
          <div className="space-y-2.5">
            <p className="text-sm font-medium">Accessible emergency savings?</p>
            <div className="grid gap-2">
              <OptionCard
                label="Solid"
                selected={savings === "solid"}
                onSelect={() => setSavings("solid")}
              />
              <OptionCard
                label="A little"
                selected={savings === "a-little"}
                onSelect={() => setSavings("a-little")}
              />
              <OptionCard
                label="None"
                selected={savings === "none"}
                onSelect={() => setSavings("none")}
              />
            </div>
          </div>
          <div className="space-y-2.5">
            <p className="text-sm font-medium">What is this money currently for?</p>
            <div className="grid gap-2">
              <OptionCard
                label="Essentials"
                selected={purpose === "essentials"}
                onSelect={() => setPurpose("essentials")}
              />
              <OptionCard
                label="Specific Goal"
                selected={purpose === "specific-goal"}
                onSelect={() => setPurpose("specific-goal")}
              />
              <OptionCard
                label="Spare Cash"
                selected={purpose === "spare-cash"}
                onSelect={() => setPurpose("spare-cash")}
              />
            </div>
          </div>
        </div>
        {warnings.map((warning) => (
          <blockquote
            key={warning}
            className="my-6 animate-fade-up border-l-2 border-caution pl-4 italic text-muted-foreground"
          >
            {warning}
          </blockquote>
        ))}
      </section>

      <SectionHeader
        eyebrow="Step 02: The Idea"
        subtitle="Tell ZUNO what you are considering."
        title="What are you thinking of doing?"
      />

      <div
        className={cn(
          "space-y-8 transition-opacity duration-700 ease-out",
          foundationsComplete ? "opacity-100" : "pointer-events-none select-none opacity-50",
        )}
      >
        <div className="space-y-4">
          <textarea
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
    </div>
  );
}
