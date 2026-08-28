"use client";

import { useEffect } from "react";

const STORAGE_KEY = "susie-sculpts-evaluation-v3";

type EvaluationState = {
  leadCaptured?: boolean;
  step?: number;
  status?: "quiz" | "results";
};

export default function EvaluationPageController() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("reset") === "1") {
      localStorage.removeItem(STORAGE_KEY);
      params.delete("reset");
      const query = params.toString();
      window.history.replaceState({}, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
      window.location.reload();
      return;
    }

    const readEvaluationState = (): EvaluationState | null => {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as EvaluationState | null;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
    };

    let landingWasActive = false;

    const syncEvaluationStageClasses = () => {
      const saved = readEvaluationState();
      const resultsIsActive = saved?.status === "results";
      const quizIsActive = saved?.leadCaptured === true && saved?.status === "quiz";
      const landingIsActive = !resultsIsActive && !quizIsActive;

      document.body.classList.toggle("evaluation-landing-active", landingIsActive);
      document.body.classList.toggle("evaluation-quiz-active", quizIsActive);
      document.body.classList.toggle("evaluation-results-active", resultsIsActive);

      if (landingWasActive && quizIsActive) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          });
        });
      }

      landingWasActive = landingIsActive;
    };

    syncEvaluationStageClasses();

    let mutationTimer: number | undefined;
    const observer = new MutationObserver(() => {
      window.clearTimeout(mutationTimer);
      mutationTimer = window.setTimeout(syncEvaluationStageClasses, 50);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const style = document.createElement("style");
    style.id = "body-reset-responsive-hero";
    style.textContent = `
      /* Keep quiz and results content below the fixed navigation. */
      .evaluation-quiz-active .body-reset-route > main,
      .evaluation-results-active .body-reset-route > main {
        padding-top: 5rem !important;
      }

      @media (min-width: 768px) {
        .evaluation-quiz-active .body-reset-route > main,
        .evaluation-results-active .body-reset-route > main {
          padding-top: 6rem !important;
        }
      }

      /* Results treatment cards: one card across at every width. */
      .evaluation-results-active #full-treatment-list > div.grid {
        grid-template-columns: minmax(0, 1fr) !important;
      }

      /* Never split the content inside treatment cards into two columns. */
      .evaluation-results-active .body-reset-route main section ul.grid {
        grid-template-columns: minmax(0, 1fr) !important;
      }

      /* Mobile: portrait card sized to the visible viewport. */
      .evaluation-results-active #full-treatment-list > div.grid > div {
        height: calc(100svh - 7rem) !important;
        min-height: 0 !important;
        max-height: 760px !important;
        scroll-margin-top: 5.5rem;
        scroll-margin-bottom: 1.5rem;
      }

      .evaluation-results-active #full-treatment-list > div.grid > div > div {
        height: 100% !important;
        min-height: 0 !important;
      }

      /* Keep the back face fixed inside the card and give its content the scroll. */
      .evaluation-results-active #full-treatment-list [role="button"][aria-label^="Flip "] {
        display: flex !important;
        min-height: 0 !important;
        flex-direction: column !important;
        overflow: hidden !important;
        overscroll-behavior: auto !important;
      }

      .evaluation-results-active #full-treatment-list [role="button"][aria-label^="Flip "] > section {
        min-height: 0 !important;
        flex: 1 1 auto !important;
        overflow-y: auto !important;
        overscroll-behavior-y: auto !important;
        -webkit-overflow-scrolling: touch;
        scrollbar-gutter: stable;
        touch-action: pan-y;
      }

      .evaluation-results-active #full-treatment-list [role="button"][aria-label^="Flip "] > p {
        flex: 0 0 auto !important;
        margin: 0 !important;
        border-top: 1px solid rgba(112, 78, 170, .12);
        background: rgba(250, 247, 244, .96);
      }

      /* Desktop: a full-width landscape card that still fits below the header. */
      @media (min-width: 1024px) {
        .evaluation-results-active #full-treatment-list > div.grid > div {
          height: min(620px, calc(100svh - 9rem)) !important;
          max-height: 620px !important;
          scroll-margin-top: 6.5rem;
        }
      }

      /* Keep the woman's head visible when the hero image is cropped. */
      .evaluation-landing-active .body-reset-route img[alt="Woman looking thoughtfully in the mirror"] {
        object-position: center top !important;
      }

      /* Add contrast behind the approved white hero copy. */
      .evaluation-landing-active .body-reset-route main > section:first-child .text-white h1,
      .evaluation-landing-active .body-reset-route main > section:first-child .text-white > p {
        text-shadow: 0 2px 8px rgba(0,0,0,.72), 0 1px 2px rgba(0,0,0,.9) !important;
      }

      /* The consent copy sits over a dark translucent panel. */
      .evaluation-landing-active .body-reset-route main > section:first-child form label {
        color: rgba(255,255,255,.98) !important;
        text-shadow: 0 1px 3px rgba(0,0,0,.9) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      observer.disconnect();
      window.clearTimeout(mutationTimer);
      document.body.classList.remove("evaluation-landing-active");
      document.body.classList.remove("evaluation-quiz-active");
      document.body.classList.remove("evaluation-results-active");
      style.remove();
    };
  }, []);

  return null;
}
