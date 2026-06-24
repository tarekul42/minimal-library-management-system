import { Navigate, Link } from "react-router";
import { useState } from "react";
import { useAppSelector } from "@/redux/hook";
import {
  useGetBorrowSummaryQuery,
  useGetActiveBorrowsQuery,
  useGetOverdueBorrowsQuery,
  useReturnBookMutation,
} from "@/redux/api/borrowApi";
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
import { ArrowLeft, RotateCcw, AlertTriangle, Activity } from "lucide-react";

type Tab = "all" | "active" | "overdue";

const tabs: { key: Tab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "overdue", label: "Overdue" },
];

const AdminBorrows = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [tab, setTab] = useState<Tab>("all");

  if (!user || (user.role !== "admin" && user.role !== "librarian")) {
    return <Navigate to="/login" replace />;
  }

  const { data: allData, isLoading: allLoading } = useGetBorrowSummaryQuery();
  const { data: activeData, isLoading: activeLoading } = useGetActiveBorrowsQuery();
  const { data: overdueData, isLoading: overdueLoading } = useGetOverdueBorrowsQuery();
  const [returnBook] = useReturnBookMutation();

  const getData = () => {
    switch (tab) {
      case "active":
        return { data: activeData?.data, loading: activeLoading };
      case "overdue":
        return { data: overdueData?.data, loading: overdueLoading };
      default:
        return { data: allData?.data, loading: allLoading };
    }
  };

  const { data: borrows, loading: isLoading } = getData();

  const handleReturn = async (id: string) => {
    try {
      await returnBook(id).unwrap();
      toast.success("Book returned");
    } catch {
      toast.error("Failed to return book");
    }
  };

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Admin
      </Link>

      <h1 className="text-3xl mb-6">Manage Borrows</h1>

      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <Button
            key={t.key}
            variant={tab === t.key ? "default" : "outline"}
            size="sm"
            onClick={() => setTab(t.key)}
          >
            {t.key === "active" && <Activity className="h-4 w-4 mr-1" />}
            {t.key === "overdue" && <AlertTriangle className="h-4 w-4 mr-1" />}
            {t.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <Spinner size={32} />
      ) : (
        <Table className="border">
          <TableCaption>
            {tab === "active"
              ? "Currently active borrows"
              : tab === "overdue"
                ? "Overdue borrows"
                : "All borrow records"}
          </TableCaption>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Book</TableHead>
              <TableHead className="text-center">Qty</TableHead>
              <TableHead>Borrowed</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(borrows || []).map((b: any) => (
              <TableRow key={b._id}>
                <TableCell>{b.user?.name || "N/A"}</TableCell>
                <TableCell className="font-medium">{b.book?.title}</TableCell>
                <TableCell className="text-center">{b.quantity}</TableCell>
                <TableCell>{new Date(b.borrowedAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(b.dueDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-center">
                  {b.status === "active" && <Badge className="bg-blue-600">Active</Badge>}
                  {b.status === "overdue" && <Badge variant="destructive">Overdue</Badge>}
                  {b.status === "returned" && <Badge variant="outline">Returned</Badge>}
                </TableCell>
                <TableCell className="text-center">
                  {(b.status === "active" || b.status === "overdue") && (
                    <Button size="sm" variant="outline" onClick={() => handleReturn(b._id)}>
                      <RotateCcw className="h-3 w-3 mr-1" /> Return
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

export default AdminBorrows;
