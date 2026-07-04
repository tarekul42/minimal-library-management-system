import { useGetAuthorsQuery } from "@/redux/api/authorApi";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AuthorCard } from "@/components/cards/AuthorCard";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import type { IAuthor } from "@/types/author";
import { Seo } from "@/components/Seo";

export default function Authors() {
  const { data, isLoading, isError, refetch } = useGetAuthorsQuery();
  const authors: IAuthor[] = data?.data ?? [];

  return (
    <>
    <Seo title="Authors" description="Meet the authors behind our collection." />
    <Container className="py-8 md:py-12">
      <Breadcrumb items={[{ label: "Authors" }]} />
      <PageHeader title="Authors" description="Discover the writers behind our catalog." className="mt-4" />
      {isLoading ? (
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => <div key={i} className="aspect-square animate-pulse rounded-full bg-muted" />)}
        </div>
      ) : isError ? (
        <ErrorState message="Failed to load authors" onRetry={refetch} className="mt-8" />
      ) : authors.length === 0 ? (
        <EmptyState title="No authors yet" description="Authors will appear here once the catalog is populated." className="mt-8" />
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {authors.map((a) => <AuthorCard key={a._id} author={a} />)}
        </div>
      )}
    </Container>
    </>
  );
}
