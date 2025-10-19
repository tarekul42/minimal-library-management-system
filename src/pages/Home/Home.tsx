import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IBook } from "@/types/book";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import Book from "../Book/Book";
import Borrow from "../Borrow/Borrow";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { closeModal, openModal } from "@/redux/features/modalSlice";
import { useGetBooksQuery } from "@/redux/api/bookApi";

const Home = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);

  const books: IBook[] = data?.data || [];

  const dispatch = useAppDispatch();
  const { type, bookId } = useAppSelector((state) => state.modal);

  const handleViewBook = (bookId: string) => {
    dispatch(openModal({ type: "view", bookId }));
  };

  const handleBorrowBook = (bookId: string) => {
    dispatch(openModal({ type: "borrow", bookId }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
        <h1 className="text-xl md:text-2xl lg:text-3xl p-1 sm:p-2 lg:p-4">
          Minimal Library Management System
        </h1>
        <h1 className="text-xl md:text-2xl lg:text-3xl p-1 sm:p-2 lg:p-4">
          Our Available Books
        </h1>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-4 py-2 md:py-3 lg:py-4">
          {books &&
            books.map((singleData: IBook) => (
              <Card
                key={singleData.isbn}
                className="w-full max-w-sm bg-gray-900 border-0 text-gray-300"
              >
                <CardHeader>
                  <img
                    className="rounded-xl"
                    src="https://i.ibb.co/j9pJxVL0/LmpwZw.jpg"
                    alt="The Theory of Everything Book Image"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>{singleData.title}</CardTitle>
                  <CardDescription>{singleData.author}</CardDescription>
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
        open={type === "view"}
        onOpenChange={(isOpen) => !isOpen && handleCloseModal()}
        bookId={bookId}
      />
      <Borrow
        open={type === "borrow"}
        onOpenChange={(isOpen) => !isOpen && handleCloseModal()}
        bookId={bookId}
      />
    </>
  );
};

export default Home;
