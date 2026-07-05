import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

const readers = ["A", "B", "C", "D"];

export function Hero() {
  return (
    <section className="relative gradient-hero overflow-hidden">
      <Container className="grid min-h-[60vh] grid-cols-1 items-center gap-12 py-16 lg:min-h-[70vh] lg:grid-cols-2 lg:py-24">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            New: AI-powered book recommendations
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl text-balance">
            Discover your next <span className="text-primary">great read</span> at the Athenaeum
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground text-pretty">
            Browse 10,000+ books across six genres, reserve titles in seconds, and borrow from anywhere — your library, reimagined for the digital age.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/books">
                Explore Library
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/register">Become a Member</Link>
            </Button>
          </div>
          <div className="flex items-center gap-3 pt-4 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {readers.map((i) => (
                <span key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                  {i}
                </span>
              ))}
            </div>
            <span>Trusted by <strong className="text-foreground">12,000+</strong> readers</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border shadow-md bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground">10,000+ Titles</h3>
                <p className="text-sm text-muted-foreground mt-1">Six genres. Endless stories.</p>
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              From classics to bestsellers — find your next read
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
