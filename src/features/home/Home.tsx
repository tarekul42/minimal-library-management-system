import { Hero } from "./sections/Hero";
import { StatsBar } from "./sections/StatsBar";
import { FeaturedBooks } from "./sections/FeaturedBooks";
import { Categories } from "./sections/Categories";
import { HowItWorks } from "./sections/HowItWorks";
import { PopularAuthors } from "./sections/PopularAuthors";
import { Testimonials } from "./sections/Testimonials";
import { LatestBlog } from "./sections/LatestBlog";
import { Faq } from "./sections/Faq";
import { CtaBand } from "./sections/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedBooks />
      <Categories />
      <HowItWorks />
      <PopularAuthors />
      <Testimonials />
      <LatestBlog />
      <Faq />
      <CtaBand />
    </>
  );
}
