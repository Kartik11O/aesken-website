/** Sticky nav height offset when scrolling to in-page sections */
export const SCROLL_NAV_OFFSET = -72;

export function scrollToTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
}

export function getHashTarget(hash: string | null): HTMLElement | null {
  if (!hash || hash === "#") return null;
  return document.getElementById(hash.replace(/^#/, ""));
}

type LenisLike = {
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { offset?: number; immediate?: boolean },
  ) => void;
};

export function scrollToHash(
  hash: string | null,
  options?: { offset?: number; lenis?: LenisLike | null; immediate?: boolean },
) {
  const target = getHashTarget(hash);
  const offset = options?.offset ?? SCROLL_NAV_OFFSET;

  if (!target) {
    scrollToTop();
    return;
  }

  if (options?.lenis) {
    options.lenis.scrollTo(target, { offset, immediate: options.immediate ?? false });
    return;
  }

  const y = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo(0, Math.max(0, y));
}
