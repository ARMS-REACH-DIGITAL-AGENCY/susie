"use client";

import { useEffect } from "react";

const ACTIVE_CONSULTATION_URL =
  "https://api.armsreachdigital.com/widget/booking/joubhfJUlQIDH8NK7Cgf";

const LEGACY_CONSULTATION_IDS = ["3yvXSJo59kMORz5W3H4e"];

function isConsultationText(text: string) {
  const normalized = text.trim().toLowerCase();
  return (
    normalized.includes("free consultation") ||
    normalized.includes("free professional consult") ||
    normalized === "book a consult" ||
    normalized === "book consult" ||
    normalized === "schedule a free consultation"
  );
}

function normalizeConsultationLinks() {
  document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
    const href = anchor.getAttribute("href") || "";
    const pointsToLegacyCalendar = LEGACY_CONSULTATION_IDS.some((id) => href.includes(id));

    if (pointsToLegacyCalendar || isConsultationText(anchor.textContent || "")) {
      anchor.href = ACTIVE_CONSULTATION_URL;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    }
  });
}

export default function ConsultationLinkNormalizer() {
  useEffect(() => {
    normalizeConsultationLinks();

    const observer = new MutationObserver(normalizeConsultationLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
