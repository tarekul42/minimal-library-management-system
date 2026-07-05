import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { BooksFilters } from "./BooksFilters";

interface BooksMobileFiltersProps {
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

export function BooksMobileFilters(props: BooksMobileFiltersProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <BooksFilters {...props} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
