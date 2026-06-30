import { Navigate, Link } from "react-router";
import { useState } from "react";
import { useAppSelector } from "@/redux/hook";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/redux/api/categoryApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ErrorRetry } from "@/components/ui/error-retry";
import { toast } from "sonner";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { getApiError } from "@/lib/utils";
import type { ICategory } from "@/types/category";

const AdminCategories = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { data, isLoading, isError, refetch } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  const categories: ICategory[] = data?.data || [];

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      await createCategory({
        name: name.trim(),
        description: description.trim() || undefined,
      }).unwrap();
      toast.success("Category created");
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Failed to create category:", err);
      toast.error(getApiError(err, "Failed to create category"));
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted");
    } catch (err) {
      console.error("Failed to delete category:", err);
      toast.error(getApiError(err, "Failed to delete category"));
    }
  };

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Admin
      </Link>
      <h1 className="text-3xl mb-6">Manage Categories</h1>

      <div className="flex gap-2 mb-6 max-w-lg">
        <Input placeholder="Category name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button onClick={handleCreate} disabled={!name.trim()}>
          <Plus className="h-4 w-4 mr-2" /> Add
        </Button>
      </div>

      {isLoading ? (
        <TableSkeleton rows={3} cols={2} />
      ) : isError ? (
        <ErrorRetry message="Failed to load categories" onRetry={refetch} />
      ) : (
        <Table className="border max-w-lg">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat._id}>
                <TableCell>
                  <span className="font-medium">{cat.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">({cat.slug})</span>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(cat._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminCategories;
