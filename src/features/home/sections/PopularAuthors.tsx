import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { AuthorCard } from "@/components/cards/AuthorCard";
import { useGetAuthorsQuery } from "@/redux/api/authorApi";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

export function PopularAuthors() {
  const { data, isLoading, isError, refetch } = useGetAuthorsQuery();
  const authors = data?.data ?? [];

  if (isError) {
    return (
      <Section className="bg-muted/30">
        <Container>
          <ErrorState message="Failed to load authors" onRetry={refetch} />
        </Container>
      </Section>
    );
  }

  return (
    <Section className="bg-muted/30">
      <Container>
        <SectionHeader eyebrow="Authors" title="Meet the voices behind the books" description="Explore our catalog by the writers who shape it." />
        <AnimateOnScroll>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="aspect-square rounded-full" />)
            : authors.length === 0
              ? <div className="col-span-full"><EmptyState title="No authors yet" description="Authors will appear here once added to the catalog." /></div>
              : authors.map((a) => <AuthorCard key={a._id} author={a} />)}
        </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
