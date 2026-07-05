import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Graduate Student",
    initials: "SC",
    quote: "The reservation system saved my thesis. I found three rare books on cryptography, reserved them in seconds, and picked them up the same day.",
  },
  {
    name: "Marcus Okafor",
    role: "Book Club Organizer",
    initials: "MO",
    quote: "Managing our monthly reads used to be a spreadsheet nightmare. Now every member borrows the same title from one shared dashboard.",
  },
  {
    name: "Priya Patel",
    role: "High School Teacher",
    initials: "PP",
    quote: "My students love the genre filters. I assigned a Fantasy unit and they all found age-appropriate titles in under five minutes.",
  },
];

export function Testimonials() {
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow="Testimonials" title="What our members say" align="center" />
        <AnimateOnScroll>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-0 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              <CardContent className="space-y-4 p-6">
                <Quote className="h-8 w-8 text-primary/30" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-pretty">{t.quote}</p>
                <div className="flex items-center gap-3 pt-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
