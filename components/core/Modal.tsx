"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl";
  footer?: React.ReactNode;
  children: React.ReactNode;
  hideClose?: boolean;
}

const sizes = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  footer,
  children,
  hideClose,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className={cn(
              "relative z-10 flex max-h-[92vh] w-full flex-col rounded-t-2xl border border-border bg-card shadow-2xl sm:rounded-2xl",
              sizes[size],
            )}
          >
            {(title || !hideClose) && (
              <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
                <div>
                  {title && <h2 className="text-lg font-semibold text-foreground">{title}</h2>}
                  {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
                </div>
                {!hideClose && (
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="-mr-1 rounded-lg p-1.5 text-faint transition-colors hover:bg-white/5 hover:text-foreground"
                  >
                    <X className="size-5" />
                  </button>
                )}
              </div>
            )}
            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
            {footer && (
              <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
