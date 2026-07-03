export const cardStyles = {
  base: "rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md",
  padding: "p-4 sm:p-6",
} as const;

export const buttonStyles = {} as const;

export const inputStyles =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export const sectionStyles = {
  base: "py-16 md:py-24",
  container: "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8",
} as const;

export const headingStyles = {
  h1: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
  h2: "text-2xl md:text-3xl font-semibold tracking-tight",
  h3: "text-xl md:text-2xl font-semibold tracking-tight",
  sectionLabel: "text-sm font-semibold uppercase tracking-widest text-primary",
} as const;
