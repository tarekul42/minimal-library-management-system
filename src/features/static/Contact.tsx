import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ContactForm } from "./ContactForm";

export default function Contact() {
  return (
    <Section>
      <Container>
        <PageHeader title="Contact us" description="We respond to every message within 2 business days." />
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-6">
            <Card className="p-0"><CardContent className="space-y-4 p-6">
              <h3 className="font-semibold">Get in touch</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 text-primary" /><div><p className="font-medium">Email</p><a href={`mailto:${siteConfig.email}`} className="text-muted-foreground hover:text-foreground">{siteConfig.email}</a></div></li>
                <li className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 text-primary" /><div><p className="font-medium">Phone</p><a href={`tel:${siteConfig.phone}`} className="text-muted-foreground hover:text-foreground">{siteConfig.phone}</a></div></li>
                <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 text-primary" /><div><p className="font-medium">Address</p><p className="text-muted-foreground">{siteConfig.address}</p></div></li>
                <li className="flex items-start gap-3"><Clock className="h-4 w-4 mt-0.5 text-primary" /><div><p className="font-medium">Hours</p><p className="text-muted-foreground">Mon–Fri: 9am – 8pm<br />Sat–Sun: 10am – 6pm</p></div></li>
              </ul>
            </CardContent></Card>
            <Card className="p-0"><CardContent className="p-6">
              <h3 className="font-semibold mb-3">Follow us</h3>
              <div className="flex gap-2">
                {[Globe, Globe, Globe, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-muted"><Icon className="h-4 w-4" /></a>
                ))}
              </div>
            </CardContent></Card>
          </div>
          <Card className="p-0"><CardContent className="p-6"><ContactForm /></CardContent></Card>
        </div>
      </Container>
    </Section>
  );
}
