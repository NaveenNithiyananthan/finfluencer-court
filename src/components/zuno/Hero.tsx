import { Badge } from "@/components/ui/badge";
import { CtaButton } from "@/components/zuno/CtaButton";

export function Hero() {
  return (
    <section className="relative flex min-h-[84svh] items-center overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid mask-radial-fade absolute inset-0" />
        <div className="absolute -top-44 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative py-20 sm:py-24">
        <div className="animate-fade-up">
          <Badge variant="secondary" className="gap-2 border-primary/25 bg-primary/10 text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Financial decision training
          </Badge>
        </div>

        <h1
          className="animate-fade-up mt-7 font-display text-[clamp(2.9rem,9vw,5.75rem)] font-bold leading-[0.98] tracking-[-0.03em]"
          style={{ animationDelay: "100ms" }}
        >
          Think before
          <br />
          you <span className="text-primary">win.</span>
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: "200ms" }}
        >
          Understand the risk behind the hype before you act. ZUNO helps you think — it never tells
          you what to invest in.
        </p>

        <div className="animate-fade-up mt-10" style={{ animationDelay: "300ms" }}>
          <CtaButton to="/test" className="w-full sm:w-auto">
            Test a decision
          </CtaButton>
          <p className="mt-4 text-sm text-muted-foreground/80">
            Thinking about putting your money into something? Stress-test it first.
          </p>
        </div>
      </div>
    </section>
  );
}
