import { useGetDashboardStatsQuery, useGetPopularBooksQuery, useGetBorrowTrendsQuery, useGetGenreDistributionQuery } from "@/redux/api/dashboardApi";
import { useGetAllBorrowsQuery } from "@/redux/api/borrowApi";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardSkeleton } from "@/components/ui/dashboard-skeleton";
import { ErrorState } from "@/components/feedback/ErrorState";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, BookMarked, AlertTriangle, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { chartColors, tooltipStyle } from "@/lib/chart-utils";
import { Seo } from "@/components/Seo";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function Overview() {
  const c = chartColors();
  const COLORS = [c.chart1, c.chart2, c.chart3, c.chart4, c.chart5];

  const { data: statsData, isLoading, isError, refetch } = useGetDashboardStatsQuery();
  const { data: popularData, isError: popularError } = useGetPopularBooksQuery();
  const { data: trendsData, isError: trendsError } = useGetBorrowTrendsQuery();
  const { data: genreData, isError: genreError } = useGetGenreDistributionQuery();
  const { data: recentBorrowsData, isError: recentError } = useGetAllBorrowsQuery();

  if (isLoading) return <DashboardSkeleton />;
  if (isError) return <ErrorState message="Failed to load dashboard" onRetry={refetch} />;

  const stats = statsData?.data;
  const popular = (popularData?.data ?? []).map((b) => ({ title: b.title.length > 20 ? b.title.slice(0, 20) + "…" : b.title, borrows: b.borrowCount }));
  const trends = (trendsData?.data ?? []).map((t) => ({ month: `${MONTHS[t.month - 1]} ${t.year}`, borrows: t.count }));
  const genres = (genreData?.data ?? []).map((g, i) => ({ name: g.genre, value: g.count, fill: COLORS[i % COLORS.length] }));
  const recentBorrows = (recentBorrowsData?.data ?? []).slice(0, 10);

  return (
    <>
    <Seo title="Admin Dashboard" description="Library administration overview and key metrics." />
    <div className="space-y-8">
      <PageHeader title="Admin Overview" description="Library-wide statistics and recent activity." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Total Books" value={stats?.totalBooks ?? 0} icon={BookOpen} iconColor="text-primary" />
        <StatCard label="Members" value={stats?.totalUsers ?? 0} icon={Users} iconColor="text-secondary" />
        <StatCard label="Active Borrows" value={stats?.activeBorrows ?? 0} icon={BookMarked} iconColor="text-accent" />
        <StatCard label="Overdue" value={stats?.overdueBorrows ?? 0} icon={AlertTriangle} iconColor="text-destructive" />
        <StatCard label="Unpaid Fines" value={`$${(stats?.unpaidFines ?? 0).toFixed(2)}`} icon={DollarSign} iconColor="text-primary" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="p-0">
          <CardHeader className="p-6 pb-4"><CardTitle>Popular Books</CardTitle></CardHeader>
          <CardContent className="p-6 pt-0">
            {popularError ? (
              <p className="text-sm text-destructive">Failed to load popular books.</p>
            ) : popular.length > 0 ? (
              <ResponsiveContainer width="100%" height={280} role="img" aria-label={`Bar chart showing popular books by borrow count: ${popular.map(b => `${b.title}: ${b.borrows} borrows`).join(", ")}`}>
                <BarChart data={popular}>
                  <XAxis dataKey="title" tick={{ fill: c.muted, fontSize: 11 }} />
                  <YAxis tick={{ fill: c.muted }} />
                  <Tooltip contentStyle={tooltipStyle()} />
                  <Bar dataKey="borrows" fill={c.chart1} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-muted-foreground">No borrow data yet.</p>}
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="p-6 pb-4"><CardTitle>Borrow Trends (12 months)</CardTitle></CardHeader>
          <CardContent className="p-6 pt-0">
            {trendsError ? (
              <p className="text-sm text-destructive">Failed to load borrow trends.</p>
            ) : trends.length > 0 ? (
              <ResponsiveContainer width="100%" height={280} role="img" aria-label={`Line chart showing borrow trends over the last 12 months: ${trends.map(t => `${t.month}: ${t.borrows} borrows`).join(", ")}`}>
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
          <CardContent className="p-6 pt-0">
            {genreError ? (
              <p className="text-sm text-destructive">Failed to load genre data.</p>
            ) : genres.length > 0 ? (
              <ResponsiveContainer width="100%" height={280} role="img" aria-label={`Pie chart showing genre distribution: ${genres.map(g => `${g.name}: ${g.value}`).join(", ")}`}>
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
      </div>

      <Card className="p-0">
        <CardHeader className="p-6 pb-4"><CardTitle>Recent borrows</CardTitle></CardHeader>
        <CardContent className="p-0">
          {recentError ? (
            <p className="px-6 py-8 text-sm text-destructive text-center">Failed to load recent borrows.</p>
          ) : (<div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Recent borrows">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">User</th>
                  <th className="px-6 py-3 text-left font-medium">Book</th>
                  <th className="px-6 py-3 text-left font-medium">Borrowed</th>
                  <th className="px-6 py-3 text-left font-medium">Due</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentBorrows.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No recent borrows.</td></tr>
                ) : recentBorrows.map((b) => (
                  <tr key={b._id} className="hover:bg-muted/30">
                    <td className="px-6 py-3 font-medium">{typeof b.user === "string" ? b.user : b.user?.name}</td>
                    <td className="px-6 py-3">{typeof b.book === "string" ? b.book : b.book?.title}</td>
                    <td className="px-6 py-3 text-muted-foreground">{new Date(b.borrowedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-3 text-muted-foreground">{new Date(b.dueDate).toLocaleDateString()}</td>
                    <td className="px-6 py-3"><Badge variant={b.status === "overdue" ? "destructive" : b.status === "returned" ? "secondary" : "outline"} className="capitalize">{b.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>)}
        </CardContent>
      </Card>
    </div>
    </>
  );
}
