import { useState } from "react";
import { useGetAuthorsQuery, useCreateAuthorMutation, useUpdateAuthorMutation, useDeleteAuthorMutation } from "@/redux/api/authorApi";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DataTable } from "@/components/tables/DataTable";
import type { Column } from "@/components/tables/types";
import { ConfirmationDialog } from "@/components/feedback/ConfirmationDialog";
import { getApiError } from "@/lib/utils";
import { toast } from "sonner";
import type { IAuthor } from "@/types/author";
import { Seo } from "@/components/Seo";

export default function ManageAuthors() {
  const { data, isLoading, isError, refetch } = useGetAuthorsQuery();
  const [createAuthor, { isLoading: creating }] = useCreateAuthorMutation();
  const [updateAuthor, { isLoading: updating }] = useUpdateAuthorMutation();
  const [deleteAuthor, { isLoading: deleting }] = useDeleteAuthorMutation();

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<IAuthor | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IAuthor | null>(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [nameError, setNameError] = useState("");

  const authors = data?.data ?? [];

  const resetForm = () => { setName(""); setBio(""); setNameError(""); };

  const handleCreate = async () => {
    if (!name.trim()) { setNameError("Name is required"); return; }
    setNameError("");
    try {
      await createAuthor({ name: name.trim(), bio: bio.trim() || undefined }).unwrap();
      toast.success("Author created");
      setCreateOpen(false);
      resetForm();
    } catch (err) {
      toast.error(getApiError(err, "Failed to create author"));
    }
  };

  const handleEdit = async () => {
    if (!editTarget) return;
    if (!name.trim()) { setNameError("Name is required"); return; }
    setNameError("");
    try {
      await updateAuthor({ id: editTarget._id, body: { name: name.trim(), bio: bio.trim() || undefined } }).unwrap();
      toast.success("Author updated");
      setEditTarget(null);
      resetForm();
    } catch (err) {
      toast.error(getApiError(err, "Failed to update author"));
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAuthor(deleteTarget._id).unwrap();
      toast.success("Author deleted");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(getApiError(err, "Failed to delete author"));
    }
  };

  const openEdit = (author: IAuthor) => {
    setName(author.name);
    setBio(author.bio ?? "");
    setNameError("");
    setEditTarget(author);
  };

  const columns: Column<IAuthor>[] = [
    {
      key: "name",
      header: "Name",
      render: (a) => (
        <div className="flex items-center gap-3">
          {a.photo && <img src={a.photo} alt={a.name} loading="lazy" className="h-9 w-9 rounded-full object-cover" />}
          <span className="font-medium">{a.name}</span>
        </div>
      ),
    },
    { key: "bio", header: "Biography", render: (a) => <span className="text-muted-foreground line-clamp-1">{a.bio ?? "—"}</span> },
    { key: "createdAt", header: "Added", render: (a) => <span className="text-sm text-muted-foreground">{new Date(a.createdAt).toLocaleDateString()}</span> },
    {
      key: "actions", header: "Actions", align: "right", render: (a) => (
        <div className="inline-flex gap-1">
          <Button size="icon" variant="ghost" onClick={() => openEdit(a)} aria-label={`Edit ${a.name}`}><Pencil className="h-4 w-4" /></Button>
          <Button size="icon" variant="ghost" className="text-destructive" onClick={() => setDeleteTarget(a)} aria-label={`Delete ${a.name}`}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <>
    <Seo title="Manage Authors" description="Manage author profiles and information." />
    <div className="space-y-6">
      <PageHeader
        title="Manage Authors"
        description="Add, edit, and remove authors."
        actions={<Button onClick={() => { resetForm(); setCreateOpen(true); }}><Plus className="mr-2 h-4 w-4" /> Add Author</Button>}
      />
      <DataTable
        data={authors}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        getRowId={(a) => a._id}
        searchPlaceholder="Search authors..."
      />

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Author</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => { setName(e.target.value); setNameError(""); }} placeholder="Author name" aria-invalid={!!nameError} />
              {nameError && <p className="text-xs text-destructive">{nameError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Short biography" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={creating}>{creating ? "Creating..." : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Author</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input id="edit-name" value={name} onChange={(e) => { setName(e.target.value); setNameError(""); }} placeholder="Author name" aria-invalid={!!nameError} />
              {nameError && <p className="text-xs text-destructive">{nameError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-bio">Biography</Label>
              <Textarea id="edit-bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Short biography" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTarget(null)}>Cancel</Button>
            <Button onClick={handleEdit} disabled={updating}>{updating ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Delete this author?"
        description={`"${deleteTarget?.name}" will be permanently removed. This action cannot be undone.`}
        confirmLabel="Delete author"
        destructive
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
    </>
  );
}
