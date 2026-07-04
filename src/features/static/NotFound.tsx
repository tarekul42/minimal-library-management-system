import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Seo } from "@/components/Seo";

export default function NotFound() {
  return (
    <>
    <Seo title="Page Not Found" description="The page you're looking for doesn't exist." />
    <Section>
      <Container className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-7xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild className="mt-8">
          <Link to="/">Back home</Link>
        </Button>
      </Container>
    </Section>
    </>
  );
}
