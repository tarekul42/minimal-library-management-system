import { useMemo } from "react";
import { useGetMyBorrowsQuery } from "@/redux/api/borrowApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ErrorRetry } from "@/components/ui/error-retry";
import type { IBorrow } from "@/types/borrow";

interface IGrouped {
  _id: string;
  title: string;
  totalQuantity: number;
}

const BorrowSummary = () => {
  const { data, isLoading, isError, refetch } = useGetMyBorrowsQuery();

  const summary = useMemo(() => {
    const borrows: IBorrow[] = data?.data || [];
    const grouped = borrows.reduce<Record<string, IGrouped>>((acc, b) => {
      const key = b.book._id;
      if (!acc[key]) {
        acc[key] = { _id: key, title: b.book.title, totalQuantity: 0 };
      }
      acc[key].totalQuantity += b.quantity;
      return acc;
    }, {});
    return Object.values(grouped);
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
        <TableSkeleton rows={4} cols={3} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
        <ErrorRetry message="Failed to load borrow summary" onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <h1 className="text-3xl pb-4 text-center">Borrow Summary</h1>
      <Table className="border">
        <TableCaption className="pb-4">A list of all borrow records.</TableCaption>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="text-center">ISBN</TableHead>
            <TableHead className="text-center">Total Borrowed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {summary.map((record) => (
            <TableRow key={record._id}>
              <TableCell>{record.title}</TableCell>
              <TableCell className="text-center">{record._id}</TableCell>
              <TableCell className="text-center">{record.totalQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BorrowSummary;
