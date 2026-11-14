"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { insightPosts } from "@/lib/service-data";

type InsightPost = (typeof insightPosts)[number];

function FeaturedInsightCard({ post }: { post: InsightPost }) {
  const reduce = useReducedMotion();

  return (
    <ScrollReveal>
      <motion.div
        whileHover={reduce ? undefined : { scale: 1.005 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <Link
          href="#"
          data-cursor="card"
          className="group relative block min-h-[420px] overflow-hidden rounded-[28px] sm:min-h-[480px] lg:min-h-[560px]"
        >
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 1024px) 100vw, 65vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
          <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative flex min-h-[420px] flex-col justify-end p-8 sm:min-h-[480px] lg:min-h-[560px] lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] text-white/85 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
              <span className="ml-auto text-[11px] uppercase tracking-[0.18em] text-white/50">
                {post.readTime}
              </span>
            </div>

            <h3 className="mt-5 max-w-2xl font-[family-name:var(--font-instrument)] text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white">
              {post.title}
            </h3>

            <div className="mt-6 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
                Artikel lesen
                <span className="flex size-7 items-center justify-center rounded-full bg-white/15 text-xs">
                  →
                </span>
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </ScrollReveal>
  );
}

function CompactInsightCard({ post }: { post: InsightPost }) {
  const reduce = useReducedMotion();

  return (
    <ScrollReveal delay={0.1}>
      <motion.div
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        <Link
          href="#"
          data-cursor="card"
          className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-black/[0.06] bg-white"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              sizes="(max-width: 1024px) 100vw, 35vw"
            />
          </div>

          <div className="flex flex-1 flex-col p-7 md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] text-black/55"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-black/40">
              {post.readTime}
            </p>

            <h3 className="mt-3 flex-1 font-[family-name:var(--font-instrument)] text-[clamp(1.125rem,2vw,1.4rem)] font-medium leading-snug tracking-[-0.02em] text-black/90 transition-colors group-hover:text-black">
              {post.title}
            </h3>

            <div className="mt-6 border-t border-black/[0.06] pt-5">
              <span className="inline-flex items-center gap-2 text-sm text-black/80 transition-colors group-hover:text-black">
                Mehr lesen
                <span className="flex size-6 items-center justify-center rounded-full bg-black/[0.05] text-xs transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </ScrollReveal>
  );
}

export function ServiceInsights() {
  const featured = insightPosts.find((p) => p.featured) ?? insightPosts[0];
  const secondary = insightPosts.find((p) => !p.featured) ?? insightPosts[1];

  return (
    <section className="bg-[#f7f7f5] pb-20 pt-12 md:pb-24 md:pt-16" data-cursor-bg="light">
      <div className="mx-auto max-w-[1256px] px-6 md:px-[92px]">
        <ScrollReveal className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-block rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-black/50">
              Einblicke
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-instrument)] text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              Wissen für Ihr Wachstum
            </h2>
          </div>
          <Link
            href="#"
            data-cursor="link"
            className="inline-flex items-center gap-2 text-sm font-medium text-black/60 transition-colors hover:text-black"
          >
            Alle Artikel
            <span className="text-base">→</span>
          </Link>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <FeaturedInsightCard post={featured} />
          <CompactInsightCard post={secondary} />
        </div>
      </div>
    </section>
  );
}
