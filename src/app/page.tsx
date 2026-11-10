import { HeroAbout } from "@/components/site/hero-about";
import { Proof } from "@/components/site/proof";
import { Statement } from "@/components/site/statement";
import { Services } from "@/components/site/services";
import { Work } from "@/components/site/work";
import { Stack } from "@/components/site/stack";
import { Certifications } from "@/components/site/certifications";
import { Testimonials } from "@/components/site/testimonials";
// import { Thoughts } from "@/components/site/thoughts";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { FloatingCta } from "@/components/site/floating-cta";

// ISR: regenerate so newly approved testimonials appear without a redeploy.
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <FloatingCta />
      <main>
        <HeroAbout />
        <Proof />
        <Statement />
        <Services />
        <Work />
        <Stack />
        <Certifications />
        <Testimonials />
        {/* <Thoughts /> */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
