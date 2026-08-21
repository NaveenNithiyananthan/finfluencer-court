import { CtaButton } from "../CtaButton";
import { SectionHeader } from "../SectionHeader";
import { formatGBP, type Declaration } from "@/lib/zuno-data";

export function DecisionSummary({
  declaration,
  onContinue,
}: {
  declaration: Declaration;
  onContinue: () => void;
}) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Your decision"
        subtitle="A quick read-back before we look at the downside."
        title="Here is what you told us."
      />
      <div className="bg-hero surface-card animate-scale-in space-y-2 p-6 text-center">
        <p className="zuno-num text-primary text-5xl font-semibold">
          {formatGBP(declaration.amount)}
        </p>
        <p className="mt-3 text-base leading-relaxed">
          {declaration.idea.trim() || "No description added"}
        </p>
      </div>
      <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
        <CtaButton onClick={onContinue}>Show me the downside</CtaButton>
      </div>
    </div>
  );
}
