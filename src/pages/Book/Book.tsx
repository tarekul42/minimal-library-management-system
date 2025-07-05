// Detailed view of a single book’s information.
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiEye } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
              <DialogTitle className="text-gray-300">Edit profile</DialogTitle>
            </DialogHeader>
            <Card className="w-full mx-auto bg-gray-900 border-0 text-gray-300 py-0">
              <CardHeader>
              <img
                className="rounded-xl"
                src="https://i.ibb.co/j9pJxVL0/LmpwZw.jpg"
                alt="The Theory of Everything Book Image"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>Theory of Everything</CardTitle>
              <CardDescription>Stephen Hawking</CardDescription>
              {/* <CardAction>
                <Button variant="link">Sign Up</Button>
              </CardAction> */}
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-gray-300 text-gray-950 cursor-pointer"
              >
                View Details
              </Button>
              <Button
                variant="outline"
                className="w-full bg-gray-900 border-gray-800 cursor-pointer"
              >
                Borrow this book
              </Button>
            </CardFooter>
            </Card>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default Book;
