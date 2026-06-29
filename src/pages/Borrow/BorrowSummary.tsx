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
import { Spinner } from "@/components/ui/spinner";
import type { IBorrow } from "@/types/borrow";

interface IGrouped {
  isbn: string;
  title: string;
  totalQuantity: number;
}

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetMyBorrowsQuery();

  const borrows: IBorrow[] = data?.data || [];

  if (isError) {
    return <p className="text-red-400 p-4">Failed to load borrow summary.</p>;
  }

  const grouped = borrows.reduce<Record<string, IGrouped>>((acc, b) => {
    const key = b.book.isbn;
    if (!acc[key]) {
      acc[key] = { isbn: key, title: b.book.title, totalQuantity: 0 };
    }
    acc[key].totalQuantity += b.quantity;
    return acc;
  }, {});

  const summary = Object.values(grouped);

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
            <TableRow key={record.isbn}>
              <TableCell>{record.title}</TableCell>
              <TableCell className="text-center">{record.isbn}</TableCell>
              <TableCell className="text-center">{record.totalQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BorrowSummary;
