"use client";

import { useEffect, useState } from "react";
import EvaluationTrustSections from "@/components/EvaluationTrustSections";

const STORAGE_KEY = "susie-sculpts-evaluation-v2";

export default function BodyResetEnhancements() {
  const [hasSavedEvaluation, setHasSavedEvaluation] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("reset") === "1") {
      localStorage.removeItem(STORAGE_KEY);
      window.history.replaceState({}, "", "/body-reset");
      window.location.reload();
      return;
    }

    const readSavedState = () => {
      try {
        const