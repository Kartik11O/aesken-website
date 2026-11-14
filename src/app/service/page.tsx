import type { Metadata } from "next";
import { ServiceNav } from "@/components/service/service-nav";
import { ServiceHero } from "@/components/service/service-hero";
import { ServiceLogoBar } from "@/components/service/service-logo-bar";
import { ServiceSolutions } from "@/components/service/service-solutions";
import { ServiceOfferings } from "@/components/service/service-offerings";
import { ServiceTestimonials } from "@/components/service/service-testimonials";
import { ServiceInsights } from "@/components/service/service-insights";
import { ServicePromo } from "@/components/service/service-promo";
import { ServiceWhy } from "@/components/service/service-why";
import { ServiceFaq } from "@/components/service/service-faq";
import { ServiceCta } from "@/components/service/service-cta";
import { ServiceFooter } from "@/components/service/service-footer";

export const metadata: Metadata = {
  title: "Aesken Webdienste — All-in-One Websites für Unternehmen",
  description:
    "Aesken entwirft und erstellt komplette Websites – von Domain und Design bis SEO und rechtlicher Einrichtung.",
};

export default function ServicePage() {
  return (
    <>
      <ServiceNav />
      <main className="service-page">
        <ServiceHero />
        <ServiceLogoBar />
        <ServiceSolutions />
        <ServiceOfferings />
        <ServiceTestimonials />
        <ServiceInsights />
        <ServicePromo />
        <ServiceWhy />
        <ServiceFaq />
        <ServiceCta />
      </main>
      <ServiceFooter />
    </>
  );
}
