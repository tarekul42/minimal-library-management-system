import { Navigate, Link } from "react-router";
import { useState } from "react";
import { useAppSelector } from "@/redux/hook";
import { useGetBooksQuery, useDeleteBookMutation } from "@/redux/api/bookApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ErrorRetry } from "@/components/ui/error-retry";
import { toast } from "sonner";
import { Plus, Trash2, ArrowLeft, Search } from "lucide-react";
import type { IBook, IBookQueryParams } from "@/types/book";
import { GENRE_LABELS } from "@/config/constants";
import { getApiError, getAuthorName } from "@/lib/utils";

const AdminBooks = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const params: IBookQueryParams = { page, limit: 10 };
  if (search) params.search = search;

  const { data, isLoading, isError, refetch } = useGetBooksQuery(params);
  const [deleteBook] = useDeleteBookMutation();

  if (!user || (user.role !== "admin" && user.role !== "librarian")) {
    return <Navigate to="/login" replace />;
  }

  const books: IBook[] = data?.data || [];
  const meta = data?.meta;

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this book permanently?")) return;
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted");
    } catch (err) {
      console.error("Failed to delete book:", err);
      toast.error(getApiError(err, "Failed to delete book"));
    }
  };

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Admin
      </Link>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl">Manage Books</h1>
        <Link to="/create-book">
          <Button className="bg-blue-600 text-white">
            <Plus className="h-4 w-4 mr-2" /> Add Book
          </Button>
        </Link>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search books..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" />
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <ErrorRetry message="Failed to load books" onRetry={refetch} />
      ) : (
        <>
          <Table className="border">
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead className="text-center">Copies</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book._id}>
                  <TableCell>
                    <Link to={`/books/${book._id}`} className="hover:underline">{book.title}</Link>
                  </TableCell>
                  <TableCell>{getAuthorName(book.author)}</TableCell>
                  <TableCell>{GENRE_LABELS[book.genre] || book.genre}</TableCell>
                  <TableCell className="text-center">{book.availableCopies}/{book.copies}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(book._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</Button>
              <span className="text-sm text-muted-foreground">Page {meta.page} of {meta.totalPages}</span>
              <Button variant="outline" size="sm" disabled={page >= meta.totalPages} onClick={() => setPage(page + 1)}>Next</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminBooks;
