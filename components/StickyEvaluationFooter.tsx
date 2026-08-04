"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const consultationUrl =
  "https://api.armsreachdigital.com/widget/booking/3yvXSJo59kMORz5W3H4e";

export default function StickyEvaluationFooter() {
  const pathname = usePathname();
  const isEvaluationPage = pathname === "/body-reset";
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

  // Once someone enters the evaluation, the original CTA has already done its job.
  // Keep the screen clear until results are available.
  if (isEvaluationPage && !evaluationComplete) return null;

  const resultsMode = isEvaluationPage && evaluationComplete;

  return (
    <>
      <div aria-hidden="true" className="h-[72px] sm:h-[78px]" />
      <div className="fixed bottom-0 left-0 right-0 z-[65] border-t border-white/15 bg-purple-dark text-white shadow-[0_-8px_24px_rgba(74,53,112,0.28)]">
        <Link
          href={resultsMode ? consultationUrl : "/body-reset"}
          target={resultsMode ? "_blank" : undefined}
          rel={resultsMode ? "noopener noreferrer" : undefined}
          className="mx-auto flex min-h-[72px] max-w-6xl flex-col items-center justify-center px-4 py-2 text-center sm:min-h-[78px]"
        >
          {resultsMode ? (
            <>
              <span className="hidden font-sans text-sm font-light tracking-[0.03em] sm:block">
                Not ready to commit before meeting Susie?
              </span>
              <span className="font-sans text-[11px] font-light tracking-[0.03em] sm:hidden">
                Want to meet Susie first?
              </span>
              <span className="mt-0.5 hidden font-sans text-2xl font-medium uppercase tracking-[0.06em] sm:block">
                Schedule a Free 30-Minute Consultation
              </span>
              <span className="mt-0.5 font-sans text-xl font-medium uppercase tracking-[0.08em] sm:hidden">
                Book a Free Consultation
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
    </>
  );
}
