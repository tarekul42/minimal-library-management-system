import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/api/bookApi";
import type { IBook } from "@/types/book";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const shouldSearch = open && query.length > 0;
  const { data, isLoading, isError } = useGetBooksQuery(
    shouldSearch ? { search: query, limit: 8 } : undefined,
    { skip: !shouldSearch },
  );
  const results = data?.data ?? [];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Search">
        <Search className="h-5 w-5" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search books, authors..." value={query} onValueChange={setQuery} />
        <CommandList>
          {isLoading && query ? (
            <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center gap-2 py-6 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              Search failed. Try again.
            </div>
          ) : (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {!isLoading && !isError && results.length > 0 && (
            <CommandGroup heading="Books">
              {results.map((book: IBook) => (
                <CommandItem
                  key={book._id}
                  onSelect={() => {
                    navigate(`/books/${book._id}`);
                    setOpen(false);
                  }}
                >
                  <span className="font-medium">{book.title}</span>
                  <span className="ml-2 text-sm text-muted-foreground">— {typeof book.author === "string" ? book.author : book.author.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
