"use client";

import { useEffect } from "react";

const CARD_SELECTOR = '#full-treatment-list div[role="button"][aria-label^="Flip "]';

function stickyTop() {
  return window.innerWidth >= 768 ? 88 : 72;
}

function cardFor(back: Element) {
  return back.parentElement?.parentElement ?? null;
}

export default function ResultsCardScrollCoordinator() {
  useEffect(() => {
    let frame = 0;

    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const top = stickyTop();
        document.querySelectorAll<HTMLElement>(CARD_SELECTOR).forEach((back) => {
          const card = cardFor(back);
          if (!card) return;

          const rect = card.getBoundingClientRect();
          const active = Math.abs(rect.top - top) <= 12;
          back.dataset.scrollActive = active ? "true" : "false";
        });
      });
    };

    const alignOpenedCard = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const button = target?.closest<HTMLButtonElement>("#full-treatment-list button");
      if (!button) return;

      const inner = button.parentElement;
      if (!inner) return;

      const back = Array.from(inner.children).find((child) => child.matches('[role="button"][aria-label^="Flip "]'));
      if (!back) return;

      const card = inner.parentElement;
      if (!card) return;

      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const top = stickyTop();
        const distance = rect.top - top;

        if (Math.abs(distance) > 2) {
          window.scrollTo({
            top: window.scrollY + distance,
            behavior: "smooth",
          });
        }
      });
    };

    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    document.addEventListener("click", alignOpenedCard, true);
    sync();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      document.removeEventListener("click", alignOpenedCard, true);
    };
  }, []);

  return null;
}
