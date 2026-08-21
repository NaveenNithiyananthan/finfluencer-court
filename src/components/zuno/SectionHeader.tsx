export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={align === "center" ? "animate-fade-up text-center" : "animate-fade-up"}>
      {eyebrow ? (
        <p className="zuno-eyebrow text-primary mb-3">{eyebrow}</p>
      ) : null}
      <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {subtitle ? (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </header>
  );
}
