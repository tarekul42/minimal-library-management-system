import { useState, useMemo } from "react";
import { useGetAllBorrowsQuery, useReturnBookMutation } from "@/redux/api/borrowApi";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { DataTable } from "@/components/tables/DataTable";
import type { Column } from "@/components/tables/types";
import { ConfirmationDialog } from "@/components/feedback/ConfirmationDialog";
import { toast } from "sonner";
import { getApiError } from "@/lib/utils";
import type { IBorrow } from "@/types/borrow";
import { Seo } from "@/components/Seo";

export default function ManageBorrows() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch } = useGetAllBorrowsQuery();
  const [returnBook, { isLoading: returning }] = useReturnBookMutation();

  const [returnTarget, setReturnTarget] = useState<IBorrow | null>(null);

  const borrows = useMemo(() => {
    const all = data?.data ?? [];
    return all.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const userName = typeof b.user === "string" ? b.user : b.user?.name ?? "";
        const bookTitle = typeof b.book === "string" ? b.book : b.book?.title ?? "";
        if (!userName.toLowerCase().includes(q) && !bookTitle.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [data, statusFilter, search]);

  const handleReturn = async () => {
    if (!returnTarget) return;
    try {
      await returnBook(returnTarget._id).unwrap();
      toast.success("Book marked as returned");
      setReturnTarget(null);
    } catch (err) {
      toast.error(getApiError(err, "Failed to return book"));
    }
  };

  const columns: Column<IBorrow>[] = useMemo(() => [
    { key: "user", header: "User", render: (b) => <span className="font-medium">{typeof b.user === "string" ? b.user : b.user?.name}</span> },
    { key: "book", header: "Book", render: (b) => <span>{typeof b.book === "string" ? b.book : b.book?.title}</span> },
    { key: "borrowedAt", header: "Borrowed", render: (b) => <span className="text-muted-foreground">{new Date(b.borrowedAt).toLocaleDateString()}</span> },
    { key: "dueDate", header: "Due", render: (b) => {
      const due = new Date(b.dueDate);
      const isOverdue = due < new Date() && b.status !== "returned";
      return <span className={isOverdue ? "text-destructive font-medium" : "text-muted-foreground"}>{due.toLocaleDateString()}</span>;
    }},
    { key: "returnedAt", header: "Returned", render: (b) => <span className="text-muted-foreground">{b.returnedAt ? new Date(b.returnedAt).toLocaleDateString() : "—"}</span> },
    {
      key: "status", header: "Status", render: (b) => {
        const map: Record<string, "outline" | "secondary" | "destructive"> = { active: "outline", returned: "secondary", overdue: "destructive" };
        return <Badge variant={map[b.status] ?? "outline"} className="capitalize">{b.status}</Badge>;
      },
    },
    {
      key: "actions", header: "Actions", align: "right", render: (b) => (
        b.status === "active" || b.status === "overdue"
          ? <Button size="sm" variant="outline" onClick={() => setReturnTarget(b)}><CheckCircle className="mr-1 h-3 w-3" /> Mark returned</Button>
          : <span className="text-sm text-muted-foreground">—</span>
      ),
    },
  ], []);

  return (
    <>
    <Seo title="Manage Borrows" description="View and manage all book borrows across users." />
    <div className="space-y-6">
      <PageHeader title="Manage Borrows" description="View and manage all book borrows across users." />
      <DataTable
        data={borrows}
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
            { value: "active", label: "Active" },
            { value: "returned", label: "Returned" },
            { value: "overdue", label: "Overdue" },
          ], onChange: setStatusFilter },
        ]}
        getRowId={(b) => b._id}
      />

      <ConfirmationDialog
        open={!!returnTarget}
        onOpenChange={(open: boolean) => !open && setReturnTarget(null)}
        title="Mark as returned?"
        description={`Return "${typeof returnTarget?.book === "string" ? returnTarget?.book : returnTarget?.book?.title}" borrowed by "${typeof returnTarget?.user === "string" ? returnTarget?.user : returnTarget?.user?.name}"?`}
        confirmLabel="Confirm return"
        onConfirm={handleReturn}
        loading={returning}
      />
    </div>
    </>
  );
}
