import { useGetDashboardStatsQuery, useGetPopularBooksQuery, useGetBorrowTrendsQuery, useGetGenreDistributionQuery } from "@/redux/api/dashboardApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { BookOpen, Users, BookMarked, AlertTriangle, DollarSign } from "lucide-react";
import type { IDashboardStats } from "@/types/dashboard";
import { useMemo } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

const TOOLTIP_STYLE: React.CSSProperties = { backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#e5e7eb" };

const statCards: { key: keyof IDashboardStats; label: string; icon: typeof BookOpen; color: string; prefix?: string }[] = [
  { key: "totalBooks", label: "Books", icon: BookOpen, color: "text-blue-400" },
  { key: "totalUsers", label: "Members", icon: Users, color: "text-green-400" },
  { key: "activeBorrows", label: "Active Borrows", icon: BookMarked, color: "text-amber-400" },
  { key: "overdueBorrows", label: "Overdue", icon: AlertTriangle, color: "text-red-400" },
  { key: "unpaidFines", label: "Unpaid Fines", icon: DollarSign, color: "text-purple-400", prefix: "$" },
];

const Dashboard = () => {
  const { data: statsData, isLoading: statsLoading, isError: statsError } = useGetDashboardStatsQuery();
  const { data: popularData, isLoading: popularLoading } = useGetPopularBooksQuery();
  const { data: trendsData, isLoading: trendsLoading } = useGetBorrowTrendsQuery();
  const { data: genreData, isLoading: genreLoading } = useGetGenreDistributionQuery();

  const stats = statsData?.data;
  const popularBooks = popularData?.data || [];
  const trends = trendsData?.data || [];
  const genres = genreData?.data || [];

  const chartData = useMemo(() => popularBooks.map((b) => ({
    title: b.title.length > 20 ? b.title.slice(0, 20) + "..." : b.title,
    borrows: b.borrowCount,
  })), [popularBooks]);

  const trendChartData = useMemo(() => trends.map((t) => ({
    month: `${MONTHS[t.month - 1]} ${t.year}`,
    borrows: t.count,
  })), [trends]);

  const genreChartData = useMemo(() => genres.map((g, i) => ({
    name: g.genre,
    value: g.count,
    fill: COLORS[i % COLORS.length],
  })), [genres]);

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {statsLoading ? (
        <Spinner size={32} />
      ) : statsError ? (
        <p className="text-red-400">Failed to load dashboard stats.</p>
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
              <Spinner size={24} />
            ) : chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ left: -10 }} role="img" aria-label="Popular books bar chart">
                  <XAxis dataKey="title" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#9ca3af" }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Bar dataKey="borrows" fill="#3b82f6" radius={[4, 4, 0, 0]} />
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
              <Spinner size={24} />
            ) : trendChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendChartData} margin={{ left: -10 }} role="img" aria-label="Borrow trends line chart">
                  <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#9ca3af" }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Line type="monotone" dataKey="borrows" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
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
              <Spinner size={24} />
            ) : genreChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart role="img" aria-label="Genre distribution pie chart">
                  <Pie data={genreChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                    {genreChartData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
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
