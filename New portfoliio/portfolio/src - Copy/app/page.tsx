import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Resume } from "@/components/sections/resume";
import { GithubGraph } from "@/components/sections/github-graph";
import { Testimonials } from "@/components/sections/testimonials";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Services />
      <Resume />
      <GithubGraph />
      <Testimonials />
      <BlogPreview />
      <Contact />
    </>
  );
}
