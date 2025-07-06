// Form to borrow a selected book.
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiShoppingCart } from "react-icons/hi2";
import MLMSForm from "@/components/form/MLMSFrom";
import MLMSInput from "@/components/form/MLMSInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import MLMSDatePicker from "@/components/form/MLMSDatePicker";

const Borrow = () => {
  const handleEdit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="text-teal-500 hover:bg-gray-950 text-xl cursor-pointer p-2 rounded bg-gray-900">
              <HiShoppingCart />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full sm:w-5/6 md:w-3/4 lg:w-1/2">
            <DialogHeader>
              <DialogTitle className="text-gray-300">Borrow Book</DialogTitle>
            </DialogHeader>
            <Card className="w-full mx-auto bg-gray-900 border-0 text-gray-300 py-0">
                <CardContent className="px-0 space-y-1">
                    <CardTitle className="text-gray-300">
                  Title: The Hobbit
                </CardTitle>
                <CardTitle>
                  Author:{" "}
                  <span className="text-sm font-semibold text-gray-400">
                    J.R.R. Tolkien
                  </span>
                </CardTitle>
                <CardTitle>
                  Copies:{" "}
                  <span className="text-sm font-semibold text-gray-400">9</span>
                </CardTitle>
                </CardContent>
              <MLMSForm className="space-y-3" onSubmit={handleEdit}>
                <MLMSInput name="quantity" label="Quantity" />
                <MLMSDatePicker name="dueDate" label="Due Date" />
                <DialogFooter className="pt-6">
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
                    Borrow now
                  </Button>
                </DialogFooter>
              </MLMSForm>
            </Card>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default Borrow;
