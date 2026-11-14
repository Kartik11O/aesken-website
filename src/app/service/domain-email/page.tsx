import type { Metadata } from "next";
import { ServiceNav } from "@/components/service/service-nav";
import { ServiceCta } from "@/components/service/service-cta";
import { ServiceFooter } from "@/components/service/service-footer";
import { DomainEmailHero } from "@/components/service/domain-email/domain-email-hero";
import { DomainEmailFoundations } from "@/components/service/domain-email/domain-email-foundations";
import { DomainEmailProcess } from "@/components/service/domain-email/domain-email-process";
import { DomainEmailServices } from "@/components/service/domain-email/domain-email-services";
import { DomainEmailPartners } from "@/components/service/domain-email/domain-email-partners";
import { DomainEmailWhyUs } from "@/components/service/domain-email/domain-email-why-us";
import { DomainEmailFaq } from "@/components/service/domain-email/domain-email-faq";

export const metadata: Metadata = {
  title: "Domain & E-Mail-Einrichtung — Aesken Webdienste",
  description:
    "Wir richten Ihre professionelle Domain und E-Mail-Infrastruktur ein — sicher, schnell und zuverlässig, mit IONOS, Microsoft 365 und zertifizierten Anbietern.",
};

export default function DomainEmailPage() {
  return (
    <>
      <ServiceNav routeBase="/service" />
      <main className="service-page">
        <DomainEmailHero />
        <DomainEmailFoundations />
        <DomainEmailProcess />
        <DomainEmailServices />
        <DomainEmailPartners />
        <DomainEmailWhyUs />
        <DomainEmailFaq />
        <ServiceCta routeBase="/service" />
      </main>
      <ServiceFooter />
    </>
  );
}
