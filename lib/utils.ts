/** Join class names, dropping falsy values. Lightweight replacement for clsx. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a number as USD currency. */
export function formatCurrency(value: number, opts?: { decimals?: boolean }): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: opts?.decimals ? 2 : 0,
    maximumFractionDigits: opts?.decimals ? 2 : 0,
  }).format(value);
}

/** Compact number, e.g. 2400 -> 2.4K */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(
    value,
  );
}

/** Format an ISO date string to a friendly label. */
export function formatDate(
  iso: string,
  style: "long" | "medium" | "short" | "weekday" = "medium",
): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  switch (style) {
    case "long":
      return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    case "short":
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    case "weekday":
      return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    default:
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
}

/** Simulate an async request for the mockup. */
export function delay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/** Deterministic pseudo-id for new mock records. */
export function makeId(prefix = "id"): string {
  return `${prefix}_${Math.floor(performance.now() * 1000).toString(36)}${Math.floor(
    (performance.now() % 1) * 1e6,
  ).toString(36)}`;
}

/** Get initials from a full name. */
export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/** Clamp a number to a range. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

/** Export an array of records to a downloaded CSV file. */
export function exportToCsv<T extends Record<string, unknown>>(
  rows: T[],
  filename: string,
  columns?: { key: keyof T; label: string }[],
): void {
  if (!rows.length) return;
  const cols =
    columns ??
    (Object.keys(rows[0]).map((k) => ({ key: k as keyof T, label: k })) as {
      key: keyof T;
      label: string;
    }[]);

  const escape = (val: unknown): string => {
    const s = val == null ? "" : String(val);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const header = cols.map((c) => escape(c.label)).join(",");
  const body = rows.map((r) => cols.map((c) => escape(r[c.key])).join(",")).join("\n");
  const csv = `${header}\n${body}`;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/** Star rating rounded to nearest half for display math. */
export function starBreakdown(rating: number): { full: number; half: boolean; empty: number } {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
}
