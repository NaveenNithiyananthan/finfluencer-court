import { SectionHeader } from "../SectionHeader";
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
            className="surface-card animate-fade-up p-5 transition-shadow duration-200 hover:shadow-elevated"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="bg-primary/10 font-display text-primary grid size-8 place-items-center rounded-full text-sm">
                {index + 1}
              </span>
              <h2 className="font-display text-lg font-semibold">{card.title}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
