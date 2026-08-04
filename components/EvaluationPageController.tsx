"use client";

import { useEffect } from "react";

const STORAGE_KEY = "susie-sculpts-evaluation-v2";

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

    return () => style.remove();
  }, []);

  return null;
}
