import { useGetDashboardStatsQuery, useGetPopularBooksQuery, useGetBorrowTrendsQuery, useGetGenreDistributionQuery } from "@/redux/api/dashboardApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { DashboardSkeleton } from "@/components/ui/dashboard-skeleton";
import { ErrorRetry } from "@/components/ui/error-retry";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { BookOpen, Users, BookMarked, AlertTriangle, DollarSign } from "lucide-react";
import type { IDashboardStats } from "@/types/dashboard";
import { useMemo } from "react";
import { useTheme } from "next-themes";
import { chartColors, tooltipStyle } from "@/lib/chart-utils";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const statCards: { key: keyof IDashboardStats; label: string; icon: typeof BookOpen; color: string; prefix?: string }[] = [
  { key: "totalBooks", label: "Books", icon: BookOpen, color: "text-blue-400" },
  { key: "totalUsers", label: "Members", icon: Users, color: "text-green-400" },
  { key: "activeBorrows", label: "Active Borrows", icon: BookMarked, color: "text-amber-400" },
  { key: "overdueBorrows", label: "Overdue", icon: AlertTriangle, color: "text-red-400" },
  { key: "unpaidFines", label: "Unpaid Fines", icon: DollarSign, color: "text-purple-400", prefix: "$" },
];

const Dashboard = () => {
  const { data: statsData, isLoading: statsLoading, isError: statsError, refetch: refetchStats } = useGetDashboardStatsQuery();
  const { data: popularData, isLoading: popularLoading, isError: popularError, refetch: refetchPopular } = useGetPopularBooksQuery();
  const { data: trendsData, isLoading: trendsLoading, isError: trendsError, refetch: refetchTrends } = useGetBorrowTrendsQuery();
  const { data: genreData, isLoading: genreLoading, isError: genreError, refetch: refetchGenre } = useGetGenreDistributionQuery();
  const { resolvedTheme } = useTheme();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chartVars = useMemo(() => chartColors(), [resolvedTheme]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tooltipStyles = useMemo(() => tooltipStyle(), [resolvedTheme]);

  const stats = statsData?.data;

  const chartData = useMemo(() => (popularData?.data || []).map((b) => ({
    title: b.title.length > 20 ? b.title.slice(0, 20) + "..." : b.title,
    borrows: b.borrowCount,
  })), [popularData]);

  const trendChartData = useMemo(() => (trendsData?.data || []).map((t) => ({
    month: `${MONTHS[t.month - 1]} ${t.year}`,
    borrows: t.count,
  })), [trendsData]);

  const genreChartData = useMemo(() => (genreData?.data || []).map((g, i) => ({
    name: g.genre,
    value: g.count,
    fill: [chartVars.chart1, chartVars.chart2, chartVars.chart3, chartVars.chart4, chartVars.chart5, chartVars.chart1, chartVars.chart2, chartVars.chart3][i % 8],
  })), [genreData, chartVars]);

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {statsLoading ? (
        <DashboardSkeleton />
      ) : statsError ? (
        <ErrorRetry message="Failed to load dashboard stats" onRetry={refetchStats} />
      ) : stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {statCards.map((s) => (
            <Card key={s.key} className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                  {s.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {s.prefix}{s.prefix ? stats[s.key]?.toFixed(2) : stats[s.key] ?? 0}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800 p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg">Popular Books</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            {popularLoading ? (
              <div className="h-[300px] flex items-center justify-center"><Spinner size={24} /></div>
            ) : popularError ? (
              <ErrorRetry message="Failed to load popular books" onRetry={refetchPopular} />
            ) : chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ left: -10 }} role="img" aria-label="Popular books bar chart">
                  <XAxis dataKey="title" tick={{ fill: chartVars.muted, fontSize: 12 }} />
                  <YAxis tick={{ fill: chartVars.muted }} />
                  <Tooltip contentStyle={tooltipStyles} />
                  <Bar dataKey="borrows" fill={chartVars.chart1} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-sm">No borrow data yet.</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg">Borrow Trends (12 Months)</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            {trendsLoading ? (
              <div className="h-[300px] flex items-center justify-center"><Spinner size={24} /></div>
            ) : trendsError ? (
              <ErrorRetry message="Failed to load trends" onRetry={refetchTrends} />
            ) : trendChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendChartData} margin={{ left: -10 }} role="img" aria-label="Borrow trends line chart">
                  <XAxis dataKey="month" tick={{ fill: chartVars.muted, fontSize: 11 }} />
                  <YAxis tick={{ fill: chartVars.muted }} />
                  <Tooltip contentStyle={tooltipStyles} />
                  <Line type="monotone" dataKey="borrows" stroke={chartVars.chart1} strokeWidth={2} dot={{ fill: chartVars.chart1 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-sm">No trend data yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800 p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg">Genre Distribution</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0 flex justify-center">
            {genreLoading ? (
              <div className="h-[300px] flex items-center justify-center"><Spinner size={24} /></div>
            ) : genreError ? (
              <ErrorRetry message="Failed to load genre distribution" onRetry={refetchGenre} />
            ) : genreChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart role="img" aria-label="Genre distribution pie chart">
                  <Pie data={genreChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                    {genreChartData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyles} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-sm">No books yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
