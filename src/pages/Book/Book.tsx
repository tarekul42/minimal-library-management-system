// Detailed view of a single book’s information.
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiEye } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IBook } from "@/types/book";
import { useGetBookQuery } from "@/redux/api/baseApi";

interface BookProps {
  bookId: string;
  book: IBook;
}

const Book = ({ bookId, book }: BookProps) => {
  const { data, isLoading, error} = useGetBookQuery(bookId);
  
  const bookData = book || data?.data;
  const { title, author, genre, isbn, description, copies, available } = bookData;

  const handleViewClick = () =>{
    console.log("Viewing book details for: ", title);
  }


  if (isLoading) {
    return (
      <Button disabled className="text-blue-500 bg-gray-900 text-xl p-2 rounded">
        <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      </Button>
    );
  }

  if (error || !bookData) {
    return (
      <Button disabled className="text-red-500 bg-gray-900 text-xl p-2 rounded">
        <HiEye />
      </Button>
    );
  }

  return (
    <>
      <Dialog>
          <DialogTrigger asChild>
            <Button className="text-blue-500 hover:bg-gray-950 text-xl cursor-pointer p-2 rounded bg-gray-900"
            onClick={handleViewClick}
            >
              <HiEye />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full sm:w-5/6 md:w-3/4 lg:w-1/2">
            <DialogHeader>
              <DialogTitle className="text-gray-300">Book Details</DialogTitle>
            </DialogHeader>
            <Card className="w-full mx-auto bg-gray-900 border-0 text-gray-300 py-0">
              <CardHeader>
                <img
                  className="rounded-xl"
                  src="https://i.ibb.co/j9pJxVL0/LmpwZw.jpg"
                  alt={`${title} Book Cover`}
                />
              </CardHeader>
              <CardContent className="px-0 space-y-1">
                <CardTitle className="text-gray-300">
                  Title: {title}
                </CardTitle>
                <CardTitle>
                  Author:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    {author}
                  </span>
                </CardTitle>
                <CardTitle>
                  Genre:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    {genre}
                  </span>
                </CardTitle>
                <CardTitle>
                  ISBN:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    {isbn}
                  </span>
                </CardTitle>
                <CardTitle>
                  Description:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    {description}
                  </span>
                </CardTitle>
                <CardTitle>
                  Copies:{" "}
                  <span className="text-sm font-semibold text-gray-400">{copies}</span>
                </CardTitle>
                <CardTitle>
                  Availablity:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    {available ? "Available" : "Not Available"}
                  </span>
                </CardTitle>
              </CardContent>
            </Card>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="bg-gray-400">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
      </Dialog>
    </>
  );
};

export default Book;
