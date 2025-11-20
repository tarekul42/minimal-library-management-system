import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowSummaryQuery } from "@/redux/api/borrowApi";
import type { IBorrowSummary } from "@/types/borrowSummary";
import { Spinner } from "@/components/ui/spinner";

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery(undefined);

  const summary: IBorrowSummary[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <h1 className="text-3xl pb-4 text-center">Borrow Summary</h1>
      <Table className="border">
        <TableCaption className="pb-4">
          A list of all borrow records.
        </TableCaption>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="text-center">ISBN</TableHead>
            <TableHead className="text-center">
              Total borrrowed Quantity
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {summary.map((records: IBorrowSummary) => (
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
