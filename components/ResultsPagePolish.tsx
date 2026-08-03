"use client";

import { useEffect } from "react";

const consultationBookingUrl =
  "https://api.armsreachdigital.com/widget/booking/3yvXSJo59kMORz5W3H4e";

function firstNameOnly(value: string) {
  return value.trim().split(/\s+/)[0] || "there";
}

function findRecommendationSection() {
  return Array.from(document.querySelectorAll<HTMLElement>("section, div")).find((element) =>
    element.textContent?.includes("Susie’s Recommended Series"),
  );
}

function