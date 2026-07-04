import { useParams, Link } from "react-router";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { blogPosts } from "@/config/blog-posts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const related = blogPosts.filter((p) => p.slug !== slug && p.tags.some((t) => post?.tags.includes(t))).slice(0, 3);

  if (!post) {
    return (
      <Section>
        <Container className="py-16 text-center">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p className="text-muted-foreground mt-2">The blog post you're looking for doesn't exist.</p>
          <Button variant="outline" className="mt-4" asChild><Link to="/blog">Back to blog</Link></Button>
        </Container>
      </Section>
    );
  }

  const initials = post.author.name.split(" ").map((p) => p[0]).join("").slice(0, 2);

  return (
    <Section>
      <Container className="max-w-3xl">
        <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to blog
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{post.title}</h1>
          <p className="text-lg text-muted-foreground">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(post.publishedAt).toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readingTime} min read</span>
          </div>
        </div>

        <div className="mt-8 bg-muted/30 rounded-lg flex items-center justify-center p-12 min-h-[200px]">
          <p className="text-6xl opacity-20">📖</p>
        </div>

        <article className="mt-8 prose prose-sm md:prose-base dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </article>

        <Card className="p-0 mt-10">
          <CardContent className="flex items-center gap-4 p-5">
            <Avatar className="h-14 w-14"><AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback></Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">{post.author.bio}</p>
            </div>
          </CardContent>
        </Card>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Related posts</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`}>
                  <Card className="p-0 h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 space-y-2">
                      <Badge variant="outline">{r.tags[0]}</Badge>
                      <p className="font-medium line-clamp-2 text-sm">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{new Date(r.publishedAt).toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
