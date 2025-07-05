// Form interface to add a new book to the system.
import MLMSForm from "@/components/form/MLMSFrom";
import MLMSInput from "@/components/form/MLMSInput";
import MLMSSelect from "@/components/form/MLMSSelect";
import MLMSTextArea from "@/components/form/MLMSTextArea";
import { Button } from "@/components/ui/button";
import {
  Card,
  // CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
]

const CreateBook = () => {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="text-center py-3 sm:py-8 lg:py-10 px-2 sm:px-3 md:px-4 lg:px-6">
      <h1 className="text-xl md:text-2xl lg:text-3xl p-1 sm:p-2 lg:p-4">
        Add a new book
      </h1>
      <Card className="w-full sm:w-5/6 md:w-3/4 lg:w-1/2 mx-auto bg-gray-900 border-0 text-gray-300 p-6 sm:p-8 lg:p-10">
        <MLMSForm className="space-y-3" onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Add Book</CardTitle>
          </CardHeader>

          <MLMSInput name="title" label="Title" />
          <MLMSInput name="Author" label="Author" />
          <MLMSSelect name="Genre" label="Genre" options={Genre} />
          <MLMSInput name="isbn" label="ISBN" />
          <MLMSTextArea name="description" label="Description" />
          <MLMSInput name="copies" label="Copies" />
          <MLMSSelect name="availablity" label="Availablity" defaultValue="AVAILABLE" options={availablity} />

          <Button
            type="submit"
            className="w-full bg-gray-300 text-gray-950 my-1 sm:my-2 lg:my-3"
          >
            Save changes
          </Button>
        </MLMSForm>
      </Card>
    </div>
  );
};

export default CreateBook;
