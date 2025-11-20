import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import type { IBook } from "@/types/book";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import Book from "../Book/Book";
import Borrow from "../Borrow/Borrow";
import { useBookModals } from "@/hooks/useBookModals";
import { useGetBooksQuery } from "@/redux/api/bookApi";
import Banner from "./Banner";

import { Spinner } from "@/components/ui/spinner";

const Home = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const books: IBook[] = data?.data || [];

  const {
    modalType,
    bookId,
    handleViewBook,
    handleBorrowBook,
    handleCloseModal,
  } = useBookModals();

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl p-1 sm:p-2 lg:p-4 text-center font-semibold">
            Minimal Library Management System
          </h1>
          <Banner />
        </div>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold p-1 sm:p-2 lg:p-4">
          Our Available Books
        </h1>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-4 py-2 md:py-3 lg:py-4">
          {books &&
            books.map((singleData: IBook) => (
              <Card
                key={singleData._id}
                className="w-full max-w-sm bg-gray-900 border-0 text-gray-300"
              >
                <CardContent className="space-y-3">
                  <CardTitle>{singleData.title}</CardTitle>
                  <CardDescription>Author: {singleData.author}</CardDescription>
                  <CardDescription>Genre: {singleData.genre}</CardDescription>
                  <CardDescription>ISBN: {singleData.isbn}</CardDescription>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button
                    type="submit"
                    className="w-full bg-gray-300 text-gray-950 cursor-pointer"
                    onClick={() => handleViewBook(singleData._id)}
                  >
                    See Details
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-gray-900 border-gray-800 cursor-pointer"
                    onClick={() => handleBorrowBook(singleData._id)}
                  >
                    Borrow now
                    <ArrowRight className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
        <Link to="/books">
          <Button className="rounded bg-gray-300 text-gray-950 my-2 md:my-3 lg:my-4 cursor-pointer">
            Explore all books
          </Button>
        </Link>
      </div>
      {/* Book Modal */}
      <Book
        open={modalType === "view"}
        onOpenChange={(isOpen) => !isOpen && handleCloseModal()}
        bookId={bookId}
      />
      <Borrow
        open={modalType === "borrow"}
        onOpenChange={(isOpen) => !isOpen && handleCloseModal()}
        bookId={bookId}
      />
    </>
  );
};

export default Home;
