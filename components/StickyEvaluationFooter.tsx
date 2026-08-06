"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "susie-sculpts-evaluation-v2";
const consultationUrl =
  "https://api.armsreachdigital.com/widget/booking/3yvXSJo59kMORz5W3H4e";

export default function StickyEvaluationFooter() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isEvaluationPage = pathname === "/body-reset";
  const [evaluationComplete, setEvaluationComplete] = useState(false);

  useEffect(() => {
    const syncState = () => {
      let savedResults = false;

      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as { status?: string } | null;
        savedResults = saved?.status === "results";
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }

      setEvaluationComplete(
        savedResults ||
          document.body.dataset.evaluationComplete === "true" ||
          document.body.classList.contains("evaluation-results-active"),
      );
    };

    syncState();
    window.addEventListener("evaluation-complete", syncState);
    window.addEventListener("pageshow", syncState);
    window.addEventListener("popstate", syncState);

    const observer = new MutationObserver(syncState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "data-evaluation-complete"],
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("evaluation-complete", syncState);
      window.removeEventListener("pageshow", syncState);
      window.removeEventListener("popstate", syncState);
      observer.disconnect();
    };
  }, [pathname]);

  const resultsMode = isEvaluationPage && evaluationComplete;

  if (!isHomepage && !resultsMode) return null;

  const supportingLineClass =
    "font-sans text-[11px] font-light leading-none tracking-[0.03em] text-white/90 sm:text-sm";

  return (
    <>
      <div aria-hidden="true" className="h-[84px] sm:h-[90px]" />
      <div className="fixed bottom-0 left-0 right-0 z-[65] overflow-hidden border-t border-white/20 bg-purple-dark text-white shadow-[0_-8px_24px_rgba(74,53,112,0.32)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[url('/images/sticky-footer-butterflies.svg')] bg-cover bg-center opacity-90" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-purple-dark/45" />
        <Link
          href={resultsMode ? consultationUrl : "/body-reset"}
          target={resultsMode ? "_blank" : undefined}
          rel={resultsMode ? "noopener noreferrer" : undefined}
          className="relative z-10 mx-auto flex min-h-[84px] max-w-6xl flex-col items-center justify-center px-4 py-1.5 text-center sm:min-h-[90px]"
        >
          {resultsMode ? (
            <>
              <span className={`${supportingLineClass} hidden sm:block`}>
                Not ready to choose a treatment before meeting Susie?
              </span>
              <span className={`${supportingLineClass} sm:hidden`}>
                Want to meet Susie first?
              </span>
              <span className="my-1 hidden font-sans text-2xl font-medium uppercase leading-none tracking-[0.06em] sm:block">
                Schedule a Free 30-Minute Consultation
              </span>
              <span className="my-1 font-sans text-xl font-medium uppercase leading-none tracking-[0.08em] sm:hidden">
                Book a Free Consultation
              </span>
            </>
          ) : (
            <>
              <span className={supportingLineClass}>
                Need Help Deciding Which Treatment Is Best For You?
              </span>
              <span className="my-1 font-sans text-xl font-medium uppercase leading-none tracking-[0.08em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] sm:text-2xl">
                See What Susie Says...
              </span>
              <span className={supportingLineClass}>
                Take Susie&apos;s quick five-question evaluation.
              </span>
            </>
          )}
        </Link>
      </div>
    </>
  );
}
