//  Interface to update an existing book’s details.
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiMiniPencilSquare } from "react-icons/hi2";
import MLMSForm from "@/components/form/MLMSFrom";
import MLMSInput from "@/components/form/MLMSInput";
import MLMSSelect from "@/components/form/MLMSSelect";
import MLMSTextArea from "@/components/form/MLMSTextArea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { FieldValues, SubmitHandler } from "react-hook-form";

const Genre = [
  {
    value: "FICTION",
    label: "Fiction",
  },
];

const availablity = [
  {
    value: "AVAILABLE",
    label: "Available",
  },
  {
    value: "NOT_AVAILABLE",
    label: "Not Available",
  },
];

const EditBook = () => {
  const handleEdit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="text-amber-500 hover:bg-gray-950 text-xl cursor-pointer p-2 rounded bg-gray-900">
              <HiMiniPencilSquare />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full sm:w-5/6 md:w-3/4 lg:w-1/2">
            <DialogHeader>
              <DialogTitle className="text-gray-300">Edit Book</DialogTitle>
            </DialogHeader>
            <Card className="w-full mx-auto bg-gray-900 border-0 text-gray-300 py-0">
              <MLMSForm className="space-y-3" onSubmit={handleEdit}>
                <MLMSInput name="title" label="Title" />
                <MLMSInput name="Author" label="Author" />
                <MLMSSelect name="Genre" label="Genre" options={Genre} />
                <MLMSInput name="isbn" label="ISBN" />
                <MLMSTextArea name="description" label="Description" />
                <MLMSInput name="copies" label="Copies" />
                <MLMSSelect
                  name="availablity"
                  label="Availablity"
                  defaultValue="AVAILABLE"
                  options={availablity}
                />
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
                    Save changes
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

export default EditBook;