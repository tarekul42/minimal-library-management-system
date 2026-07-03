import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export function CtaBand() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-2xl gradient-primary p-10 md:p-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold md:text-4xl text-balance">Ready to start reading?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80 text-pretty">
            Create your free account in under a minute and get instant access to 10,000+ books.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/register">Get started for free <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
