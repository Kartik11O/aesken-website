import { AboutSection } from "@/components/about-section";
import { AeskenOsSection } from "@/components/aesken-os-section";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { CtaSection } from "@/components/cta-section";
import { EcosystemSection } from "@/components/ecosystem-section";
import { HeroSection } from "@/components/hero-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSection />
        <AboutSection />
        <CapabilitiesSection />
        <EcosystemSection />
        <AeskenOsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
