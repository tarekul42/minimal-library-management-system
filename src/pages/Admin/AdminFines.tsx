import { Navigate, Link } from "react-router";
import { useAppSelector } from "@/redux/hook";
import { useGetAllFinesQuery, usePayFineMutation } from "@/redux/api/finesApi";
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
import { ArrowLeft, DollarSign } from "lucide-react";
import type { IFine } from "@/types/fine";

const AdminFines = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const { data, isLoading, isError, refetch } = useGetAllFinesQuery();
  const [payFine] = usePayFineMutation();

  const fines: IFine[] = data?.data || [];
  const totalUnpaid = fines.filter((f) => !f.paid).reduce((s, f) => s + f.amount, 0);

  const handlePay = async (id: string) => {
    try {
      await payFine(id).unwrap();
      toast.success("Fine marked as paid");
    } catch {
      toast.error("Failed to process payment");
    }
  };

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Admin
      </Link>

      <h1 className="text-3xl mb-6 flex items-center gap-2">
        <DollarSign className="h-5 w-5" />
        Manage Fines
      </h1>

      {totalUnpaid > 0 && (
        <Card className="mb-6 bg-gray-900 border-gray-800 max-w-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <span className="text-muted-foreground">Total Unpaid Fines</span>
            <span className="text-2xl font-bold text-red-400">${totalUnpaid.toFixed(2)}</span>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <TableSkeleton rows={5} cols={6} />
      ) : isError ? (
        <ErrorRetry message="Failed to load fines" onRetry={refetch} />
      ) : (
        <Table className="border">
          <TableCaption>All fine records</TableCaption>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>User</TableHead>
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
                <TableCell>{f.user?.name || "N/A"}</TableCell>
                <TableCell className="font-medium">{f.borrow?.book?.title}</TableCell>
                <TableCell className="text-muted-foreground">{f.reason}</TableCell>
                <TableCell className="text-right">${f.amount.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  {f.paid ? (
                    <Badge variant="outline" className="text-green-400 border-green-400">Paid</Badge>
                  ) : (
                    <Badge variant="destructive">Unpaid</Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {!f.paid && (
                    <Button size="sm" onClick={() => handlePay(f._id)}>
                      Mark Paid
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

export default AdminFines;
