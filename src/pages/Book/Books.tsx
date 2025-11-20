import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteBook from "./DeleteBook";
import Borrow from "../Borrow/Borrow";
import type { IBook } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Eye, FilePenLine, ShoppingCart, Trash2 } from "lucide-react";
import Book from "./Book";
import EditBook from "./EditBook";
import { useBookModals } from "@/hooks/useBookModals";
import { useGetBooksQuery } from "@/redux/api/bookApi";

import { Spinner } from "@/components/ui/spinner";

const Books = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);

  const books: IBook[] = data?.data || [];

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
        <>
          <div className="w-full p-6 sm:p-8 lg:p-10  xl:py-10 xl:px-0">
            <h1 className="text-3xl pb-4 text-center">All Books</h1>
            <Table className="border">
              <TableCaption className="pb-4">A list of all books.</TableCaption>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="text-center">
                    ISBN
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead className="text-center">
                    Copies
                  </TableHead>
                  <TableHead className="text-center">
                    Availablity
                  </TableHead>
                  <TableHead className="text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book: IBook) => (
                  <TableRow key={book._id}>
                    <TableCell className="text-center">{book.isbn}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell className="text-center">
                      {book.copies}
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={
                          book.available ? "text-green-600" : "text-destructive"
                        }
                      >
                        {book.available ? "Available" : "Not Available"}
                      </span>
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
                        disabled={book.copies === 0}
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
                        onClick={() => {
                          handleDeleteBook(book._id);
                        }}
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
                <p className="text-muted-foreground text-sm">
                  Add some books to get started
                </p>
              </div>
            )}
            {/* Book Modal */}
            <Book
              open={modalType === "view"}
              onOpenChange={(isOpen) => !isOpen && handleCloseModal()}
              bookId={bookId}
            />
            <EditBook
              open={modalType === "edit"}
              onOpenChange={(isOpen) => !isOpen && handleCloseModal()}
              bookId={bookId}
            />
            <Borrow
              open={modalType === "borrow"}
              onOpenChange={(isOpen) => !isOpen && handleCloseModal()}
              bookId={bookId}
            />
            <DeleteBook
              open={modalType === "delete"}
              onOpenChange={(isOpen) => !isOpen && handleCloseModal()}
              bookId={bookId}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Books;
