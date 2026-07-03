import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { AuthorCard } from "@/components/cards/AuthorCard";
import { useGetAuthorsQuery } from "@/redux/api/authorApi";

export function PopularAuthors() {
  const { data, isLoading } = useGetAuthorsQuery();
  const authors = data?.data ?? [];
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <Container>
        <SectionHeader eyebrow="Authors" title="Meet the voices behind the books" description="Explore our catalog by the writers who shape it." />
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-square animate-pulse rounded-full bg-muted" />)
            : authors.map((a) => <AuthorCard key={a._id} author={a} />)}
        </div>
      </Container>
    </section>
  );
}
