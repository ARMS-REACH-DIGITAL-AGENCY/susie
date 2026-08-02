"use client";

import { useEffect } from "react";

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

  if (window.location.pathname === "/body-reset") {
    Array.from(document.querySelectorAll("a")).forEach((anchor) => {
      if (anchor.textContent?.trim().toLowerCase() === "read testimonials") {
        anchor.setAttribute("href", "#evaluation-testimonials");
      }
    });
  }

  const paragraphs = Array.from(document.querySelectorAll("p"));
  const firstEvaluationParagraph = paragraphs.find((paragraph) =>
    paragraph.textContent?.includes("I want to help you figure out where you should start."),
  );

  if (firstEvaluationParagraph) {
    firstEvaluationParagraph.textContent = evaluationCopy;
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
}

export default function CopyUpdates() {
  useEffect(() => {
    applyCopyUpdates();
    const observer = new MutationObserver(applyCopyUpdates);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
}
