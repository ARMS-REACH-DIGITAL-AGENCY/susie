"use client";

import { useEffect } from "react";

const BACK_SELECTOR = '#full-treatment-list div[role="button"][aria-label^="Flip "]';

function stickyTop() {
  return window.innerWidth >= 768 ? 88 : 72;
}

function cardFor(back: HTMLElement) {
  return back.parentElement?.parentElement as HTMLElement | null;
}

function normalizePurchaseLabels() {
  document.querySelectorAll<HTMLAnchorElement>(".body-reset-route a").forEach((link) => {
    const label = link.textContent?.trim();
    if (!label?.startsWith("Choose ")) return;
    link.textContent = label.replace(/^Choose\s+/, "Purchase ");
  });
}

function prepareCard(back: HTMLElement) {
  const inner = back.parentElement;
  const card = cardFor(back);
  if (!inner || !card) return;

  card.dataset.resultsCard = "true";
  back.dataset.resultsCardBack = "true";

  const front = Array.from(inner.children).find((child) => child.tagName === "BUTTON") as HTMLButtonElement | undefined;
  if (!front) return;

  front.dataset.resultsCardFront = "true";

  let header = card.querySelector<HTMLElement>(":scope > .results-card-shared-header");
  if (!header) {
    header = document.createElement("div");
    header.className = "results-card-shared-header";
    header.setAttribute("aria-hidden", "true");

    const eyebrow = document.createElement("p");
    eyebrow.className = "results-card-shared-eyebrow";
    eyebrow.textContent = front.querySelector("p")?.textContent?.trim() || "Treatment Series";

    const title = document.createElement("p");
    title.className = "results-card-shared-title";
    title.textContent = front.querySelector("h3")?.textContent?.trim() || "";

    header.append(eyebrow, title);
    card.insertBefore(header, inner);
  }
}

export default function ResultsCardScrollCoordinator() {
  useEffect(() => {
    let frame = 0;

    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        normalizePurchaseLabels();
        const top = stickyTop();

        document.querySelectorAll<HTMLElement>(BACK_SELECTOR).forEach((back) => {
          prepareCard(back);
          const card = cardFor(back);
          if (!card) return;

          const rect = card.getBoundingClientRect();
          const aligned = Math.abs(rect.top - top) <= 10;
          back.dataset.scrollActive = aligned ? "true" : "false";
        });
      });
    };

    const handleCardClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;

      const front = target.closest<HTMLElement>("[data-results-card-front='true']");
      if (front) {
        const card = front.closest<HTMLElement>("[data-results-card='true']");
        const back = card?.querySelector<HTMLElement>("[data-results-card-back='true']");
        const scroller = back?.querySelector<HTMLElement>(":scope > section");
        if (scroller) scroller.scrollTop = 0;

        if (card) {
          requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const distance = rect.top - stickyTop();
            if (Math.abs(distance) > 2) {
              window.scrollTo({ top: window.scrollY + distance, behavior: "smooth" });
            } else if (back) {
              back.dataset.scrollActive = "true";
            }
          });
        }
        return;
      }

      const back = target.closest<HTMLElement>("[data-results-card-back='true']");
      if (!back || target.closest("a")) return;

      const scroller = back.querySelector<HTMLElement>(":scope > section");
      requestAnimationFrame(() => {
        if (scroller) scroller.scrollTop = 0;
      });
    };

    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    document.addEventListener("click", handleCardClick, true);
    sync();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      document.removeEventListener("click", handleCardClick, true);
    };
  }, []);

  return null;
}
