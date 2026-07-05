import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { GENRE_OPTIONS } from "@/config/constants";

interface BooksFiltersProps {
  search: string;
  genre: string;
  availability: string;
  minRating: number;
  onSearchChange: (v: string) => void;
  onGenreChange: (v: string) => void;
  onAvailabilityChange: (v: string) => void;
  onMinRatingChange: (v: number) => void;
  onClear: () => void;
}

export function BooksFilters(props: BooksFiltersProps) {
  return (
    <Card className="sticky top-24 p-4 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={props.onClear}>
          <X className="mr-1 h-3 w-3" /> Clear
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="search" placeholder="Title, author, tag..." value={props.search} onChange={(e) => props.onSearchChange(e.target.value)} className="pl-9" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Genre</Label>
        <Select value={props.genre} onValueChange={props.onGenreChange}>
          <SelectTrigger><SelectValue placeholder="All genres" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All genres</SelectItem>
            {GENRE_OPTIONS.map((g) => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Availability</Label>
        <Select value={props.availability} onValueChange={props.onAvailabilityChange}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All books</SelectItem>
            <SelectItem value="available">Available only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Minimum rating</Label>
          <span className="text-sm font-medium">{props.minRating.toFixed(1)}</span>
        </div>
        <Slider value={[props.minRating]} min={0} max={5} step={0.5} onValueChange={([v]) => props.onMinRatingChange(v)} />
      </div>
    </Card>
  );
}
