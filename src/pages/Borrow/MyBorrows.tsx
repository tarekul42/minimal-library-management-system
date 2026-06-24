import { useGetMyBorrowsQuery, useReturnBookMutation } from "@/redux/api/borrowApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { BookOpen, RotateCcw } from "lucide-react";
import type { IBorrow } from "@/types/borrow";

const statusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-blue-600">Active</Badge>;
    case "overdue":
      return <Badge variant="destructive">Overdue</Badge>;
    case "returned":
      return <Badge variant="outline">Returned</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const MyBorrows = () => {
  const { data, isLoading } = useGetMyBorrowsQuery();
  const [returnBook] = useReturnBookMutation();

  const borrows: IBorrow[] = data?.data || [];

  const handleReturn = async (id: string) => {
    try {
      await returnBook(id).unwrap();
      toast.success("Book returned successfully");
    } catch {
      toast.error("Failed to return book");
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <h1 className="text-3xl mb-6 flex items-center gap-2">
        <BookOpen className="h-6 w-6" />
        My Borrows
      </h1>

      {borrows.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No borrow records found</p>
        </div>
      ) : (
        <Table className="border">
          <TableCaption>Your borrow history</TableCaption>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead className="text-center">Qty</TableHead>
              <TableHead>Borrowed</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {borrows.map((b) => (
              <TableRow key={b._id}>
                <TableCell className="font-medium">{b.book.title}</TableCell>
                <TableCell className="text-muted-foreground">{b.book.isbn}</TableCell>
                <TableCell className="text-center">{b.quantity}</TableCell>
                <TableCell>{new Date(b.borrowedAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(b.dueDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-center">{statusBadge(b.status)}</TableCell>
                <TableCell className="text-center">
                  {b.status === "active" || b.status === "overdue" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReturn(b._id)}
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Return
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MyBorrows;
