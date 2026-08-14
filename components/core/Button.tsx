import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "gold-ghost";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-black hover:bg-gold-hover shadow-lg shadow-gold/10 hover:shadow-gold/25",
  secondary: "bg-elevated text-foreground border border-border hover:border-border-strong hover:bg-card",
  outline: "border border-border-strong text-foreground hover:bg-white/5 hover:border-gold/60",
  ghost: "text-muted hover:text-foreground hover:bg-white/5",
  danger: "bg-error/90 text-white hover:bg-error",
  "gold-ghost": "text-gold border border-gold/40 hover:bg-gold/10",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
  icon: "size-10",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };
type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = "primary",
      size = "md",
      loading,
      fullWidth,
      leftIcon,
      rightIcon,
      className,
      children,
      ...rest
    } = props;

    const classes = cn(
      base,
      variants[variant],
      sizes[size],
      fullWidth && "w-full",
      className,
    );

    const content = (
      <>
        {loading ? <Spinner size="sm" tone={variant === "primary" ? "current" : "gold"} /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </>
    );

    if ("href" in props && props.href !== undefined) {
      const { href, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <Link
          href={props.href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...anchorRest}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={loading || (rest as React.ButtonHTMLAttributes<HTMLButtonElement>).disabled}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  },
);
