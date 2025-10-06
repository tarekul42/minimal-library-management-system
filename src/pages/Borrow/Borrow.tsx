// Form to borrow a selected book.
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MLMSForm from "@/components/form/MLMSFrom";
import MLMSInput from "@/components/form/MLMSInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface BorrowBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookId: string | null;
}

// Schema definition
const borrowBookSchema = z.object({
  quantity: z.number().min(1, { message: "Quantity must be at least 1." }),
  dueDate: z.date({ message: "Date is required." }),
});

const Borrow: React.FC<BorrowBookModalProps> = ({
  open,
  onOpenChange,
  bookId,
}) => {
  const [borrowBook, { isLoading: isUpdating }] = useBorrowBookMutation();
  const handleBorrow: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const form = useForm<z.infer<typeof borrowBookSchema>>({
    resolver: zodResolver(borrowBookSchema),
    defaultValues: {
      quantity: 1,
      dueDate: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof borrowBookSchema>) => {
    try {
      const bookData = { ...values, bookId: bookId! };
      await borrowBook({ bookData }).unwrap();
      form.reset();

      // Show success message (you can implement toast notifications here)
      console.log("Book updated successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating book:", error);
      // Handle error (you can implement error toast here)
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:w-5/6 md:w-3/4 lg:w-1/2">
          <DialogHeader>
            <DialogTitle className="text-gray-300">Borrow Book</DialogTitle>
          </DialogHeader>
          <Card className="w-full mx-auto bg-gray-900 border-0 text-gray-300 py-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                    <span className="text-sm font-semibold text-gray-400">
                      9
                    </span>
                  </CardTitle>
                </CardContent>
                <MLMSForm className="space-y-3" onSubmit={handleBorrow}>
                  <MLMSInput name="quantity" label="Quantity" />
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full bg-none">
                        <FormLabel>Date of birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "flex justify-start h-10 w-full rounded-md border border-input bg-gray-900 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              captionLayout="dropdown"
                              className="rounded"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Your Due Date to confirm your borrow.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter className="pt-6">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="bg-gray-900 border-gray-600 text-gray-300 cursor-pointer"
                        disabled={isUpdating}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="bg-gray-300 text-gray-950 cursor-pointer"
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Borrowing...." : "Borrow now"}
                    </Button>
                  </DialogFooter>
                </MLMSForm>
              </form>
            </Form>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Borrow;
