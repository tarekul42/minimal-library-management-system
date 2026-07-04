import { useState } from "react";
import { Link } from "react-router";
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
import { useForgotPasswordMutation } from "@/redux/api/authApi";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});
type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: FormData) => {
    try {
      await forgotPassword(values).unwrap();
      setSent(true);
    } catch (err: unknown) {
      const message = getApiError(err, "Request failed");
      if (message.includes("404") || message.includes("not found") || message.includes("Not Found")) {
        setSent(true);
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <AuthLayout
      title="Forgot password"
      description="Enter your email and we'll send you a reset link."
      footer={<>Remember your password? <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link></>}
    >
      {sent ? (
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground">
            If an account with that email exists, a reset link has been sent.
          </p>
          <Button asChild variant="outline">
            <Link to="/login">Back to sign in</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" {...form.register("email")} aria-invalid={!!form.formState.errors.email} />
            {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader label="Sending..." /> : "Send reset link"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
