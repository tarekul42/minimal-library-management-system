import { Link } from "react-router";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { GENRE_OPTIONS } from "@/config/constants";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const EMOJI: Record<string, string> = {
  FICTION: "\u{1F4D6}",
  NON_FICTION: "\u{1F9E0}",
  SCIENCE: "\u{1F52C}",
  HISTORY: "\u{1F3DB}",
  BIOGRAPHY: "\u{270D}",
  FANTASY: "\u{1F409}",
};

export function Categories() {
  return (
    <Section className="bg-muted/30">
      <Container>
        <SectionHeader eyebrow="Browse" title="Explore by category" description="Find your next favorite across six curated genres." align="center" />
        <AnimateOnScroll>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {GENRE_OPTIONS.map((g) => (
            <Link key={g.value} to={`/books?genre=${g.value}`}>
              <Card className="h-full p-0 transition-all duration-200 hover:border-primary hover:shadow-sm">
                <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
                  <span className="text-3xl" aria-hidden>{EMOJI[g.value]}</span>
                  <span className="text-sm font-medium">{g.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
