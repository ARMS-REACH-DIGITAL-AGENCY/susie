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
    const text = anchor.textContent?.trim() ?? "";
    if (/ultimate\s+(?:["“”])?you(?:["“”])?\s+experience/i.test(text)) {
      anchor.textContent = text
        .replace(/ULTIMATE\s+(?:["“”])?YOU(?:["“”])?\s+EXPERIENCE/g, "ULTIMATE “YOU” EXPERIENCE")
        .replace(/Ultimate\s+(?:["“”])?YOU(?:["“”])?\s+Experience/g, "Ultimate “YOU” Experience");
    }
  });
}

function polishLeadHero() {
  const route = document.querySelector<HTMLElement>(".body-reset-route");
  if (!route) return;

  const heroImage = route.querySelector<HTMLImageElement>('img[alt="Woman looking thoughtfully in the mirror"]');
  const heroSection = heroImage?.closest("section");
  if (!heroImage || !heroSection) return;

  const pill = Array.from(heroSection.querySelectorAll<HTMLParagraphElement>("p")).find(
    (paragraph) => paragraph.textContent?.trim().toLowerCase() === "see what susie says",
  );
  pill?.remove();

  const main = heroSection.closest<HTMLElement>("main");
  const heroFrame = heroImage.parentElement as HTMLElement | null;

  heroImage.style.objectPosition = "50% 24%";

  if (window.matchMedia("(max-width: 1023px)").matches) {
    if (main) main.style.paddingBottom = "0";
    if (heroFrame) heroFrame.style.minHeight = "calc(100svh - 1rem)";
  }

  const heading = heroSection.querySelector<HTMLElement>("h1");
  if (heading) {
    heading.classList.remove("text-[38px]");
    heading.classList.add("text-[40px]");

    const titleBlock = heading.parentElement;
    const contentBlock = titleBlock?.parentElement;
    if (contentBlock && window.matchMedia("(max-width: 1023px)").matches) {
      contentBlock.style.minHeight = "calc(100svh - 1rem)";
      contentBlock.classList.remove("translate-y-3");
    }
  }

  const intro = Array.from(heroSection.querySelectorAll<HTMLParagraphElement>("p")).find((paragraph) =>
    paragraph.textContent?.trim().startsWith("Enter your information"),
  );
  if (intro) {
    intro.innerHTML = '<span class="block whitespace-nowrap">Answer five quick questions and receive Susie’s</span><span class="block whitespace-nowrap">professional starting point recommendation.</span>';
    intro.classList.remove("text-[14px]", "leading-relaxed");
    intro.classList.add("max-w-none", "text-[12px]", "leading-[1.45]", "tracking-[-0.01em]", "sm:text-base");
  }

  const freeLine = Array.from(heroSection.querySelectorAll<HTMLParagraphElement>("p")).find((paragraph) =>
    paragraph.textContent?.trim().toLowerCase().startsWith("free."),
  );
  if (freeLine) freeLine.textContent = "Free. Private. No Pressure.";

}

function useSmartPunctuation() {
  const route = document.querySelector<HTMLElement>(".body-reset-route");
  if (!route) return;

  const walker = document.createTreeWalker(route, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const value = node.nodeValue ?? "";
    const polished = value
      .replace(/ULTIMATE\s+(?:["“”])?U(?:["“”])?\s+EXPERIENCE/g, "ULTIMATE “YOU” EXPERIENCE")
      .replace(/ULTIMATE\s+(?:["“”])?YOU(?:["“”])?\s+EXPERIENCE/g, "ULTIMATE “YOU” EXPERIENCE")
      .replace(/Ultimate\s+(?:["“”])?U(?:["“”])?\s+Experience/g, "Ultimate “YOU” Experience")
      .replace(/Ultimate\s+(?:["“”])?YOU(?:["“”])?\s+Experience/g, "Ultimate “YOU” Experience")
      .replace(/\"YOU\"/g, "“YOU”")
      .replace(/Susie's/g, "Susie’s")
      .replace(/(\$[\d,]+)\.00\b/g, "$1");
    if (polished !== value) node.nodeValue = polished;
    node = walker.nextNode();
  }
}

function serifUltimateYou() {
  const route = document.querySelector<HTMLElement>(".body-reset-route");
  if (!route) return;

  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(route, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (
      node instanceof Text &&
      node.nodeValue?.includes("“YOU”") &&
      !(node.parentElement?.closest('[data-ultimate-you-serif="true"]'))
    ) {
      textNodes.push(node);
    }
    node = walker.nextNode();
  }

  textNodes.forEach((textNode) => {
    const value = textNode.nodeValue ?? "";
    const pieces = value.split("“YOU”");
    if (pieces.length < 2) return;

    const fragment = document.createDocumentFragment();
    pieces.forEach((piece, index) => {
      if (piece) fragment.append(document.createTextNode(piece));
      if (index < pieces.length - 1) {
        const quotedYou = document.createElement("span");
        quotedYou.textContent = "“YOU”";
        quotedYou.className = "font-serif";
        quotedYou.dataset.ultimateYouSerif = "true";
        fragment.append(quotedYou);
      }
    });
    textNode.replaceWith(fragment);
  });
}

function normalizeStarBullets() {
  const route = document.querySelector<HTMLElement>(".body-reset-route");
  if (!route) return;

  Array.from(route.querySelectorAll<HTMLUListElement>("ul")).forEach((list) => {
    list.classList.add("list-none");
    Array.from(list.children).forEach((child) => {
      if (!(child instanceof HTMLLIElement)) return;

      const indicators = Array.from(child.children).filter((element) => {
        const text = element.textContent?.trim();
        return text === "✦" || text === "•";
      });

      if (indicators.length === 1 && indicators[0].textContent?.trim() === "✦" && child.dataset.starBullet === "true") return;

      indicators.forEach((indicator) => indicator.remove());
      const star = document.createElement("span");
      star.textContent = "✦";
      star.setAttribute("aria-hidden", "true");
      star.className = "shrink-0 text-purple";
      child.prepend(star);
      child.dataset.starBullet = "true";
    });
  });
}

function polishPricingCards() {
  const route = document.querySelector<HTMLElement>(".body-reset-route");
  if (!route) return;

  Array.from(route.querySelectorAll<HTMLParagraphElement>("p")).forEach((paragraph) => {
    const text = paragraph.textContent?.trim() ?? "";

    if (/^\$[\d,]+$/.test(text)) {
      paragraph.classList.add("text-right");
      paragraph.style.textAlign = "right";

      const row = paragraph.parentElement;
      if (!row || row.dataset.priceLayoutPolished === "true") return;

      const leftColumn = Array.from(row.children).find((child) => child !== paragraph && child instanceof HTMLElement) as HTMLElement | undefined;
      const details = leftColumn?.querySelector<HTMLElement>("div.text-xs");
      if (details) {
        Array.from(details.querySelectorAll<HTMLParagraphElement>("p")).forEach((detailLine) => {
          detailLine.style.whiteSpace = "nowrap";
        });
        details.classList.add("mt-1", "w-full");
        row.insertAdjacentElement("afterend", details);
      }

      row.dataset.priceLayoutPolished = "true";
    }
  });
}

function applyBodyResetPresentationFixes() {
  if (window.location.pathname !== "/body-reset") return;
  polishLeadHero();
  useSmartPunctuation();
  serifUltimateYou();
  normalizeStarBullets();
  polishPricingCards();
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
