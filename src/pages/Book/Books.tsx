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
import Book from "./Book";
import DeleteBook from "./DeleteBook";
import Borrow from "../Borrow/Borrow";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types/book";

const Books = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);

  // If data is nested, extract the array for mapping
  const books: IBook[] = data?.data || [];
  console.log(books);

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
                        <Book bookId={book._id} book={book} />
                        <Borrow bookId={book._id} book={book} />
                        <EditBook bookId={book._id} book={book} />
                        <DeleteBook bookId={book._id} book={book} />
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
          </div>
        </>
      )}
    </>
  );
};

export default Books;
