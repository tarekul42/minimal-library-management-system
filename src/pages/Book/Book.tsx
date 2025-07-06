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

const Book = () => {
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="text-blue-500 hover:bg-gray-950 text-xl cursor-pointer p-2 rounded bg-gray-900">
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
                  alt="The Theory of Everything Book Image"
                />
              </CardHeader>
              <CardContent className="px-0 space-y-1">
                <CardTitle className="text-gray-300">
                  Title: The Hobbit
                </CardTitle>
                <CardTitle className="">
                  Author:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    J.R.R. Tolkien
                  </span>
                </CardTitle>
                <CardTitle>
                  Genre:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    FANTASY
                  </span>
                </CardTitle>
                <CardTitle>
                  ISBN:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    9780547928227
                  </span>
                </CardTitle>
                <CardTitle>
                  Description:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    A classic fantasy novel that follows the journey of Bilbo
                    Baggins as he embarks on an epic quest filled with dragons,
                    treasure, and adventure.
                  </span>
                </CardTitle>
                <CardTitle>
                  Copies:{" "}
                  <span className="text-sm font-semibold text-gray-400">9</span>
                </CardTitle>
                <CardTitle>
                  Availablity:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    Available
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
        </form>
      </Dialog>
    </>
  );
};

export default Book;
