"use client";

import { useEffect } from "react";

const ultimateScheduleDisclaimer =
  "Designed as a one-week experience: two treatments per day, every other day, for three treatment days total. Susie will confirm the treatment order and schedule with you.";

function compactRecommendationFootnote() {
  const heading = Array.from(document.querySelectorAll<HTMLElement>("p, h2, h3, h4")).find(
    (element) => element.textContent?.trim().toLowerCase() === "why this recommendation came up",
  );

  if (!heading) return;

  const section = heading.closest("section");
  if (!section || section.dataset.compactRecommendation === "true") return;

  const reasons = Array.from(section.querySelectorAll("ul li"))
    .map((item) => item.textContent?.trim() ?? "")
    .filter(Boolean);

  const reasonText = reasons.slice(0, 2).join(" ");
  section.dataset.compactRecommendation = "true";
  section.className = "border-t border-purple/15 px-1 pt-3";
  section.innerHTML = `
    <p class="font-sans text-[11px] font-light leading-relaxed text-muted/80 sm:text-xs">
      <span class="font-medium text-purple/80">Why this recommendation:</span>
      ${reasonText}
      <span class="italic">This is a starting-point recommendation, not a diagnosis. Susie will confirm the right series and number of sessions after speaking with you.</span>
    </p>
  `;
}

function replaceUltimateAverageCopy() {
  Array.from(document.querySelectorAll<HTMLElement>("p")).forEach((paragraph) => {
    const text = paragraph.textContent?.trim().toLowerCase() ?? "";
    if (!text.includes("216.17 average per treatment")) return;

    paragraph.textContent = ultimateScheduleDisclaimer;
    paragraph.className = "mt-2 font-sans text-[11px] font-light normal-case leading-relaxed tracking-normal text-muted";
  });
}

function rewriteCheckoutButtons() {
  Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href*="payment-link"]')).forEach((anchor) => {
    const productCard = anchor.closest("div.flex.h-full.flex-col") as HTMLElement | null;
    const familySection = anchor.closest("section") as HTMLElement | null;
    if (!productCard || !familySection) return;

    const label = productCard.querySelector("p.section-label")?.textContent?.trim() ?? "";
    const familyName = familySection.querySelector("h3")?.textContent?.trim() ?? "Treatment";

    if (familyName.toLowerCase().includes("ultimate")) {
      anchor.textContent = "I WANT THE ULTIMATE YOU EXPERIENCE";
      return;
    }

    const countMatch = label.match(/(\d+)-Treatment/i);
    const count = countMatch?.[1] ?? (label.toLowerCase().includes("single") ? "1" : "20");
    const treatmentName = familyName.replace(/\s+Series$/i, "").toUpperCase();
    anchor.textContent = `I WANT ${count} ${treatmentName} ${count === "1" ? "TREATMENT" : "TREATMENTS"}`;
  });
}

function polishLeadCaptureHero() {
  const pageMain = document.querySelector<HTMLElement>(".body-reset-route main");
  if (!pageMain) return;

  const heroHeading = Array.from(pageMain.querySelectorAll<HTMLHeadingElement>("h1")).find((heading) =>
    heading.textContent?.includes("Feel puffy, tired"),
  );
  if (!heroHeading) return;

  const heroSection = heroHeading.closest("section");
  if (!heroSection) return;
  heroSection.dataset.aestheticHero = "true";

  const intro = Array.from(heroSection.querySelectorAll<HTMLParagraphElement>("p")).find((paragraph) =>
    paragraph.textContent?.includes("Enter your information"),
  );
  if (intro) {
    intro.textContent = "Answer five quick questions and receive Susie’s professional starting-point recommendation.";
    intro.classList.add("max-w-[34rem]");
  }

  const trustLine = Array.from(heroSection.querySelectorAll<HTMLParagraphElement>("p")).find((paragraph) =>
    paragraph.textContent?.trim().toLowerCase().startsWith("free. private."),
  );
  if (trustLine) trustLine.textContent = "Free. Private. No Pressure.";

  const consentLabel = Array.from(heroSection.querySelectorAll<HTMLLabelElement>("label")).find((label) =>
    label.textContent?.includes("I agree to receive follow-up messages about my evaluation"),
  );
  if (consentLabel) {
    const checkbox = consentLabel.querySelector<HTMLInputElement>('input[type="checkbox"]');
    const textNode = Array.from(consentLabel.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
    if (textNode) textNode.textContent = "I agree to receive follow-up messages about my evaluation.";
    if (checkbox) checkbox.setAttribute("aria-label", "I agree to receive follow-up messages about my evaluation.");
  }

  const heroImage = heroSection.querySelector<HTMLImageElement>('img[alt="Woman looking thoughtfully in the mirror"]');
  if (heroImage) heroImage.style.objectPosition = "center 22%";
}

function useStarBulletsEverywhere() {
  Array.from(document.querySelectorAll<HTMLElement>(".body-reset-route ul li > span:first-child")).forEach((marker) => {
    const text = marker.textContent?.trim();
    if (text === "•" || text === "·" || text === "●") marker.textContent = "✦";
  });
}

function injectAestheticStyles() {
  if (document.getElementById("body-reset-aesthetic-polish")) return;
  const style = document.createElement("style");
  style.id = "body-reset-aesthetic-polish";
  style.textContent = `
    .body-reset-route [data-aesthetic-hero="true"] h1 {
      font-size: 40px !important;
      line-height: .98 !important;
    }
    .body-reset-route [data-aesthetic-hero="true"] img[alt="Woman looking thoughtfully in the mirror"] {
      object-position: center 22% !important;
    }
    @media (min-width: 640px) {
      .body-reset-route [data-aesthetic-hero="true"] h1 { font-size: 3rem !important; }
    }
    @media (min-width: 1024px) {
      .body-reset-route [data-aesthetic-hero="true"] h1 { font-size: 3.75rem !important; }
    }
  `;
  document.head.appendChild(style);
}

function applyBodyResetPresentationFixes() {
  if (window.location.pathname !== "/body-reset") return;
  injectAestheticStyles();
  polishLeadCaptureHero();
  useStarBulletsEverywhere();
  replaceUltimateAverageCopy();
  rewriteCheckoutButtons();
}

export default function BodyResetPresentationFixes() {
  useEffect(() => {
    if (window.location.pathname !== "/body-reset") return;

    let applying = false;
    const options: MutationObserverInit = { childList: true, subtree: true };
    const observer = new MutationObserver(() => {
      if (applying) return;
      applying = true;
      observer.disconnect();
      try {
        applyBodyResetPresentationFixes();
      } finally {
        observer.observe(document.body, options);
        applying = false;
      }
    });

    applyBodyResetPresentationFixes();
    observer.observe(document.body, options);
    return () => observer.disconnect();
  }, []);

  return null;
}
