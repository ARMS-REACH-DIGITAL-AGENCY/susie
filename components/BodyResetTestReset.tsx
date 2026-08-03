"use client";

import { useLayoutEffect } from "react";

const evaluationStorageKeys = [
  "susie-sculpts-recommendation",
  "susie-sculpts-recommendation-context",
];

function clearEvaluationState() {
  evaluationStorageKeys.forEach((key) => localStorage.removeItem(key));
  document.body.removeAttribute("data-evaluation-complete");
}

export default function BodyResetTestReset() {
  useLayoutEffect(() => {
    if (window.location.pathname !== "/body-reset") return;

    clearEvaluationState();

    const handlePageShow = (event: PageTransitionEvent) => {
      clearEvaluationState();
      if (event.persisted) window.location.reload();
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  return null;
}
