import { CtaButton } from "../CtaButton";
import { SectionHeader } from "../SectionHeader";
import { buildReasoningCards, scenarioCopy, type Declaration } from "@/lib/zuno-data";

export function WhyRisky({
  declaration,
  onContinue,
}: {
  declaration: Declaration;
  onContinue: () => void;
}) {
  const copy = scenarioCopy(declaration);
  const cards = buildReasoningCards(declaration);
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="The reasoning"
        subtitle={copy.reasoningSubtitle}
        title={copy.reasoningTitle}
      />
      <div className="space-y-3">
        {cards.map((card, index) => (
          <article key={card.title} className="surface-card p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-surface-2 font-display text-sm text-primary">
                {index + 1}
              </span>
              <h2 className="font-display text-lg font-semibold">{card.title}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
          </article>
        ))}
      </div>
      <CtaButton onClick={onContinue}>Continue</CtaButton>
    </div>
  );
}
