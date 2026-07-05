import { useState, useMemo } from "react";
import { useGetMyFinesQuery, usePayFineMutation } from "@/redux/api/finesApi";
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
import type { IFine } from "@/types/fine";

import { Seo } from "@/components/Seo";

export default function Fines() {
  const [payTarget, setPayTarget] = useState<IFine | null>(null);
  const { data, isLoading, isError, refetch } = useGetMyFinesQuery();
  const [payFine, { isLoading: paying }] = usePayFineMutation();

  const fines: IFine[] = data?.data ?? [];
  const totalUnpaid = fines.filter((f) => !f.paid).reduce((sum, f) => sum + f.amount, 0);

  const handlePay = async () => {
    if (!payTarget) return;
    try {
      await payFine(payTarget._id).unwrap();
      toast.success("Fine paid successfully");
      setPayTarget(null);
    } catch (err) {
      toast.error(getApiError(err, "Failed to pay fine"));
    }
  };

  const columns: Column<IFine>[] = useMemo(() => [
    { key: "book", header: "Book", render: (f) => <span className="font-medium">{f.borrow?.book?.title}</span> },
    { key: "amount", header: "Amount", render: (f) => <span className="font-mono">${f.amount.toFixed(2)}</span> },
    { key: "reason", header: "Reason", render: (f) => <span className="text-muted-foreground">{f.reason}</span> },
    { key: "date", header: "Date", render: (f) => <span className="text-muted-foreground">{new Date(f.createdAt).toLocaleDateString()}</span> },
    {
      key: "status", header: "Status", render: (f) => (
        <Badge variant={f.paid ? "secondary" : "destructive"}>{f.paid ? "Paid" : "Unpaid"}</Badge>
      ),
    },
    {
      key: "actions", header: "Actions", align: "right", render: (f) => (
        !f.paid ? <Button size="sm" onClick={() => setPayTarget(f)}>Pay now</Button> : null
      ),
    },
  ], []);

  if (isLoading) return <div className="space-y-4"><PageHeader title="Fines" /><TableSkeleton /></div>;
  if (isError) return <ErrorState message="Failed to load fines" onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <Seo title="Fines" description="View and pay your library fines." />
      <PageHeader title="Fines" description={`Total unpaid: $${totalUnpaid.toFixed(2)}`} />

      <DataTable
        data={fines}
        columns={columns}
        emptyTitle="No fines"
        emptyDescription="You have no fines on your account."
        emptyAction={<Button asChild><a href="/books">Browse books</a></Button>}
        getRowId={(f) => f._id}
      />

      <ConfirmationDialog
        open={!!payTarget}
        onOpenChange={(o) => !o && setPayTarget(null)}
        title="Pay this fine?"
        description={`Pay $${payTarget?.amount.toFixed(2)} for "${payTarget?.borrow?.book?.title}"? This action cannot be undone.`}
        confirmLabel={`Pay $${payTarget?.amount.toFixed(2)}`}
        onConfirm={handlePay}
        loading={paying}
      />
    </div>
  );
}
