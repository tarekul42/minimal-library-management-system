import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { BlogCard } from "@/components/cards/BlogCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const fallbackPosts = [
  { _id: "1", title: "10 Must-Read Fiction Releases of 2026", excerpt: "From genre-defining debuts to long-awaited sequels, here are the fiction titles our librarians can't stop talking about.", author: { name: "Eleanor Whitfield" }, publishedAt: "2026-06-12", readingTime: 7, coverImage: "/images/blog-1.svg" },
  { _id: "2", title: "How to Build a Reading Habit That Lasts", excerpt: "Practical, science-backed strategies for carving out 20 minutes a day — even when life gets loud.", author: { name: "James Okonkwo" }, publishedAt: "2026-06-05", readingTime: 9, coverImage: "/images/blog-2.svg" },
  { _id: "3", title: "Behind the Stacks: A Day in the Life of a Librarian", excerpt: "We followed three librarians across branches to find out what really happens between 9 and 5.", author: { name: "Mei Tanaka" }, publishedAt: "2026-05-28", readingTime: 6, coverImage: "/images/blog-3.svg" },
];

export function LatestBlog() {
  return (
    <Section className="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow="Blog"
          title="From the Athenaeum journal"
          description="Reading lists, author interviews, and library news."
          action={<Button asChild variant="outline"><Link to="/blog">All posts <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>}
        />
        <AnimateOnScroll>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {fallbackPosts.map((p) => <BlogCard key={p._id} post={p} />)}
        </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
