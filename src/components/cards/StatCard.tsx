import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  delta?: number;
  deltaLabel?: string;
  prefix?: string;
  suffix?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  iconColor = "text-primary",
  delta,
  deltaLabel,
  prefix,
  suffix,
}: StatCardProps) {
  const isPositive = (delta ?? 0) >= 0;
  return (
    <Card className="p-0">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold tracking-tight">
            {prefix}
            {typeof value === "number" ? value.toLocaleString() : value}
            {suffix}
          </p>
          {delta !== undefined && (
            <p className="flex items-center gap-1 text-xs">
              {isPositive ? (
                <TrendingUp className="h-3 w-3 text-secondary" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={isPositive ? "text-secondary" : "text-destructive"}>
                {isPositive ? "+" : ""}
                {delta}%
              </span>
              {deltaLabel && <span className="text-muted-foreground">{deltaLabel}</span>}
            </p>
          )}
        </div>
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-full bg-primary/10", iconColor)}>
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
