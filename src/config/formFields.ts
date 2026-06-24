import { genreOptions } from "@/fakeData/editBookData";
import type { IFormFieldConfig } from "@/types/form";

export const bookFormFields: IFormFieldConfig[] = [
  {
    name: "title",
    label: "Title",
    placeholder: "Enter book title",
    type: "text",
  },
  {
    name: "author",
    label: "Author",
    placeholder: "Select an author",
    type: "select",
  },
  {
    name: "genre",
    label: "Genre",
    type: "select",
    options: genreOptions,
  },
  {
    name: "isbn",
    label: "ISBN",
    placeholder: "Enter ISBN no.",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter description here",
    type: "textarea",
  },
  {
    name: "pages",
    label: "Pages",
    placeholder: "Number of pages",
    type: "number",
    min: 1,
  },
  {
    name: "publisher",
    label: "Publisher",
    placeholder: "Publisher name",
    type: "text",
  },
  {
    name: "publishedYear",
    label: "Published Year",
    placeholder: "e.g. 2024",
    type: "number",
    min: 1000,
  },
  {
    name: "copies",
    label: "Copies",
    placeholder: "Enter copies",
    type: "number",
    min: 0,
  },
  {
    name: "tags",
    label: "Tags",
    placeholder: "Comma-separated tags",
    type: "text",
  },
  {
    name: "shelfLocation",
    label: "Shelf Location",
    placeholder: "e.g. A3-12",
    type: "text",
  },
];
