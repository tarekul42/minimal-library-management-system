// Displays an aggregated summary of all borrowed books.
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BorrowSummary = () => {
  return (
    <div className="w-full min-h-screen p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <h1 className="text-3xl pb-4 text-center">Borrow Summary</h1>
      <Table border={2} className="border">
        <TableCaption className="pb-4">A list of all borrow records.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-100">Title</TableHead>
            <TableHead className="text-gray-100 text-center">ISBN</TableHead>
            <TableHead className="text-gray-100 text-center">
              Total borrrowed Quantity
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>To Kill a Mockingbird</TableCell>
            <TableCell className="text-center">9780061120084</TableCell>
            <TableCell className="text-center">Harper Lee</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default BorrowSummary;
