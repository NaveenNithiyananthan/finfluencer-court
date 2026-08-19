export function LearningTakeaway({ skill }: { skill: string }) {
  return (
    <div className="rounded-3xl border border-primary/35 bg-primary/10 p-7">
      <p className="label-mono text-primary">The skill you just practised</p>
      <p className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl">{skill}</p>
    </div>
  );
}
