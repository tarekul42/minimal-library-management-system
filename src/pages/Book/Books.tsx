// Displays a list of all books with options to view, edit, delete, and borrow.
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
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types/book";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HiEye, HiMiniPencilSquare, HiShoppingCart } from "react-icons/hi2";
import Book from "./Book";
import EditBook from "./EditBook";

const Books = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);

  // If data is nested, extract the array for mapping
  const books: IBook[] = data?.data || [];

  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editBookId, setEditBookId] = useState<string | null>(null);
  const [borrowModalOpen, setBorrowModalOpen] = useState(false);
  const [borrowBookId, setBorrowBookId] = useState<string | null>(null);

  const handleViewBook = (bookId: string) => {
    setSelectedBookId(bookId);
    setBookModalOpen(true);
  };

  const handleEditBook = (bookId: string) => {
    setEditBookId(bookId);
    setEditModalOpen(true);
  };

  const handleborrowBook = (bookId: string) => {
    setBorrowBookId(bookId);
    setBorrowModalOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex justify-center items-center h-[100vh]">
            <div className="spinner"></div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full min-h-screen p-6 sm:p-8 lg:p-10  xl:py-10 xl:px-0">
            <h1 className="text-3xl pb-4 text-center">All Books</h1>
            <Table border={2} className="border border-gray-400">
              <TableCaption className="pb-4">A list of all books.</TableCaption>
              <TableHeader className="bg-gray-900">
                <TableRow>
                  <TableHead className="text-gray-100 text-center">
                    ISBN
                  </TableHead>
                  <TableHead className="text-gray-100">Title</TableHead>
                  <TableHead className="text-gray-100">Author</TableHead>
                  <TableHead className="text-gray-100">Genre</TableHead>
                  <TableHead className="text-gray-100 text-center">
                    Copies
                  </TableHead>
                  <TableHead className="text-gray-100 text-center">
                    Availablity
                  </TableHead>
                  <TableHead className="text-gray-100 text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books &&
                  books.map((book: IBook) => (
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
                            book.available ? "text-green-400" : "text-red-400"
                          }
                        >
                          {book.available ? "Available" : "Not Available"}
                        </span>
                      </TableCell>
                      <TableCell className="flex gap-1 justify-center">
                        <Button
                          className="text-blue-500 hover:bg-gray-950 text-xl cursor-pointer p-2 rounded bg-gray-900"
                          onClick={() => handleViewBook(book._id)}
                        >
                          <HiEye />
                        </Button>
                        <Button className="text-teal-500 hover:bg-gray-950 text-xl cursor-pointer p-2 rounded bg-gray-900"
                          onClick={() => handleborrowBook(book._id)}>
                          <HiShoppingCart />
                        </Button>
                        <Button
                          className="text-amber-500 hover:bg-gray-950 text-xl cursor-pointer p-2 rounded bg-gray-900"
                          onClick={() => handleEditBook(book._id)}
                        >
                          <HiMiniPencilSquare />
                        </Button>
                        <DeleteBook />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {books.length === 0 && !isLoading && (
              <div className="text-center py-8">
                <p className="text-gray-400 text-lg">No books found</p>
                <p className="text-gray-500 text-sm">
                  Add some books to get started
                </p>
              </div>
            )}
            {/* Book Modal */}
            <Book
              open={bookModalOpen}
              onOpenChange={setBookModalOpen}
              bookId={selectedBookId}
            />
            <EditBook
              open={editModalOpen}
              onOpenChange={setEditModalOpen}
              bookId={editBookId}
            />
            <Borrow open={borrowModalOpen}
            onOpenChange={setBorrowModalOpen}
            bookId={borrowBookId}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Books;
