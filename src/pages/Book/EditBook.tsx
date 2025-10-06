import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetBookQuery, useEditBookMutation } from "@/redux/api/baseApi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Genre } from "@/types/book";

interface EditBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookId: string | null;
}

const genreOptions = [
  { value: "FICTION", label: "Fiction" },
  { value: "NON_FICTION", label: "Non-Fiction" },
  { value: "SCIENCE", label: "Science" },
  { value: "HISTORY", label: "History" },
  { value: "BIOGRAPHY", label: "Biography" },
  { value: "FANTASY", label: "Fantasy" },
];

const availabilityOptions = [
  { value: "true", label: "Available" },
  { value: "false", label: "Not Available" },
];

// Schema definition
const editBookSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  author: z.string().min(1, { message: "Author is required." }),
  genre: z.string().min(1, { message: "Genre is required." }),
  isbn: z.string().min(1, { message: "ISBN is required." }),
  description: z.string().optional(),
  copies: z
    .number({ invalid_type_error: "Copies must be a number." })
    .int()
    .min(0, { message: "Copies cannot be negative." }),
  available: z.string(),
});

const EditBook: React.FC<EditBookModalProps> = ({
  open,
  onOpenChange,
  bookId,
}) => {
  const {
    data: book,
    isLoading,
    isError,
  } = useGetBookQuery(bookId!, { skip: !bookId });
  const [editBook, { isLoading: isUpdating }] = useEditBookMutation();
  const bookData = book?.data;

  const form = useForm<z.infer<typeof editBookSchema>>({
    resolver: zodResolver(editBookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 0,
      available: "true",
    },
  });

  const onSubmit = async (values: z.infer<typeof editBookSchema>) => {
    try {
      const updateData = {
        ...values,
        available: values.available === "true",
        genre: bookData.genre as Genre | undefined,
      };

      console.log(values.genre);
      await editBook({ bookId: bookId!, bookData: updateData }).unwrap();
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
      {isLoading ? (
        <div>Loading...</div>
      ) : isError || !bookData ? (
        <div>Error loading book data.</div>
      ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="w-full sm:w-5/6 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gray-300">
                Edit Book: {bookData.title}
              </DialogTitle>
            </DialogHeader>
            <Card className="w-full mx-auto bg-gray-900 border-0 text-gray-300 py-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter book title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Author */}
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter author name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Genre */}
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genre</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genreOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* ISBN */}
                  <FormField
                    control={form.control}
                    name="isbn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ISBN</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter ISBN number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter book description"
                            {...field}
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Copies */}
                  <FormField
                    control={form.control}
                    name="copies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Copies</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            placeholder="Enter number of copies"
                            {...field}
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Availability */}
                  <FormField
                    control={form.control}
                    name="available"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availabilityOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="pt-6">
                    <DialogClose asChild>
                      <Button
                        type="button"
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
                      {isUpdating ? "Saving...." : "Save Changes"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </Card>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default EditBook;
