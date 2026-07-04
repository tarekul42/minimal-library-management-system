import { useState, useMemo } from "react";
import { useGetBooksQuery, useDeleteBookMutation } from "@/redux/api/bookApi";
import { useGetAuthorsQuery } from "@/redux/api/authorApi";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { DataTable } from "@/components/tables/DataTable";
import type { Column } from "@/components/tables/types";
import { ConfirmationDialog } from "@/components/feedback/ConfirmationDialog";
import { CreateBookModal } from "./CreateBookModal";
import { EditBookModal } from "./EditBookModal";
import { BookViewModal } from "./BookViewModal";
import { GENRE_LABELS, GENRE_OPTIONS } from "@/config/constants";
import { getAuthorName } from "@/lib/utils";
import { toast } from "sonner";
import type { IBook } from "@/types/book";
import { Seo } from "@/components/Seo";

export default function ManageBooks() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<string | null>(null);
  const [viewTarget, setViewTarget] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IBook | null>(null);

  const params = useMemo(() => {
    const p: Record<string, unknown> = { page, limit: 10 };
    if (search) p.search = search;
    if (genre !== "all") p.genre = genre;
    if (availability !== "all") p.available = availability === "available";
    return p;
  }, [page, search, genre, availability]);

  const { data, isLoading, isError, refetch } = useGetBooksQuery(params);
  const { data: authorsData, isError: authorsError } = useGetAuthorsQuery();
  const [deleteBook, { isLoading: deleting }] = useDeleteBookMutation();

  const books = data?.data ?? [];
  const meta = data?.meta;

  const columns: Column<IBook>[] = useMemo(() => [
    {
      key: "title",
      header: "Book",
      render: (b) => (
        <div className="flex items-center gap-3">
          <img src={b.coverImage || "/images/book-placeholder.svg"} alt={b.title} loading="lazy" className="h-12 w-9 rounded object-cover" />
          <div>
            <p className="font-medium">{b.title}</p>
            <p className="text-xs text-muted-foreground">{getAuthorName(b.author)}</p>
          </div>
        </div>
      ),
    },
    { key: "genre", header: "Genre", render: (b) => <Badge variant="outline">{GENRE_LABELS[b.genre]}</Badge> },
    { key: "copies", header: "Copies", render: (b) => <span className="font-mono">{b.availableCopies}/{b.copies}</span> },
    { key: "avgRating", header: "Rating", render: (b) => <span>{b.avgRating.toFixed(1)} ({b.reviewCount})</span> },
    {
      key: "status", header: "Status", render: (b) => b.available
        ? <Badge className="bg-secondary text-secondary-foreground">Available</Badge>
        : <Badge variant="destructive">Unavailable</Badge>,
    },
    {
      key: "actions", header: "Actions", align: "right", render: (b) => (
        <div className="inline-flex gap-1">
          <Button size="icon" variant="ghost" onClick={() => setViewTarget(b._id)} aria-label={`View ${b.title}`}><Eye className="h-4 w-4" /></Button>
          <Button size="icon" variant="ghost" onClick={() => setEditTarget(b._id)} aria-label={`Edit ${b.title}`}><Pencil className="h-4 w-4" /></Button>
          <Button size="icon" variant="ghost" className="text-destructive" onClick={() => setDeleteTarget(b)} aria-label={`Delete ${b.title}`}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ], []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteBook(deleteTarget._id).unwrap();
      toast.success("Book deleted");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete book");
    }
  };

  return (
    <>
    <Seo title="Manage Books" description="Add, edit, and manage the library book catalog." />
    <div className="space-y-6">
      <PageHeader
        title="Manage Books"
        description="Create, edit, and remove books from the catalog."
        actions={<Button onClick={() => setCreateOpen(true)}><Plus className="mr-2 h-4 w-4" /> Add Book</Button>}
      />
      <DataTable
        data={books}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        searchPlaceholder="Search by title, author, ISBN..."
        filters={[
          { label: "Genre", value: genre, options: [{ value: "all", label: "All genres" }, ...GENRE_OPTIONS.map((g) => ({ value: g.value, label: g.label }))], onChange: (v) => { setGenre(v); setPage(1); } },
          { label: "Availability", value: availability, options: [{ value: "all", label: "All" }, { value: "available", label: "Available" }, { value: "unavailable", label: "Unavailable" }], onChange: (v) => { setAvailability(v); setPage(1); } },
        ]}
        page={page}
        totalPages={meta?.totalPages ?? 1}
        onPageChange={setPage}
        total={meta?.total ?? 0}
        getRowId={(b) => b._id}
      />

      {authorsError && <p className="text-xs text-destructive -mt-4">Could not load authors. Create and edit book forms will have an empty author list.</p>}
      <CreateBookModal open={createOpen} onOpenChange={setCreateOpen} authors={authorsData?.data ?? []} />
      {editTarget && <EditBookModal open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)} bookId={editTarget} authors={authorsData?.data ?? []} />}
      {viewTarget && <BookViewModal open={!!viewTarget} onOpenChange={(o) => !o && setViewTarget(null)} bookId={viewTarget} />}

      <ConfirmationDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Delete this book?"
        description={`"${deleteTarget?.title}" will be permanently removed from the catalog. This action cannot be undone.`}
        confirmLabel="Delete book"
        destructive
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
    </>
  );
}
