import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { TextField, SubmitButton } from "@/components/forms";
import { AuthLayout } from "./AuthLayout";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Seo } from "@/components/Seo";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof schema>;

const DEMO_CREDS = import.meta.env.VITE_DEMO_CREDS ? JSON.parse(import.meta.env.VITE_DEMO_CREDS) : null;

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
    if (!DEMO_CREDS) return;
    form.setValue("email", DEMO_CREDS.email);
    form.setValue("password", DEMO_CREDS.password);
    toast.info("Demo credentials filled. Click Sign in to continue.");
  };

  return (
    <>
      <Seo title="Sign In" description="Sign in to manage your borrows, reservations, and wishlist." />
      <AuthLayout
        title="Welcome back"
        description="Sign in to manage your borrows, reservations, and wishlist."
        footer={<>Don&rsquo;t have an account? <Link to="/register" className="text-primary hover:underline font-medium">Sign up</Link></>}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextField label="Email" type="email" placeholder="you@example.com" autoComplete="email" error={form.formState.errors.email?.message} {...form.register("email")} />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              autoComplete="current-password"
              aria-invalid={!!form.formState.errors.password}
              {...form.register("password")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            {form.formState.errors.password && <p role="alert" className="text-xs text-destructive">{form.formState.errors.password.message}</p>}
          </div>
          <SubmitButton label="Sign in" isSubmitting={form.formState.isSubmitting} loadingLabel="Signing in..." className="w-full" />
        </form>

        {DEMO_CREDS && (
        <div className="mt-4">
          <Button type="button" variant="outline" className="w-full" onClick={fillDemo}>
            Fill demo credentials
          </Button>
        </div>
        )}

        <div className="mt-6"><SocialLoginButtons /></div>
      </AuthLayout>
    </>
  );
}
