import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";

const NAV_ITEMS = [
  { to: "/test", label: "Test" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/court", label: "Court" },
];

export function ZunoShell({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  // Force dark mode as the default for the sleek aesthetic
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link
            to="/"
            className="font-display text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            ZUNO<span className="text-primary">.</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <nav aria-label="Primary" className="flex items-center gap-1.5 sm:gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeProps={{
                    className:
                      "bg-foreground/10 text-foreground ring-1 ring-inset ring-foreground/20",
                  }}
                  inactiveProps={{
                    className: "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                  }}
                  className="rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <button
              onClick={toggleTheme}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-3xl flex-1 px-5 pt-8 pb-28 lg:max-w-4xl lg:px-8 lg:pt-14 lg:pb-16">
        <div className="bg-grid mask-radial-fade pointer-events-none absolute inset-0 -z-10 opacity-50 dark:opacity-100" />
        {children}
      </main>
    </div>
  );
}
