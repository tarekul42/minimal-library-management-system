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

export const BookForm = ({
  form,
  onSubmit,
  isLoading,
  submitButtonText,
}: IBookFormProps) => {
  const renderFormField = (fieldConfig: IFormFieldConfig) => {
    const { name, label, placeholder, type, options, min } = fieldConfig;

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
                      )
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
                      ? field.onChange(Number(e.target.value))
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

        {/* Submit Button */}
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
