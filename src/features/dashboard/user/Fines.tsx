import { useState } from "react";
import { useGetMyFinesQuery, usePayFineMutation } from "@/redux/api/finesApi";
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
import type { IFine } from "@/types/fine";
import { DollarSign } from "lucide-react";

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

  if (isLoading) return <div className="space-y-4"><PageHeader title="Fines" /><TableSkeleton /></div>;
  if (isError) return <ErrorState message="Failed to load fines" onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <PageHeader title="Fines" description={`Total unpaid: $${totalUnpaid.toFixed(2)}`} />

      {fines.length === 0 ? (
        <EmptyState icon={DollarSign} title="No fines" description="You have no fines on your account." />
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Book</th>
                  <th className="px-4 py-3 text-left font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">Reason</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {fines.map((f) => (
                  <tr key={f._id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{f.borrow?.book?.title}</td>
                    <td className="px-4 py-3 font-mono">${f.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{f.reason}</td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(f.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <Badge variant={f.paid ? "secondary" : "destructive"}>{f.paid ? "Paid" : "Unpaid"}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {!f.paid && (
                        <Button size="sm" onClick={() => setPayTarget(f)}>Pay now</Button>
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
