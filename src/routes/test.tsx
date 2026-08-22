import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PhoneShell } from "@/components/zuno/PhoneShell";
import { DeclareWizard } from "@/components/zuno/screens/DeclareWizard";
import { StressTest } from "@/components/zuno/screens/StressTest";
import { WhyRisky } from "@/components/zuno/screens/WhyRisky";
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
  const [declaration, setDeclaration] = useState<Declaration>(emptyDeclaration);
  const { session, saveDeclaration, markStressTestCompleted } = useZunoSession();
  const whySectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (session.declaration) setDeclaration(session.declaration);
  }, [session.declaration]);

  return (
    <PhoneShell
      onBack={started ? () => setStarted(false) : undefined}
      step={
        <span className="surface-card rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Foundations · Idea · Stress test
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
            <WhyRisky declaration={declaration} />
          </div>
          <div className="bg-hero surface-card animate-scale-in space-y-4 p-6 mt-12">
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
        </div>
      )}
    </PhoneShell>
  );
}
