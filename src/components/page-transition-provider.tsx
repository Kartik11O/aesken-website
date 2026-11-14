"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type TransitionPhase = "idle" | "covering" | "navigating" | "revealing";

function isInternalRoute(href: string) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }

  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin;
  } catch {
    return false;
  }
}

import { scrollToHash, scrollToTop } from "@/lib/scroll-to-hash";

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBottomRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  const phaseRef = useRef<TransitionPhase>("idle");
  const pathnameRef = useRef(pathname);
  const pendingHrefRef = useRef<string | null>(null);
  const hasMountedRef = useRef(false);

  const setBodyLocked = (locked: boolean) => {
    document.body.style.overflow = locked ? "hidden" : "";
  };

  const playReveal = useCallback(() => {
    registerGsap();

    const overlay = overlayRef.current;
    const panelTop = panelTopRef.current;
    const panelBottom = panelBottomRef.current;
    const content = contentRef.current;
    const logo = logoRef.current;
    const line = lineRef.current;
    const grid = gridRef.current;
    const label = labelRef.current;

    if (!overlay || !panelTop || !panelBottom || !content || !logo || !line || !grid || !label) {
      phaseRef.current = "idle";
      pendingHrefRef.current = null;
      setBodyLocked(false);
      return;
    }

    phaseRef.current = "revealing";

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(overlay, { visibility: "hidden", pointerEvents: "none" });
          phaseRef.current = "idle";

          const pending = pendingHrefRef.current;
          pendingHrefRef.current = null;
          setBodyLocked(false);

          if (pending) {
            try {
              const hash = new URL(pending, window.location.origin).hash;
              requestAnimationFrame(() => scrollToHash(hash || null));
            } catch {
              scrollToTop();
            }
          } else {
            scrollToTop();
          }

          ScrollTrigger.refresh();
        },
      })
      .to([logo, label, line], { opacity: 0, y: -8, duration: 0.22, ease: "power2.in" }, 0)
      .to(grid, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0)
      .to(content, { opacity: 0, duration: 0.2 }, 0)
      .to(
        panelTop,
        { scaleY: 0, duration: 0.65, ease: "power4.inOut", transformOrigin: "top center" },
        0.08,
      )
      .to(
        panelBottom,
        { scaleY: 0, duration: 0.65, ease: "power4.inOut", transformOrigin: "bottom center" },
        0.08,
      );
  }, []);

  const playCover = useCallback(
    (href: string) => {
      registerGsap();

      if (prefersReducedMotion()) {
        phaseRef.current = "navigating";
        pendingHrefRef.current = href;
        router.push(href);
        return;
      }

      const overlay = overlayRef.current;
      const panelTop = panelTopRef.current;
      const panelBottom = panelBottomRef.current;
      const content = contentRef.current;
      const logo = logoRef.current;
      const line = lineRef.current;
      const grid = gridRef.current;
      const label = labelRef.current;

      if (!overlay || !panelTop || !panelBottom || !content || !logo || !line || !grid || !label) {
        router.push(href);
        return;
      }

      phaseRef.current = "covering";
      pendingHrefRef.current = href;
      setBodyLocked(true);

      gsap.set(overlay, { visibility: "visible", pointerEvents: "auto" });
      gsap.set([panelTop, panelBottom], { scaleY: 0 });
      gsap.set(content, { opacity: 1 });
      gsap.set(logo, { opacity: 0, y: 12, scale: 0.92 });
      gsap.set(label, { opacity: 0, y: 8 });
      gsap.set(line, { scaleX: 0, opacity: 1 });
      gsap.set(grid, { opacity: 0, backgroundPosition: "0px 0px" });

      gsap
        .timeline({
          onComplete: () => {
            phaseRef.current = "navigating";
            router.push(href);
          },
        })
        .to(
          panelTop,
          { scaleY: 1, duration: 0.62, ease: "power4.inOut", transformOrigin: "top center" },
          0,
        )
        .to(
          panelBottom,
          { scaleY: 1, duration: 0.62, ease: "power4.inOut", transformOrigin: "bottom center" },
          0,
        )
        .to(grid, { opacity: 0.35, duration: 0.45, ease: "power2.out" }, 0.12)
        .to(
          grid,
          { backgroundPosition: "80px 80px", duration: 1.4, ease: "none", repeat: 1 },
          0.12,
        )
        .to(logo, { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: "power3.out" }, 0.28)
        .to(label, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0.36)
        .to(line, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, 0.32);
    },
    [router],
  );

  useEffect(() => {
    pathnameRef.current = pathname;

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    if (phaseRef.current === "navigating") {
      requestAnimationFrame(() => {
        playReveal();
      });
    }
  }, [pathname, playReveal]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (phaseRef.current !== "idle") {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      const anchor = (event.target as Element).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !isInternalRoute(href)) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const url = new URL(href, window.location.origin);
      const path = url.pathname;
      const hash = url.hash;

      if (path === pathnameRef.current) {
        event.preventDefault();
        if (hash) {
          scrollToHash(hash);
        }
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      playCover(url.pathname + url.search + url.hash);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [playCover]);

  return (
    <>
      {children}

      <div
        ref={overlayRef}
        aria-hidden
        className="invisible fixed inset-0 z-[10000] overflow-hidden"
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={panelTopRef}
          className="absolute left-0 top-0 h-1/2 w-full origin-top bg-[#0a0a0a]"
          style={{ transform: "scaleY(0)" }}
        />
        <div
          ref={panelBottomRef}
          className="absolute bottom-0 left-0 h-1/2 w-full origin-bottom bg-[#0a0a0a]"
          style={{ transform: "scaleY(0)" }}
        />

        <div
          ref={gridRef}
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        <div
          ref={contentRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-5"
        >
          <div ref={logoRef} style={{ opacity: 0 }}>
            <Logo variant="light" />
          </div>
          <div className="h-px w-40 overflow-hidden bg-white/15">
            <div ref={lineRef} className="h-full w-full origin-left bg-white/80" style={{ transform: "scaleX(0)" }} />
          </div>
          <p
            ref={labelRef}
            className="text-[11px] uppercase tracking-[0.35em] text-white/45"
            style={{ opacity: 0 }}
          >
            Loading
          </p>
        </div>
      </div>
    </>
  );
}
