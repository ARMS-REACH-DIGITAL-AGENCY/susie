"use client";

import { useEffect } from "react";

const consultationBookingUrl =
  "https://api.armsreachdigital.com/widget/booking/3yvXSJo59kMORz5W3H4e";

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
  "I wanna help you figure out where you should start. Everyone doesn't need the same treatment, and I don't want you guessing. So, either schedule a time for a free consultation, or just answer these six questions so I can get to know you a little bit better and tell you what I think might work.";

function replaceExactTextNodes(element: HTMLElement, from: string, to: string) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  nodes.forEach((node) => {
    const value = node.nodeValue?.trim();
    if (value === from) node.nodeValue = node.nodeValue!.replace(from, to);
  });
}

function restoreConsultationLinks() {
  if (window.location.pathname !== "/body-reset") return;

  Array.from(document.querySelectorAll<HTMLAnchorElement>("a")).forEach((anchor) => {
    const text = anchor.textContent?.trim().toLowerCase() ?? "";
    const href = anchor.getAttribute("href") ?? "";

    if (text === "read testimonials" && href !== "#evaluation-testimonials") {
      anchor.setAttribute("href", "#evaluation-testimonials");
    }

    if (
      href === "#calendar-booking-link-needed" ||
      text === "book consult" ||
      text === "book your free professional consult"
    ) {
      if (anchor.getAttribute("href") !== consultationBookingUrl) {
        anchor.setAttribute("href", consultationBookingUrl);
      }
      if (anchor.getAttribute("target") !== "_blank") {
        anchor.setAttribute("target", "_blank");
      }
      if (anchor.getAttribute("rel") !== "noopener noreferrer") {
        anchor.setAttribute("rel", "noopener noreferrer");
      }
      if (anchor.textContent?.trim() !== "Book Your FREE Professional Consult") {
        anchor.textContent = "Book Your FREE Professional Consult";
      }
    }
  });

  const evaluationParagraph = Array.from(document.querySelectorAll("p")).find((paragraph) =>
    paragraph.textContent?.includes("either schedule a time for a free consultation"),
  );

  const evaluationCopyContainer = evaluationParagraph?.parentElement;
  if (evaluationCopyContainer && !document.getElementById("free-professional-consult-cta")) {
    const bookingLink = document.createElement("a");
    bookingLink.id = "free-professional-consult-cta";
    bookingLink.href = consultationBookingUrl;
    bookingLink.target = "_blank";
    bookingLink.rel = "noopener noreferrer";
    bookingLink.className =
      "btn-secondary mt-2 inline-flex w-full items-center justify-center text-center sm:w-auto";
    bookingLink.textContent = "Book Your FREE Professional Consult";
    evaluationCopyContainer.appendChild(bookingLink);
  }
}

function applyCopyUpdates() {
  const body = document.body;
  if (!body) return;

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

  return null;
}
