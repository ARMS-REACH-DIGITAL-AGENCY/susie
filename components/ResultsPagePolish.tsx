"use client";

import { useEffect } from "react";

const consultationBookingUrl =
  "https://api.armsreachdigital.com/widget/booking/3yvXSJo59kMORz5W3H4e";

function firstNameOnly(value: string) {
  return value.trim().split(/\s+/)[0] || "there";
}

function findRecommendationSection() {
  return Array.from(document.querySelectorAll<HTMLElement>("section, div")).find((element) =>
    element.textContent?.includes("Susie’s Recommended Series"),
  );
}

function findReasonsBlock() {
  const heading = Array.from(document.querySelectorAll<HTMLElement>("p, h2, h3, h4")).find(
    (element) => element.textContent?.trim().toLowerCase() === "why this recommendation came up",
  );
  return heading?.closest("div.rounded-[18px]") ?? heading?.parentElement?.parentElement ?? null;
}

function findDisplayedName() {
  const greeting = Array.from(document.querySelectorAll<HTMLElement>("h1, h2, h3, p")).find((element) =>
    /^Hi,\s+/i.test(element.textContent?.trim() ?? ""),
  );
  const match = greeting?.textContent?.trim().match(/^Hi,\s+([^.!?]+)/i);
  return firstNameOnly(match?.[1] ?? "there");
}

function normalizeConsultButtons() {
  Array.from(document.querySelectorAll<HTMLAnchorElement>("a")).forEach((anchor) => {
    const text = anchor.textContent?.trim().toLowerCase() ?? "";
    if (
      text === "book consult" ||
      text === "schedule a free consultation" ||
      text === "book a free consultation" ||
      text === "book your free professional consult"
    ) {
      anchor.textContent = "Book Your FREE Professional Consult";
      anchor.setAttribute("href", consultationBookingUrl);
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    }
  });
}

function personalizeVisibleGreetings() {
  Array.from(document.querySelectorAll<HTMLElement>("h1, h2, h3, p")).forEach((element) => {
    const text = element.textContent?.trim() ?? "";
    const match = text.match(/^Hi,\s+([^.!?]+)([.!?].*)$/i);
    if (!match) return;
    const first = firstNameOnly(match[1]);
    element.textContent = `Hi, ${first}${match[2]}`;
  });
}

function buildPersonalizedSummary() {
  const results = document.getElementById("results");
  if (!results) return;

  document.body.dataset.resultsVisible = "true";

  const claim = document.getElementById("claim");
  if (claim) claim.style.display = "none";

  const recommendationSection = findRecommendationSection();
  const reasonsBlock = findReasonsBlock();
  if (!recommendationSection || !reasonsBlock) return;

  const recommendationTitle = Array.from(
    recommendationSection.querySelectorAll<HTMLElement>("h1, h2, h3"),
  ).find((element) => /Series|Experience/.test(element.textContent ?? ""))?.textContent?.trim();
  if (!recommendationTitle) return;

  const reasonItems = Array.from(reasonsBlock.querySelectorAll("li"))
    .map((item) => item.textContent?.trim())
    .filter((item): item is string => Boolean(item));

  let summary = document.getElementById("personalized-recommendation-summary");
  if (!summary) {
    summary = document.createElement("section");
    summary.id = "personalized-recommendation-summary";
    summary.className =
      "mx-auto mb-6 max-w-6xl rounded-[22px] border border-purple/15 bg-white p-5 shadow-[0_8px_24px_rgba(60,40,80,0.06)] md:p-7";
    results.insertBefore(summary, results.firstChild);
  }

  const firstName = findDisplayedName();
  const bullets = reasonItems.length
    ? `<ul class="mt-4 space-y-2">${reasonItems
        .map(
          (reason) =>
            `<li class="flex items-start gap-3 font-sans text-sm font-light leading-relaxed text-muted"><span class="mt-1 text-purple">•</span><span>${reason}</span></li>`,
        )
        .join("")}</ul>`
    : "";

  summary.innerHTML = `
    <p class="section-label mb-3">Your Personalized Recommendation</p>
    <h2 class="font-serif text-3xl font-light text-[#2c1f14] md:text-4xl">${firstName}...</h2>
    <p class="mt-3 font-sans text-sm font-light leading-relaxed text-muted">Based on what you shared:</p>
    ${bullets}
    <div class="mt-5 rounded-[16px] border border-purple/15 bg-purple/5 p-4">
      <p class="font-sans text-sm font-medium text-[#2c1f14]">My recommendation is <span class="text-purple">${recommendationTitle}</span>.</p>
    </div>
    <div class="mt-5 grid gap-4 md:grid-cols-2">
      <div>
        <p class="section-label mb-2">Important Note</p>
        <p class="font-sans text-sm font-light leading-relaxed text-muted">This is not a diagnosis. It is a starting-point recommendation designed to make your first conversation with Susie more useful.</p>
      </div>
      <div>
        <p class="section-label mb-2">What Happens Next</p>
        <p class="font-sans text-sm font-light leading-relaxed text-muted">I will confirm the right series and number of sessions after we meet in person and I fully understand your goals, comfort level, and budget.</p>
      </div>
    </div>`;

  reasonsBlock.style.display = "none";
  const compact = document.getElementById("compact-recommendation-reasons");
  if (compact) compact.style.display = "none";
}

function ensureResultsStyles() {
  if (document.getElementById("results-page-polish-styles")) return;
  const style = document.createElement("style");
  style.id = "results-page-polish-styles";
  style.textContent = `
    body[data-results-visible="true"] > header:first-of-type { display: block !important; }
    body[data-results-visible="true"] main { padding-top: 5rem !important; }
  `;
  document.head.appendChild(style);
}

function applyResultsPolish() {
  if (window.location.pathname !== "/body-reset") return;
  ensureResultsStyles();
  personalizeVisibleGreetings();
  normalizeConsultButtons();
  buildPersonalizedSummary();
}

export default function ResultsPagePolish() {
  useEffect(() => {
    let scheduled = false;
    const run = () => {
      scheduled = false;
      applyResultsPolish();
    };
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(run);
    };

    schedule();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
