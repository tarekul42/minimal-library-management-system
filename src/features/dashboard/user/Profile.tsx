import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/redux/hook";
import { useUpdateUserMutation } from "@/redux/api/userApi";
import { profileSchema, type ProfileFormData } from "@/schema/profileSchema";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TextField, SubmitButton } from "@/components/forms";
import { Skeleton } from "@/components/ui/skeleton";
import { getApiError } from "@/lib/utils";
import { toast } from "sonner";
import { Camera } from "lucide-react";

export default function Profile() {
  const { user } = useAppSelector((s) => s.auth);
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? "", email: user?.email ?? "", phone: user?.phone ?? "", address: user?.address ?? "" },
  });

  const onProfileSubmit = async (values: ProfileFormData) => {
    try {
      await updateUser(values).unwrap();
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(getApiError(err, "Failed to update profile"));
    }
  };

  if (!user) {
    return (
      <div className="space-y-6">
        <PageHeader title="Profile" />
        <Card className="p-0"><CardContent className="p-6"><Skeleton className="h-48 w-full" /></CardContent></Card>
      </div>
    );
  }

  const initials = (user.name || "U").split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="space-y-8">
      <PageHeader title="Profile" description="Manage your personal information." />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr]">
        {/* Avatar card */}
        <Card className="p-0">
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="outline" className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center">
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          </CardContent>
        </Card>

        {/* Profile form */}
        <Card className="p-0">
          <CardHeader className="p-6 pb-4"><CardTitle>Personal Information</CardTitle></CardHeader>
          <CardContent className="p-6 pt-0">
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <TextField label="Full name" required error={profileForm.formState.errors.name?.message} {...profileForm.register("name")} />
              <TextField label="Email" type="email" required error={profileForm.formState.errors.email?.message} {...profileForm.register("email")} />
              <TextField label="Phone" type="tel" error={profileForm.formState.errors.phone?.message} {...profileForm.register("phone")} />
              <TextField label="Address" error={profileForm.formState.errors.address?.message} {...profileForm.register("address")} />
              <SubmitButton label="Save changes" isSubmitting={updating} loadingLabel="Saving..." />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
