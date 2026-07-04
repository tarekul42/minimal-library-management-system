import { useGetDashboardStatsQuery, useGetBorrowTrendsQuery } from "@/redux/api/dashboardApi";
import { useGetMyBorrowsQuery } from "@/redux/api/borrowApi";
import { useGetWishlistQuery } from "@/redux/api/wishlistApi";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, Heart, AlertTriangle, Clock } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/feedback/ErrorState";
import { DashboardSkeleton } from "@/components/ui/dashboard-skeleton";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { chartColors, tooltipStyle } from "@/lib/chart-utils";
import type { IBorrow } from "@/types/borrow";
import { Seo } from "@/components/Seo";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function Overview() {
  const { resolvedTheme } = useTheme();
  const c = useMemo(() => chartColors(), [resolvedTheme]);
  const { data: statsData, isLoading: statsLoading, isError: statsError, refetch } = useGetDashboardStatsQuery();
  const { data: borrowsData } = useGetMyBorrowsQuery();
  const { data: wishlistData } = useGetWishlistQuery();
  const { data: trendsData } = useGetBorrowTrendsQuery();

  if (statsLoading) return <DashboardSkeleton />;
  if (statsError) return <ErrorState message="Failed to load dashboard" onRetry={refetch} />;

  const stats = statsData?.data;
  const recentBorrows: IBorrow[] = borrowsData?.data ?? [];
  const wishlistCount = wishlistData?.data?.length ?? 0;

  const trendData = (trendsData?.data ?? []).map((t) => ({ month: `${MONTHS[t.month - 1]} ${t.year}`, borrows: t.count }));

  return (
    <div className="space-y-8">
      <Seo title="Dashboard" description="Overview of your library activity." />
      <PageHeader title="Welcome back" description="Here's what's happening with your library account." />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active borrows" value={stats?.activeBorrows ?? 0} icon={BookMarked} iconColor="text-primary" />
        <StatCard label="Wishlist items" value={wishlistCount} icon={Heart} iconColor="text-accent" />
        <StatCard label="Overdue" value={stats?.overdueBorrows ?? 0} icon={AlertTriangle} iconColor="text-destructive" />
        <StatCard label="Unpaid fines" value={`$${(stats?.unpaidFines ?? 0).toFixed(2)}`} icon={Clock} iconColor="text-secondary" />
      </div>

      {/* Recent borrows */}
      <Card className="p-0">
        <CardHeader className="flex-row items-center justify-between p-6 pb-4">
          <CardTitle>Recent borrows</CardTitle>
          <Button asChild variant="ghost" size="sm"><Link to="/dashboard/my-borrows">View all</Link></Button>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {recentBorrows.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active borrows. <Link to="/books" className="text-primary hover:underline">Browse books</Link> to get started.</p>
          ) : (
            <ul className="divide-y divide-border">
              {recentBorrows.map((b) => (
                <li key={b._id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-sm">{typeof b.book === "string" ? b.book : b.book?.title}</p>
                    <p className="text-xs text-muted-foreground">Due {new Date(b.dueDate).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs rounded-full px-2 py-1 ${b.status === "overdue" ? "bg-destructive/10 text-destructive" : b.status === "returned" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>
                    {b.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Borrow trends chart */}
      <Card className="p-0">
        <CardHeader className="p-6 pb-4"><CardTitle>Your borrowing activity (12 months)</CardTitle></CardHeader>
        <CardContent className="p-6 pt-0">
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <XAxis dataKey="month" tick={{ fill: c.muted, fontSize: 11 }} />
                <YAxis tick={{ fill: c.muted }} />
                <Tooltip contentStyle={tooltipStyle()} />
                <Line type="monotone" dataKey="borrows" stroke={c.primary} strokeWidth={2} dot={{ fill: c.primary }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground">No activity yet this year.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
