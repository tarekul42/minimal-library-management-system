import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "./AuthLayout";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/feedback/Loader";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof schema>;

const DEMO_CREDS = { email: "demo@library.com", password: "demo1234" };

export default function Login() {
  const { login } = useAuth();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: FormData) => {
    await login(values);
  };

  const fillDemo = () => {
    form.setValue("email", DEMO_CREDS.email);
    form.setValue("password", DEMO_CREDS.password);
    toast.info("Demo credentials filled. Click Sign in to continue.");
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to manage your borrows, reservations, and wishlist."
      footer={<>Don&rsquo;t have an account? <Link to="/register" className="text-primary hover:underline font-medium">Sign up</Link></>}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" {...form.register("email")} aria-invalid={!!form.formState.errors.email} />
          {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
          </div>
          <Input id="password" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" autoComplete="current-password" {...form.register("password")} aria-invalid={!!form.formState.errors.password} />
          {form.formState.errors.password && <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Loader label="Signing in..." /> : "Sign in"}
        </Button>
      </form>

      <div className="mt-4">
        <Button type="button" variant="outline" className="w-full" onClick={fillDemo}>
          Fill demo credentials
        </Button>
      </div>

      <div className="mt-6"><SocialLoginButtons /></div>
    </AuthLayout>
  );
}
