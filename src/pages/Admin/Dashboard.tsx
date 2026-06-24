import { useGetDashboardStatsQuery, useGetPopularBooksQuery } from "@/redux/api/dashboardApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BookOpen, Users, BookMarked, AlertTriangle, DollarSign } from "lucide-react";
import type { IPopularBook } from "@/types/dashboard";

const statCards = [
  { key: "totalBooks", label: "Books", icon: BookOpen, color: "text-blue-400" },
  { key: "totalUsers", label: "Members", icon: Users, color: "text-green-400" },
  { key: "activeBorrows", label: "Active Borrows", icon: BookMarked, color: "text-amber-400" },
  { key: "overdueBorrows", label: "Overdue", icon: AlertTriangle, color: "text-red-400" },
  { key: "unpaidFines", label: "Unpaid Fines ($)", icon: DollarSign, color: "text-purple-400" },
];

const Dashboard = () => {
  const { data: statsData, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const { data: popularData, isLoading: popularLoading } = useGetPopularBooksQuery();

  const stats = statsData?.data;
  const popularBooks: IPopularBook[] = popularData?.data || [];

  const chartData = popularBooks.map((b) => ({
    title: b.title.length > 20 ? b.title.slice(0, 20) + "..." : b.title,
    borrows: b.borrowCount,
  }));

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <h1 className="text-3xl mb-6">Dashboard</h1>

      {statsLoading ? (
        <Spinner size={32} />
      ) : stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
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
                  {s.key === "unpaidFines"
                    ? `$${(stats as any)[s.key]?.toFixed(2) || "0.00"}`
                    : (stats as any)[s.key] ?? 0}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      <h2 className="text-xl font-semibold mb-4">Popular Books</h2>
      {popularLoading ? (
        <Spinner size={24} />
      ) : chartData.length > 0 ? (
        <Card className="bg-gray-900 border-gray-800 p-4">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} margin={{ left: -10 }}>
              <XAxis dataKey="title" tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <YAxis tick={{ fill: "#9ca3af" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#e5e7eb",
                }}
              />
              <Bar dataKey="borrows" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      ) : (
        <p className="text-muted-foreground">No borrow data yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
