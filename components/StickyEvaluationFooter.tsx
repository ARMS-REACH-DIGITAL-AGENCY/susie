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
    "font-sans text-[11px] font-light leading-none tracking-[0.025em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] sm:text-[13px]";

  return (
    <>
      <div aria-hidden="true" className="h-[68px] sm:h-[74px]" />
      <div className="fixed bottom-0 left-0 right-0 z-[65] overflow-hidden border-t border-white/25 bg-[#5a2baa] text-white shadow-[0_-7px_20px_rgba(48,24,91,0.35)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#642fc1] bg-[url('/images/Susie_favicon.png')] bg-[length:180px_auto] bg-repeat-x bg-center bg-blend-multiply sm:bg-[length:250px_auto]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#341766]/45 via-[#6f3bd0]/10 to-[#341766]/45"
        />
        <Link
          href={resultsMode ? consultationUrl : "/body-reset"}
          target={resultsMode ? "_blank" : undefined}
          rel={resultsMode ? "noopener noreferrer" : undefined}
          className="relative z-10 mx-auto flex min-h-[68px] max-w-6xl flex-col items-center justify-center px-4 py-1 text-center sm:min-h-[74px]"
        >
          {resultsMode ? (
            <>
              <span className={`${supportingLineClass} hidden sm:block`}>
                Not ready to choose a treatment before meeting Susie?
              </span>
              <span className={`${supportingLineClass} sm:hidden`}>
                Want to meet Susie first?
              </span>
              <span className="my-0.5 hidden font-sans text-2xl font-medium uppercase leading-none tracking-[0.06em] drop-shadow-[0_2px_3px_rgba(0,0,0,0.95)] sm:block">
                Schedule a Free 30-Minute Consultation
              </span>
              <span className="my-0.5 font-sans text-xl font-medium uppercase leading-none tracking-[0.08em] drop-shadow-[0_2px_3px_rgba(0,0,0,0.95)] sm:hidden">
                Book a Free Consultation
              </span>
            </>
          ) : (
            <>
              <span className={supportingLineClass}>
                Need Help Deciding Which Treatment Is Best For You?
              </span>
              <span className="my-0.5 font-sans text-[22px] font-medium uppercase leading-none tracking-[0.055em] drop-shadow-[0_2px_3px_rgba(0,0,0,0.98)] sm:text-2xl">
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
