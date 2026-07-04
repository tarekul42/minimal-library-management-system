import { Search, BookMarked, RotateCcw } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";

const steps = [
  { icon: Search, title: "Browse", description: "Search 10,000+ titles by title, author, genre, or tag. Filter by availability to find what's on the shelf right now." },
  { icon: BookMarked, title: "Borrow", description: "One click reserves your book for 14 days. Pick it up at the front desk or have it delivered to your local branch." },
  { icon: RotateCcw, title: "Return", description: "Bring it back before the due date or extend your loan from your dashboard. No late fees if you renew in time." },
];

export function HowItWorks() {
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow="How it works" title="Borrow a book in three simple steps" align="center" />
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <s.icon className="h-7 w-7" />
              </div>
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-5xl font-bold text-muted/40">{i + 1}</span>
              <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
