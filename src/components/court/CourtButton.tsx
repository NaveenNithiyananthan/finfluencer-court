import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const courtButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-glow hover:-translate-y-0.5",
        outline: "border border-border bg-surface text-foreground hover:bg-surface-raised",
        ghost: "text-muted-foreground hover:text-foreground",
      },
      size: {
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function CourtButton({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof courtButtonVariants>) {
  return <button className={cn(courtButtonVariants({ variant, size }), className)} {...props} />;
}

export { courtButtonVariants };
