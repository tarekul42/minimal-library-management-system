import { BookOpen, Users, Tags, BookMarked } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useGetDashboardStatsQuery } from "@/redux/api/dashboardApi";

export function StatsBar() {
  const { data } = useGetDashboardStatsQuery();
  const stats = data?.data;
  const items = [
    { label: "Books in catalog", value: stats?.totalBooks ?? 0, icon: BookOpen },
    { label: "Active members", value: stats?.totalUsers ?? 0, icon: Users },
    { label: "Genres covered", value: 6, icon: Tags },
    { label: "Daily borrows", value: stats?.activeBorrows ?? 0, icon: BookMarked },
  ];
  return (
    <section className="border-y border-border bg-muted/30">
      <Container className="grid grid-cols-2 gap-4 py-10 md:grid-cols-4">
        {items.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center">
            <s.icon className="h-6 w-6 text-primary" />
            <p className="mt-2 text-3xl font-bold">{s.value.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
