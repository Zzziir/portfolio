import { NavPill } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Statement } from "@/components/site/statement";
import { Services } from "@/components/site/services";
import { Work } from "@/components/site/work";
import { Testimonials } from "@/components/site/testimonials";
import { Thoughts } from "@/components/site/thoughts";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { FloatingCta } from "@/components/site/floating-cta";

export default function Home() {
  return (
    <>
      <NavPill />
      <FloatingCta />
      <main>
        <Hero />
        <About />
        <Statement />
        <Services />
        <Work />
        <Testimonials />
        <Thoughts />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
