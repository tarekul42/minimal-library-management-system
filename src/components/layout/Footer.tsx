import { Link } from "react-router";
import { Library, Mail, Phone, MapPin, X, Code2, Globe, Link as LinkIcon, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Container } from "./Container";
import { siteConfig, footerNavGroups } from "@/config/site";
import { useNewsletterMutation } from "@/redux/api/newsletterApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});
type FormData = z.infer<typeof schema>;

const socials = [
  { label: "Twitter", href: siteConfig.social.twitter, icon: X },
  { label: "GitHub", href: siteConfig.social.github, icon: Code2 },
  { label: "Facebook", href: siteConfig.social.facebook, icon: Globe },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkIcon },
  { label: "Instagram", href: siteConfig.social.instagram, icon: Camera },
];

export function Footer() {
  const [subscribe, { isLoading }] = useNewsletterMutation();
  const form = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { email: "" } });

  const onSubmit = async (values: FormData) => {
    try {
      await subscribe(values).unwrap();
      toast.success("Subscribed! Check your inbox to confirm.");
      form.reset();
    } catch {
      toast.error("Subscription failed. Please try again.");
    }
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + contact */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Library className="h-5 w-5" />
              </span>
              <span className="text-lg">{siteConfig.name}</span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">{siteConfig.description}</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${siteConfig.email}`} className="transition-colors duration-150 hover:text-foreground">{siteConfig.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:${siteConfig.phone}`} className="transition-colors duration-150 hover:text-foreground">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>

          {/* Nav groups */}
          {footerNavGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 text-sm font-semibold">{group.title}</h3>
              <ul className="space-y-2 text-sm">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="text-muted-foreground transition-colors duration-150 hover:text-foreground">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Stay in the loop</h3>
            <p className="text-sm text-muted-foreground">Get notified about new arrivals and events.</p>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <Input type="email" placeholder="you@example.com" {...form.register("email")} aria-label="Email" />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
              )}
              <Button type="submit" disabled={isLoading} size="sm">
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
