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
import EditBook from "./EditBook";
import DeleteBook from "./DeleteBook";
import Borrow from "../Borrow/Borrow";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types/book";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HiEye } from "react-icons/hi2";
import Book from "./Book";

const Books = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);

  // If data is nested, extract the array for mapping
  const books: IBook[] = data?.data || [];
  console.log(books);

  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleViewBook = (bookId: string) => {
    setSelectedBookId(bookId);
    setBookModalOpen(true);
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
                    <TableRow>
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
                        <Borrow />
                        <EditBook />
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
          </div>
        </>
      )}
    </>
  );
};

export default Books;
