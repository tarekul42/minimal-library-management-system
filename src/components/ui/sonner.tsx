import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

function ToasterInner(props: ToasterProps) {
  const { theme: resolvedTheme } = useTheme();
  const theme: ToasterProps["theme"] = (resolvedTheme as ToasterProps["theme"]) ?? "dark";

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

const Toaster = (props: ToasterProps) => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
    <ToasterInner {...props} />
  </ThemeProvider>
);

export { Toaster };
