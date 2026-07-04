import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/schema/contactSchema";
import { TextField, TextAreaField, SubmitButton, FormRoot } from "@/components/forms";
import { useCreateContactMutation } from "@/redux/api/contactApi";
import { toast } from "sonner";
import { getApiError } from "@/lib/utils";

export function ContactForm() {
  const [submit, { isLoading, isSuccess }] = useCreateContactMutation();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: ContactFormData) => {
    try {
      await submit(values).unwrap();
      toast.success("Message sent! We'll get back to you within 2 business days.");
      form.reset();
    } catch (err) {
      toast.error(getApiError(err, "Failed to send message. Please try again."));
    }
  };

  return (
    <FormRoot onSubmit={form.handleSubmit(onSubmit)} isSubmitting={isLoading} isSuccess={isSuccess}>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Name" required error={form.formState.errors.name?.message} {...form.register("name")} />
        <TextField label="Email" type="email" required error={form.formState.errors.email?.message} {...form.register("email")} />
      </div>
      <TextField label="Subject" required error={form.formState.errors.subject?.message} {...form.register("subject")} />
      <TextAreaField label="Message" required rows={5} error={form.formState.errors.message?.message} {...form.register("message")} />
      <SubmitButton label="Send message" isSubmitting={isLoading} />
    </FormRoot>
  );
}
