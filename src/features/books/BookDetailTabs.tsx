import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IBook } from "@/types/book";
import type { IReview } from "@/types/review";
import { ReviewSection } from "./ReviewSection";
import { GENRE_LABELS } from "@/config/constants";
import { getAuthorName } from "@/lib/utils";

interface Props { book: IBook; reviews: IReview[] }

export function BookDetailTabs({ book, reviews }: Props) {
  return (
    <div className="mt-12">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="prose prose-slate dark:prose-invert max-w-none py-6">
          <h3>About this book</h3>
          <p>{book.description || "No description available."}</p>
          <h3>Why you'll love it</h3>
          <p>Set in the {GENRE_LABELS[book.genre]} genre, this title by {getAuthorName(book.author)} has earned a {book.avgRating.toFixed(1)}-star rating from {book.reviewCount} readers. With {book.pages ?? "an unspecified number of"} pages, it's a perfect fit for a weekend read or a deep-dive weeknight session.</p>
        </TabsContent>
        <TabsContent value="specs" className="py-6">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SpecItem label="Title" value={book.title} />
            <SpecItem label="Author" value={getAuthorName(book.author)} />
            <SpecItem label="Genre" value={GENRE_LABELS[book.genre]} />
            <SpecItem label="ISBN" value={book.isbn} />
            <SpecItem label="Publisher" value={book.publisher ?? "—"} />
            <SpecItem label="Published Year" value={book.publishedYear?.toString() ?? "—"} />
            <SpecItem label="Pages" value={book.pages?.toString() ?? "—"} />
            <SpecItem label="Total Copies" value={book.copies.toString()} />
            <SpecItem label="Available Copies" value={book.availableCopies.toString()} />
            <SpecItem label="Shelf Location" value={book.shelfLocation ?? "—"} />
            <SpecItem label="Average Rating" value={`${book.avgRating.toFixed(1)} / 5`} />
            <SpecItem label="Added to catalog" value={new Date(book.createdAt).toLocaleDateString()} />
          </dl>
        </TabsContent>
        <TabsContent value="reviews" className="py-6">
          <ReviewSection bookId={book._id} reviews={reviews} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}
