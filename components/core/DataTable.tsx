"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  Download,
  Search,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { cn, exportToCsv } from "@/lib/utils";
import { Button } from "./Button";

export interface Column<T> {
  key: string;
  header: string;
  /** Cell renderer. */
  cell?: (row: T) => React.ReactNode;
  /** Value used for sorting (and CSV fallback). */
  sortValue?: (row: T) => string | number;
  /** Value used for CSV export. */
  csvValue?: (row: T) => string | number;
  width?: number;
  minWidth?: number;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  searchable?: boolean;
  searchValue?: (row: T) => string;
  exportable?: boolean;
  exportFilename?: string;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  toolbar?: React.ReactNode;
  className?: string;
}

type SortState = { key: string; dir: "asc" | "desc" } | null;

export function DataTable<T>({
  columns,
  data,
  rowKey,
  searchable = true,
  searchValue,
  exportable = true,
  exportFilename = "export",
  pageSize = 8,
  onRowClick,
  emptyMessage = "No records found.",
  toolbar,
  className,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortState>(null);
  const [page, setPage] = useState(0);
  const [widths, setWidths] = useState<Record<string, number>>(() =>
    Object.fromEntries(columns.map((c) => [c.key, c.width ?? 170])),
  );
  const resizing = useRef<{ key: string; startX: number; startW: number } | null>(null);

  // ---- Column resizing ----
  const onResizeStart = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    resizing.current = { key, startX: e.clientX, startW: widths[key] ?? 170 };
    const onMove = (ev: MouseEvent) => {
      if (!resizing.current) return;
      const { key: k, startX, startW } = resizing.current;
      const min = columns.find((c) => c.key === k)?.minWidth ?? 90;
      setWidths((w) => ({ ...w, [k]: Math.max(min, startW + (ev.clientX - startX)) }));
    };
    const onUp = () => {
      resizing.current = null;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.userSelect = "";
    };
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  // ---- Filtering + sorting ----
  const filtered = useMemo(() => {
    let rows = data;
    if (query && searchValue) {
      const q = query.toLowerCase();
      rows = rows.filter((r) => searchValue(r).toLowerCase().includes(q));
    }
    if (sort) {
      const col = columns.find((c) => c.key === sort.key);
      if (col?.sortValue) {
        rows = [...rows].sort((a, b) => {
          const av = col.sortValue!(a);
          const bv = col.sortValue!(b);
          if (av < bv) return sort.dir === "asc" ? -1 : 1;
          if (av > bv) return sort.dir === "asc" ? 1 : -1;
          return 0;
        });
      }
    }
    return rows;
  }, [data, query, sort, columns, searchValue]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const pageRows = filtered.slice(currentPage * pageSize, currentPage * pageSize + pageSize);

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable || !col.sortValue) return;
    setSort((s) =>
      s?.key === col.key
        ? { key: col.key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key: col.key, dir: "asc" },
    );
  };

  const handleExport = () => {
    const rows = filtered.map((r) =>
      Object.fromEntries(
        columns.map((c) => [c.header, c.csvValue?.(r) ?? c.sortValue?.(r) ?? ""]),
      ),
    );
    exportToCsv(rows as Record<string, unknown>[], exportFilename);
  };

  return (
    <div className={cn("rounded-2xl border border-border bg-card", className)}>
      {/* Toolbar */}
      {(searchable || exportable || toolbar) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
          <div className="flex items-center gap-3">
            {searchable && (
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(0);
                  }}
                  placeholder="Search…"
                  className="h-9 w-56 rounded-lg border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
              </div>
            )}
            {toolbar}
          </div>
          {exportable && (
            <Button size="sm" variant="secondary" leftIcon={<Download className="size-4" />} onClick={handleExport}>
              Export CSV
            </Button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-sm" style={{ minWidth: 640 }}>
          <colgroup>
            {columns.map((c) => (
              <col key={c.key} style={{ width: widths[c.key] }} />
            ))}
          </colgroup>
          <thead>
            <tr className="border-b border-border">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    "group relative select-none px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted",
                    c.align === "right" && "text-right",
                    c.align === "center" && "text-center",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleSort(c)}
                    className={cn(
                      "inline-flex items-center gap-1",
                      c.align === "right" && "flex-row-reverse",
                      c.sortable && c.sortValue ? "cursor-pointer hover:text-foreground" : "cursor-default",
                    )}
                  >
                    <span className="truncate">{c.header}</span>
                    {c.sortable && c.sortValue && (
                      sort?.key === c.key ? (
                        sort.dir === "asc" ? (
                          <ChevronUp className="size-3.5" />
                        ) : (
                          <ChevronDown className="size-3.5" />
                        )
                      ) : (
                        <ChevronsUpDown className="size-3.5 opacity-40" />
                      )
                    )}
                  </button>
                  {/* resize handle */}
                  <span
                    onMouseDown={(e) => onResizeStart(e, c.key)}
                    className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize opacity-0 transition-opacity hover:bg-gold/50 group-hover:opacity-100"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-16 text-center text-sm text-faint">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr
                  key={rowKey(row)}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    "border-b border-border/60 transition-colors last:border-0",
                    onRowClick && "cursor-pointer hover:bg-white/[0.03]",
                  )}
                >
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={cn(
                        "truncate px-4 py-3 text-foreground",
                        c.align === "right" && "text-right",
                        c.align === "center" && "text-center",
                        c.className,
                      )}
                    >
                      {c.cell ? c.cell(row) : String(c.sortValue?.(row) ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > pageSize && (
        <div className="flex items-center justify-between gap-3 border-t border-border p-4 text-sm">
          <span className="text-faint">
            Showing {currentPage * pageSize + 1}–
            {Math.min(filtered.length, (currentPage + 1) * pageSize)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="flex size-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-white/5 disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="px-2 text-muted">
              {currentPage + 1} / {pageCount}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={currentPage >= pageCount - 1}
              className="flex size-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-white/5 disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
