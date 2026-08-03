"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";

const consultationBookingUrl =
  "https://api.armsreachdigital.com/widget/booking/3yvXSJo59kMORz5W3H4e";

const deferredUrgency = "When I can afford to invest in my health journey.";

const exactNameReplacements: Array<[string, string]> = [
  ["Synergie Vacuum Massage", "Lymphatic Wellness Series"],
  ["PEMF Recovery & Wellness", "PEMF Recovery and Wellness Series"],
  ["EMShape Neo Body Sculpting", "Muscle + Strength + Tone Series"],
  ["Muscle and Strength and Tone Series", "Muscle + Strength + Tone Series"],
  ["Ultrasonic Cavitation & RF", "Body Contouring Series"],
  ["Fascia & Skin Revival", "Fascia and Skin Revival Series"],
  ["Pelvic Floor Strengthening", "Pelvic Floor Strengthening Series"],
];

const evaluationCopy =
  "I wanna help you figure out where you should start. Everyone doesn't need the same treatment, and I don't want you guessing. Answer these five questions so I can get to know you a little bit better and tell you what I think might work.";

function replaceExactTextNodes(element: HTMLElement, from: string, to: string) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  nodes.forEach((node) => {
    const value = node.nodeValue?.trim();
    if (value === from) node.nodeValue = node.nodeValue!.replace(from, to);
  });
}

function ensureBodyResetStyles() {
  if (document.getElementById("body-reset-compact-styles")) return;

  const style = document.createElement("style");
  style.id = "body-reset-compact-styles";
  style.textContent = `
    body[data-body-reset-page="true"] > header:first-of-type { display: none !important; }
    body[data-body-reset-page="true"] main { padding-top: 0 !important; }
    #quiz-card { padding: 1rem !important; }
    #quiz-card h3 { margin-bottom: .65rem !important; font-size: clamp(1.35rem, 2.2vw, 2rem) !important; line-height: 1.08 !important; }
    #quiz-card .grid { gap: .5rem !important; }
    #quiz-card button { min-height: 0 !important; }
    #quiz-card .grid button { padding: .7rem .85rem !important; font-size: .82rem !important; line-height: 1.2 !important; }
    #quiz-card .grid.grid-cols-2 button { padding: 0 !important; }
    #quiz-card .grid.grid-cols-2 button > div:last-of-type { padding: .55rem .65rem !important; }
    #quiz-card .grid.grid-cols-2 button p:first-child { font-size: .95rem !important; }
    #quiz-card .grid.grid-cols-2 button p:last-child { margin-top: .2rem !important; font-size: .7rem !important; line-height: 1.15 !important; }
    #quiz-card .grid.grid-cols-2 button .relative.aspect-square { aspect-ratio: 1.35 / 1 !important; }
    #quiz-card > div:last-child { margin-top: .85rem !important; }
    #compact-recommendation-reasons { margin-top: .65rem; border-top: 1px solid rgba(107,79,160,.18); padding-top: .65rem; }
    #compact-recommendation-reasons p, #compact-recommendation-reasons li { font-size: .72rem; line-height: 1.3; }
    #compact-recommendation-reasons ul { display: grid; gap: .25rem; margin-top: .35rem; }
    @media (min-width: 768px) {
      #quiz-card { padding: 1.25rem 1.4rem !important; }
      #quiz-card .grid.grid-cols-2 { grid-template-columns: repeat(4,minmax(0,1fr)) !important; }
      #quiz-card .grid.sm\\:grid-cols-2 { grid-template-columns: repeat(3,minmax(0,1fr)) !important; }
      #quiz-card .grid button { font-size: .78rem !important; }
      #quiz-card .grid.grid-cols-2 button .relative.aspect-square { aspect-ratio: 1.55 / 1 !important; }
    }
    @media (max-width: 520px) {
      #quiz-card { padding: .8rem !important; }
      #quiz-card h3 { font-size: 1.25rem !important; }
      #quiz-card .grid button { padding: .58rem .65rem !important; font-size: .76rem !important; }
      #quiz-card .grid.grid-cols-2 button p:last-child { display: none !important; }
      #quiz-card .grid.grid-cols-2 button .relative.aspect-square { aspect-ratio: 1.6 / 1 !important; }
    }
  `;
  document.head.appendChild(style);
}

function restoreConsultationLinks() {
  if (window.location.pathname !== "/body-reset") return;

  Array.from(document.querySelectorAll<HTMLAnchorElement>("a")).forEach((anchor) => {
    const text = anchor.textContent?.trim().toLowerCase() ?? "";
    const href = anchor.getAttribute("href") ?? "";

    if (text === "read testimonials") anchor.setAttribute("href", "#evaluation-testimonials");

    if (
      href === "#calendar-booking-link-needed" ||
      text === "book consult" ||
      text === "book your free professional consult"
    ) {
      anchor.setAttribute("href", consultationBookingUrl);
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
      anchor.textContent = "Book Your FREE Professional Consult";
    }
  });
}

function compactQuizChoices() {
  const quiz = document.getElementById("quiz-card");
  if (!quiz) return;

  const optionButtons = Array.from(quiz.querySelectorAll<HTMLButtonElement>(".grid button"));
  optionButtons.forEach((button) => {
    button.style.borderRadius = "10px";
    button.style.minHeight = "0";
  });
}

function addDeferredUrgencyChoice() {
  const quiz = document.getElementById("quiz-card");
  if (!quiz || !quiz.textContent?.includes("How soon do you want help figuring this out?")) return;
  if (document.getElementById("deferred-urgency-choice")) return;

  const existingChoice = Array.from(quiz.querySelectorAll<HTMLButtonElement>("button")).find((button) =>
    button.textContent?.trim() === "I am curious, but not urgent yet",
  );
  const grid = existingChoice?.parentElement;
  if (!existingChoice || !grid) return;

  const button = document.createElement("button");
  button.id = "deferred-urgency-choice";
  button.type = "button";
  button.textContent = deferredUrgency;
  button.className = existingChoice.className;
  button.style.padding = ".7rem .85rem";
  button.style.fontSize = ".82rem";
  button.style.lineHeight = "1.2";
  button.addEventListener("click", () => {
    document.body.dataset.deferredUrgency = "true";
    existingChoice.click();
    Array.from(grid.querySelectorAll("button")).forEach((candidate) => {
      candidate.removeAttribute("data-custom-selected");
      candidate.style.outline = "";
    });
    button.setAttribute("data-custom-selected", "true");
    button.style.outline = "2px solid #6b4fa0";
  });
  grid.appendChild(button);
}

function rewritePurchaseButtons() {
  Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href*="payment-link"]')).forEach((anchor) => {
    const card = anchor.closest("div.flex.h-full.flex-col") as HTMLElement | null;
    const family = anchor.closest("section") as HTMLElement | null;
    const cardLabel = card?.querySelector("p.section-label")?.textContent?.trim() ?? "";
    const familyName = family?.querySelector("h3")?.textContent?.trim() ?? "Treatment";
    const cleanFamilyName = familyName.replace(/ Series$/i, "");
    const countMatch = cardLabel.match(/(\d+)-Treatment/i);
    const count = countMatch?.[1] ?? (cardLabel.toLowerCase().includes("single") ? "1" : "20");
    anchor.textContent = `I WANT ${count} ${cleanFamilyName.toUpperCase()} ${count === "1" ? "TREATMENT" : "TREATMENTS"}`;
  });
}

function moveRecommendationReasons() {
  const heading = Array.from(document.querySelectorAll<HTMLElement>("p, h2, h3, h4")).find((element) =>
    element.textContent?.trim().toLowerCase() === "why this recommendation came up",
  );
  if (!heading) return;

  const sourceBlock = heading.closest("div.rounded-[18px]") ?? heading.parentElement?.parentElement;
  const recommendedSection = Array.from(document.querySelectorAll<HTMLElement>("section")).find((section) =>
    section.textContent?.includes("Susie’s Recommended Series"),
  );
  if (!sourceBlock || !recommendedSection) return;

  let compact = document.getElementById("compact-recommendation-reasons");
  if (!compact) {
    compact = document.createElement("div");
    compact.id = "compact-recommendation-reasons";
    compact.className = "font-sans text-muted";
    const reasonList = sourceBlock.querySelector("ul");
    compact.innerHTML = `<p class="section-label">Why this recommendation came up</p>${reasonList?.outerHTML ?? ""}<p class="mt-2 text-muted/80">This is a starting-point recommendation, not a diagnosis. Susie will confirm the right series and number of sessions after talking with you.</p>`;
    recommendedSection.appendChild(compact);
  }
  (sourceBlock as HTMLElement).style.display = "none";
}

function addUltimateOptionCard() {
  const listSection = document.getElementById("full-treatment-list");
  if (!listSection || listSection.textContent?.includes('The Ultimate "YOU" Experience')) return;
  const grid = listSection.querySelector(".grid") as HTMLElement | null;
  if (!grid) return;

  const wrapper = document.createElement("div");
  wrapper.className = "min-h-[420px]";
  wrapper.innerHTML = `
    <div class="flex h-full flex-col rounded-[24px] border border-purple/15 bg-white p-6 text-center shadow-[0_12px_32px_rgba(60,40,80,0.10)]">
      <p class="section-label mb-3">Complete Experience</p>
      <h3 class="font-serif text-3xl font-light text-[#2c1f14]">The Ultimate &quot;YOU&quot; Experience</h3>
      <p class="mt-4 font-sans text-sm font-light leading-relaxed text-muted">One of each of Susie Sculpts&apos; six signature treatments in one complete experience.</p>
      <div class="mt-5 rounded-[14px] border border-purple/15 bg-purple/5 p-4">
        <p class="font-serif text-4xl font-light text-purple">$1,297</p>
        <p class="mt-2 font-sans text-[11px] font-medium uppercase tracking-[0.06em] text-muted">Six-treatment experience</p>
      </div>
      <a href="https://api.armsreachdigital.com/payment-link/6a6da6b87b99151a54041af5" class="btn-primary mt-auto w-full">I WANT THE ULTIMATE YOU EXPERIENCE</a>
    </div>`;
  grid.appendChild(wrapper);
}

function patchQuizFetch() {
  if ((window as typeof window & { __susieFetchPatched?: boolean }).__susieFetchPatched) return;
  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    if (url.includes("/api/submit") && init?.body && document.body.dataset.deferredUrgency === "true") {
      try {
        const parsed = JSON.parse(String(init.body));
        parsed.urgency = deferredUrgency;
        parsed.timeline = deferredUrgency;
        init = { ...init, body: JSON.stringify(parsed) };
      } catch {
        // Keep the original request if its body is not JSON.
      }
    }
    return originalFetch(input, init);
  };

  (window as typeof window & { __susieFetchPatched?: boolean }).__susieFetchPatched = true;
}

function applyCopyUpdates() {
  const body = document.body;
  if (!body) return;

  if (window.location.pathname === "/body-reset") {
    body.dataset.bodyResetPage = "true";
    ensureBodyResetStyles();
    compactQuizChoices();
    addDeferredUrgencyChoice();
    rewritePurchaseButtons();
    moveRecommendationReasons();
    addUltimateOptionCard();
    patchQuizFetch();
  }

  exactNameReplacements.forEach(([from, to]) => replaceExactTextNodes(body, from, to));

  const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);
  textNodes.forEach((node) => {
    if (node.nodeValue?.includes("Series Series")) {
      node.nodeValue = node.nodeValue.replaceAll("Series Series", "Series");
    }
  });

  const paragraphs = Array.from(document.querySelectorAll("p"));
  const firstEvaluationParagraph = paragraphs.find((paragraph) =>
    paragraph.textContent?.includes("I want to help you figure out where you should start."),
  );

  if (firstEvaluationParagraph) {
    if (firstEvaluationParagraph.textContent !== evaluationCopy) {
      firstEvaluationParagraph.textContent = evaluationCopy;
    }
    const nextParagraph = firstEvaluationParagraph.nextElementSibling as HTMLElement | null;
    if (nextParagraph?.textContent?.includes("Answer five quick questions")) nextParagraph.remove();
  }

  const emailNote = paragraphs.find((paragraph) =>
    paragraph.textContent?.includes("Email is required so Susie can send your recommendation"),
  );
  emailNote?.remove();

  const submitButton = Array.from(document.querySelectorAll("button")).find((button) =>
    button.textContent?.includes("Find My Best First Step"),
  );

  if (submitButton) {
    submitButton.innerHTML =
      '<span class="block text-[10px] sm:text-xs tracking-[0.12em]">RECEIVE YOUR FREE</span><span class="block mt-1 text-sm sm:text-base tracking-[0.08em]">PROFESSIONAL EVALUATION TODAY!</span>';
  }

  restoreConsultationLinks();
}

export default function CopyUpdates() {
  const isBodyReset = typeof window !== "undefined" && window.location.pathname === "/body-reset";

  useEffect(() => {
    let applying = false;
    const observerOptions: MutationObserverInit = { childList: true, subtree: true };

    const observer = new MutationObserver(() => {
      if (applying) return;
      applying = true;
      observer.disconnect();
      try {
        applyCopyUpdates();
      } finally {
        observer.observe(document.body, observerOptions);
        applying = false;
      }
    });

    applyCopyUpdates();
    observer.observe(document.body, observerOptions);

    return () => observer.disconnect();
  }, []);

  return isBodyReset ? <Navbar /> : null;
}