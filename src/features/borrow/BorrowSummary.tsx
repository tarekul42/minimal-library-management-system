import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/cards/StatCard";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ErrorState } from "@/components/feedback/ErrorState";
import { useGetActiveBorrowsQuery, useGetOverdueBorrowsQuery } from "@/redux/api/borrowApi";
import { BookOpen, Clock, AlertTriangle } from "lucide-react";
import type { IBorrow } from "@/types/borrow";
import { Seo } from "@/components/Seo";

export default function BorrowSummary() {
  const active = useGetActiveBorrowsQuery();
  const overdue = useGetOverdueBorrowsQuery();

  const isLoading = active.isLoading || overdue.isLoading;
  const isError = active.isError || overdue.isError;

  const allBorrows: IBorrow[] = active.data?.data ?? [];
  const overdueBorrows: IBorrow[] = overdue.data?.data ?? [];

  const deduplicated = allBorrows.filter(
    (b) => !overdueBorrows.some((o) => o._id === b._id)
  );
  const merged = [...overdueBorrows, ...deduplicated];

  const totalActive = allBorrows.length;
  const totalOverdue = overdueBorrows.length;
  const totalBorrowed = totalActive + totalOverdue;

  const handleRetry = () => {
    active.refetch();
    overdue.refetch();
  };

  if (isError) {
    return <ErrorState message="Failed to load borrowing data" onRetry={handleRetry} />;
  }

  return (
    <>
      <Seo title="Borrow Summary" description="Real-time overview of all books currently checked out." />
      <Section className="gradient-hero">
        <Container className="max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Borrow summary</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl text-balance">
            See what&apos;s currently borrowed
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-pretty">
            A real-time overview of all books currently checked out across the library.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatCard label="Active Loans" value={totalActive} icon={BookOpen} />
              <StatCard label="Overdue" value={totalOverdue} icon={AlertTriangle} />
              <StatCard label="Total Borrowed" value={totalBorrowed} icon={Clock} />
            </div>
          )}
        </Container>
      </Section>

      <Section className="bg-muted/30">
        <Container>
          <SectionHeader
            eyebrow="Currently borrowed"
            title={`${merged.length} book${merged.length !== 1 ? "s" : ""} checked out`}
            align="center"
          />

          {isLoading ? (
            <TableSkeleton />
          ) : merged.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
                <p className="font-medium">No books currently borrowed</p>
                <p className="text-sm text-muted-foreground">All books are available at the library.</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="mt-10 overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm" aria-label="Currently borrowed books">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Book</th>
                      <th className="px-4 py-3 text-left font-medium">Due date</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {merged.map((b) => (
                      <tr key={b._id} className="hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">
                          {typeof b.book === "string" ? b.book : b.book?.title}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {new Date(b.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={b.status === "overdue" ? "destructive" : "outline"}
                            className="capitalize"
                          >
                            {b.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </Container>
      </Section>
    </>
  );
}
