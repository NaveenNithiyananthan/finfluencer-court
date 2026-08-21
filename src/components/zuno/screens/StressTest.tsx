import { useState } from "react";
import { CtaButton } from "../CtaButton";
import { LossScenarioVisualiser } from "../LossScenarioVisualiser";
import { RiskMetricCard } from "../RiskMetricCard";
import { SectionHeader } from "../SectionHeader";
import { buildRiskSnapshot, scenarioCopy, type Declaration } from "@/lib/zuno-data";

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
  return (
    <div className="space-y-8">
      <SectionHeader eyebrow={copy.eyebrow} subtitle={copy.subtitle} title={copy.title} />
      <LossScenarioVisualiser
        amount={declaration.amount}
        lossPct={lossPct}
        onChange={setLossPct}
        prefix={copy.visualiser.prefix}
      />
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
