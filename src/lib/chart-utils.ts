export function readCssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function chartColors() {
  return {
    primary: readCssVar("--primary"),
    secondary: readCssVar("--secondary"),
    accent: readCssVar("--accent"),
    chart1: readCssVar("--chart-1"),
    chart2: readCssVar("--chart-2"),
    chart3: readCssVar("--chart-3"),
    chart4: readCssVar("--chart-4"),
    chart5: readCssVar("--chart-5"),
    muted: readCssVar("--muted-foreground"),
    border: readCssVar("--border"),
    popover: readCssVar("--popover"),
    popoverForeground: readCssVar("--popover-foreground"),
  };
}

export const CHART_COLORS = ["chart1", "chart2", "chart3", "chart4", "chart5"] as const;

export const tooltipStyle = (): React.CSSProperties => {
  const c = chartColors();
  return {
    backgroundColor: c.popover,
    border: `1px solid ${c.border}`,
    borderRadius: "8px",
    color: c.popoverForeground,
  };
};
