import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteBook from "./DeleteBook";
import Borrow from "../Borrow/Borrow";
import type { IBook, IBookQueryParams } from "@/types/book";
import { GENRE_LABELS, GENRE_OPTIONS } from "@/config/constants";
import { Eye, FilePenLine, ShoppingCart, Trash2, Plus, Search } from "lucide-react";
import Book from "./Book";
import EditBook from "./EditBook";
import { useBookModals } from "@/hooks/useBookModals";
import { useGetBooksQuery } from "@/redux/api/bookApi";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { getAuthorName } from "@/lib/utils";

const Books = () => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState<string>("all");
  const [page, setPage] = useState(1);

  const params = useMemo<IBookQueryParams>(() => {
    const p: IBookQueryParams = { page, limit: 10 };
    if (search) p.search = search;
    if (genre && genre !== "all") p.genre = genre as IBookQueryParams["genre"];
    return p;
  }, [page, search, genre]);

  const { data, isLoading, isError } = useGetBooksQuery(params);

  const books: IBook[] = data?.data || [];
  const meta = data?.meta;

  const {
    modalType,
    bookId,
    handleViewBook,
    handleEditBook,
    handleBorrowBook,
    handleDeleteBook,
    handleCloseModal,
  } = useBookModals();

  return (
    <>
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <Spinner size={48} />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center h-[100vh] text-destructive">
          <p>Failed to load books. Please try again later.</p>
        </div>
      ) : (
        <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl">All Books</h1>
            <Link to="/create-book">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Book
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, description, tags..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-9"
              />
            </div>
            <Select
              value={genre}
              onValueChange={(val) => {
                setGenre(val);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {GENRE_OPTIONS.map((g) => (
                  <SelectItem key={g.value} value={g.value}>
                    {g.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table className="border">
            <TableCaption className="pb-4">
              {meta ? `Page ${meta.page} of ${meta.totalPages} (${meta.total} books)` : "A list of all books."}
            </TableCaption>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead className="text-center">Copies</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book: IBook) => (
                <TableRow key={book._id}>
                  <TableCell className="font-medium">
                    <Link to={`/books/${book._id}`} className="hover:underline">
                      {book.title}
                    </Link>
                  </TableCell>
                  <TableCell>{getAuthorName(book.author)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{GENRE_LABELS[book.genre] || book.genre}</Badge>
                  </TableCell>
                  <TableCell className="text-center">{book.availableCopies}/{book.copies}</TableCell>
                  <TableCell className="text-center">
                    {book.available ? (
                      <Badge className="bg-green-600">Available</Badge>
                    ) : (
                      <Badge variant="destructive">Unavailable</Badge>
                    )}
                  </TableCell>
                  <TableCell className="flex gap-1 justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-500 hover:text-blue-600"
                      onClick={() => handleViewBook(book._id)}
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-teal-500 hover:text-teal-600 disabled:text-muted-foreground"
                      onClick={() => handleBorrowBook(book._id)}
                      disabled={!book.available}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-amber-500 hover:text-amber-600"
                      onClick={() => handleEditBook(book._id)}
                    >
                      <FilePenLine className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive/90"
                      onClick={() => handleDeleteBook(book._id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {books.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-lg">No books found</p>
              <p className="text-muted-foreground text-sm">Try adjusting your search or filters</p>
            </div>
          )}

          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {meta.page} of {meta.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= meta.totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}

          <Book open={modalType === "view"} onOpenChange={(isOpen) => !isOpen && handleCloseModal()} bookId={bookId} />
          <EditBook open={modalType === "edit"} onOpenChange={(isOpen) => !isOpen && handleCloseModal()} bookId={bookId} />
          <Borrow open={modalType === "borrow"} onOpenChange={(isOpen) => !isOpen && handleCloseModal()} bookId={bookId} />
          <DeleteBook open={modalType === "delete"} onOpenChange={(isOpen) => !isOpen && handleCloseModal()} bookId={bookId} />
        </div>
      )}
    </>
  );
};

export default Books;
