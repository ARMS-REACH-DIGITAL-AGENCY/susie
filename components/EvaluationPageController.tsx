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

    const recoveryTimer = window.setTimeout(() => {
      const main = document.querySelector(".body-reset-route main");
      const visibleText = main?.textContent?.trim() || "";
      const alreadyRecovered = sessionStorage.getItem("susie-body-reset-recovered") === "1";

      if (visibleText.length < 40 && !alreadyRecovered) {
        sessionStorage.setItem("susie-body-reset-recovered", "1");
        localStorage.removeItem(STORAGE_KEY);
        window.location.replace("/body-reset?recovered=1");
      }
    }, 1800);

    const style = document.createElement("style");
    style.id = "body-reset-desktop-hero-fixes";
    style.textContent = `
      @media (min-width: 1024px) {
        .body-reset-route main > section:first-child > div > div {
          min-height: calc(100vh - 5rem) !important;
        }
        .body-reset-route main > section:first-child > div > div > div {
          min-height: calc(100vh - 5rem) !important;
          align-items: center !important;
          padding-top: 3rem !important;
          padding-bottom: 3rem !important;
        }
        .body-reset-route main > section:first-child h1 {
          font-size: clamp(3.4rem, 5vw, 5.8rem) !important;
          line-height: .94 !important;
          max-width: 760px !important;
        }
        .body-reset-route main > section:first-child form {
          max-width: 520px;
          width: 100%;
          justify-self: end;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      observer.disconnect();
      window.clearTimeout(mutationTimer);
      window.clearTimeout(recoveryTimer);
      style.remove();
    };
  }, []);

  function resetEvaluation() {
    sessionStorage.removeItem("susie-body-reset-recovered");
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
