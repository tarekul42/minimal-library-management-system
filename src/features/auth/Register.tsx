import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, SubmitButton } from "@/components/forms";
import { AuthLayout } from "./AuthLayout";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { useAuth } from "@/hooks/useAuth";
import { Seo } from "@/components/Seo";

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
    <>
      <Seo title="Sign Up" description="Create an account to start borrowing books." />
      <AuthLayout
        title="Create your account"
        description="Free membership. Instant access to 10,000+ books."
        footer={<>Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link></>}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextField label="Full name" placeholder="Jane Doe" autoComplete="name" error={form.formState.errors.name?.message} {...form.register("name")} />
          <TextField label="Email" type="email" placeholder="you@example.com" autoComplete="email" error={form.formState.errors.email?.message} {...form.register("email")} />
          <TextField label="Password" type="password" autoComplete="new-password" error={form.formState.errors.password?.message} hint="At least 8 characters with one uppercase letter and one number." {...form.register("password")} />
          <TextField label="Confirm password" type="password" autoComplete="new-password" error={form.formState.errors.confirmPassword?.message} {...form.register("confirmPassword")} />
          <SubmitButton label="Create account" isSubmitting={form.formState.isSubmitting} loadingLabel="Creating account..." className="w-full" />
        </form>
        <div className="mt-6"><SocialLoginButtons /></div>
      </AuthLayout>
    </>
  );
}
