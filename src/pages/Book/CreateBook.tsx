import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCreateBookMutation } from "@/redux/api/bookApi";
import { useBookForm } from "@/hooks/useBookForm";
import type { BookFormData } from "@/schema/bookSchema";
import { FormContainer } from "@/components/FormContainer";
import { BookForm } from "@/components/BookForm";

const CreateBook = () => {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();
  const form = useBookForm("create");

  async function onSubmit(values: BookFormData) {
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

      <FormContainer type="card" title="Add Book">
        <BookForm
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
          submitButtonText="Submit"
        />
      </FormContainer>
    </div>
  );
};

export default CreateBook;
