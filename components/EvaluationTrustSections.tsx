"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const faqs = [
  {
    q: "Is this evaluation private?",
    a: "Yes. Your answers are used to prepare a starting-point recommendation and help Susie understand what you may want to discuss. Your information is not displayed publicly.",
  },
  {
    q: "Is this a diagnosis?",
    a: "No. This is a wellness-focused starting-point recommendation, not a medical diagnosis. Susie will confirm the most appropriate next step after learning more about your goals and comfort level.",
  },
  {
    q: "Do I have to buy anything?",
    a: "No. The evaluation is free, and there is no obligation to purchase a treatment or package.",
  },
  {
    q: "What happens after I submit?",
    a: "You will answer five quick questions and immediately receive a personalized starting-point recommendation. You can then review the options or talk with Susie before deciding anything.",
  },
  {
    q: "What if I am not sure which treatment I need?",
    a: "That is exactly what the evaluation is for. You do not need to know the answer before you begin.",
  },
];

export default function EvaluationTrustSections() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const check = () => {
      const button = Array.from(document.querySelectorAll<HTMLButtonElement>("button")).find((item) =>
        item.textContent?.toLowerCase().includes("receive my free evaluation"),
      );
      setVisible(Boolean(button));
    };

    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-cream">
      <section id="meet-susie" className="scroll-mt-20 py-12 md:py-16">
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[0.78fr_1.22fr] md:gap-12">
          <div className="relative mx-auto h-[360px] w-full max-w-sm overflow-hidden rounded-[22px] bg-white shadow-[0_14px_36px_rgba(60,40,80,0.12)] md:h-[470px]">
            <Image src="/images/susie.jpg" alt="Susie Bute of Susie Sculpts" fill className="object-cover object-top" sizes="(max-width: 768px) 92vw, 360px" />
          </div>

          <div>
            <p className="section-label mb-3">Meet Susie</p>
            <h2 className="font-serif text-4xl font-light leading-[1.05] text-[#2c1f14] md:text-5xl">A professional first step without pressure.</h2>
            <div className="mt-5 space-y-4 font-sans text-[15px] font-light leading-relaxed text-muted md:text-base">
              <p>Susie Bute has spent more than 30 years helping women feel stronger, healthier, and more comfortable in their bodies.</p>
              <p>Her approach begins with listening—not selling. She considers what you are feeling, what you have already tried, and what you want to change before recommending a place to begin.</p>
              <p>This evaluation gives Susie useful context while giving you a private, low-pressure way to explore your options.</p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[16px] border border-purple/15 bg-white/75 p-4 text-center"><p className="font-serif text-2xl text-purple">30+</p><p className="mt-1 text-xs font-light text-muted">Years in wellness</p></div>
              <div className="rounded-[16px] border border-purple/15 bg-white/75 p-4 text-center"><p className="font-serif text-2xl text-purple">1:1</p><p className="mt-1 text-xs font-light text-muted">Personal guidance</p></div>
              <div className="rounded-[16px] border border-purple/15 bg-white/75 p-4 text-center"><p className="font-serif text-2xl text-purple">No</p><p className="mt-1 text-xs font-light text-muted">Pressure or obligation</p></div>
            </div>

            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="btn-primary mt-6 w-full sm:w-auto">Start My Free Evaluation</button>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 bg-white/55 py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-7 text-center">
            <p className="section-label mb-2">Before You Begin</p>
            <h2 className="section-heading">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={faq.q} className="overflow-hidden rounded-[16px] border border-stone bg-white/80">
                <button type="button" onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left" aria-expanded={open === index}>
                  <span className="font-serif text-xl font-light leading-snug text-[#2c1f14]">{faq.q}</span>
                  <span className={`shrink-0 text-xl text-purple transition-transform ${open === index ? "rotate-45" : ""}`}>+</span>
                </button>
                {open === index && <div className="px-5 pb-5"><p className="font-sans text-sm font-light leading-relaxed text-muted">{faq.a}</p></div>}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[20px] border border-purple/15 bg-purple/5 p-5 text-center md:p-7">
            <p className="font-serif text-2xl font-light text-[#2c1f14]">Ready to see what Susie recommends?</p>
            <p className="mx-auto mt-2 max-w-xl text-sm font-light text-muted">Share your information, answer five quick questions, and receive your private starting-point recommendation.</p>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="btn-primary mt-5">Start My Free Evaluation</button>
          </div>
        </div>
      </section>
    </div>
  );
}
