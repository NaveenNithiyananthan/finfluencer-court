import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PhoneShell } from "@/components/zuno/PhoneShell";
import { DeclareWizard } from "@/components/zuno/screens/DeclareWizard";
import { DecisionSummary } from "@/components/zuno/screens/DecisionSummary";
import { StressTest } from "@/components/zuno/screens/StressTest";
import { WhyRisky } from "@/components/zuno/screens/WhyRisky";
import { PauseScreen } from "@/components/zuno/screens/PauseScreen";
import { buildEducationalConcepts, emptyDeclaration, type Declaration } from "@/lib/zuno-data";
import { useZunoSession } from "@/lib/zuno-session";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "ZUNO — Stress-test your money decision before you act" },
      {
        name: "description",
        content:
          "ZUNO is a financial decision-training prototype: declare what you're considering, see the real downside, and learn to spot the risk yourself.",
      },
      { property: "og:title", content: "ZUNO — Stress-test your money decision" },
      {
        property: "og:description",
        content:
          "Declare the decision, see what you're actually risking, then explore a different way to get there.",
      },
    ],
  }),
  component: TestFlow,
});

type Stage = "declare" | "summary" | "stress" | "why" | "pause";

const stageOrder: Stage[] = ["declare", "summary", "stress", "why", "pause"];

function TestFlow() {
  const [stage, setStage] = useState<Stage>("declare");
  const [declaration, setDeclaration] = useState<Declaration>(emptyDeclaration);
  const { session, saveDeclaration, markStressTestCompleted } = useZunoSession();

  useEffect(() => {
    if (session.declaration) setDeclaration(session.declaration);
  }, [session.declaration]);

  const goBack = () => {
    const i = stageOrder.indexOf(stage);
    if (i > 0) setStage(stageOrder[i - 1] ?? "declare");
  };

  return (
    <PhoneShell
      onBack={stage === "declare" ? undefined : goBack}
      step={
        <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          Declare · Stress test
        </span>
      }
    >
      {stage === "declare" && (
        <DeclareWizard
          onComplete={(d) => {
            setDeclaration(d);
            saveDeclaration(d);
            setStage("summary");
          }}
        />
      )}
      {stage === "summary" && (
        <DecisionSummary declaration={declaration} onContinue={() => setStage("stress")} />
      )}
      {stage === "stress" && (
        <StressTest
          declaration={declaration}
          onContinue={() => {
            markStressTestCompleted(
              buildEducationalConcepts(declaration),
              declaration.decisionType ?? "crypto",
            );
            setStage("why");
          }}
        />
      )}
      {stage === "why" && (
        <WhyRisky declaration={declaration} onContinue={() => setStage("pause")} />
      )}
      {stage === "pause" && <PauseScreen />}
    </PhoneShell>
  );
}
