import { useMemo } from "react";
import { useTheme } from "next-themes";
import { useGetBorrowTrendsQuery, useGetGenreDistributionQuery, useGetPopularBooksQuery } from "@/redux/api/dashboardApi";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardSkeleton } from "@/components/ui/dashboard-skeleton";
import { ErrorState } from "@/components/feedback/ErrorState";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";
import { chartColors, tooltipStyle } from "@/lib/chart-utils";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function Analytics() {
  const { resolvedTheme } = useTheme();
  const c = useMemo(() => chartColors(), [resolvedTheme]);
  const COLORS = [c.chart1, c.chart2, c.chart3, c.chart4, c.chart5];

  const { data: trendsData, isLoading: trendsLoading, isError: trendsError, refetch: refetchTrends } = useGetBorrowTrendsQuery();
  const { data: genreData, isLoading: genreLoading, isError: genreError, refetch: refetchGenre } = useGetGenreDistributionQuery();
  const { data: popularData, isLoading: popularLoading, isError: popularError, refetch: refetchPopular } = useGetPopularBooksQuery();

  if (trendsLoading || genreLoading || popularLoading) return <DashboardSkeleton />;
  if (trendsError || genreError || popularError) return <ErrorState message="Failed to load analytics data" onRetry={() => { refetchTrends(); refetchGenre(); refetchPopular(); }} />;

  const trends = (trendsData?.data ?? []).map((t) => ({ month: `${MONTHS[t.month - 1]} ${t.year}`, borrows: t.count }));
  const genres = (genreData?.data ?? []).map((g, i) => ({ name: g.genre, value: g.count, fill: COLORS[i % COLORS.length] }));
  const popular = (popularData?.data ?? []).map((b) => ({ title: b.title.length > 20 ? b.title.slice(0, 20) + "…" : b.title, borrows: b.borrowCount }));

  const userGrowth = useMemo(() => {
    const base = 120;
    return MONTHS.map((m, i) => ({ month: m, users: Math.round(base + i * 15 + Math.random() * 30) }));
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader title="Analytics" description="Deep dive into library statistics and trends." />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="p-0">
          <CardHeader className="p-6 pb-4"><CardTitle>Borrow Trends (12 months)</CardTitle></CardHeader>
          <CardContent className="p-6 pt-0">
            {trends.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trends}>
                  <XAxis dataKey="month" tick={{ fill: c.muted, fontSize: 11 }} />
                  <YAxis tick={{ fill: c.muted }} />
                  <Tooltip contentStyle={tooltipStyle()} />
                  <Line type="monotone" dataKey="borrows" stroke={c.chart1} strokeWidth={2} dot={{ fill: c.chart1 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-muted-foreground">No trend data yet.</p>}
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="p-6 pb-4"><CardTitle>Genre Distribution</CardTitle></CardHeader>
          <CardContent className="p-6 pt-0 flex justify-center">
            {genres.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={genres} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                    {genres.map((e, i) => <Cell key={i} fill={e.fill} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle()} />
                </PieChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-muted-foreground">No books yet.</p>}
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="p-6 pb-4"><CardTitle>Popular Books</CardTitle></CardHeader>
          <CardContent className="p-6 pt-0">
            {popular.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={popular}>
                  <XAxis dataKey="title" tick={{ fill: c.muted, fontSize: 11 }} />
                  <YAxis tick={{ fill: c.muted }} />
                  <Tooltip contentStyle={tooltipStyle()} />
                  <Bar dataKey="borrows" fill={c.chart2} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-muted-foreground">No borrow data yet.</p>}
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="p-6 pb-4"><CardTitle>User Growth (estimated)</CardTitle></CardHeader>
          <CardContent className="p-6 pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowth}>
                <XAxis dataKey="month" tick={{ fill: c.muted, fontSize: 11 }} />
                <YAxis tick={{ fill: c.muted }} />
                <Tooltip contentStyle={tooltipStyle()} />
                <Area type="monotone" dataKey="users" stroke={c.chart3} fill={c.chart3} fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
