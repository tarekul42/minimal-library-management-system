import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts, blogCategories } from "@/config/blog-posts";

export default function BlogList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      if (category !== "all" && !p.tags.includes(category)) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.excerpt.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [category, search]);

  const featured = filtered[0];

  return (
    <Section>
      <Container>
        <PageHeader title="Blog" description="Library news, reading lists, and book recommendations from our team." />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-8">
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === c.value ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {featured && (
          <Link to={`/blog/${featured.slug}`} className="mt-8 block">
            <Card className="p-0 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div className="bg-muted/30 flex items-center justify-center p-8 min-h-[200px]">
                  <p className="text-6xl opacity-20">📖</p>
                </div>
                <CardContent className="p-6 flex flex-col justify-center">
                  <Badge className="w-fit mb-2">{featured.tags[0]}</Badge>
                  <h2 className="text-xl font-bold">{featured.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{featured.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(featured.publishedAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featured.readingTime} min read</span>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                    Read more <ArrowRight className="h-3 w-3" />
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(featured ? 1 : 0).map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`}>
              <Card className="p-0 h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-5 flex flex-col gap-3">
                  <Badge className="w-fit">{post.tags[0]}</Badge>
                  <h3 className="font-semibold line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(post.publishedAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTime} min</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg font-medium">No posts found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setCategory("all"); }}>Clear filters</Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
