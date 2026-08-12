"use client";

import { useEffect } from "react";

const ultimateScheduleDisclaimer =
  "Designed as a one-week experience: two treatments per day, every other day, for three treatment days total. Susie will confirm the treatment order and schedule with you.";

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

function polishLeadHero() {
  const route = document.querySelector<HTMLElement>(".body-reset-route");
  if (!route) return;

  const heroImage = route.querySelector<HTMLImageElement>('img[alt="Woman looking thoughtfully in the mirror"]');
  const heroSection = heroImage?.closest("section");
  if (!heroImage || !heroSection) return;

  heroImage.style.objectPosition = "50% 24%";

  const heading = heroSection.querySelector<HTMLElement>("h1");
  if (heading) {
    heading.classList.remove("text-[38px]");
    heading.classList.add("text-[40px]");
  }

  const intro = Array.from(heroSection.querySelectorAll<HTMLParagraphElement>("p")).find((paragraph) =>
    paragraph.textContent?.trim().startsWith("Enter your information"),
  );
  if (intro) {
    intro.innerHTML = '<span class="block">Answer five quick questions and receive Susie’s professional</span><span class="block">starting point recommendation.</span>';
    intro.classList.add("max-w-2xl");
  }

  const freeLine = Array.from(heroSection.querySelectorAll<HTMLParagraphElement>("p")).find((paragraph) =>
    paragraph.textContent?.trim().toLowerCase().startsWith("free."),
  );
  if (freeLine) freeLine.textContent = "Free. Private. No Pressure.";

  const consentLabel = Array.from(heroSection.querySelectorAll<HTMLLabelElement>("label")).find((label) =>
    label.textContent?.includes("follow-up messages about my evaluation"),
  );
  if (consentLabel && consentLabel.dataset.copyPolished !== "true") {
    Array.from(consentLabel.childNodes)
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .forEach((node) => node.remove());
    consentLabel.append(document.createTextNode("I agree to receive follow-up messages about my evaluation."));
    consentLabel.dataset.copyPolished = "true";
  }
}

function useSmartPunctuation() {
  const route = document.querySelector<HTMLElement>(".body-reset-route");
  if (!route) return;

  const walker = document.createTreeWalker(route, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const value = node.nodeValue ?? "";
    const polished = value
      .replace(/\"YOU\"/g, "“YOU”")
      .replace(/Susie's/g, "Susie’s");
    if (polished !== value) node.nodeValue = polished;
    node = walker.nextNode();
  }
}

function useStarBullets() {
  const route = document.querySelector<HTMLElement>(".body-reset-route");
  if (!route) return;

  Array.from(route.querySelectorAll<HTMLUListElement>("ul")).forEach((list) => {
    list.classList.add("list-none");
    Array.from(list.children).forEach((child) => {
      if (!(child instanceof HTMLLIElement) || child.dataset.starBullet === "true") return;

      child.classList.add("flex", "items-start", "gap-2");
      const star = document.createElement("span");
      star.textContent = "✦";
      star.setAttribute("aria-hidden", "true");
      star.className = "shrink-0 text-purple";
      child.prepend(star);
      child.dataset.starBullet = "true";
    });
  });
}

function applyBodyResetPresentationFixes() {
  if (window.location.pathname !== "/body-reset") return;
  polishLeadHero();
  useSmartPunctuation();
  useStarBullets();
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
