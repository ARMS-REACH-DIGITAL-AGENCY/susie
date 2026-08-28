"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "susie-sculpts-evaluation-v3";
const consultationBookingUrl =
  "https://api.armsreachdigital.com/widget/booking/3yvXSJo59kMORz5W3H4e";
const desktopEvaluationActionClass =
  "rounded-sm bg-purple px-3 py-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.13em] text-white transition-colors hover:bg-purple-dark whitespace-nowrap";

export default function Navbar() {
  const pathname = usePathname();
  const isEvaluationPage = pathname === "/body-reset";
  const [menuOpen, setMenuOpen] = useState(false);
  const [isResultsPage, setIsResultsPage] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!isEvaluationPage) {
      setIsResultsPage(false);
      return;
    }

    const syncResultsState = () => {
      let savedResults = false;

      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as { status?: string } | null;
        savedResults = saved?.status === "results";
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }

      setIsResultsPage(
        savedResults || document.body.classList.contains("evaluation-results-active"),
      );
    };

    syncResultsState();
    const observer = new MutationObserver(syncResultsState);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("pageshow", syncResultsState);

    return () => {
      observer.disconnect();
      window.removeEventListener("pageshow", syncResultsState);
    };
  }, [isEvaluationPage]);

  const closeMenu = () => setMenuOpen(false);
  const meetSusieHref = isEvaluationPage ? "#meet-susie" : "/#meet-susie";
  const reviewsHref = isEvaluationPage ? "#testimonials" : "/#testimonials";
  const faqHref = isEvaluationPage ? "#faq" : "/#faq";

  const startNewEvaluation = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMenuOpen(false);
    window.location.assign("/body-reset?reset=1");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-stone/60">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center shrink-0" onClick={closeMenu}>
            <Image
              src="/images/logo.png"
              alt="Susie Sculpts — Empowered Transformations"
              width={180}
              height={44}
              priority
              className="h-8 sm:h-9 md:h-11 w-auto"
            />
          </Link>

          <div className="flex items-center gap-2 lg:gap-5">
            <nav className="hidden lg:flex items-center gap-4 font-sans text-[10px] font-medium tracking-[0.13em] uppercase text-muted">
              <a href={meetSusieHref} className="hover:text-purple transition-colors whitespace-nowrap">Meet Susie</a>
              <a href="/#treatments" className="hover:text-purple transition-colors whitespace-nowrap">Treatments</a>
              <a href={reviewsHref} className="hover:text-purple transition-colors whitespace-nowrap">Reviews</a>
              <a href={faqHref} className="hover:text-purple transition-colors whitespace-nowrap">FAQ</a>
              <a href={consultationBookingUrl} target="_blank" rel="noopener noreferrer" className="hover:text-purple transition-colors whitespace-nowrap">Book Your Free Professional Consult</a>
              {isResultsPage ? (
                <button
                  type="button"
                  onClick={startNewEvaluation}
                  className={desktopEvaluationActionClass}
                >
                  Start a New Evaluation
                </button>
              ) : (
                <Link href="/body-reset" className={desktopEvaluationActionClass}>
                  See What Susie Says
                </Link>
              )}
            </nav>

            <button type="button" onClick={() => setMenuOpen(true)} className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-purple/20 bg-white/80 text-purple shadow-sm" aria-label="Open navigation menu" aria-expanded={menuOpen}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button type="button" className="absolute inset-0 bg-[#2c1f14]/35 backdrop-blur-[2px]" onClick={closeMenu} aria-label="Close navigation menu" />
          <aside className="absolute right-0 top-0 h-full w-[84%] max-w-sm bg-cream shadow-2xl border-l border-purple/15 px-6 py-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <Image src="/images/logo.png" alt="Susie Sculpts" width={155} height={38} className="h-9 w-auto" />
              <button type="button" onClick={closeMenu} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-purple/20 bg-white/80 text-purple" aria-label="Close navigation menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>

            <nav className="flex flex-col font-sans text-sm font-medium tracking-[0.14em] uppercase text-[#2c1f14]">
              <Link href="/" onClick={closeMenu} className="border-b border-stone py-4">Home</Link>
              <a href={meetSusieHref} onClick={closeMenu} className="border-b border-stone py-4">Meet Susie</a>
              <a href="/#treatments" onClick={closeMenu} className="border-b border-stone py-4">Treatments</a>
              <a href={reviewsHref} onClick={closeMenu} className="border-b border-stone py-4">Reviews</a>
              <a href={faqHref} onClick={closeMenu} className="border-b border-stone py-4">FAQ</a>
            </nav>

            {isResultsPage ? (
              <button type="button" onClick={startNewEvaluation} className="mt-7 flex w-full items-center justify-center rounded-sm bg-gold px-4 py-4 text-center font-sans text-xs font-semibold tracking-[0.12em] uppercase text-white shadow-sm transition-colors hover:bg-[#a88449]">Start a New Evaluation</button>
            ) : (
              <Link href="/body-reset" onClick={closeMenu} className="mt-7 flex items-center justify-center rounded-sm bg-gold px-4 py-4 text-center font-sans text-xs font-semibold tracking-[0.12em] uppercase text-white shadow-sm transition-colors hover:bg-[#a88449]">See What Susie Says</Link>
            )}
            <a href="tel:+14805265656" onClick={closeMenu} className="mt-3 flex items-center justify-center rounded-sm border border-purple/25 px-4 py-3 font-sans text-xs font-medium tracking-[0.12em] uppercase text-purple">Call or Text Susie</a>
            <a href={consultationBookingUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="mt-3 flex items-center justify-center rounded-sm bg-purple px-4 py-3 text-center font-sans text-xs font-medium tracking-[0.12em] uppercase text-white">Book Your Free Professional Consult</a>
          </aside>
        </div>
      )}
    </>
  );
}
