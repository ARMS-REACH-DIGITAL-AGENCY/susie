"use client";

import { useEffect, useState } from "react";
import Problem from "@/components/Problem";
import Trust from "@/components/Trust";
import FAQ from "@/components/FAQ";

export default function EvaluationTrustSections() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const landingFormButton = Array.from(document.querySelectorAll<HTMLButtonElement>("button")).find((button) =>
        button.textContent?.toLowerCase().includes("receive my free evaluation"),
      );
      setVisible(Boolean(landingFormButton));
    };

    checkVisibility();
    const observer = new MutationObserver(checkVisibility);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-cream">
      <Problem />
      <Trust />
      <FAQ />
    </div>
  );
}
