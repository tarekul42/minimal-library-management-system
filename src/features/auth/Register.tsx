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

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[0-9]/, "Include at least one number"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });

type FormData = z.infer<typeof schema>;

export default function Register() {
  const { register: registerUser } = useAuth();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: FormData) => {
    const { confirmPassword, ...payload } = values;
    void confirmPassword;
    await registerUser(payload);
  };

  return (
    <AuthLayout
      title="Create your account"
      description="Free membership. Instant access to 10,000+ books."
      footer={<>Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link></>}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Jane Doe" autoComplete="name" {...form.register("name")} aria-invalid={!!form.formState.errors.name} />
          {form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" {...form.register("email")} aria-invalid={!!form.formState.errors.email} />
          {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="new-password" {...form.register("password")} aria-invalid={!!form.formState.errors.password} />
          {form.formState.errors.password && <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>}
          <p className="text-xs text-muted-foreground">At least 8 characters with one uppercase letter and one number.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="confirmPassword" type="password" autoComplete="new-password" {...form.register("confirmPassword")} aria-invalid={!!form.formState.errors.confirmPassword} />
          {form.formState.errors.confirmPassword && <p className="text-xs text-destructive">{form.formState.errors.confirmPassword.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Loader label="Creating account..." /> : "Create account"}
        </Button>
      </form>
      <div className="mt-6"><SocialLoginButtons /></div>
    </AuthLayout>
  );
}
