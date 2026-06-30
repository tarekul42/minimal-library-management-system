import { Navigate, Link } from "react-router";
import { useState } from "react";
import { useAppSelector } from "@/redux/hook";
import {
  useGetAuthorsQuery,
  useCreateAuthorMutation,
  useDeleteAuthorMutation,
} from "@/redux/api/authorApi";
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
import type { IAuthor } from "@/types/author";

const AdminAuthors = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const { data, isLoading, isError, refetch } = useGetAuthorsQuery();
  const [createAuthor] = useCreateAuthorMutation();
  const [deleteAuthor] = useDeleteAuthorMutation();

  if (!user || (user.role !== "admin" && user.role !== "librarian")) {
    return <Navigate to="/login" replace />;
  }
  const authors: IAuthor[] = data?.data || [];

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      await createAuthor({ name: name.trim(), bio: bio.trim() || undefined }).unwrap();
      toast.success("Author created");
      setName("");
      setBio("");
    } catch (err) {
      console.error("Failed to create author:", err);
      toast.error(getApiError(err, "Failed to create author"));
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this author?")) return;
    try {
      await deleteAuthor(id).unwrap();
      toast.success("Author deleted");
    } catch (err) {
      console.error("Failed to delete author:", err);
      toast.error(getApiError(err, "Failed to delete author"));
    }
  };

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Admin
      </Link>
      <h1 className="text-3xl mb-6">Manage Authors</h1>

      <div className="flex gap-2 mb-6 max-w-lg">
        <Input placeholder="Author name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Bio (optional)" value={bio} onChange={(e) => setBio(e.target.value)} />
        <Button onClick={handleCreate} disabled={!name.trim()}>
          <Plus className="h-4 w-4 mr-2" /> Add
        </Button>
      </div>

      {isLoading ? (
        <TableSkeleton rows={3} cols={2} />
      ) : isError ? (
        <ErrorRetry message="Failed to load authors" onRetry={refetch} />
      ) : (
        <Table className="border max-w-lg">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {authors.map((author) => (
              <TableRow key={author._id}>
                <TableCell>
                  <Link to={`/authors/${author._id}`} className="hover:underline">{author.name}</Link>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(author._id)}>
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

export default AdminAuthors;
