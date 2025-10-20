import { availabilityOptions, genreOptions } from "@/fakeData/editBookData";
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
    placeholder: "Enter author name",
    type: "text",
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
    name: "copies",
    label: "Copies",
    placeholder: "Enter copies",
    type: "number",
    min: 0,
  },
  {
    name: "availability",
    label: "Availability",
    type: "select",
    options: availabilityOptions,
  },
];
