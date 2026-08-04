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
    applyResultEnhancements();

    let mutationTimer: number | undefined;
    const observer = new MutationObserver(() => {
      window.clearTimeout(mutationTimer);
      mutationTimer = window.setTimeout(() => {
        readSavedStatus();
        applyResultEnhancements();
      }, 100);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const style = document.createElement("style");
    style.id = "body-reset-responsive-hero";
    style.textContent = `
      @media (min-width: 1024px) and (orientation: landscape) {
        .body-reset-route main > section:first-child {
          padding-left: 1.5rem !important;
          padding-right: 1.5rem !important;
        }
        .body-reset-route main > section:first-child > div > div {
          min-height: 0 !important;
          height: clamp(620px, calc(100vh - 80px), 760px) !important;
          max-height: 760px !important;
        }
        .body-reset-route main > section:first-child > div > div > div {
          display: grid !important;
          grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr) !important;
          min-height: 100% !important;
          height: 100% !important;
          align-items: center !important;
          gap: clamp(2rem, 4vw, 4rem) !important;
          padding: clamp(2rem, 3.5vw, 3.5rem) !important;
        }
        .body-reset-route main > section:first-child h1 {
          max-width: 720px !important;
          font-size: clamp(3.25rem, 4.7vw, 5.1rem) !important;
          line-height: 0.95 !important;
        }
        .body-reset-route main > section:first-child form {
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
