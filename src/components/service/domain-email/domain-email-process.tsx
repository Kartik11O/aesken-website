"use client";

import { WebdesignProcess } from "@/components/service/webdesign/webdesign-process";
import { domainEmailProcessSteps } from "@/lib/domain-email-service-data";

export function DomainEmailProcess() {
  return (
    <WebdesignProcess
      id="ablauf"
      steps={domainEmailProcessSteps}
      eyebrow="Einfacher Ablauf"
      title="Einfacher Ablauf – erklärt in 5 Schritten"
      desc="Von den Zielen bis zum Go-live — klar, transparent und ohne Überraschungen."
      showLegend={false}
      footer={
        <>
          Typische Einrichtungsdauer{" "}
          <span className="font-semibold text-[#64748b]">1–5 Tage</span> · Klarer Status · Persönlicher Support
        </>
      }
    />
  );
}
