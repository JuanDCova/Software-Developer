import type { Route } from "./+types/home";
import { About } from "~/components/about/about";
import { Contact } from "~/components/contact/contact";
import { Experience } from "~/components/experience/experience";
import { Hero } from "~/components/hero/hero";
import { FeaturedProjects } from "~/components/projects/featured-projects";
import { Stack } from "~/components/skills/stack";
import { pageMeta } from "~/utils/seo";

export const meta: Route.MetaFunction = () => pageMeta({ path: "/" });

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Stack />
      <FeaturedProjects />
      <Contact />
    </>
  );
}
