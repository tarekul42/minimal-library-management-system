import { useState, useMemo } from "react";
import { useGetMyBorrowsQuery, useReturnBookMutation, useRenewBookMutation } from "@/redux/api/borrowApi";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ErrorState } from "@/components/feedback/ErrorState";
import { ConfirmationDialog } from "@/components/feedback/ConfirmationDialog";
import { DataTable } from "@/components/tables/DataTable";
import type { Column } from "@/components/tables/types";
import { getApiError } from "@/lib/utils";
import { toast } from "sonner";
import type { IBorrow } from "@/types/borrow";
import { RefreshCw } from "lucide-react";
import { Seo } from "@/components/Seo";

export default function MyBorrows() {
  const [returnTarget, setReturnTarget] = useState<IBorrow | null>(null);
  const [renewTarget, setRenewTarget] = useState<IBorrow | null>(null);
  const { data, isLoading, isError, refetch } = useGetMyBorrowsQuery();
  const [returnBook, { isLoading: returning }] = useReturnBookMutation();
  const [renewBook, { isLoading: renewing }] = useRenewBookMutation();

  const borrows: IBorrow[] = data?.data ?? [];

  const handleReturn = async () => {
    if (!returnTarget) return;
    try {
      await returnBook(returnTarget._id).unwrap();
      toast.success("Book returned successfully");
      setReturnTarget(null);
    } catch (err) {
      toast.error(getApiError(err, "Failed to return book"));
    }
  };

  const handleRenew = async () => {
    if (!renewTarget) return;
    try {
      await renewBook(renewTarget._id).unwrap();
      toast.success("Borrow renewed successfully");
      setRenewTarget(null);
    } catch (err) {
      toast.error(getApiError(err, "Failed to renew borrow"));
    }
  };

  const columns: Column<IBorrow>[] = useMemo(() => [
    { key: "book", header: "Book", render: (b) => <span className="font-medium">{typeof b.book === "string" ? b.book : b.book?.title}</span> },
    { key: "borrowedAt", header: "Borrowed", render: (b) => <span className="text-muted-foreground">{new Date(b.borrowedAt).toLocaleDateString()}</span> },
    { key: "dueDate", header: "Due", render: (b) => <span className="text-muted-foreground">{new Date(b.dueDate).toLocaleDateString()}</span> },
    {
      key: "status", header: "Status", render: (b) => (
        <Badge variant={b.status === "overdue" ? "destructive" : b.status === "returned" ? "secondary" : "outline"} className="capitalize">{b.status}</Badge>
      ),
    },
    {
      key: "actions", header: "Actions", align: "right", render: (b) => (
        b.status === "active" ? (
          <div className="inline-flex gap-1">
            <Button size="sm" variant="outline" onClick={() => setReturnTarget(b)}>Return</Button>
            <Button size="sm" variant="ghost" onClick={() => setRenewTarget(b)}>
              <RefreshCw className="mr-1 h-3 w-3" />
              Renew
            </Button>
          </div>
        ) : null
      ),
    },
  ], []);

  if (isLoading) return <div className="space-y-4"><PageHeader title="My Borrows" /><TableSkeleton /></div>;
  if (isError) return <ErrorState message="Failed to load borrows" onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <Seo title="My Borrows" description="Track your active and past loans." />
      <PageHeader title="My Borrows" description="Track your active and past loans." />

      <DataTable
        data={borrows}
        columns={columns}
        emptyTitle="No borrows yet"
        emptyDescription="When you borrow books, they'll appear here."
        emptyAction={<Button asChild><a href="/books">Browse books</a></Button>}
        getRowId={(b) => b._id}
      />

      <ConfirmationDialog
        open={!!returnTarget}
        onOpenChange={(open: boolean) => !open && setReturnTarget(null)}
        title="Return this book?"
        description={`You're about to return "${typeof returnTarget?.book === "string" ? returnTarget?.book : returnTarget?.book?.title}". This cannot be undone.`}
        confirmLabel="Return book"
        onConfirm={handleReturn}
        loading={returning}
      />

      <ConfirmationDialog
        open={!!renewTarget}
        onOpenChange={(open: boolean) => !open && setRenewTarget(null)}
        title="Renew this borrow?"
        description={`Extend the due date for "${typeof renewTarget?.book === "string" ? renewTarget?.book : renewTarget?.book?.title}" by 14 days.`}
        confirmLabel="Renew"
        onConfirm={handleRenew}
        loading={renewing}
      />
    </div>
  );
}
