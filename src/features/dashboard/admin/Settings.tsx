import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function Stub() {
  return (
    <Section>
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-semibold">Coming soon</h1>
        <p className="text-muted-foreground">This page will be implemented in a later phase.</p>
      </Container>
    </Section>
  );
}

