import { type ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  sortKey?: string;
  render: (row: T) => ReactNode;
  className?: string;
}

export interface FilterConfig {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}
