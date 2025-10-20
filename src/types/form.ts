export interface IInput {
  name: string;
  label: string;
  defaultValue?: string;
}

export interface IFormFieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  type: string;
  options?: { value: string; label: string }[];
  min?: number;
}
