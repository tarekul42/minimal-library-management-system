import { useState } from "react";
import { Link } from "react-router";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageCircle } from "lucide-react";
import { Seo } from "@/components/Seo";

interface FAQ {
  q: string;
  a: string;
}

const faqCategories: { title: string; icon: typeof HelpCircle; items: FAQ[] }[] = [
  {
    title: "Account",
    icon: HelpCircle,
    items: [
      { q: "How do I create an account?", a: "Click 'Sign Up' on the top right corner. Fill in your name, email, and password. You'll receive a confirmation email. Click the link in the email to activate your account." },
      { q: "I forgot my password. What should I do?", a: "Click 'Forgot Password' on the login page. Enter your email address. We'll send you a reset link. Use it to create a new password." },
      { q: "How do I update my profile?", a: "Log in and navigate to Dashboard → Profile. You can update your name, email, phone number, and address there." },
      { q: "Can I delete my account?", a: "Please contact our support team to request account deletion. Note that this action is irreversible and all your borrowing history will be lost." },
      { q: "Why is my account locked?", a: "Accounts may be locked after multiple failed login attempts or if there are unresolved fines. Contact support to resolve the issue." },
    ],
  },
  {
    title: "Borrowing",
    icon: HelpCircle,
    items: [
      { q: "How many books can I borrow at once?", a: "Members can borrow up to 5 books at a time. This limit helps ensure fair access for all members." },
      { q: "How long is the loan period?", a: "The standard loan period is 14 days. You can renew a book up to 3 times if no one else has placed a hold on it." },
      { q: "How do I borrow a book?", a: "Find the book in our catalog and click 'Borrow'. If you're at a branch, bring the book to the front desk with your library card." },
      { q: "Can I borrow e-books?", a: "Yes! Our digital catalog includes e-books and audiobooks. Log in, browse the digital collection, and click 'Borrow' to add to your account." },
      { q: "What happens if a book I want is checked out?", a: "You can place a hold on the book. You'll be notified by email when it becomes available. Holds typically take 3-7 days to fulfill." },
    ],
  },
  {
    title: "Returns & Fines",
    icon: HelpCircle,
    items: [
      { q: "Where do I return books?", a: "You can return books at any Athenaeum branch during operating hours. Most branches also have a 24/7 drop box." },
      { q: "What is the late return fine?", a: "Fines are $0.50 per day per book. There's a maximum fine of $15 per book. Children's books have no late fines." },
      { q: "How do I pay my fines?", a: "Log in and go to Dashboard → Fines to pay online via credit card. You can also pay in person at any branch." },
      { q: "Can fines be waived?", a: "Fines may be waived in exceptional circumstances. Contact our support team to discuss your situation." },
      { q: "What happens if I lose a book?", a: "Please report lost books immediately. You'll be charged the replacement cost of the book plus a processing fee." },
    ],
  },
  {
    title: "Reservations",
    icon: HelpCircle,
    items: [
      { q: "How do I reserve a book?", a: "Find the book in our catalog and click 'Reserve'. You'll be added to the waitlist. We'll email you when the book is ready for pickup." },
      { q: "How long do I have to pick up a reserved book?", a: "Reserved books are held for 3 business days. If you don't pick them up in time, the reservation will be cancelled." },
      { q: "Can I cancel a reservation?", a: "Yes. Go to Dashboard → My Reservations and click 'Cancel'. You can also cancel in person at any branch." },
      { q: "How many books can I reserve at once?", a: "You can have up to 3 active reservations at a time." },
      { q: "Why was my reservation cancelled?", a: "Reservations are automatically cancelled if you don't pick up the book within 3 business days, or if the book is no longer available in our system." },
    ],
  },
];

export default function Help() {
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));

  const filterFaqs = (items: FAQ[]) => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter((item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q));
  };

  return (
    <>
    <Seo title="Help & Support" description="Find answers to common questions and get support." />
    <Section>
      <Container className="max-w-4xl">
        <PageHeader title="Help & Support" description="Find answers to common questions about using the library." />

        <div className="relative mt-8 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search FAQs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>

        <div className="mt-10 space-y-8">
          {faqCategories.map((cat) => {
            const filtered = filterFaqs(cat.items);
            if (filtered.length === 0) return null;
            return (
              <Card key={cat.title} className="p-0">
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <cat.icon className="h-5 w-5 text-primary" />
                    {cat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-1">
                  {filtered.map((item) => {
                    const key = `${cat.title}-${item.q}`;
                    const isOpen = openItems[key];
                    return (
                      <div key={key} className="border-b border-border last:border-0">
                        <button
                          onClick={() => toggle(key)}
                          className="flex w-full items-center justify-between py-3 text-left text-sm font-medium hover:text-foreground"
                        >
                          <span>{item.q}</span>
                          {isOpen ? <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />}
                        </button>
                        {isOpen && (
                          <div className="pb-3 text-sm text-muted-foreground">
                            <p>{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="p-0 mt-10">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <MessageCircle className="h-10 w-10 text-primary" />
            <div>
              <p className="font-semibold text-lg">Still need help?</p>
              <p className="text-sm text-muted-foreground">We're here to help. Contact our support team and we'll get back to you within 2 business days.</p>
            </div>
            <Button asChild><Link to="/contact">Contact us</Link></Button>
          </CardContent>
        </Card>
      </Container>
    </Section>
    </>
  );
}
