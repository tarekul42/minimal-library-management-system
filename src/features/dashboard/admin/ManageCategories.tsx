import { useState } from "react";
import { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from "@/redux/api/categoryApi";
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
import type { ICategory } from "@/types/category";
import { Seo } from "@/components/Seo";

export default function ManageCategories() {
  const { data, isLoading, isError, refetch } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ICategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ICategory | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const categories = data?.data ?? [];

  const resetForm = () => { setName(""); setDescription(""); };

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      await createCategory({ name: name.trim(), description: description.trim() || undefined }).unwrap();
      toast.success("Category created");
      setCreateOpen(false);
      resetForm();
    } catch (err) {
      toast.error(getApiError(err, "Failed to create category"));
    }
  };

  const handleEdit = async () => {
    if (!editTarget || !name.trim()) return;
    try {
      await updateCategory({ id: editTarget._id, body: { name: name.trim(), description: description.trim() || undefined } }).unwrap();
      toast.success("Category updated");
      setEditTarget(null);
      resetForm();
    } catch (err) {
      toast.error(getApiError(err, "Failed to update category"));
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteCategory(deleteTarget._id).unwrap();
      toast.success("Category deleted");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(getApiError(err, "Failed to delete category"));
    }
  };

  const openEdit = (cat: ICategory) => {
    setName(cat.name);
    setDescription(cat.description ?? "");
    setEditTarget(cat);
  };

  const columns: Column<ICategory>[] = [
    { key: "name", header: "Name", render: (c) => <span className="font-medium">{c.name}</span> },
    { key: "description", header: "Description", render: (c) => <span className="text-muted-foreground line-clamp-1">{c.description ?? "—"}</span> },
    { key: "slug", header: "Slug", render: (c) => <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{c.slug}</code> },
    {
      key: "actions", header: "Actions", align: "right", render: (c) => (
        <div className="inline-flex gap-1">
          <Button size="icon" variant="ghost" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
          <Button size="icon" variant="ghost" className="text-destructive" onClick={() => setDeleteTarget(c)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <>
    <Seo title="Manage Categories" description="Organize books by categories and genres." />
    <div className="space-y-6">
      <PageHeader
        title="Manage Categories"
        description="Organize books by category."
        actions={<Button onClick={() => { resetForm(); setCreateOpen(true); }}><Plus className="mr-2 h-4 w-4" /> Add Category</Button>}
      />
      <DataTable
        data={categories}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        getRowId={(c) => c._id}
        searchPlaceholder="Search categories..."
      />

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Category</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Category</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTarget(null)}>Cancel</Button>
            <Button onClick={handleEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Delete this category?"
        description={`"${deleteTarget?.name}" will be permanently removed. This action cannot be undone.`}
        confirmLabel="Delete category"
        destructive
        onConfirm={handleDelete}
      />
    </div>
    </>
  );
}
