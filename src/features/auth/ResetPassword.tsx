import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "./AuthLayout";
import { Loader } from "@/components/feedback/Loader";
import { getApiError } from "@/lib/utils";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/redux/api/authApi";

const schema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[0-9]/, "Include at least one number"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });

type FormData = z.infer<typeof schema>;

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [done, setDone] = useState(false);
  const [resetPassword] = useResetPasswordMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: FormData) => {
    if (!token) {
      toast.error("Missing reset token. Please request a new reset link.");
      return;
    }
    try {
      await resetPassword({ token, password: values.password }).unwrap();
      setDone(true);
    } catch (err: unknown) {
      const message = getApiError(err, "Reset failed");
      if (message.includes("404") || message.includes("not found") || message.includes("Not Found")) {
        toast.error("Password reset is not yet available on the server.");
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your new password below."
      footer={<>Back to <Link to="/login" className="text-primary hover:underline font-medium">sign in</Link></>}
    >
      {!token ? (
        <div className="space-y-4 text-center">
          <p className="text-destructive">Invalid or missing reset token.</p>
          <Button asChild variant="outline">
            <Link to="/forgot-password">Request new reset link</Link>
          </Button>
        </div>
      ) : done ? (
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground">Password has been reset successfully.</p>
          <Button asChild>
            <Link to="/login">Sign in with new password</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <Input id="password" type="password" autoComplete="new-password" {...form.register("password")} aria-invalid={!!form.formState.errors.password} />
            {form.formState.errors.password && <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>}
            <p className="text-xs text-muted-foreground">At least 8 characters with one uppercase letter and one number.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm new password</Label>
            <Input id="confirmPassword" type="password" autoComplete="new-password" {...form.register("confirmPassword")} aria-invalid={!!form.formState.errors.confirmPassword} />
            {form.formState.errors.confirmPassword && <p className="text-xs text-destructive">{form.formState.errors.confirmPassword.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader label="Resetting..." /> : "Reset password"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
