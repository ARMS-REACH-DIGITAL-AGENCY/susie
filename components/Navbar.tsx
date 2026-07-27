"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
          <button
            type="submit"
            form="body-reset-lead-form"
            className="btn-primary text-[9px] sm:text-[10px] px-3 sm:px-5 py-3 leading-tight"
          >
            Claim My $100 Offer
          </button>
        ) : (
          <>
            <a href="#services" className="btn-primary hidden sm:inline-block text-[10px] px-5 py-3">
              View Services
            </a>
            <a href="#services" className="sm:hidden btn-primary text-[10px] px-4 py-3">
              Services
            </a>
          </>
        )}
      </div>
    </header>
  );
}
