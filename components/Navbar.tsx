"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function EvaluationCta({ asButton = false }: { asButton?: boolean }) {
  const className = "btn-primary inline-flex flex-col items-center justify-center text-center leading-tight px-4 sm:px-5 py-2.5 min-w-[126px]";

  const content = (
    <>
      <span className="text-[11px] sm:text-[12px] tracking-[0.18em]">Ask Susie</span>
      <span className="mt-0.5 text-[8px] sm:text-[9px] tracking-[0.12em] opacity-85 normal-case">
        Answer 4 Quick Questions
      </span>
    </>
  );

  if (asButton) {
    return (
      <button type="submit" form="body-reset-lead-form" className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link href="/body-reset" className={className}>
      {content}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isBodyReset = pathname === "/body-reset";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-stone/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Susie Sculpts — Empowered Transformations"
            width={180}
            height={44}
            priority
            className="h-9 md:h-11 w-auto"
          />
        </Link>

        {isBodyReset ? (
          <EvaluationCta asButton />
        ) : (
          <div className="flex items-center gap-4 md:gap-6">
            <nav className="hidden md:flex items-center gap-5 font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-muted">
              <a href="#meet-susie" className="hover:text-purple transition-colors">Meet Susie</a>
              <a href="#services" className="hover:text-purple transition-colors">Services</a>
              <a href="#testimonials" className="hover:text-purple transition-colors">Reviews</a>
            </nav>
            <EvaluationCta />
          </div>
        )}
      </div>
    </header>
  );
}
