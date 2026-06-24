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
import { bookFormFields } from "@/config/formFields";
import type { IBookFormProps, IFormFieldConfig } from "@/types/form";

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
              {type === "select" ? (
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
                  onChange={(e) =>
                    type === "number"
                      ? field.onChange(e.target.value === "" ? "" : Number(e.target.value))
                      : field.onChange(e.target.value)
                  }
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {bookFormFields.map(renderFormField)}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full text-foreground"
        >
          {isLoading ? "Processing..." : submitButtonText}
        </Button>
      </form>
    </Form>
  );
};
