"use client";

import { useState } from "react";
import { GsapStaggerGrid } from "@/components/gsap/stagger-grid";
import { GsapTextReveal } from "@/components/gsap/text-reveal";
import { OsFeatureIcon } from "@/components/os-feature-icon";
import { ScrollReveal } from "@/components/scroll-reveal";
import { osFeatures } from "@/lib/data";

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group relative bg-surface-dark p-10 transition-colors hover:bg-white/[0.03]"
      data-cursor="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <OsFeatureIcon type={icon} active={hovered} />
      <h3 className="mt-10 text-xl font-medium tracking-[-0.01em] text-accent-cream">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-[22px] text-white/55">{desc}</p>
    </article>
  );
}

export function AeskenOsSection() {
  return (
    <section id="aesken-os" className="relative overflow-hidden bg-surface-dark py-44" data-cursor-bg="dark">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(232,226,214) 0%, transparent 0%), linear-gradient(180deg, rgb(232,226,214) 0%, transparent 0%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-10">
        <ScrollReveal className="mb-20 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">— Aesken OS</p>
            <h2 className="text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.03em]">
              <GsapTextReveal
                as="span"
                trigger="scroll"
                stagger={0.05}
                text="Alles an"
                className="block text-accent-cream"
              />
              <GsapTextReveal
                as="span"
                trigger="scroll"
                delay={0.1}
                stagger={0.05}
                text="einem Ort."
                className="block italic text-accent-cream/50"
              />
            </h2>
          </div>
          <p className="max-w-[433px] text-base leading-[26px] text-white/55">
            Statt komplexer Systeme verbinden wir die wichtigsten Bereiche deines Unternehmens
            – damit Design, Marketing, Betrieb und Wachstum besser zusammenarbeiten.
          </p>
        </ScrollReveal>

        <GsapStaggerGrid
          className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {osFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </GsapStaggerGrid>
      </div>
    </section>
  );
}
