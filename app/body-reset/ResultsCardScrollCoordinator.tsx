"use client";

import { useEffect } from "react";

const CARD_SELECTOR = ".results-treatment-card";

function stickyTop() {
  return window.innerWidth >= 768 ? 88 : 72;
}

export default function ResultsCardScrollCoordinator() {
  useEffect(() => {
    let frame = 0;

    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const top = stickyTop();
        document.querySelectorAll<HTMLElement>(CARD_SELECTOR).forEach((card) => {
          const rect = card.getBoundingClientRect();
          card.dataset.scrollActive = Math.abs(rect.top - top) <= 12 ? "true" : "false";
        });
      });
    };

    const alignCardOnOpen = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const front = target?.closest<HTMLButtonElement>(".results-treatment-card button");
      const card = front?.closest<HTMLElement>(CARD_SELECTOR);
      if (!front || !card) return;

      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const distance = rect.top - stickyTop();
        if (Math.abs(distance) > 2) {
          window.scrollTo({ top: window.scrollY + distance, behavior: "smooth" });
        }
      });
    };

    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    document.addEventListener("click", alignCardOnOpen, true);
    sync();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      document.removeEventListener("click", alignCardOnOpen, true);
    };
  }, []);

  return null;
}
