import type { Metadata } from "next";
import { ServiceNav } from "@/components/service/service-nav";
import { ServiceCta } from "@/components/service/service-cta";
import { ServiceFooter } from "@/components/service/service-footer";
import { IntegrationsFaq } from "@/components/service/integrations/integrations-faq";
import { IntegrationsHero } from "@/components/service/integrations/integrations-hero";
import { IntegrationsCategories } from "@/components/service/integrations/integrations-categories";
import { IntegrationsProcess } from "@/components/service/integrations/integrations-process";
import { IntegrationsResults } from "@/components/service/integrations/integrations-results";
import { IntegrationsShowcase } from "@/components/service/integrations/integrations-showcase";
import { IntegrationsWhyUs } from "@/components/service/integrations/integrations-why-us";

export const metadata: Metadata = {
  title: "Technische Integrationen — Aesken Webdienste",
  description:
    "Wir verbinden Ihre Wix-Website mit Buchungssystemen, CRM-Tools und Zahlungsanbietern – automatisiert, zuverlässig und ohne manuelle Doppelarbeit.",
};

export default function TechnischeIntegrationenPage() {
  return (
    <>
      <ServiceNav routeBase="/service" />
      <main className="service-page">
        <IntegrationsHero />
        <IntegrationsProcess />
        <IntegrationsCategories />
        <IntegrationsShowcase />
        <IntegrationsResults />
        <IntegrationsWhyUs />
        <IntegrationsFaq />
        <ServiceCta routeBase="/service" />
      </main>
      <ServiceFooter />
    </>
  );
}
