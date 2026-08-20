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
        <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {copy.snapshotHeading}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric) => (
            <RiskMetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </section>
      <CtaButton onClick={onContinue}>Why does ZUNO think this is risky?</CtaButton>
    </div>
  );
}
