export const validationMessages = {
  title: {
    required: "Title is required",
    minLength: "Title must be at least 2 characters",
  },
  author: {
    required: "Author is required",
    minLength: "Author name must be at least 2 characters",
  },
  genre: {
    required: "Genre is required",
  },
  isbn: {
    required: "ISBN is required",
    pattern: "ISBN must be a valid format",
  },
  description: {
    required: "Description is required",
    minLength: "Description must be at least 10 characters",
  },
  copies: {
    required: "Number of copies is required",
    min: "At least 0 copies are required",
  },
  availability: {
    required: "Availability status is required",
  },
};
