import type { Metadata } from "next";
import { ServiceNav } from "@/components/service/service-nav";
import { ServiceCta } from "@/components/service/service-cta";
import { ServiceFooter } from "@/components/service/service-footer";
import { WebdesignDetailFaq } from "@/components/service/webdesign/webdesign-detail-faq";
import { WebdesignDetailHero } from "@/components/service/webdesign/webdesign-detail-hero";
import { WebdesignIncludes } from "@/components/service/webdesign/webdesign-includes";
import { WebdesignProcess } from "@/components/service/webdesign/webdesign-process";
import { WebdesignResults } from "@/components/service/webdesign/webdesign-results";
import { WebdesignTransformation } from "@/components/service/webdesign/webdesign-transformation";
import { WebdesignWixBenefits } from "@/components/service/webdesign/webdesign-wix-benefits";

export const metadata: Metadata = {
  title: "WIX Webdesign & UI/UX — Aesken Webdienste",
  description:
    "Professionelles Wix Studio Webdesign und UI/UX von Aesken – individuelle Websites, die zu Ihrer Marke passen und Kunden anziehen.",
};

export default function WixWebdesignPage() {
  return (
    <>
      <ServiceNav routeBase="/service" />
      <main className="service-page">
        <WebdesignDetailHero />
        <WebdesignProcess />
        <WebdesignIncludes />
        <WebdesignTransformation />
        <WebdesignResults />
        <WebdesignWixBenefits />
        <WebdesignDetailFaq />
        <ServiceCta routeBase="/service" />
      </main>
      <ServiceFooter />
    </>
  );
}
