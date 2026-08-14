import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, error, hint, className, id, rows = 4, ...props },
  ref,
) {
  const autoId = useId();
  const textId = id ?? autoId;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textId} className="mb-1.5 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textId}
        rows={rows}
        className={cn(
          "w-full resize-y rounded-xl border bg-secondary px-3.5 py-2.5 text-sm text-foreground placeholder:text-faint transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50",
          error ? "border-error/60" : "border-border",
          className,
        )}
        {...props}
      />
      {error ? (
        <p className="mt-1.5 text-xs text-error">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-faint">{hint}</p>
      ) : null}
    </div>
  );
});
