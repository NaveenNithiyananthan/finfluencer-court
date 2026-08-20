import { Link } from "@tanstack/react-router";
import { Home, Target, PieChart, Gavel } from "lucide-react";
import type { ReactNode } from "react";

const items = [
  { to: "/", label: "Home", Icon: Home, group: "ZUNO" },
  { to: "/test", label: "Test", Icon: Target, group: "Decision support" },
  { to: "/portfolio", label: "Portfolio", Icon: PieChart, group: "Decision support" },
  { to: "/court", label: "Court", Icon: Gavel, group: "Learning" },
] as const;

const groups = ["ZUNO", "Decision support", "Learning"] as const;

const activeCls = "text-primary";
const inactiveCls = "text-muted-foreground hover:text-foreground";

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-sidebar-border bg-sidebar px-5 py-8 lg:flex">
      <Link to="/" className="font-display text-xl font-bold tracking-[0.18em]">
        ZUNO
      </Link>
      <p className="mt-2 text-xs text-muted-foreground">Think before you win.</p>

      <nav className="mt-8 flex flex-col gap-6">
        {groups.map((group) => (
          <div key={group}>
            <p className="zuno-eyebrow">{group}</p>
            <ul className="mt-2 flex flex-col gap-1">
              {items
                .filter((i) => i.group === group)
                .map(({ to, label, Icon }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      activeOptions={{ exact: to === "/" }}
                      activeProps={{
                        className: `bg-sidebar-accent ${activeCls} font-semibold`,
                      }}
                      inactiveProps={{ className: inactiveCls }}
                      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors"
                    >
                      <Icon className="size-4" />
                      {label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </nav>

      <p className="mt-auto text-[0.65rem] leading-relaxed text-muted-foreground/70">
        ZUNO is an education prototype. It uses simulated data and does not provide investment advice.
      </p>
    </aside>
  );
}

function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-sidebar/95 backdrop-blur lg:hidden">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-2">
        {items.map(({ to, label, Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: `${activeCls} font-semibold` }}
              inactiveProps={{ className: inactiveCls }}
              className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[0.7rem] transition-colors data-[status=active]:bg-sidebar-accent"
            >
              <Icon className="size-5" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/85 px-5 py-4 backdrop-blur lg:hidden">
      <Link to="/" className="font-display text-base font-bold tracking-[0.18em]">
        ZUNO
      </Link>
      <span className="zuno-eyebrow">Think before you win</span>
    </header>
  );
}

export function ZunoShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <MobileHeader />
      <main className="mx-auto w-full max-w-3xl px-5 pb-28 pt-6 lg:max-w-4xl lg:pb-16 lg:pl-8 lg:pt-12 lg:ml-60">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}