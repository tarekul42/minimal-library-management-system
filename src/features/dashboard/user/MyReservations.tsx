import { useState } from "react";
import { useGetMyReservationsQuery, useCancelReservationMutation } from "@/redux/api/reservationApi";
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
import type { IReservation } from "@/types/reservation";
import { BookX } from "lucide-react";
import { Seo } from "@/components/Seo";

export default function MyReservations() {
  const [cancelTarget, setCancelTarget] = useState<IReservation | null>(null);
  const { data, isLoading, isError, refetch } = useGetMyReservationsQuery();
  const [cancelReservation, { isLoading: cancelling }] = useCancelReservationMutation();

  const reservations: IReservation[] = data?.data ?? [];

  const handleCancel = async () => {
    if (!cancelTarget) return;
    try {
      await cancelReservation(cancelTarget._id).unwrap();
      toast.success("Reservation cancelled");
      setCancelTarget(null);
    } catch (err) {
      toast.error(getApiError(err, "Failed to cancel reservation"));
    }
  };

  const statusVariant = (status: string) => {
    if (status === "waiting") return "outline" as const;
    if (status === "fulfilled") return "secondary" as const;
    return "destructive" as const;
  };

  if (isLoading) return <div className="space-y-4"><PageHeader title="My Reservations" /><TableSkeleton /></div>;
  if (isError) return <ErrorState message="Failed to load reservations" onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <Seo title="My Reservations" description="Manage your book reservations." />
      <PageHeader title="My Reservations" description="Books you've reserved and their status." />

      {reservations.length === 0 ? (
        <EmptyState icon={BookX} title="No reservations" description="When you reserve a book, it'll appear here." action={<Button asChild><a href="/books">Browse books</a></Button>} />
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Book</th>
                  <th className="px-4 py-3 text-left font-medium">Reserved</th>
                  <th className="px-4 py-3 text-left font-medium">Queue</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {reservations.map((r) => (
                  <tr key={r._id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{r.book?.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.queuePosition ?? "-"}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(r.status)} className="capitalize">{r.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {r.status === "waiting" && (
                        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => setCancelTarget(r)}>Cancel</Button>
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
        open={!!cancelTarget}
        onOpenChange={(o) => !o && setCancelTarget(null)}
        title="Cancel reservation?"
        description={`You're about to cancel your reservation for "${cancelTarget?.book?.title}". Your place in the queue will be lost.`}
        confirmLabel="Cancel reservation"
        destructive
        onConfirm={handleCancel}
        loading={cancelling}
      />
    </div>
  );
}
