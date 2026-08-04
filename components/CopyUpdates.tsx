"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";

const consultationBookingUrl =
  "https://api.armsreachdigital.com/widget/booking/3yvXSJo59kMORz5W3H4e";

function ensureStyles() {
  if (document.getElementById("evaluation-results-fixes")) return;
  const style = document.createElement("style");
  style.id = "evaluation-results-fixes";
  style.textContent = `
    body[data-body-reset-page="true"] > header:nth-of-type(2) { display: none !important; }
    body[data-body-reset-page="true"] main { padding-top: 5rem !important; }
    #results-original-intro,
    #results-original-reasons { display: none !important; }
  `;
  document.head.appendChild(style);
}

function normalizeConsultationCtas() {
  Array.from(document.querySelectorAll<HTMLAnchorElement>("a")).forEach((anchor) => {
    const text = anchor.textContent?.trim().toLowerCase() ?? "";
    const href = anchor.getAttribute("href") ?? "";
    if (
      href === "#calendar-booking-link-needed" ||
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

function findReasonsBlock(results: HTMLElement): HTMLElement | null {
  const heading = Array.from(results.querySelectorAll<HTMLElement>("p, h2, h3, h4")).find(
    (node) => node.textContent?.trim().toLowerCase() === "why this recommendation came up",
  );
  return heading?.closest<HTMLElement>("div.rounded-[18px]") ?? null;
}

function findRecommendationName(results: HTMLElement): string {
  const label = Array.from(results.querySelectorAll<HTMLElement>("p")).find(
    (node) => node.textContent?.trim().toLowerCase() === "recommended series",
  );
  const container = label?.parentElement?.parentElement ?? label?.parentElement;
  return container?.querySelector<HTMLElement>("h2, h3")?.textContent?.trim() || "Susie's recommended series";
}

function applyResultsLayout() {
  const results = document.getElementById("results") as HTMLElement | null;
  const claim = document.getElementById("claim") as HTMLElement | null;

  if (!results) {
    if (claim) claim.style.display = "";
    document.getElementById("personalized-results-summary")?.remove();
    return;
  }

  if (claim) claim.style.display = "none";

  const originalIntro = Array.from(results.children).find((child) =>
    /Susie['’]s Recommendation/i.test(child.textContent ?? ""),
  ) as HTMLElement | undefined;
  if (originalIntro) originalIntro.id = "results-original-intro";

  const reasonsBlock = findReasonsBlock(results);
  if (reasonsBlock) reasonsBlock.id = "results-original-reasons";

  const firstNameInput = document.querySelector<HTMLInputElement>('input[placeholder="First name*"]');
  const firstName = firstNameInput?.value.trim().split(/\s+/)[0] || "there";
  const recommendationName = findRecommendationName(results);
  const reasons = reasonsBlock
    ? Array.from(reasonsBlock.querySelectorAll<HTMLLIElement>("li"))
        .map((item) => item.textContent?.trim())
        .filter((item): item is string => Boolean(item))
    : [];

  const signature = JSON.stringify({ firstName, recommendationName, reasons });
  let summary = document.getElementById("personalized-results-summary") as HTMLElement | null;

  if (!summary) {
    summary = document.createElement("section");
    summary.id = "personalized-results-summary";
    summary.className =
      "mx-auto mb-6 max-w-5xl rounded-[22px] border border-purple/15 bg-white p-5 shadow-[0_8px_24px_rgba(60,40,80,0.06)] md:p-7";
    results.parentElement?.insertBefore(summary, results);
  }

  if (summary.dataset.signature === signature) return;
  summary.dataset.signature = signature;

  const bullets = reasons
    .map(
      (reason) =>
        `<li class="flex items-start gap-3 font-sans text-sm font-light leading-relaxed text-muted"><span class="mt-1 text-purple">•</span><span>${reason}</span></li>`,
    )
    .join("");

  summary.innerHTML = `
    <p class="section-label mb-3">Your Personalized Recommendation</p>
    <h1 class="font-serif text-3xl font-light leading-tight text-[#2c1f14] md:text-5xl">${firstName}...</h1>
    <p class="mt-3 font-sans text-sm font-light leading-relaxed text-muted md:text-base">Based on what you shared:</p>
    ${bullets ? `<ul class="mt-4 space-y-2">${bullets}</ul>` : ""}
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
}

function applyFixes() {
  if (window.location.pathname !== "/body-reset") return;
  document.body.dataset.bodyResetPage = "true";
  ensureStyles();
  normalizeConsultationCtas();
  applyResultsLayout();
}

export default function CopyUpdates() {
  const isBodyReset = typeof window !== "undefined" && window.location.pathname === "/body-reset";

  useEffect(() => {
    let scheduled = false;
    const run = () => {
      scheduled = false;
      applyFixes();
    };
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(run);
    };

    schedule();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return isBodyReset ? <Navbar /> : null;
}
