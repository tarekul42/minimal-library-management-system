import { useState, useMemo } from "react";
import { useGetAllFinesQuery, usePayFineMutation } from "@/redux/api/finesApi";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { DataTable } from "@/components/tables/DataTable";
import type { Column } from "@/components/tables/types";
import { ConfirmationDialog } from "@/components/feedback/ConfirmationDialog";
import { toast } from "sonner";
import { getApiError } from "@/lib/utils";
import type { IFine } from "@/types/fine";

export default function ManageFines() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch } = useGetAllFinesQuery();
  const [payFine, { isLoading: paying }] = usePayFineMutation();

  const [payTarget, setPayTarget] = useState<IFine | null>(null);

  const fines = useMemo(() => {
    const all = data?.data ?? [];
    return all.filter((f) => {
      if (statusFilter === "paid" && !f.paid) return false;
      if (statusFilter === "unpaid" && f.paid) return false;
      if (search) {
        const q = search.toLowerCase();
        const userName = typeof f.user === "string" ? f.user : f.user?.name ?? "";
        const bookTitle = f.borrow?.book?.title ?? "";
        if (!userName.toLowerCase().includes(q) && !bookTitle.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [data, statusFilter, search]);

  const handlePay = async () => {
    if (!payTarget) return;
    try {
      await payFine(payTarget._id).unwrap();
      toast.success("Fine marked as paid");
      setPayTarget(null);
    } catch (err) {
      toast.error(getApiError(err, "Failed to process payment"));
    }
  };

  const columns: Column<IFine>[] = useMemo(() => [
    { key: "user", header: "User", render: (f) => <span className="font-medium">{typeof f.user === "string" ? f.user : f.user?.name}</span> },
    { key: "book", header: "Book", render: (f) => <span>{f.borrow?.book?.title ?? "—"}</span> },
    { key: "amount", header: "Amount", render: (f) => <span className="font-mono">${f.amount.toFixed(2)}</span> },
    { key: "reason", header: "Reason", render: (f) => <span className="text-muted-foreground line-clamp-1">{f.reason}</span> },
    { key: "createdAt", header: "Issued", render: (f) => <span className="text-muted-foreground">{new Date(f.createdAt).toLocaleDateString()}</span> },
    {
      key: "status", header: "Status", render: (f) => f.paid
        ? <Badge variant="secondary" className="flex w-fit items-center gap-1"><CheckCircle className="h-3 w-3" /> Paid</Badge>
        : <Badge variant="destructive" className="flex w-fit items-center gap-1"><XCircle className="h-3 w-3" /> Unpaid</Badge>,
    },
    {
      key: "actions", header: "Actions", align: "right", render: (f) => (
        !f.paid
          ? <Button size="sm" variant="outline" onClick={() => setPayTarget(f)}>Mark as paid</Button>
          : <span className="text-sm text-muted-foreground">—</span>
      ),
    },
  ], []);

  return (
    <div className="space-y-6">
      <PageHeader title="Manage Fines" description="View and manage library fines." />
      <DataTable
        data={fines}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by user or book..."
        filters={[
          { label: "Status", value: statusFilter, options: [
            { value: "all", label: "All" },
            { value: "paid", label: "Paid" },
            { value: "unpaid", label: "Unpaid" },
          ], onChange: setStatusFilter },
        ]}
        getRowId={(f) => f._id}
      />

      <ConfirmationDialog
        open={!!payTarget}
        onOpenChange={(o) => !o && setPayTarget(null)}
        title="Mark fine as paid?"
        description={`Mark $${payTarget?.amount.toFixed(2)} fine for "${typeof payTarget?.user === "string" ? payTarget?.user : payTarget?.user?.name}" as paid?`}
        confirmLabel="Confirm payment"
        onConfirm={handlePay}
        loading={paying}
      />
    </div>
  );
}
