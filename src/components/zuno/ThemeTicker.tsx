const THEMES = [
  "Sports",
  "Crypto",
  "Meme stocks",
  "Individual stocks",
  "ETFs",
  "Tech",
  "Gaming",
  "Collectibles",
  "Leveraged products",
];

export function ThemeTicker() {
  return (
    <div className="-mx-5 mb-12 overflow-hidden border-y border-border/40 bg-surface-2/40 py-3.5 sm:-mx-8 lg:mb-16">
      <div className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {THEMES.map((theme) => (
              <span
                key={`${copy}-${theme}`}
                className="flex items-center text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground"
              >
                <span className="px-5">{theme}</span>
                <span className="h-1 w-1 rounded-full bg-primary/50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
