import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { bookFormFields } from "@/config/formFields";
import { useAppSelector } from "@/redux/hook";
import type { IBookFormProps, IFormFieldConfig } from "@/types/form";
import type { BookFormData } from "@/schema/bookSchema";
import { toast } from "sonner";
import { Upload } from "lucide-react";

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

  const handleSubmit = (data: BookFormData) => {
    const sanitized = Object.fromEntries(
      Object.entries(data).map(([key, val]) => [key, val === "" ? undefined : val])
    ) as BookFormData;
    onSubmit(sanitized);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const renderFormField = (fieldConfig: IFormFieldConfig) => {
    const { name, label, placeholder, type, min } = fieldConfig;
    const options = getOptions(fieldConfig, authorOptions);

    return (
      <FormField
        key={name}
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {type === "file" ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      disabled={uploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await uploadFile(file);
                          if (url) field.onChange(url);
                        }
                      }}
                      className="flex-1"
                    />
                    {uploading && <Spinner size={20} />}
                  </div>
                  {field.value && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Upload className="h-3 w-3" />
                      <span className="truncate max-w-[300px]">{field.value as string}</span>
                    </div>
                  )}
                </div>
              ) : type === "select" ? (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value as string}
                  value={field.value as string}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={`Select a ${label.toLowerCase()}`}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options?.map(
                      (option: { value: string; label: string }) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              ) : type === "textarea" ? (
                <Textarea placeholder={placeholder} {...field} />
              ) : (
                <Input
                  type={type}
                  min={min}
                  placeholder={placeholder}
                  {...field}
                  onChange={(e) => {
                    if (type !== "number") { field.onChange(e.target.value); return; }
                    const val = e.target.value;
                    if (val === "") { field.onChange(""); return; }
                    const num = Number(val);
                    field.onChange(Number.isNaN(num) ? field.value : num);
                  }}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {bookFormFields.map(renderFormField)}

        <Button
          type="submit"
          disabled={isLoading || uploading}
          className="w-full text-foreground"
        >
          {isLoading ? "Processing..." : submitButtonText}
        </Button>
      </form>
    </Form>
  );
};
