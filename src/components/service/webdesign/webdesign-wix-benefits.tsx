"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { webdesignWixBenefits } from "@/lib/webdesign-service-data";

const ACCENTS = ["#F4A4B8", "#F5C98A", "#A8E6CF", "#9DB8F5"] as const;
const PLATFORM_TAGS = ["Responsive", "CMS", "Animationen", "SEO-ready"] as const;

const getFloatTransition = (delay: number, distance = 5) => ({
  y: [0, -distance, 0],
  transition: {
    duration: 3.2 + delay * 0.4,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
  },
});

function StudioPlayground({ reduce }: { reduce: boolean | null }) {
  const [activeTag, setActiveTag] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springX = useSpring(pointerX, { stiffness: 180, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 180, damping: 22 });
  const glowX = useTransform(springX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(springY, [0, 1], ["5%", "95%"]);
  const spotlight = useMotionTemplate`radial-gradient(180px circle at ${glowX} ${glowY}, rgba(157,184,245,0.22), transparent 70%)`;

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <motion.div
      ref={panelRef}
      className="relative mt-8 overflow-hidden rounded-[20px] border border-black/[0.06] bg-[#fafafa] p-5"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointerX.set(0.5);
        pointerY.set(0.5);
        setActiveTag(null);
      }}
      whileHover={reduce ? undefined : { borderColor: "rgba(0,0,0,0.1)" }}
    >
      {!reduce && (
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} aria-hidden />
      )}

      <p className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-black/40">
        Plattform-Vorteile
      </p>

      <div className="relative mt-4 flex flex-wrap gap-2">
        {PLATFORM_TAGS.map((tag, i) => {
          const accent = ACCENTS[i];
          const isActive = activeTag === i;

          return (
            <motion.button
              key={tag}
              type="button"
              className="relative rounded-full border bg-white px-3 py-1.5 text-xs font-medium text-black/60 outline-none"
              style={{ borderColor: isActive ? `${accent}80` : "rgba(0,0,0,0.08)" }}
              animate={
                reduce
                  ? undefined
                  : isActive
                    ? {
                        y: -3,
                        scale: 1.08,
                        backgroundColor: `${accent}18`,
                        color: "#161618",
                        boxShadow: `0 8px 20px ${accent}25`,
                      }
                    : {
                        y: [0, -3, 0],
                        scale: 1,
                        backgroundColor: "#ffffff",
                        color: "rgba(0,0,0,0.6)",
                        boxShadow: "0 0 0 rgba(0,0,0,0)",
                      }
              }
              transition={
                isActive
                  ? { type: "spring", stiffness: 420, damping: 20 }
                  : { ...getFloatTransition(i * 0.35, 3).transition, backgroundColor: { duration: 0.2 } }
              }
              onPointerEnter={() => setActiveTag(i)}
              onFocus={() => setActiveTag(i)}
              onBlur={() => setActiveTag(null)}
              whileTap={reduce ? undefined : { scale: 0.95 }}
            >
              <motion.span
                className="mr-1.5 inline-block size-1.5 rounded-full"
                style={{ backgroundColor: accent }}
                animate={reduce ? undefined : isActive ? { scale: [1, 1.4, 1] } : { scale: 1, opacity: 0.7 }}
                transition={{ duration: 0.6, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
                aria-hidden
              />
              {tag}
            </motion.button>
          );
        })}
      </div>

      {/* Mini playful canvas */}
      <div className="relative mt-5 flex h-[72px] items-end justify-center gap-2 rounded-xl bg-white/80 px-4 pb-3 pt-4">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-8 origin-bottom rounded-t-md"
            style={{
              backgroundColor: `${ACCENTS[i]}${activeTag === i ? "cc" : "55"}`,
              height: 16 + i * 10,
            }}
            animate={
              reduce
                ? undefined
                : activeTag === i
                  ? { scaleY: [1, 1.35, 1], y: [0, -4, 0] }
                  : activeTag === null
                    ? { scaleY: [1, 1.12, 0.92, 1], y: [0, -2, 0, 0] }
                    : { scaleY: 0.75, opacity: 0.45 }
            }
            transition={{
              duration: activeTag === i ? 0.55 : 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
          />
        ))}
        {!reduce && (
          <motion.div
            className="absolute left-4 top-3 h-2 w-14 rounded-full bg-black/[0.06]"
            animate={{ scaleX: [1, 1.08, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
        )}
      </div>
    </motion.div>
  );
}

function BenefitCard({
  item,
  index,
  focused,
  anyFocused,
  onFocus,
  reduce,
}: {
  item: (typeof webdesignWixBenefits)[number];
  index: number;
  focused: boolean;
  anyFocused: boolean;
  onFocus: (index: number | null) => void;
  reduce: boolean | null;
}) {
  const accent = ACCENTS[index];

  return (
    <motion.article
      className="group relative cursor-default overflow-hidden rounded-[20px] border bg-[#fafafa] p-5"
      style={{
        borderColor: focused ? `${accent}55` : "rgba(0,0,0,0.06)",
        boxShadow: focused ? `0 16px 40px ${accent}18, 0 4px 16px rgba(0,0,0,0.04)` : "0 1px 2px rgba(0,0,0,0.03)",
      }}
      animate={
        reduce
          ? undefined
          : focused
            ? { y: -8, scale: 1.03 }
            : anyFocused
              ? { y: 0, scale: 0.98, opacity: 0.82 }
              : { y: [0, -4, 0] }
      }
      transition={
        focused || anyFocused
          ? { type: "spring", stiffness: 360, damping: 24 }
          : getFloatTransition(index * 0.5, 4).transition
      }
      onPointerEnter={() => onFocus(index)}
      onPointerLeave={() => onFocus(null)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{ background: `radial-gradient(120% 80% at 0% 0%, ${accent}14, transparent 65%)` }}
        animate={{ opacity: focused && !reduce ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        aria-hidden
      />

      <motion.span
        className="absolute left-0 top-5 w-1 rounded-r-full"
        style={{ backgroundColor: accent }}
        animate={{
          height: focused ? 52 : 40,
          opacity: focused ? 1 : 0.85,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        aria-hidden
      />

      <div className="relative pl-3">
        <motion.p
          className="text-[11px] font-bold uppercase tracking-wider text-black/30"
          animate={focused && !reduce ? { color: accent, x: 2 } : { color: "rgba(0,0,0,0.3)", x: 0 }}
          transition={{ duration: 0.25 }}
        >
          0{index + 1}
        </motion.p>

        <h3 className="mt-2 text-base font-semibold text-[#161618]">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-black/55">{item.desc}</p>

        <motion.div
          className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: accent }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: focused && !reduce ? 1 : 0, y: focused && !reduce ? 0 : 6 }}
          transition={{ duration: 0.25 }}
        >
          <motion.span
            animate={focused && !reduce ? { x: [0, 4, 0] } : { x: 0 }}
            transition={{ duration: 1.2, repeat: focused ? Infinity : 0, ease: "easeInOut" }}
          >
            →
          </motion.span>
          Mehr erfahren
        </motion.div>
      </div>

      {/* Playful orb */}
      {!reduce && (
        <motion.span
          className="pointer-events-none absolute -right-3 -top-3 size-16 rounded-full opacity-40 blur-2xl"
          style={{ backgroundColor: accent }}
          animate={
            focused
              ? { scale: [1, 1.25, 1], opacity: [0.35, 0.55, 0.35] }
              : { scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }
          }
          transition={{ duration: focused ? 1.8 : 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          aria-hidden
        />
      )}
    </motion.article>
  );
}

export function WebdesignWixBenefits() {
  const reduce = useReducedMotion();
  const [focusedCard, setFocusedCard] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden border-y border-black/[0.06] bg-white py-20 md:py-28" data-cursor-bg="light">
      <motion.div
        className="pointer-events-none absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 translate-x-1/3 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #9DB8F530, transparent 70%)" }}
        animate={reduce ? undefined : { x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -left-20 top-24 h-[280px] w-[280px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #F4A4B828, transparent 70%)" }}
        animate={reduce ? undefined : { x: [0, 12, 0], y: [0, 18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1220px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <ScrollReveal>
            <motion.span
              className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/45"
              whileHover={reduce ? undefined : { color: "#161618" }}
            >
              <motion.span
                className="size-1.5 rounded-full bg-[#9DB8F5]"
                animate={reduce ? undefined : { scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              Warum Wix Studio?
            </motion.span>

            <h2 className="mt-4 font-[family-name:var(--font-instrument)] text-[clamp(2rem,4.2vw,3.125rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#161618]">
              Professionelles Design.
              <motion.span
                className="block text-black/40"
                animate={reduce ? undefined : { opacity: [0.4, 0.65, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Einfache Pflege.
              </motion.span>
            </h2>

            <p className="mt-5 max-w-[460px] text-base leading-[1.7] text-black/55">
              Wix Studio ist unsere Plattform der Wahl für Unternehmen, die eine hochwertige Website
              wollen – ohne komplizierte Technik im Alltag.
            </p>

            <div className="hidden lg:block">
              <StudioPlayground reduce={reduce} />
            </div>
          </ScrollReveal>

          <div
            className="grid gap-4 sm:grid-cols-2"
            onPointerLeave={() => setFocusedCard(null)}
          >
            {webdesignWixBenefits.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <BenefitCard
                  item={item}
                  index={i}
                  focused={focusedCard === i}
                  anyFocused={focusedCard !== null}
                  onFocus={setFocusedCard}
                  reduce={reduce}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Mobile platform playground */}
          <div className="lg:hidden">
            <StudioPlayground reduce={reduce} />
          </div>
        </div>
      </div>
    </section>
  );
}
