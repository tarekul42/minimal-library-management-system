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
import { HiMiniPencilSquare } from "react-icons/hi2";

const Books = () => {
  return (
    <div className="w-full min-h-screen">
      <Table border={2}>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-100">Title</TableHead>
            <TableHead className="text-gray-100">Author</TableHead>
            <TableHead className="text-gray-100">ISBN</TableHead>
            <TableHead className="text-gray-100">Copis</TableHead>
            <TableHead className="text-gray-100">Availablity</TableHead>
            <TableHead className="text-gray-100">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>The Great Gatsby</TableCell>
            <TableCell>F. Scott Fitzgerald</TableCell>
            <TableCell>9780743273565</TableCell>
            <TableCell>5</TableCell>
            <TableCell>Available</TableCell>
            <TableCell>
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline ml-2">
                Delete
              </button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>1984</TableCell>
            <TableCell>George Orwell</TableCell>
            <TableCell>9780451524935</TableCell>
            <TableCell>3</TableCell>
            <TableCell>Checked Out</TableCell>
            <TableCell>
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline ml-2">
                Delete
              </button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>To Kill a Mockingbird</TableCell>
            <TableCell>Harper Lee</TableCell>
            <TableCell>9780061120084</TableCell>
            <TableCell>7</TableCell>
            <TableCell>Available</TableCell>
            <TableCell className="flex gap-1">
              <button className="text-blue-500 hover:underline text-xl cursor-pointer p-2 rounded bg-gray-800">
                <HiEye />
              </button>
              <button className="text-red-500 hover:underline text-xl cursor-pointer p-2 rounded bg-gray-800">
                <HiTrash />
              </button>
              <button className="text-gray-500 hover:underline text-xl cursor-pointer p-2 rounded bg-gray-800">
                <HiShoppingCart />
              </button>
              <button className="text-gray-500 hover:underline text-xl cursor-pointer p-2 rounded bg-gray-800">
                <HiMiniPencilSquare />
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Books;
