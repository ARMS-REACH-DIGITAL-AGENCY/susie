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

    const readState = () => {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as { status?: string } | null;
        setShowReset(saved?.status === "results");
      } catch {
        setShowReset(false);
      }
    };

    readState();
    const observer = new MutationObserver(readState);
    observer.observe(document.body, { childList: true, subtree: true });

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
