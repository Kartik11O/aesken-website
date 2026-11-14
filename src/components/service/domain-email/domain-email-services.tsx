"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebdesignSectionHeader } from "@/components/service/webdesign/webdesign-section-header";
import { DOMAIN_EMAIL_ACCENT, domainEmailServices } from "@/lib/domain-email-service-data";

function BrowserPreview() {
  return (
    <div className="flex h-full flex-col bg-[#101828] p-4">
      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-[#ff6467]" />
        <span className="size-2 rounded-full bg-[#fdc700]" />
        <span className="size-2 rounded-full bg-[#05df72]" />
        <div className="ml-2 flex flex-1 items-center gap-1.5 rounded bg-[#364153] px-2.5 py-1.5">
          <svg width="9" height="9" viewBox="0 0 24 24" aria-hidden className="text-[#d1d5dc]">
            <path
              d="M12 2l7 3.5v6c0 4.5-3 7.5-7 10.5-4-3-7-6-7-10.5v-6L12 2z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <span className="text-[9px] text-[#d1d5dc]">www.IhreFirma.de</span>
        </div>
      </div>
      <div className="mt-3 flex-1 rounded-t-xl bg-white p-3">
        <div className="mb-2.5 flex items-center justify-between">
          <div className="h-2.5 w-10 rounded bg-[#1e2939]" />
          <div className="flex gap-1.5">
            <div className="h-1.5 w-6 rounded bg-[#e5e7eb]" />
            <div className="h-1.5 w-6 rounded bg-[#e5e7eb]" />
            <div className="h-1.5 w-6 rounded bg-[#e5e7eb]" />
          </div>
        </div>
        <div className="mb-1.5 h-2 w-32 rounded bg-[#364153]" />
        <div className="mb-1 h-1.5 w-44 rounded bg-[#e5e7eb]" />
        <div className="mb-3 h-1.5 w-36 rounded bg-[#e5e7eb]" />
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-[#1e2939]" />
          <div className="h-5 w-16 rounded-full border border-[#e5e7eb] bg-[#f3f4f6]" />
        </div>
      </div>
    </div>
  );
}

function MailPreview() {
  return (
    <div className="flex h-full flex-col bg-[#f3f3f3] p-4">
      <div className="flex-1 rounded-xl border border-[#e5e7eb] bg-white p-3 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="mb-2.5 flex items-center justify-between border-b border-[#f3f4f6] pb-2">
          <div className="flex size-5 items-center justify-center rounded bg-[#2b7fff]">
            <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden className="text-white">
              <rect x="3" y="5.5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[9px] font-bold text-[#161618]">info@ihrfirma.de</span>
          <div className="flex gap-1">
            <span className="size-2.5 rounded-full bg-[#ffa2a2]" />
            <span className="size-2.5 rounded-full bg-[#ffdf20]" />
            <span className="size-2.5 rounded-full bg-[#7bf1a8]" />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-[#eff6ff] px-2.5 py-1.5">
          <span className="text-[9px] font-bold text-[#155dfc]">Posteingang</span>
          <span className="flex size-3.5 items-center justify-center rounded-full bg-[#2b7fff] text-[8px] font-bold text-white">3</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 px-1 py-1.5">
          <svg width="9" height="9" viewBox="0 0 24 24" aria-hidden className="text-[#7a7a7c]">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[9px] text-[#7a7a7c]">Gesendet</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between rounded-xl px-2.5 py-1.5">
          <span className="text-[9px] text-[#7a7a7c]">Entwürfe</span>
          <span className="flex size-3.5 items-center justify-center rounded-full bg-[#2b7fff] text-[8px] font-bold text-white">1</span>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({
  item,
  index,
  reduce,
}: {
  item: (typeof domainEmailServices)[number];
  index: number;
  reduce: boolean | null;
}) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <motion.article
        className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
        whileHover={reduce ? undefined : { y: -6 }}
        transition={{ type: "spring", stiffness: 340, damping: 26 }}
      >
        <div className="h-[190px] overflow-hidden border-b border-black/[0.06]">
          {item.preview === "browser" ? <BrowserPreview /> : <MailPreview />}
        </div>

        <div className="flex flex-1 flex-col p-7">
          <h3 className="text-lg font-bold leading-snug text-[#161618]">{item.title}</h3>
          <p className="mt-2 text-[13px] leading-[1.7] text-black/50">{item.desc}</p>

          <ul className="mt-5 space-y-2.5">
            {item.items.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-[#161618]">
                <span
                  className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[9px]"
                  style={{ backgroundColor: `${DOMAIN_EMAIL_ACCENT}55` }}
                  aria-hidden
                >
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </ScrollReveal>
  );
}

export function DomainEmailServices() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-white py-20 md:py-28" data-cursor-bg="light" id="leistungen">
      <div className="mx-auto max-w-[1220px] px-6 md:px-10">
        <WebdesignSectionHeader
          eyebrow="Unsere Leistungen"
          title="Alles aus einer Hand — vollständig und zuverlässig umgesetzt."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {domainEmailServices.map((item, i) => (
            <ServiceCard key={item.title} item={item} index={i} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}
