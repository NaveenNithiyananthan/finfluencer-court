import { Link } from "@tanstack/react-router";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  supporting,
}: {
  eyebrow?: string;
  title: string;
  supporting?: string;
}) {
  return (
    <div className="animate-fade-up space-y-3">
      {eyebrow ? <p className="zuno-eyebrow">{eyebrow}</p> : null}
      <h1 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">{title}</h1>
      {supporting ? (
        <p className="text-base leading-relaxed text-muted-foreground">{supporting}</p>
      ) : null}
    </div>
  );
}

export function ZunoCard({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "primary" | "danger" | "quiet";
}) {
  return (
    <div
      className={cn(
        "surface-card p-5",
        tone === "primary" &&
          "border-primary/25 bg-[color-mix(in_oklab,var(--primary)_5%,var(--card))]",
        tone === "danger" &&
          "border-danger/25 bg-[color-mix(in_oklab,var(--danger)_5%,var(--card))]",
        tone === "quiet" && "bg-surface-2/60 shadow-none",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ZunoButton({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex w-full items-center justify-center rounded-full px-5 py-4 font-display text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-primary text-primary-foreground shadow-glow hover:brightness-110",
        variant === "ghost" && "surface-card hover:border-primary/40",
        className,
      )}
    />
  );
}

export function ZunoLinkButton({
  to,
  children,
  variant = "primary",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex w-full items-center justify-center rounded-full px-5 py-4 font-display text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]",
        variant === "primary" &&
          "bg-primary text-primary-foreground shadow-glow hover:brightness-110",
        variant === "ghost" && "surface-card hover:border-primary/40",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Callout({
  label = "ZUNO takeaway",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="animate-fade-up rounded-3xl border border-primary/25 bg-[color-mix(in_oklab,var(--primary)_6%,var(--surface))] p-5 shadow-card">
      <p className="zuno-eyebrow text-primary">{label}</p>
      <p className="mt-2 text-[15px] leading-relaxed">{children}</p>
    </div>
  );
}
export function Stat({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "up" | "down";
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p
        className={cn(
          "zuno-num mt-1 text-2xl",
          tone === "up" && "text-safe",
          tone === "down" && "text-danger",
        )}
      >
        {value}
      </p>
    </div>
  );
}
export function DemoTag({ children = "Illustrative demo allocation" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-caution/40 bg-caution/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-caution-foreground">
      <span className="size-1.5 animate-pulse rounded-full bg-caution" />
      {children}
    </span>
  );
}
export function BulletList({ items, tone }: { items: string[]; tone: "danger" | "primary" }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <span
            className={cn(
              "mt-1.5 size-1.5 shrink-0 rounded-full",
              tone === "danger" ? "bg-danger" : "bg-primary",
            )}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
