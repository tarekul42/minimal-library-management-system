import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateBookMutation } from "@/redux/api/baseApi";
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
import { useNavigate } from "react-router";
import { toast } from "sonner";

// Schema definition
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  author: z.string().min(1, { message: "Author is required." }),
  genre: z.string().min(1, { message: "Genre is required." }),
  isbn: z.string().min(1, { message: "ISBN is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  copies: z
    .number({ invalid_type_error: "Copies must be a number." })
    .int()
    .min(0, { message: "Copies cannot be negative." }),
  availability: z.string().min(1, { message: "Availability is required." }),
});

const CreateBook = () => {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 0,
      availability: "available",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createBook(values).unwrap();
      form.reset();
      navigate("/books");
    } catch (error) {
      console.error("Error creating book", error);
      toast.error("Failed to create book");
    }
  }

  return (
    <div className="text-center py-3 sm:py-8 lg:py-10 px-2 sm:px-3 md:px-4 lg:px-6">
      <h1 className="text-xl md:text-2xl lg:text-3xl p-1 sm:p-2 lg:p-4">
        Add a new book
      </h1>
      <Card className="w-full sm:w-5/6 md:w-3/4 lg:w-1/2 mx-auto bg-gray-900 border-0 text-gray-300 p-6 sm:p-8 lg:p-10">
        <CardHeader>
          <CardTitle>Add Book</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
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

            {/* author */}
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

            {/* genre */}
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FICTION">Fiction</SelectItem>
                      <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                      <SelectItem value="SCIENCE">Science</SelectItem>
                      <SelectItem value="HISTORY">History</SelectItem>
                      <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                      <SelectItem value="FANTASY">Fantasy</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* isbn */}
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ISBN no." {...field} />
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
                    <Textarea placeholder="Enter description here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity */}
            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="Enter copies"
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* availability */}
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Availability</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-foreground"
            >
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreateBook;
