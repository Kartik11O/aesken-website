"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { serviceOfferings } from "@/lib/service-data";

function ServiceIcon({ type }: { type: string }) {
  const paths: Record<string, React.ReactNode> = {
    browser: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="6.5" cy="7" r="0.75" fill="currentColor" />
        <circle cx="8.5" cy="7" r="0.75" fill="currentColor" />
      </>
    ),
    integration: (
      <>
        <path
          d="M8 7v4a2 2 0 002 2h4M16 7v4a2 2 0 01-2 2h-4"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    legal: (
      <>
        <path
          d="M8 4h8l2 4v10H6V8l2-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
        />
        <path d="M9 12h6M9 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    domain: (
      <>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M4 12h16M12 4a12 12 0 010 16M12 4a12 12 0 000 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </>
    ),
    seo: (
      <path
        d="M4 17l5-9 4 5 3-5 4 9"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    support: (
      <>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M12 4v2M12 18v2M4 12h2M18 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  };

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      {paths[type] ?? paths.browser}
    </svg>
  );
}

function ServiceOfferingCard({ item }: { item: (typeof serviceOfferings)[number] }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="group/card relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-[#f0f0f2] bg-white p-6 shadow-[0_1px_1px_rgba(0,0,0,0.04),0_6px_20px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow,transform] duration-300 ease-out hover:border-black/[0.08] hover:shadow-[0_4px_8px_rgba(0,0,0,0.04),0_20px_48px_rgba(0,0,0,0.08)]"
      style={{ "--accent": item.accent } as React.CSSProperties}
      whileHover={reduce ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse 90% 80% at 50% 0%, ${item.accent}38, transparent 72%)`,
        }}
      />

      <div
        className="relative flex size-10 shrink-0 items-center justify-center rounded-xl text-[#161618] transition-[transform,box-shadow] duration-300 group-hover/card:scale-[1.06]"
        style={{
          backgroundColor: `${item.accent}42`,
          boxShadow: "0 0 0 0 transparent",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover/card:opacity-70"
          aria-hidden
          style={{ backgroundColor: item.accent }}
        />
        <span className="relative">
          <ServiceIcon type={item.icon} />
        </span>
      </div>

      <h3 className="relative mt-5 text-base font-semibold leading-snug text-[#161618]">
        {item.title}
      </h3>

      <p className="relative mt-2 flex-1 text-sm leading-[1.65] text-black/55">
        {item.desc}
      </p>

      <div className="relative mt-5">
        <Link
          href={"href" in item && item.href ? item.href : "#contact"}
          data-cursor="link"
          className="inline-flex items-center gap-2 text-sm font-medium text-black/75 transition-colors duration-300 hover:text-black"
        >
          Mehr lesen
          <span className="flex size-6 items-center justify-center rounded-full bg-black/[0.05] text-[11px] transition-[transform,background-color] duration-300 group-hover/card:translate-x-0.5 group-hover/card:bg-[color-mix(in_srgb,var(--accent)_28%,#f5f5f5)]">
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}

export function ServiceOfferings() {
  return (
    <section className="bg-white py-20 md:py-24" data-cursor-bg="light" id="services">
      <div className="mx-auto max-w-[1220px] px-6 md:px-10">
        <ScrollReveal>
          <span className="inline-block rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-black/50">
            Unsere Dienstleistungen
          </span>
          <h2 className="mt-4 max-w-[900px] font-[family-name:var(--font-instrument)] text-[clamp(1.875rem,3.5vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#161618]">
            Wie wir Ihrem Unternehmen beim Wachsen helfen.
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceOfferings.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.06}>
              <ServiceOfferingCard item={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
