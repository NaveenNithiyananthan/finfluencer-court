import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gavel, LineChart, PieChart, Target } from "lucide-react";
import { CourtButton } from "@/components/court/CourtButton";

const title = "ZUNO — Think before you win";
const description =
  "ZUNO sits between financial hype and action. Declare a decision, stress test it, explore a fan portfolio, then train your judgement in Finfluencer Court.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const journey = [
  {
    step: "01",
    label: "Declare",
    icon: Target,
    copy: "Tell ZUNO what you're thinking of doing.",
    status: "Live",
  },
  {
    step: "02",
    label: "Stress test",
    icon: LineChart,
    copy: "See the downside before you act on it.",
    status: "Live",
  },
  {
    step: "03",
    label: "Fan portfolio",
    icon: PieChart,
    copy: "Explore other ways to express the same belief.",
    status: "Live",
  },
  {
    step: "04",
    label: "Finfluencer Court",
    icon: Gavel,
    copy: "Judge viral claims and learn the reasoning behind them.",
    status: "New",
  },
];

function Index() {
  return (
    <main className="court-backdrop min-h-screen">
      <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:py-20">
        <span className="font-display text-lg font-bold tracking-tight">ZUNO</span>

        <h1 className="mt-10 font-display text-4xl leading-[1.05] font-bold sm:text-6xl">
          Think before you <span className="text-gradient-primary">win</span>.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-10 grid gap-3">
          {journey.map((j) => (
            <div
              key={j.label}
              className="flex items-start gap-4 rounded-2xl border border-border bg-surface px-5 py-4"
            >
              <j.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="label-mono text-muted-foreground">{j.step}</span>
                  <p className="font-display text-base font-semibold">{j.label}</p>
                  <span
                    className={`label-mono rounded-full px-2 py-0.5 ${
                      j.status === "New"
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {j.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{j.copy}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link to="/court">
            <CourtButton size="lg">
              Enter Finfluencer Court
              <ArrowRight className="size-4" aria-hidden />
            </CourtButton>
          </Link>
        </div>

        <p className="mt-14 text-xs leading-relaxed text-muted-foreground">
          ZUNO is an education prototype. It uses simulated data and does not provide investment
          advice or recommend any asset.
        </p>
      </div>
    </main>
  );
}
