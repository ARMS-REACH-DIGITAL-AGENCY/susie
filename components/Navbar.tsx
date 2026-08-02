"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isEvaluationPage = pathname === "/body-reset";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const anchorPrefix = isEvaluationPage ? "/" : "";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-stone/60">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center shrink-0" onClick={closeMenu}>
            <Image src="/images/logo.png" alt="Susie Sculpts — Empowered Transformations" width={180} height={44} priority className="h-8 sm:h-9 md:h-11 w-auto" />
          </Link>

          <div className="flex items-center gap-2 md:gap-6">
            <nav className="hidden md:flex items-center gap-5 font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-muted">
              <a href={`${anchorPrefix}#meet-susie`} className="hover:text-purple transition-colors">Meet Susie</a>
              <a href={`${anchorPrefix}#treatments`} className="hover:text-purple transition-colors">Treatments</a>
              <a href={`${anchorPrefix}#testimonials`} className="hover:text-purple transition-colors">Reviews</a>
              <a href={`${anchorPrefix}#faq`} className="hover:text-purple transition-colors">FAQ</a>
            </nav>

            <button type="button" onClick={() => setMenuOpen(true)} className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-purple/20 bg-white/80 text-purple shadow-sm" aria-label="Open navigation menu" aria-expanded={menuOpen}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[70] md:hidden">
          <button type="button" className="absolute inset-0 bg-[#2c1f14]/35 backdrop-blur-[2px]" onClick={closeMenu} aria-label="Close navigation menu" />
          <aside className="absolute right-0 top-0 h-full w-[84%] max-w-sm bg-cream shadow-2xl border-l border-purple/15 px-6 py-5">
            <div className="flex items-center justify-between mb-8">
              <Image src="/images/logo.png" alt="Susie Sculpts" width={155} height={38} className="h-9 w-auto" />
              <button type="button" onClick={closeMenu} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-purple/20 bg-white/80 text-purple" aria-label="Close navigation menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>

            <nav className="flex flex-col font-sans text-sm font-medium tracking-[0.14em] uppercase text-[#2c1f14]">
              <Link href="/" onClick={closeMenu} className="border-b border-stone py-4">Home</Link>
              <a href="/#meet-susie" onClick={closeMenu} className="border-b border-stone py-4">Meet Susie</a>
              <a href="/#treatments" onClick={closeMenu} className="border-b border-stone py-4">Treatments</a>
              <a href="/#testimonials" onClick={closeMenu} className="border-b border-stone py-4">Reviews</a>
              <a href="/#faq" onClick={closeMenu} className="border-b border-stone py-4">FAQ</a>
            </nav>

            <a href="tel:+14804400909" onClick={closeMenu} className="mt-7 flex items-center justify-center rounded-sm border border-purple/25 px-4 py-3 font-sans text-xs font-medium tracking-[0.12em] uppercase text-purple">
              Call or Text Susie
            </a>
            <a href="#calendar-booking-link-needed" onClick={closeMenu} className="mt-3 flex items-center justify-center rounded-sm bg-purple px-4 py-3 font-sans text-xs font-medium tracking-[0.12em] uppercase text-white">
              Schedule a FREE Consultation
            </a>
          </aside>
        </div>
      )}
    </>
  );
}
