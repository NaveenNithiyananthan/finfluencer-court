import { useState } from "react";
import { CtaButton } from "../CtaButton";
import { LossScenarioVisualiser } from "../LossScenarioVisualiser";
import { RiskMetricCard } from "../RiskMetricCard";
import { SectionHeader } from "../SectionHeader";
import {
  buildRiskSnapshot,
  driverOptions,
  scenarioCopy,
  type Declaration,
} from "@/lib/zuno-data";

export function StressTest({
  declaration,
  onContinue,
}: {
  declaration: Declaration;
  onContinue: () => void;
}) {
  const [lossPct, setLossPct] = useState(50);
  const copy = scenarioCopy(declaration);
  const metrics = buildRiskSnapshot(declaration);
  const driverLabel = driverOptions.find((option) => option.id === declaration.driver)?.label;

  return (
    <div className="space-y-8">
      <SectionHeader eyebrow={copy.eyebrow} subtitle={copy.subtitle} title={copy.title} />

      <section className="space-y-6">
        <figure className="surface-card animate-fade-up relative overflow-hidden p-6">
          <span
            aria-hidden
            className="font-display pointer-events-none absolute -top-4 right-3 select-none text-8xl leading-none text-primary/10"
          >
            ”
          </span>
          <p className="zuno-eyebrow">Putting your words on trial</p>
          <h2 className="mt-2 max-w-xl font-display text-2xl font-bold leading-snug sm:text-3xl">
            “{declaration.idea}”
          </h2>
        </figure>

        <blockquote
          className="my-6 animate-fade-up border-l-2 border-primary pl-4 italic text-muted-foreground"
          style={{ animationDelay: "80ms" }}
        >
          {driverLabel ? (
            <>You mentioned you're doing this because {driverLabel}. </>
          ) : (
            <>You kept your reasons to yourself — that's allowed here. </>
          )}
          Let's see what that looks like if the market turns against you.
        </blockquote>

        <div className="animate-fade-up" style={{ animationDelay: "140ms" }}>
          <LossScenarioVisualiser
            amount={declaration.amount}
            lossPct={lossPct}
            onChange={setLossPct}
            prefix={copy.visualiser.prefix}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="zuno-eyebrow">{copy.snapshotHeading}</h2>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <RiskMetricCard {...metric} />
            </div>
          ))}
        </div>
      </section>

      <div className="animate-fade-up">
        <CtaButton onClick={onContinue}>Why does ZUNO think this is risky?</CtaButton>
      </div>
    </div>
  );
}
