"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { SCROLL_NAV_OFFSET, scrollToHash, scrollToTop } from "@/lib/scroll-to-hash";

function forceScrollTop(lenis?: Lenis) {
  scrollToTop();
  lenis?.scrollTo(0, { immediate: true });
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    registerGsap();

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    ScrollTrigger.clearScrollMemory?.();

    const initialHash = window.location.hash;

    if (prefersReducedMotion()) {
      if (initialHash) {
        scrollToHash(initialHash);
      } else {
        scrollToTop();
      }
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const scrollToInitialHash = () => {
      if (initialHash) {
        scrollToHash(initialHash, { lenis, offset: SCROLL_NAV_OFFSET });
      } else {
        forceScrollTop(lenis);
      }
    };

    scrollToInitialHash();

    const onLenisRefresh = () => lenis.resize();

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.addEventListener("refresh", onLenisRefresh);
    lenis.on("scroll", ScrollTrigger.update);

    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    const onHashLinkClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: SCROLL_NAV_OFFSET });
      history.pushState(null, "", href);
    };

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash, { lenis, offset: SCROLL_NAV_OFFSET });
      }
      ScrollTrigger.refresh();
    });
    document.addEventListener("click", onHashLinkClick);

    const t1 = window.setTimeout(() => {
      if (window.location.hash) {
        scrollToHash(window.location.hash, { lenis, offset: SCROLL_NAV_OFFSET });
      }
      ScrollTrigger.refresh();
    }, 0);
    const t2 = window.setTimeout(() => {
      if (window.location.hash) {
        scrollToHash(window.location.hash, { lenis, offset: SCROLL_NAV_OFFSET });
      }
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onHashLinkClick);
      ScrollTrigger.removeEventListener("refresh", onLenisRefresh);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.scrollerProxy(document.body, {});
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return children;
}
