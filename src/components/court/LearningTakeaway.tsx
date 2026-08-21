export function LearningTakeaway({ skill }: { skill: string }) {
  return (
    <div className="animate-scale-in rounded-3xl border border-primary/30 bg-[color-mix(in_oklab,var(--primary)_7%,var(--surface))] p-7 text-center">
      <p className="label-mono text-primary">The skill you just practised</p>
      <p className="font-display mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{skill}</p>
    </div>
  );
}

