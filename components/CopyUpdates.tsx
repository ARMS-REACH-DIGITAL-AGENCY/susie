"use client";

import { useEffect } from "react";

const serviceNameReplacements: Array<[string, string]> = [
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

const treatmentDisclaimer =
  "Every treatment supports a different goal, are wellness-focused, and are not intended to diagnose, treat, cure, or prevent any disease. Individual experiences vary.";

function replaceTextInElement(element: HTMLElement, from: string, to: string) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  textNodes.forEach((node) => {
    if (node.nodeValue?.includes(from)) {
      node.nodeValue = node.nodeValue.replaceAll(from, to);
    }
  });
}

function applyCopyUpdates() {
  const body = document.body;
  if (!body) return;

  serviceNameReplacements.forEach(([from, to]) => replaceTextInElement(body, from, to));

  const treatmentsHeader = document.getElementById("treatments");
  if (treatmentsHeader) {
    const headingParagraphs = Array.from(treatmentsHeader.querySelectorAll("p"));
    headingParagraphs.forEach((paragraph) => {
      const text = paragraph.textContent ?? "";
      if (
        text.includes("Every treatment supports a different goal") ||
        text.includes("Choose one below to learn more")
      ) {
        paragraph.remove();
      }
    });
  }

  const treatmentSection = treatmentsHeader?.closest("section");
  if (treatmentSection) {
    const disclaimer = Array.from(treatmentSection.querySelectorAll("p")).find((paragraph) =>
      paragraph.textContent?.includes("Treatments are wellness-focused"),
    );
    if (disclaimer) disclaimer.textContent = treatmentDisclaimer;
  }

  const mobileTreatmentWrapper = treatmentSection?.querySelector(".md\\:hidden");
  if (mobileTreatmentWrapper instanceof HTMLElement) {
    mobileTreatmentWrapper.classList.add("sticky", "top-16", "z-30");
    const iconBar = mobileTreatmentWrapper.firstElementChild as HTMLElement | null;
    const detailsPanel = mobileTreatmentWrapper.children.item(1) as HTMLElement | null;
    iconBar?.classList.remove("sticky", "top-16");
    if (iconBar) iconBar.style.marginBottom = "0";
    if (detailsPanel) {
      detailsPanel.style.borderTopLeftRadius = "0";
      detailsPanel.style.borderTopRightRadius = "0";
      detailsPanel.style.marginTop = "0";
    }
  }

  const paragraphs = Array.from(document.querySelectorAll("p"));
  const firstEvaluationParagraph = paragraphs.find((paragraph) =>
    paragraph.textContent?.includes("I want to help you figure out where you should start."),
  );

  if (firstEvaluationParagraph) {
    firstEvaluationParagraph.textContent = evaluationCopy;

    const nextParagraph = firstEvaluationParagraph.nextElementSibling as HTMLElement | null;
    if (nextParagraph?.textContent?.includes("Answer five quick questions")) {
      nextParagraph.remove();
    }
  }

  const emailNote = paragraphs.find((paragraph) =>
    paragraph.textContent?.includes(
      "Email is required so Susie can send your recommendation and follow up if you do not book today.",
    ),
  );
  emailNote?.remove();

  const submitButton = Array.from(document.querySelectorAll("button")).find((button) =>
    button.textContent?.includes("Find My Best First Step"),
  );

  if (submitButton) {
    submitButton.innerHTML =
      '<span class="block text-[10px] sm:text-xs tracking-[0.12em]">RECEIVE YOUR FREE</span><span class="block mt-1 text-sm sm:text-base tracking-[0.08em]">PROFESSIONAL EVALUATION TODAY!</span>';
  }
}

export default function CopyUpdates() {
  useEffect(() => {
    applyCopyUpdates();

    const observer = new MutationObserver(() => applyCopyUpdates());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
