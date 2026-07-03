import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/cards/BookCard";
import type { IBook } from "@/types/book";

interface Props { books: IBook[] }

export function RelatedBooks({ books }: Props) {
  if (books.length === 0) return null;
  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">You might also like</h2>
        <Button asChild variant="ghost" size="sm">
          <Link to="/books">More books <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {books.map((b) => <BookCard key={b._id} book={b} />)}
      </div>
    </section>
  );
}
