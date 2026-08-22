import { Callout, SectionHeader } from "../primitives";
import { buildReasoningCards, scenarioCopy, type Declaration } from "@/lib/zuno-data";

export function WhyRisky({ declaration }: { declaration: Declaration }) {
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
          <article
            key={card.title}
            className="surface-card animate-fade-up p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-primary/25 bg-gradient-to-br from-primary/20 to-primary/5 font-display text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <h2 className="font-display text-lg font-semibold leading-snug">{card.title}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
          </article>
        ))}
      </div>
      <Callout label="Keep in mind">
        None of this means the idea is wrong. It means the downside deserves a plan before any money
        moves.
      </Callout>
    </div>
  );
}
