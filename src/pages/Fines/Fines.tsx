import { useGetMyFinesQuery, usePayFineMutation } from "@/redux/api/finesApi";
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
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ErrorRetry } from "@/components/ui/error-retry";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { DollarSign } from "lucide-react";
import { getApiError } from "@/lib/utils";
import type { IFine } from "@/types/fine";

const Fines = () => {
  const { data, isLoading, isError, refetch } = useGetMyFinesQuery();
  const [payFine] = usePayFineMutation();

  const fines: IFine[] = data?.data || [];
  const totalUnpaid = fines.filter((f) => !f.paid).reduce((s, f) => s + f.amount, 0);

  const handlePay = async (id: string) => {
    try {
      await payFine(id).unwrap();
      toast.success("Fine paid successfully");
    } catch (err) {
      console.error("Failed to process payment:", err);
      toast.error(getApiError(err, "Failed to process payment"));
    }
  };

  if (isLoading) {
    return (
      <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
        <TableSkeleton rows={3} cols={5} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
        <ErrorRetry message="Failed to load fines" onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <h1 className="text-3xl mb-6 flex items-center gap-2">
        <DollarSign className="h-6 w-6" />
        My Fines
      </h1>

      {totalUnpaid > 0 && (
        <Card className="mb-6 bg-gray-900 border-gray-800 max-w-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <span className="text-muted-foreground">Total Unpaid</span>
            <span className="text-2xl font-bold text-red-400">${totalUnpaid.toFixed(2)}</span>
          </CardContent>
        </Card>
      )}

      {fines.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No fines</p>
          <p className="text-sm">You have no fines on your account.</p>
        </div>
      ) : (
        <Table className="border">
          <TableCaption>Your fine records</TableCaption>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fines.map((f) => (
              <TableRow key={f._id}>
                <TableCell className="font-medium">{f.borrow.book.title}</TableCell>
                <TableCell className="text-muted-foreground">{f.reason}</TableCell>
                <TableCell className="text-right">${f.amount.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  {f.paid ? (
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      Paid
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Unpaid</Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {!f.paid && (
                    <Button size="sm" onClick={() => handlePay(f._id)}>
                      Pay Now
                    </Button>
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

export default Fines;
