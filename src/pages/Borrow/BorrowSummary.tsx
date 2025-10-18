import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import type { IBorrowSummary } from "@/types/borrowSummary";

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery(undefined);

  const summary: IBorrowSummary[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <h1 className="text-3xl pb-4 text-center">Borrow Summary</h1>
      <Table border={2} className="border">
        <TableCaption className="pb-4">
          A list of all borrow records.
        </TableCaption>
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
          {summary &&
            summary.map((records: IBorrowSummary) => (
              <TableRow key={records.book.isbn}>
                <TableCell>{records.book.title}</TableCell>
                <TableCell className="text-center">
                  {records.book.isbn}
                </TableCell>
                <TableCell className="text-center">
                  {records.totalQuantity}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BorrowSummary;
