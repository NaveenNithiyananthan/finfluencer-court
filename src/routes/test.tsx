import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PhoneShell } from "@/components/zuno/PhoneShell";
import { DeclareWizard } from "@/components/zuno/screens/DeclareWizard";
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

function TestFlow() {
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [declaration, setDeclaration] = useState<Declaration>(emptyDeclaration);
  const { session, saveDeclaration, markStressTestCompleted } = useZunoSession();
  const whySectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (session.declaration) setDeclaration(session.declaration);
  }, [session.declaration]);

  const handleBack = () => {
    if (paused) {
      setPaused(false);
      return;
    }
    setStarted(false);
  };

  return (
    <PhoneShell
      onBack={started ? handleBack : undefined}
      step={
        <span className="surface-card rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Declare · Stress test
        </span>
      }
    >
      {!started ? (
        <DeclareWizard
          onComplete={(d) => {
            setDeclaration(d);
            saveDeclaration(d);
            setStarted(true);
          }}
        />
      ) : paused ? (
        <PauseScreen />
      ) : (
        <div className="space-y-16">
          <StressTest
            declaration={declaration}
            onContinue={() => {
              markStressTestCompleted(
                buildEducationalConcepts(declaration),
                declaration.decisionType ?? "crypto",
              );
              whySectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
          <div ref={whySectionRef} className="scroll-mt-8">
            <WhyRisky declaration={declaration} onContinue={() => setPaused(true)} />
          </div>
        </div>
      )}
    </PhoneShell>
  );
}