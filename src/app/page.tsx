import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Problems from "@/components/sections/Problems";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Expertise from "@/components/sections/Expertise";
import Engagements from "@/components/sections/Engagements";
import Industries from "@/components/sections/Industries";
import Process from "@/components/sections/Process";
import Manifesto from "@/components/sections/Manifesto";
import WhoWeAre from "@/components/sections/WhoWeAre";
import FAQ from "@/components/sections/FAQ";
import HomeCTA from "@/components/sections/HomeCTA";

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <TrustBar />
        <Problems />
        <ServicesGrid />
        <Expertise />
        <Engagements />
        <Industries />
        <Process />
        <Manifesto />
        <WhoWeAre />
        <FAQ />
        <HomeCTA />
      </main>
    </>
  );
}
