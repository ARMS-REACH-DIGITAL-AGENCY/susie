"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function StickyEvaluationFooter() {
  const [evaluationComplete, setEvaluationComplete] = useState(false);

  useEffect(() => {
    const syncState = () => {
      setEvaluationComplete(document.body.dataset.evaluationComplete === "true");
    };

    syncState();
    window.addEventListener("evaluation-complete", syncState);

    const observer = new MutationObserver(syncState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-evaluation-complete"],
    });

    return () => {
      window.removeEventListener("evaluation-complete", syncState);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[65] border-t border-white/15 bg-[#2c1f14] text-white shadow-[0_-8px_24px_rgba(44,31,20,0.22)]">
      <Link
        href={evaluationComplete ? "/#treatments" : "/body-reset"}
        className="mx-auto flex min-h-[72px] max-w-6xl flex-col items-center justify-center px-4 py-2 text-center sm:min-h-[78px]"
      >
        {evaluationComplete ? (
          <>
            <span className="font-sans text-lg font-medium uppercase tracking-[0.05em] sm:text-2xl">
              See Susie&apos;s Full Treatment Option List
            </span>
            <span className="mt-0.5 font-sans text-[10px] font-light tracking-[0.02em] sm:text-sm">
              Be sure to ask how YOU can own your own PEMF home unit!
            </span>
          </>
        ) : (
          <>
            <span className="font-sans text-[11px] font-light tracking-[0.03em] sm:text-sm">
              Need Help Deciding Which Treatment Is Best For You?
            </span>
            <span className="mt-0.5 font-sans text-xl font-medium uppercase tracking-[0.08em] sm:text-2xl">
              See What Susie Says...
            </span>
          </>
        )}
      </Link>
    </div>
  );
}
