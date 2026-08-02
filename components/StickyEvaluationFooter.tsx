import Link from "next/link";

export default function StickyEvaluationFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[65] border-t border-white/15 bg-[#2c1f14] text-white shadow-[0_-8px_24px_rgba(44,31,20,0.22)]">
      <Link
        href="/body-reset"
        className="mx-auto flex min-h-[72px] max-w-6xl flex-col items-center justify-center px-4 py-2 text-center sm:min-h-[78px]"
      >
        <span className="font-sans text-[11px] font-light tracking-[0.03em] sm:text-sm">
          Need Help Deciding Which Treatment Is Best For You?
        </span>
        <span className="mt-0.5 font-sans text-xl font-medium uppercase tracking-[0.08em] sm:text-2xl">
          See What Susie Says...
        </span>
      </Link>
    </div>
  );
}
