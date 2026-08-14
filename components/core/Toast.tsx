"use client";

import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Info, TriangleAlert, X, XCircle } from "lucide-react";
import { createContext, useCallback, useContext, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "info" | "warning";

interface ToastItem {
  id: number;
  title?: string;
  message: string;
  variant: ToastVariant;
}

interface ToastApi {
  toast: (message: string, opts?: { title?: string; variant?: ToastVariant }) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

const config: Record<ToastVariant, { icon: typeof Info; accent: string }> = {
  success: { icon: CheckCircle2, accent: "text-success" },
  error: { icon: XCircle, accent: "text-error" },
  info: { icon: Info, accent: "text-info" },
  warning: { icon: TriangleAlert, accent: "text-warning" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message: string, opts?: { title?: string; variant?: ToastVariant }) => {
      const id = ++idRef.current;
      setToasts((prev) => [
        ...prev,
        { id, message, title: opts?.title, variant: opts?.variant ?? "info" },
      ]);
      setTimeout(() => remove(id), 4000);
    },
    [remove],
  );

  const api: ToastApi = {
    toast: push,
    success: (message, title) => push(message, { title, variant: "success" }),
    error: (message, title) => push(message, { title, variant: "error" }),
    info: (message, title) => push(message, { title, variant: "info" }),
    warning: (message, title) => push(message, { title, variant: "warning" }),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = config[t.variant].icon;
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-border bg-elevated/95 p-4 shadow-2xl backdrop-blur"
              >
                <Icon className={cn("mt-0.5 size-5 shrink-0", config[t.variant].accent)} />
                <div className="min-w-0 flex-1">
                  {t.title && <p className="text-sm font-semibold text-foreground">{t.title}</p>}
                  <p className="text-sm text-muted">{t.message}</p>
                </div>
                <button
                  onClick={() => remove(t.id)}
                  className="text-faint transition-colors hover:text-foreground"
                  aria-label="Dismiss"
                >
                  <X className="size-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
