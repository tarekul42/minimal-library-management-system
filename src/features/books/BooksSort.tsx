import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp } from "lucide-react";
import type { IBookQueryParams } from "@/types/book";

interface BooksSortProps {
  sortBy: IBookQueryParams["sortBy"];
  sortOrder: IBookQueryParams["sortOrder"];
  onChange: (sortBy: IBookQueryParams["sortBy"], sortOrder: IBookQueryParams["sortOrder"]) => void;
}

const OPTIONS: { value: string; label: string }[] = [
  { value: "title-asc", label: "Title: A to Z" },
  { value: "title-desc", label: "Title: Z to A" },
  { value: "createdAt-desc", label: "Newest first" },
  { value: "createdAt-asc", label: "Oldest first" },
  { value: "avgRating-desc", label: "Highest rated" },
  { value: "avgRating-asc", label: "Lowest rated" },
];

export function BooksSort({ sortBy, sortOrder, onChange }: BooksSortProps) {
  const value = `${sortBy}-${sortOrder}`;
  return (
    <div className="flex items-center gap-2">
      <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={(v) => {
        const parts = v.split("-");
        onChange(parts[0] as IBookQueryParams["sortBy"], parts[1] as IBookQueryParams["sortOrder"]);
      }}>
        <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
        <SelectContent>
          {OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}
