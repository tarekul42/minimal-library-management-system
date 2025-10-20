import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

interface FormContainerProps {
  type: "card" | "dialog";
  title: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const FormContainer = ({
  type,
  title,
  children,
  open,
  onOpenChange,
  className = "w-full sm:w-5/6 md:w-3/4 lg:w-1/2",
}: FormContainerProps) => {
  const containerClass = `${className} mx-auto bg-gray-900 border-0 text-gray-300 p-6 sm:p-8 lg:p-10`;

  if (type === "dialog") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={`${className} max-h-[90vh] overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle className="text-gray-300">{title}</DialogTitle>
          </DialogHeader>
          <Card className="w-full mx-auto bg-gray-900 border-0 text-gray-300 py-0">
            {children}
          </Card>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Card className={containerClass}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      {children}
    </Card>
  );
};
