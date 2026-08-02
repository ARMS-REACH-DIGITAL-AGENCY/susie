"use client";

import { useLayoutEffect } from "react";

const recommendationNames: Record<string, string> = {
  ultimate: 'The Ultimate "YOU" Experience',
  muscle: "Muscle + Strength + Tone Series",
  body: "Body Contouring Series",
  fascia: "Fascia and Skin Revival Series",
  pelvic: "Pelvic Floor Strengthening Series",
  lymphatic: "Lymphatic Wellness Series",
  pemf: "PEMF Recovery and Wellness Series",
};

export default function ReturningVisitorResults() {
  useLayoutEffect(() => {
    if (document.getElementById("results")) return;

    const savedKey = localStorage.getItem("susie-sculpts-recommendation");
    const savedName = savedKey ? recommendationNames[savedKey] : null;
    const claim = document.getElementById("claim");
    if (!savedName || !claim) return;

    claim.style.display = "none";

    const results = document.createElement("div");
    results.id = "results";
    results.className = "mx-auto max-w-5xl px-4 pb-12 pt-24 sm:px-6";
    results.innerHTML = `<div class="sr-only">Previous recommendation: ${savedName}</div>`;
    claim.insertAdjacentElement("afterend", results);

    return () => {
      results.remove();
      claim.style.display = "";
    };
  }, []);

  return null;
}
