"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is the Body Reset Experience?",
    a: "The Body Reset Experience is a private consultation with Susie to understand what you are feeling in your body, what you have already tried, and what kind of wellness support may be the right next step for you. It is not a hard sell — it is a genuine conversation. From there, Susie may recommend Synergy Vacuum Massage for lymphatic and circulation support, PEMF frequency wellness for recovery and inflammation response, EMShape for body sculpting and muscle activation, or a combination based on your goals.",
  },
  {
    q: "Is this only for body sculpting?",
    a: "Not at all. While EMShape body sculpting is one of the services available, many clients come to Susie Sculpts for lymphatic support, PEMF wellness, energy recovery, or simply because they feel puffy, heavy, foggy, or stuck and want a safe place to start. The Body Reset Experience is designed to meet you wherever you are.",
  },
  {
    q: "What if I'm not sure which service I need?",
    a: "That is exactly what the Body Reset Consultation is for. You do not need to know what you need before you come in. Susie will listen, ask questions, and help you identify the most supportive next step for your body and goals. There is no pressure and no obligation.",
  },
  {
    q: "Do I need to buy a package right away?",
    a: "No. You can start with a single session or consultation. Many clients choose to explore one service first before deciding what ongoing support feels right for them. Packages are available for those who want to commit to a longer wellness journey, but they are never required.",
  },
  {
    q: "Where is Susie Sculpts located, and who does Susie serve?",
    a: "Susie Sculpts is located in Gilbert, Arizona and serves women throughout the East Valley including Chandler, Queen Creek, Mesa, and surrounding communities. If you are unsure whether you are in the service area, reach out through the form above and Susie will be happy to connect with you.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-white/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-4">Common Questions</p>
          <h2 className="section-heading">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-stone rounded-sm overflow-hidden bg-white/60"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                aria-expanded={open === i}
              >
                <span className="font-serif text-lg font-light text-[#2c1f14] leading-snug">
                  {faq.q}
                </span>
                <span
                  className={`shrink-0 text-purple transition-transform duration-200 ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="font-sans font-light text-sm text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
