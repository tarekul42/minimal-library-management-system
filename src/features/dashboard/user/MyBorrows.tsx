import { useState } from "react";
import { useGetMyBorrowsQuery, useReturnBookMutation, useRenewBookMutation } from "@/redux/api/borrowApi";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ConfirmationDialog } from "@/components/feedback/ConfirmationDialog";
import { getApiError } from "@/lib/utils";
import { toast } from "sonner";
import type { IBorrow } from "@/types/borrow";
import { BookUp, RefreshCw } from "lucide-react";
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

  if (isLoading) return <div className="space-y-4"><PageHeader title="My Borrows" /><TableSkeleton /></div>;
  if (isError) return <ErrorState message="Failed to load borrows" onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <Seo title="My Borrows" description="Track your active and past loans." />
      <PageHeader title="My Borrows" description="Track your active and past loans." />

      {borrows.length === 0 ? (
        <EmptyState icon={BookUp} title="No borrows yet" description="When you borrow books, they'll appear here." action={<Button asChild><a href="/books">Browse books</a></Button>} />
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Book</th>
                  <th className="px-4 py-3 text-left font-medium">Borrowed</th>
                  <th className="px-4 py-3 text-left font-medium">Due</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {borrows.map((b) => (
                  <tr key={b._id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{typeof b.book === "string" ? b.book : b.book?.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(b.borrowedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(b.dueDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <Badge variant={b.status === "overdue" ? "destructive" : b.status === "returned" ? "secondary" : "outline"} className="capitalize">{b.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {b.status === "active" && (
                        <div className="inline-flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => setReturnTarget(b)}>Return</Button>
                          <Button size="sm" variant="ghost" onClick={() => setRenewTarget(b)}>
                            <RefreshCw className="mr-1 h-3 w-3" />
                            Renew
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <ConfirmationDialog
        open={!!returnTarget}
        onOpenChange={(o) => !o && setReturnTarget(null)}
        title="Return this book?"
        description={`You're about to return "${typeof returnTarget?.book === "string" ? returnTarget?.book : returnTarget?.book?.title}". This cannot be undone.`}
        confirmLabel="Return book"
        onConfirm={handleReturn}
        loading={returning}
      />

      <ConfirmationDialog
        open={!!renewTarget}
        onOpenChange={(o) => !o && setRenewTarget(null)}
        title="Renew this borrow?"
        description={`Extend the due date for "${typeof renewTarget?.book === "string" ? renewTarget?.book : renewTarget?.book?.title}" by 14 days.`}
        confirmLabel="Renew"
        onConfirm={handleRenew}
        loading={renewing}
      />
    </div>
  );
}
