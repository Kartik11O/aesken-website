import type { Metadata } from "next";
import { ServiceNav } from "@/components/service/service-nav";
import { ServiceFooter } from "@/components/service/service-footer";
import { LegalHero } from "@/components/service/legal/legal-hero";

export const metadata: Metadata = {
  title: "Rechtliche Einrichtung & Datenschutz — Aesken Webdienste",
  description:
    "DSGVO-konforme Websites mit professionellen Rechtstexten, Cookie-Management und technischer Umsetzung für mehr Sicherheit und Vertrauen.",
};

export default function RechtlicheEinrichtungPage() {
  return (
    <>
      <ServiceNav routeBase="/service" />
      <main className="service-page">
        <LegalHero />
      </main>
      <ServiceFooter />
    </>
  );
}
