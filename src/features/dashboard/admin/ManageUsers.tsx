import { useState, useMemo, useCallback } from "react";
import { useGetAllUsersQuery, useAdminUpdateUserMutation } from "@/redux/api/userApi";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShieldCheck, UserCog } from "lucide-react";
import { DataTable } from "@/components/tables/DataTable";
import type { Column } from "@/components/tables/types";
import { ConfirmationDialog } from "@/components/feedback/ConfirmationDialog";
import { toast } from "sonner";
import { getApiError } from "@/lib/utils";
import type { IUser } from "@/types/auth";
import { Seo } from "@/components/Seo";

export default function ManageUsers() {
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch } = useGetAllUsersQuery({});
  const [adminUpdateUser, { isLoading: updating }] = useAdminUpdateUserMutation();

  const [toggleTarget, setToggleTarget] = useState<IUser | null>(null);

  const users = useMemo(() => {
    const all = data?.data ?? [];
    return all.filter((u) => {
      if (roleFilter !== "all" && u.role !== roleFilter) return false;
      if (statusFilter === "active" && !u.isActive) return false;
      if (statusFilter === "inactive" && u.isActive) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [data, roleFilter, statusFilter, search]);

  const handleToggleActive = async () => {
    if (!toggleTarget) return;
    try {
      await adminUpdateUser({ id: toggleTarget._id, body: { isActive: !toggleTarget.isActive } }).unwrap();
      toast.success(`User ${toggleTarget.isActive ? "deactivated" : "activated"}`);
      setToggleTarget(null);
    } catch (err) {
      toast.error(getApiError(err, "Failed to update user"));
    }
  };

  const handleRoleChange = useCallback(async (userId: string, role: string) => {
    try {
      await adminUpdateUser({ id: userId, body: { role: role as IUser["role"] } }).unwrap();
      toast.success("Role updated");
    } catch (err) {
      toast.error(getApiError(err, "Failed to update role"));
    }
  }, [adminUpdateUser]);

  const getInitials = (name: string) => name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

  const columns: Column<IUser>[] = useMemo(() => [
    {
      key: "name",
      header: "User",
      render: (u) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={u.avatar} alt={u.name} />
            <AvatarFallback className="text-xs bg-primary/10">{getInitials(u.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{u.name}</p>
            <p className="text-xs text-muted-foreground">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role", header: "Role", render: (u) => (
        <Select defaultValue={u.role} onValueChange={(v) => handleRoleChange(u._id, v)}>
          <SelectTrigger className="w-[130px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="librarian">Librarian</SelectItem>
            <SelectItem value="member">Member</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      key: "status", header: "Status", render: (u) => u.isActive
        ? <Badge variant="secondary" className="flex w-fit items-center gap-1"><ShieldCheck className="h-3 w-3" /> Active</Badge>
        : <Badge variant="destructive" className="flex w-fit items-center gap-1"><UserCog className="h-3 w-3" /> Inactive</Badge>,
    },
    {
      key: "actions", header: "Actions", align: "right", render: (u) => (
        <Button size="sm" variant="outline" onClick={() => setToggleTarget(u)}>
          {u.isActive ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
  ], [handleRoleChange]);

  return (
    <>
    <Seo title="Manage Users" description="Manage library user accounts and roles." />
    <div className="space-y-6">
      <PageHeader title="Manage Users" description="View and manage library members and staff." />
      <DataTable
        data={users}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name or email..."
        filters={[
          { label: "Role", value: roleFilter, options: [
            { value: "all", label: "All roles" },
            { value: "admin", label: "Admin" },
            { value: "librarian", label: "Librarian" },
            { value: "member", label: "Member" },
          ], onChange: setRoleFilter },
          { label: "Status", value: statusFilter, options: [
            { value: "all", label: "All" },
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ], onChange: setStatusFilter },
        ]}
        getRowId={(u) => u._id}
      />

      <ConfirmationDialog
        open={!!toggleTarget}
        onOpenChange={(open: boolean) => !open && setToggleTarget(null)}
        title={toggleTarget?.isActive ? "Deactivate this user?" : "Activate this user?"}
        description={toggleTarget?.isActive
          ? `"${toggleTarget.name}" will lose access to the system until reactivated.`
          : `"${toggleTarget?.name}" will regain access to the system.`}
        confirmLabel={toggleTarget?.isActive ? "Deactivate" : "Activate"}
        destructive={toggleTarget?.isActive}
        onConfirm={handleToggleActive}
        loading={updating}
      />
    </div>
    </>
  );
}
