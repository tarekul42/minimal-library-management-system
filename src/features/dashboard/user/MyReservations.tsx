import { useState, useMemo } from "react";
import { useGetMyReservationsQuery, useCancelReservationMutation } from "@/redux/api/reservationApi";
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
import type { IReservation } from "@/types/reservation";

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

  const columns: Column<IReservation>[] = useMemo(() => [
    { key: "book", header: "Book", render: (r) => <span className="font-medium">{r.book?.title}</span> },
    { key: "reservedAt", header: "Reserved", render: (r) => <span className="text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()}</span> },
    { key: "queuePosition", header: "Queue", render: (r) => <span className="text-muted-foreground">{r.queuePosition ?? "-"}</span> },
    {
      key: "status", header: "Status", render: (r) => (
        <Badge variant={statusVariant(r.status)} className="capitalize">{r.status}</Badge>
      ),
    },
    {
      key: "actions", header: "Actions", align: "right", render: (r) => (
        r.status === "waiting" ? (
          <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => setCancelTarget(r)}>Cancel</Button>
        ) : null
      ),
    },
  ], []);

  if (isLoading) return <div className="space-y-4"><PageHeader title="My Reservations" /><TableSkeleton /></div>;
  if (isError) return <ErrorState message="Failed to load reservations" onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <Seo title="My Reservations" description="Manage your book reservations." />
      <PageHeader title="My Reservations" description="Books you've reserved and their status." />

      <DataTable
        data={reservations}
        columns={columns}
        emptyTitle="No reservations"
        emptyDescription="When you reserve a book, it'll appear here."
        emptyAction={<Button asChild><a href="/books">Browse books</a></Button>}
        getRowId={(r) => r._id}
      />

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
