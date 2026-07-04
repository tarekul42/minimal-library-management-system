import { useState, type ChangeEvent } from "react";
import { TextField, TextAreaField, SelectField, FileUploadField, SubmitButton } from "@/components/forms";
import { bookFormFields } from "@/config/formFields";
import { useAppSelector } from "@/redux/hook";
import type { IBookFormProps, IFormFieldConfig } from "@/types/form";
import { toast } from "sonner";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const UPLOAD_FIELD_NAME = "file";

const getOptions = (
  field: IFormFieldConfig,
  authorOptions?: { value: string; label: string }[],
) => {
  if (field.name === "author" && authorOptions) return authorOptions;
  return field.options;
};

export const BookForm = ({
  form,
  onSubmit,
  isLoading,
  submitButtonText,
  authorOptions,
}: IBookFormProps) => {
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

  const handleFormSubmit = (data: import("@/schema/bookSchema").BookFormData) => {
    const sanitized = Object.fromEntries(
      Object.entries(data).map(([key, val]) => [key, val === "" ? undefined : val])
    ) as import("@/schema/bookSchema").BookFormData;
    onSubmit(sanitized);
  };

  const token = useAppSelector((s) => s.auth.accessToken);

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append(UPLOAD_FIELD_NAME, file);
    try {
      setUploading(true);
      const res = await fetch(`${VITE_API_URL}/uploads`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.data?.url) {
        toast.success("Image uploaded");
        return json.data.url;
      }
      toast.error(json.message || "Upload failed");
      return null;
    } catch {
      toast.error("Upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadFile(file);
      if (url) setValue("coverImage", url);
    }
  };

  const renderField = (field: IFormFieldConfig) => {
    const { name, label, placeholder, type, min } = field;
    const options = getOptions(field, authorOptions);
    const error = errors[name]?.message;

    switch (type) {
      case "select":
        return (
          <SelectField
            key={name}
            label={label}
            value={String(watch(name) ?? "")}
            onValueChange={(val) => setValue(name, val, { shouldValidate: true })}
            options={options ?? []}
            error={error}
            placeholder={placeholder ?? `Select a ${label.toLowerCase()}`}
          />
        );
      case "textarea":
        return (
          <TextAreaField
            key={name}
            label={label}
            placeholder={placeholder}
            error={error}
            {...register(name)}
          />
        );
      case "file":
        return (
          <FileUploadField
            key={name}
            label={label}
            value={String(watch(name) ?? "")}
            onChange={handleFileChange}
            error={error}
          />
        );
      default:
        return (
          <TextField
            key={name}
            label={label}
            type={type}
            placeholder={placeholder}
            min={min}
            error={error}
            {...register(name, type === "number" && name !== "copies"
              ? { setValueAs: (v: string) => v === "" ? undefined : Number(v) }
              : type === "number"
                ? { valueAsNumber: true }
                : undefined
            )}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {bookFormFields.map(renderField)}
      <SubmitButton label={submitButtonText} isSubmitting={isLoading || uploading} className="w-full" />
    </form>
  );
};
