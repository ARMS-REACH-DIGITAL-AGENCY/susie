"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "susie-sculpts-evaluation-v2";

export default function EvaluationPageController() {
  const [showReset, setShowReset] = useState(false);

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

    const readSavedStatus = () => {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as { status?: string } | null;
        setShowReset(saved?.status === "results");
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setShowReset(false);
      }
    };

    let landingWasActive = false;

    const syncEvaluationStageClasses = () => {
      const landingFormButton = Array.from(document.querySelectorAll<HTMLButtonElement>("button")).find((button) =>
        button.textContent?.toLowerCase().includes("receive my free evaluation"),
      );
      const landingIsActive = Boolean(landingFormButton);
      const pageText = document.body.textContent ?? "";
      const quizIsActive = !landingIsActive && /ASK SUSIE EVALUATION/i.test(pageText) && /\d\s+OF\s+5/i.test(pageText);

      document.body.classList.toggle("evaluation-landing-active", landingIsActive);
      document.body.classList.toggle("evaluation-quiz-active", quizIsActive);

      if (landingWasActive && quizIsActive) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          });
        });
      }

      landingWasActive = landingIsActive;
    };

    const applyResultEnhancements = () => {
      const allElements = Array.from(document.querySelectorAll<HTMLElement>("p, div, a"));

      const seriesLabel = allElements.find(
        (element) => element.textContent?.trim().toUpperCase() === "6-TREATMENT SERIES",
      );
      if (seriesLabel) seriesLabel.textContent = "COMPLETE EXPERIENCE";

      const durationLine = allElements.find((element) =>
        element.textContent?.toUpperCase().includes("PER NULL-MINUTE TREATMENT"),
      );
      if (durationLine) durationLine.textContent = "SIX TREATMENTS SCHEDULED OVER APPROXIMATELY ONE WEEK";

      const ultimateButton = Array.from(document.querySelectorAll<HTMLAnchorElement>("a")).find((element) =>
        element.textContent?.toUpperCase().includes("I WANT THE ULTIMATE"),
      );

      if (ultimateButton && !document.getElementById("ultimate-scheduling-note")) {
        const note = document.createElement("div");
        note.id = "ultimate-scheduling-note";
        note.className =
          "mb-3 mt-3 rounded-sm bg-stone/70 px-3 py-3 text-left font-sans text-[11px] font-light leading-relaxed text-muted";
        note.innerHTML =
          '<strong class="font-medium text-[#2c1f14]">Scheduling note:</strong> This package is not intended to be completed in one day. Susie generally recommends two treatments per day, every other day—such as Monday, Wednesday, and Friday—over approximately one week.';
        ultimateButton.parentElement?.insertBefore(note, ultimateButton);
      }
    };

    readSavedStatus();
    syncEvaluationStageClasses();
    applyResultEnhancements();

    let mutationTimer: number | undefined;
    const observer = new MutationObserver(() => {
      window.clearTimeout(mutationTimer);
      mutationTimer = window.setTimeout(() => {
        readSavedStatus();
        syncEvaluationStageClasses();
        applyResultEnhancements();
      }, 50);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const style = document.createElement("style");
    style.id = "body-reset-responsive-hero";
    style.textContent = `
      @media (max-width: 767px) {
        .body-reset-route.evaluation-quiz-active main > section:first-child {
          padding-top: 5rem !important;
        }
        .body-reset-route.evaluation-quiz-active main > section:first-child > div {
          scroll-margin-top: 5rem !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child > div > div {
          min-height: calc(100svh - 4rem) !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child > div > div > div.absolute.inset-0 {
          background: linear-gradient(180deg, rgba(30,20,16,.12) 0%, rgba(30,20,16,.28) 30%, rgba(30,20,16,.72) 58%, rgba(20,12,10,.96) 100%) !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child > div > div > div.relative.z-10 {
          min-height: calc(100svh - 4rem) !important;
          padding: 4.5rem 1.25rem 1rem !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child h1 {
          font-size: clamp(2.05rem, 9.2vw, 2.45rem) !important;
          line-height: .94 !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child h1 + p {
          margin-top: .65rem !important;
          font-size: .82rem !important;
          line-height: 1.45 !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child h1 + p + p {
          margin-top: .4rem !important;
          font-size: .86rem !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child form {
          margin-top: .8rem !important;
          padding: .75rem !important;
          border-radius: 1rem !important;
          background: rgba(25,16,14,.42) !important;
          backdrop-filter: blur(5px) !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child form .space-y-2\\.5 > :not([hidden]) ~ :not([hidden]) {
          margin-top: .45rem !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child form .input-field {
          min-height: 3rem !important;
          padding: .7rem .9rem !important;
          font-size: .95rem !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child form label {
          color: rgba(255,255,255,.92) !important;
          font-size: .66rem !important;
          line-height: 1.35 !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child form label input {
          flex: 0 0 auto !important;
          width: 1.1rem !important;
          height: 1.1rem !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child form button[type="submit"] {
          min-height: 3rem !important;
          padding-top: .65rem !important;
          padding-bottom: .65rem !important;
        }
      }

      @media (min-width: 768px) and (max-width: 1023px) {
        .body-reset-route.evaluation-landing-active main > section:first-child > div > div > div {
          padding-top: 7.5rem !important;
        }
      }

      @media (min-width: 1024px) and (orientation: landscape) {
        .body-reset-route.evaluation-landing-active main > section:first-child {
          padding-left: 1.5rem !important;
          padding-right: 1.5rem !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child > div > div {
          min-height: 0 !important;
          height: clamp(620px, calc(100vh - 80px), 760px) !important;
          max-height: 760px !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child > div > div > div {
          display: grid !important;
          grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr) !important;
          min-height: 100% !important;
          height: 100% !important;
          align-items: center !important;
          gap: clamp(2rem, 4vw, 4rem) !important;
          padding: clamp(2rem, 3.5vw, 3.5rem) !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child h1 {
          max-width: 720px !important;
          font-size: clamp(3.25rem, 4.7vw, 5.1rem) !important;
          line-height: 0.95 !important;
        }
        .body-reset-route.evaluation-landing-active main > section:first-child form {
          width: 100% !important;
          max-width: 470px !important;
          margin-top: 0 !important;
          justify-self: end !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      observer.disconnect();
      window.clearTimeout(mutationTimer);
      document.body.classList.remove("evaluation-landing-active");
      document.body.classList.remove("evaluation-quiz-active");
      style.remove();
    };
  }, []);

  function resetEvaluation() {
    localStorage.removeItem(STORAGE_KEY);
    window.location.assign("/body-reset");
  }

  if (!showReset) return null;

  return (
    <button
      type="button"
      onClick={resetEvaluation}
      className="fixed bottom-24 right-4 z-[70] rounded-full border border-purple/20 bg-white px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.08em] text-purple shadow-lg transition hover:bg-purple hover:text-white"
    >
      Start a New Evaluation
    </button>
  );
}
