import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  image?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}

/** Standard header for inner pages — clears the fixed navbar. */
export function PageHeader({ eyebrow, title, subtitle, image, align = "left", children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      {image && (
        <>
          <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${image})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </>
      )}
      <div
        className={cn(
          "relative mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 sm:pt-36",
          align === "center" && "text-center",
        )}
      >
        <Reveal className={cn(align === "center" && "mx-auto max-w-2xl")}>
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="heading text-4xl text-foreground sm:text-5xl md:text-6xl">{title}</h1>
          {subtitle && (
            <p className={cn("mt-4 text-base leading-relaxed text-muted sm:text-lg", align === "left" && "max-w-2xl")}>
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </Reveal>
      </div>
    </header>
  );
}
