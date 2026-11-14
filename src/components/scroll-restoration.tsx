"use client";

import { useLayoutEffect } from "react";
import { scrollToHash, scrollToTop } from "@/lib/scroll-to-hash";

export function ScrollRestoration() {
  useLayoutEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      requestAnimationFrame(() => scrollToHash(hash));
      const retry = window.setTimeout(() => scrollToHash(hash), 200);
      return () => window.clearTimeout(retry);
    }

    scrollToTop();
  }, []);

  return null;
}
