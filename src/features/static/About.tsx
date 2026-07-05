import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Target, Heart, BookOpen } from "lucide-react";
import { Seo } from "@/components/Seo";

const values = [
  { icon: Target, title: "Accessible to all", description: "We believe knowledge should be free to access. Membership is free for residents and affordable for everyone else." },
  { icon: Heart, title: "Member-first", description: "Every feature we ship starts with a member's pain point. Our roadmap is shaped by your feedback, not by hype cycles." },
  { icon: BookOpen, title: "Curated, not catalogued", description: "We don't chase volume. Our librarians hand-pick titles so you spend less time scrolling and more time reading." },
];

const team = [
  { name: "Eleanor Whitfield", role: "Head Librarian", initials: "EW" },
  { name: "James Okonkwo", role: "Catalog Director", initials: "JO" },
  { name: "Mei Tanaka", role: "Member Experience", initials: "MT" },
  { name: "Carlos Reyes", role: "Engineering Lead", initials: "CR" },
];

export default function About() {
  return (
    <>
      <Seo title="About" description="Learn about Athenaeum — our mission, values, and team." />
      <Section className="gradient-hero">
        <Container className="max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our mission</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl text-balance">Make every book findable. Make every reader welcome.</h1>
          <p className="mt-6 text-lg text-muted-foreground text-pretty">For 30 years, the Athenaeum has connected readers with books. We're now bringing that same care to the digital age — without losing the human touch.</p>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <SectionHeader eyebrow="Our story" title="From a single shelf to 10,000 books" align="center" />
          <div className="mt-10 space-y-6 text-muted-foreground text-pretty">
            <p>Founded in 1996 as a small community bookshelf in Eleanor Whitfield's living room, the Athenaeum began with 87 donated books and a simple idea: anyone in the neighbourhood should be able to borrow any book, no questions asked.</p>
            <p>By 2005, we had grown into a full municipal library with three branches and 8,000 titles. In 2018, we launched our digital catalog. In 2026, we're launching the borrowing platform you're using right now — built from scratch with member feedback at every step.</p>
            <p>Today, we serve 12,000+ active members across six genres, with new titles added weekly. Our librarians personally review every acquisition request, and our customer support team answers every email within 2 business days.</p>
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/30">
        <Container>
          <SectionHeader eyebrow="What we value" title="Three principles that shape every decision" align="center" />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((v) => (
              <Card key={v.title} className="p-0">
                <CardContent className="space-y-3 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Our team" title="The people behind the catalog" align="center" />
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {team.map((m) => (
              <Card key={m.name} className="p-0">
                <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                  <Avatar className="h-20 w-20"><AvatarFallback className="bg-primary/10 text-primary text-xl">{m.initials}</AvatarFallback></Avatar>
                  <div>
                    <p className="font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
