// Displays a list of all books with options to view, edit, delete, and borrow.
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HiTrash } from "react-icons/hi2";
import { HiShoppingCart } from "react-icons/hi2";
import { HiEye } from "react-icons/hi2";
import EditBook from "./EditBook";

const Books = () => {
  return (
    <div className="w-full min-h-screen p-6 sm:p-8 lg:p-10  xl:py-10 xl:px-0">
      <h1 className="text-3xl pb-4 text-center">All Books</h1>
      <Table border={2} className="border">
        <TableCaption className="pb-4">A list of all books.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-100 text-center">ISBN</TableHead>
            <TableHead className="text-gray-100">Title</TableHead>
            <TableHead className="text-gray-100">Author</TableHead>
            <TableHead className="text-gray-100">Genre</TableHead>
            <TableHead className="text-gray-100 text-center">Copies</TableHead>
            <TableHead className="text-gray-100 text-center">
              Availablity
            </TableHead>
            <TableHead className="text-gray-100 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">9780061120084</TableCell>
            <TableCell>To Kill a Mockingbird</TableCell>
            <TableCell>Harper Lee</TableCell>
            <TableCell>Fiction</TableCell>
            <TableCell className="text-center">7</TableCell>
            <TableCell className="text-center">Available</TableCell>
            <TableCell className="flex gap-1 justify-center">
              <button className="text-blue-500 hover:bg-gray-950 text-xl cursor-pointer p-2 rounded bg-gray-900">
                <HiEye />
              </button>
              <button className="text-teal-500 hover:bg-gray-950 text-xl cursor-pointer p-2 rounded bg-gray-900">
                <HiShoppingCart />
              </button>
              {/* <button className=""> */}
                <EditBook />
              {/* </button> */}
              <button className="text-red-500 hover:bg-gray-950 text-xl cursor-pointer p-2 rounded bg-gray-900">
                <HiTrash />
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Books;
