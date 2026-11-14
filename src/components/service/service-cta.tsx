"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { ServicePillButton } from "@/components/service/service-pill-button";

export function ServiceCta({ routeBase = "" }: { routeBase?: string }) {
  return (
    <section className="bg-white py-20 md:py-28" data-cursor-bg="light" id="contact">
      <div className="mx-auto max-w-[752px] px-6 md:px-10">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-instrument)] text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.15] tracking-[-0.02em]">
            Haben Sie ein Projekt im Sinn? Lassen Sie uns sprechen.
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-10" delay={0.1}>
          <ServicePillButton href={`${routeBase}#contact`}>Senden Sie Ihre Anforderungen</ServicePillButton>
          <p className="mt-4 text-sm text-black/45">
            Sagen Sie uns, wonach Sie suchen – wir melden uns so schnell wie möglich bei Ihnen
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
