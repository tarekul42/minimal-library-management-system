import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { cn } from "@/lib/utils";
import type { Column, FilterConfig } from "./types";

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  sort?: { key: string; direction: "asc" | "desc" } | null;
  onSortChange?: (sort: { key: string; direction: "asc" | "desc" } | null) => void;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  total?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  getRowId: (row: T) => string;
}

export function DataTable<T>({
  data, columns, isLoading, isError, onRetry,
  search, onSearchChange, searchPlaceholder = "Search...",
  filters = [], sort, onSortChange,
  page = 1, totalPages = 1, onPageChange, total,
  emptyTitle = "No results", emptyDescription = "Try adjusting your search or filters.",
  getRowId,
}: DataTableProps<T>) {
  const toggleSort = (col: Column<T>) => {
    if (!col.sortable || !onSortChange) return;
    const sortKey = col.sortKey ?? col.key;
    if (sort?.key !== sortKey) onSortChange({ key: sortKey, direction: "asc" });
    else if (sort.direction === "asc") onSortChange({ key: sortKey, direction: "desc" });
    else onSortChange(null);
  };

  if (isLoading) return <TableSkeleton />;
  if (isError) return <ErrorState message="Failed to load data" onRetry={onRetry} />;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {onSearchChange && (
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={searchPlaceholder} value={search ?? ""} onChange={(e) => onSearchChange(e.target.value)} className="pl-9" aria-label={searchPlaceholder} />
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <Select key={f.label} value={f.value} onValueChange={f.onChange}>
              <SelectTrigger className="w-[140px]" aria-label={f.label}><SelectValue placeholder={f.label} /></SelectTrigger>
              <SelectContent>
                {f.options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
              </SelectContent>
            </Select>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label={searchPlaceholder.includes("Search") ? "Data table" : searchPlaceholder}>
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                {columns.map((col) => {
                  const isSorted = sort?.key === (col.sortKey ?? col.key);
                  const ariaSort = isSorted ? (sort!.direction === "asc" ? "ascending" as const : "descending" as const) : undefined;
                  return (
                    <th
                      key={col.key}
                      className={cn(
                        "px-4 py-3 font-medium",
                        col.align === "right" && "text-right",
                        col.align === "center" && "text-center",
                        col.align !== "right" && col.align !== "center" && "text-left",
                        col.sortable && "cursor-pointer select-none hover:text-foreground",
                      )}
                      aria-sort={ariaSort}
                      aria-label={col.sortable ? `${col.header}. Click to sort` : col.header}
                      onClick={() => toggleSort(col)}
                      onKeyDown={(e) => { if (col.sortable && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggleSort(col); } }}
                      role={col.sortable ? "button" : undefined}
                      tabIndex={col.sortable ? 0 : undefined}
                    >
                      <span className={cn("inline-flex items-center gap-1", col.align === "right" && "flex-row-reverse")}>
                        {col.header}
                        {col.sortable && (
                          isSorted
                            ? (sort!.direction === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)
                            : <ArrowUpDown className="h-3 w-3 opacity-50" />
                        )}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.length === 0 ? (
                <tr><td colSpan={columns.length} className="px-4 py-8"><EmptyState title={emptyTitle} description={emptyDescription} /></td></tr>
              ) : data.map((row) => (
                <tr key={getRowId(row)} className="hover:bg-muted/30 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className={cn("px-4 py-3", col.align === "right" && "text-right", col.align === "center" && "text-center", col.className)}>
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Footer: count + pagination */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">{total !== undefined ? `${total} total` : `${data.length} items`}</p>
        {totalPages > 1 && onPageChange && (
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => onPageChange(1)} aria-label="First page"><ChevronsLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></Button>
            <span className="px-3 text-sm">Page {page} of {totalPages}</span>
            <Button variant="outline" size="icon" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} aria-label="Next page"><ChevronRight className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" disabled={page >= totalPages} onClick={() => onPageChange(totalPages)} aria-label="Last page"><ChevronsRight className="h-4 w-4" /></Button>
          </div>
        )}
      </div>
    </div>
  );
}
