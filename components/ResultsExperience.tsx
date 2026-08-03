"use client";

import { useEffect } from "react";

const consultationBookingUrl =
  "https://api.armsreachdigital.com/widget/booking/3yvXSJo59kMORz5W3H4e";

function getFirstName(): string {
  const input = document.querySelector<HTMLInputElement>('input[placeholder="First name*"]');
  const value = input?.value.trim() ?? "";
  return value.split(/\s+/)[0] || "there";
}

function findReasonsBlock(results: HTMLElement): HTMLElement | null {
  const heading = Array.from(results.querySelectorAll<HTMLElement>("p, h2, h3, h4")).find(
    (element) => element.textContent?.trim().toLowerCase() === "why this recommendation came up",
  );
  return heading?.closest<HTMLElement>("div.rounded-[18px]") ?? null;
}

function findRecommendationName(results: HTMLElement): string {
  const recommendedHeading = Array.from(results.querySelectorAll<HTMLElement>("h2, h3")).find((element) => {
    const text = element.textContent?.trim() ?? "";
    return /series|experience/i.test(text) && !/based on what you shared/i.test(text);
  });
  return recommendedHeading?.textContent?.trim() || "the recommended Susie Sculpts series";
}

function normalizeConsultationCtas() {
  Array.from(document.querySelectorAll<HTMLAnchorElement>("a")).forEach((anchor) => {
    const text = anchor.textContent?.trim().toLowerCase() ?? "";
    if (
      text === "book consult" ||
      text === "schedule a free consultation" ||
      text === "book a free consultation" ||
      text === "book your free professional consult"
    ) {
      anchor.textContent = "Book Your FREE Professional Consult";
      anchor.href = consultationBookingUrl;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    }
  });
}

function applyResultsExperience() {
  if (window.location.pathname !== "/body-reset") return;

  normalizeConsultationCtas();

  const results = document.getElementById("results") as HTMLElement | null;
  const claim = document.getElementById("claim") as HTMLElement | null;

  if (!results) {
    if (claim) claim.style.display = "";
    return;
  }

  if (claim) claim.style.display = "none";

  const reasonsBlock = findReasonsBlock(results);
  const reasonItems = reasonsBlock
    ? Array.from(reasonsBlock.querySelectorAll<HTMLLIElement>("li"))
        .map((item) => item.textContent?.trim())
        .filter((item): item is string => Boolean(item))
    : [];

  const recommendationName = findRecommendationName(results);
  const firstName = getFirstName();

  let summary = document.getElementById("personalized-results-summary") as HTMLElement | null;
  if (!summary) {
    summary = document.createElement("section");
    summary.id = "personalized-results-summary";
    summary.className =
      "mb-5 rounded-[20px] border border-purple/15 bg-white/90 p-5 shadow-[0_8px_24px_rgba(60,40,80,0.06)] md:p-7";
    results.prepend(summary);
  }

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
    <h1 class="font-serif text-3xl font-light leading-tight text-[#2c1f14] md:text-5xl">${firstName}...</h1>
    <p class="mt-3 font-sans text-sm font-light leading-relaxed text-muted md:text-base">Based on what you shared:</p>
    ${bullets}
    <div class="mt-5 rounded-[16px] border border-purple/15 bg-purple/5 p-4 md:p-5">
      <p class="font-sans text-sm font-medium leading-relaxed text-[#2c1f14] md:text-base">My recommendation is <span class="text-purple">${recommendationName}</span>.</p>
    </div>
    <div class="mt-5 grid gap-5 md:grid-cols-2">
      <div>
        <p class="section-label mb-2">Important Note</p>
        <p class="font-sans text-sm font-light leading-relaxed text-muted">This is not a diagnosis. It is a starting-point recommendation designed to make your first conversation with Susie more useful.</p>
      </div>
      <div>
        <p class="section-label mb-2">What Happens Next</p>
        <p class="font-sans text-sm font-light leading-relaxed text-muted">I will confirm the right series and number of sessions after we meet in person and I fully understand your goals, comfort level, and budget.</p>
      </div>
    </div>`;

  const originalIntro = Array.from(results.children).find((child) => {
    const text = child.textContent ?? "";
    return text.includes("Susie's Recommendation") || text.includes("Susie’s Recommendation");
  }) as HTMLElement | undefined;
  if (originalIntro && originalIntro.id !== "personalized-results-summary") originalIntro.style.display = "none";

  if (reasonsBlock) reasonsBlock.style.display = "none";
}

export default function ResultsExperience() {
  useEffect(() => {
    let scheduled = false;

    const run = () => {
      scheduled = false;
      applyResultsExperience();
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(run);
    };

    schedule();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
