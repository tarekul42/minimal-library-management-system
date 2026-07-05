import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const faqs = [
  { q: "How long can I borrow a book for?", a: "Standard loans are 14 days. You can renew up to two times (28 days total) from your dashboard as long as no one else has reserved the title." },
  { q: "What happens if I return a book late?", a: "A fine of $0.25 per day accrues automatically. After 30 days overdue, the book is marked lost and you'll be charged the replacement cost." },
  { q: "Can I reserve a book that's currently checked out?", a: "Yes. Reservations queue you for the next available copy. You'll receive an email and in-app notification when the book is ready for pickup." },
  { q: "How do I become a member?", a: "Sign up with your email at /register. Membership is free for residents and $20/year for non-residents. Visit any branch with ID to activate full borrowing privileges." },
  { q: "Do you offer digital audiobooks and e-books?", a: "Yes — over 4,000 digital titles are available through our partnership with Libby and OverDrive. Log in with your Athenaeum account to access them." },
  { q: "Can I suggest a book for the library to purchase?", a: "Absolutely. Use the Suggest a Title form on your dashboard. Our librarians review every suggestion within 5 business days." },
];

export function Faq() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" align="center" />
        <AnimateOnScroll>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
