"use client";

import Link from "next/link";
import { useRef, useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { HeroPanelGrid } from "@/components/hero-panel-grid";
import { GsapTextReveal } from "@/components/gsap/text-reveal";
import { NetworkVisualization } from "@/components/network-visualization";
import type { NetworkPointer } from "@/components/network-scene-3d";
import { StatusDot } from "@/components/status-dot";
import { gsap, registerGsap } from "@/lib/gsap";
import { fadeUp } from "@/lib/motion";

const IDLE_POINTER: NetworkPointer = { x: 0, y: 0, active: false };

export function HeroSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelCaptionRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<NetworkPointer>(IDLE_POINTER);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = panelRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setPointer({ x, y, active: true });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setPointer(IDLE_POINTER);
  }, []);

  useGSAP(
    () => {
      registerGsap();
      if (reduce || !sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      if (headlineRef.current) {
        tl.to(headlineRef.current, { y: -48, ease: "none" }, 0);
      }

      if (panelRef.current) {
        tl.to(panelRef.current, { y: 72, scale: 0.94, ease: "none" }, 0);
      }

      if (panelCaptionRef.current) {
        tl.to(panelCaptionRef.current, { y: 16, ease: "none" }, 0);
      }
    },
    { scope: sectionRef, dependencies: [reduce] },
  );

  return (
    <section ref={sectionRef} className="bg-white pt-12 pb-0" data-cursor-bg="light">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-20 px-10">
        <div
          ref={headlineRef}
          className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between"
        >
          <div className="max-w-[896px]">
            <motion.p
              className="mb-8 text-xs uppercase tracking-[0.3em] text-black/45"
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              animate="visible"
              custom={0}
            >
              THE AESKEN ECOSYSTEM · EST. 2019
            </motion.p>

            <GsapTextReveal
              as="h1"
              trigger="load"
              delay={0.15}
              stagger={0.05}
              split="lines"
              text={"Das vernetzte Ökosystem\nfür moderne Unternehmen."}
              className="max-w-[799px] text-[clamp(3rem,8vw,6.8rem)] font-medium leading-[0.95] tracking-[-0.03em] text-black"
            />
          </div>

          <motion.div
            className="max-w-[432px] shrink-0 space-y-8 lg:pt-36"
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            animate="visible"
            custom={0.16}
          >
            <p className="text-base leading-[26px] text-black/65">
              Aesken vereint vier spezialisierte Abteilungen – Design, SEO, Buchung und
              Webservices – zu einer orchestrierten Infrastruktur für die Unternehmen von
              morgen.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="#capabilities"
                data-cursor="button"
                className="group inline-flex h-12 items-center gap-3 bg-black px-6 text-sm text-white transition-transform hover:scale-[1.02]"
              >
                Explore capabilities
                <motion.span
                  aria-hidden
                  className="inline-block"
                  animate={reduce ? undefined : { x: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
              <Link
                href="#ecosystem"
                data-cursor="link"
                className="text-sm text-black transition-opacity hover:opacity-60"
              >
                The ecosystem
              </Link>
            </div>
          </motion.div>
        </div>

        <div
          ref={panelRef}
          className="relative h-[min(680px,70vh)] overflow-hidden rounded-md bg-surface-dark will-change-transform"
          data-cursor-bg="dark"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(153deg, rgb(26,22,18) 0%, rgb(10,9,8) 50%, rgb(0,0,0) 100%)",
            }}
          />
          <HeroPanelGrid />

          <NetworkVisualization pointer={pointer} onPointerChange={setPointer} />

          <div
            ref={panelCaptionRef}
            className="pointer-events-none absolute inset-x-6 bottom-6 flex items-end justify-between gap-6"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/45">Live system</p>
              <p className="mt-2 text-2xl font-light tracking-[-0.02em] text-accent-cream">
                One infrastructure. Four divisions. Infinite outcomes.
              </p>
            </div>
            <div className="flex items-center gap-2 pb-1">
              <StatusDot variant="dark" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/55">Online</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
