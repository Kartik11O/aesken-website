"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebdesignSectionHeader } from "@/components/service/webdesign/webdesign-section-header";
import { domainEmailPartners } from "@/lib/domain-email-service-data";

function PartnerMark({ name, accent }: { name: string; accent: string }) {
  if (name === "Microsoft 365") {
    return (
      <div className="grid size-11 shrink-0 grid-cols-2 gap-0.5 overflow-hidden rounded-lg">
        <span style={{ backgroundColor: "#F25022" }} />
        <span style={{ backgroundColor: "#7FBA00" }} />
        <span style={{ backgroundColor: "#00A4EF" }} />
        <span style={{ backgroundColor: "#FFB900" }} />
      </div>
    );
  }

  return (
    <div
      className="flex size-11 shrink-0 items-center justify-center rounded-lg text-sm font-black tracking-tight text-[#161618]"
      style={{ backgroundColor: `${accent}35` }}
    >
      IO
    </div>
  );
}

function PartnerCard({
  item,
  index,
  reduce,
}: {
  item: (typeof domainEmailPartners)[number];
  index: number;
  reduce: boolean | null;
}) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <motion.article
        className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-black/[0.08] bg-white p-7 md:p-8"
        whileHover={reduce ? undefined : { y: -5 }}
        transition={{ type: "spring", stiffness: 340, damping: 26 }}
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: item.accent }}
          aria-hidden
        />

        <div className="relative flex items-center gap-3">
          <PartnerMark name={item.name} accent={item.accent} />
          <div>
            <p className="text-lg font-bold text-[#161618]">{item.name}</p>
            <p className="text-[11px] text-black/45">{item.subtitle}</p>
          </div>
        </div>

        <p className="relative mt-5 text-sm leading-[1.7] text-black/55">{item.desc}</p>

        <ul className="relative mt-6 grid gap-2.5 sm:grid-cols-2">
          {item.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-[13px] font-medium text-[#161618]">
              <span
                className="mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full text-[8px]"
                style={{ backgroundColor: `${item.accent}55` }}
                aria-hidden
              >
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="relative mt-7 flex items-center gap-2 text-sm font-bold text-[#161618]">
          {item.linkLabel}
          <motion.span
            className="flex size-6 items-center justify-center rounded-full bg-black/[0.05] text-[11px]"
            whileHover={{ x: 3, backgroundColor: "rgba(0,0,0,0.09)" }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
          >
            →
          </motion.span>
        </div>
      </motion.article>
    </ScrollReveal>
  );
}

export function DomainEmailPartners() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-[#fafafa] py-20 md:py-28" data-cursor-bg="light">
      <div className="mx-auto max-w-[1220px] px-6 md:px-10">
        <WebdesignSectionHeader
          eyebrow="Unsere Partner-Lösungen"
          title="Wir setzen auf bewährte Technologien und zertifizierte Anbieter."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {domainEmailPartners.map((item, i) => (
            <PartnerCard key={item.name} item={item} index={i} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}
