"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { Logo } from "@/components/logo";
import { gsap, registerGsap } from "@/lib/gsap";
import { navLinks } from "@/lib/data";

export function SiteNav() {
  const reduce = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (reduce || !headerRef.current) return;

      gsap.fromTo(
        headerRef.current,
        {
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          borderBottomColor: "rgba(0,0,0,0)",
        },
        {
          boxShadow: "0 1px 0 rgba(0,0,0,0.08)",
          borderBottomColor: "rgba(0,0,0,0.08)",
          ease: "none",
          scrollTrigger: {
            trigger: "main",
            start: "top top",
            end: "+=120",
            scrub: 0.3,
          },
        },
      );
    },
    { scope: headerRef, dependencies: [reduce] },
  );

  return (
    <motion.header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-transparent bg-white/90 backdrop-blur-md"
      data-cursor-bg="light"
      initial={reduce ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-10">
        <Link href="/" aria-label="Aesken home" data-cursor="link">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor="link"
              className="group relative text-sm text-black/70 transition-colors hover:text-black"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <Link
          href="#contact"
          data-cursor="button"
          className="group flex items-center gap-1.5 text-sm text-black transition-opacity hover:opacity-70"
        >
          Contact
          <motion.span
            aria-hidden
            animate={reduce ? undefined : { x: [0, 3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </Link>
      </div>
    </motion.header>
  );
}
