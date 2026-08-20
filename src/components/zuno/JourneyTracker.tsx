import { Link } from "@tanstack/react-router";
import { Target, LineChart, PieChart } from "lucide-react";

const stages = [
  { number: "01", title: "DECLARE", copy: "What are you thinking of doing?", to: "/test", Icon: Target },
  { number: "02", title: "STRESS TEST", copy: "What are you actually risking?", to: "/test", Icon: LineChart },
  { number: "03", title: "FAN PORTFOLIO", copy: "Is there another way to express the same belief?", to: "/portfolio", Icon: PieChart },
];

export function JourneyTracker() {
  return (
    <section className="relative">
      <p className="zuno-eyebrow">Core ZUNO journey</p>
      <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Before you act, think it through.</h2>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Three connected stages. Each one exists to slow the decision down, not to tell you what to buy.
      </p>
      <ol className="relative mt-6 grid gap-4 md:grid-cols-3">
        <div aria-hidden className="pointer-events-none absolute left-8 top-6 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-primary/60 via-border to-border md:block" />
        {stages.map(({ number, title, copy, to, Icon }) => (
          <li key={number} className="relative">
            <Link to={to} className="flex h-full flex-col gap-3 rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full border border-primary/40 bg-background text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="zuno-eyebrow">{number}</span>
              </div>
              <h3 className="font-display text-base font-bold tracking-wide">{title}</h3>
              <p className="text-sm text-muted-foreground">{copy}</p>
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-muted-foreground/80">
        Finfluencer Court is not a step in this journey — it is a separate learning loop you can enter at any time.
      </p>
    </section>
  );
}