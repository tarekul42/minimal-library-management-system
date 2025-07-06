import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiTrash } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const DeleteBook = () => {
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="text-red-500 hover:bg-gray-950 text-xl cursor-pointer p-2 rounded bg-gray-900">
              <HiTrash />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full sm:w-5/6 md:w-3/4 lg:w-1/2">
            <DialogHeader>
              <DialogTitle className="text-gray-300">Are you sure?</DialogTitle>
            </DialogHeader>
            <Card className="w-full mx-auto bg-gray-900 border-0 text-gray-300 py-0">
              <CardContent className="px-0 space-y-1">
                <CardTitle className="text-gray-300">
                  Permanently delete the book "The Hobbit"? This action cannot
                  be undone.
                </CardTitle>
              </CardContent>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-900 border-gray-600 text-gray-300 cursor-pointer"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-gray-300 text-gray-950 cursor-pointer"
                >
                  Yes, Delete
                </Button>
              </DialogFooter>
            </Card>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default DeleteBook;
