"use client";

import { useState } from "react";

const faqs = [
  { q: "What is the Body Reset Experience?", a: "The Body Reset Experience is a private consultation with Susie to understand what you are feeling, what you have already tried, and what kind of wellness support may be the right next step. From there, she may recommend Synergie Vacuum Massage, PEMF wellness, EMShape Neo body sculpting, Ultrasonic Cavitation, or a personalized combination based on your goals." },
  { q: "Is this only for body sculpting?", a: "No. Many clients come for lymphatic support, PEMF wellness, energy recovery, or because they feel puffy, heavy, foggy, or stuck and want a safe place to start." },
  { q: "What if I am not sure which service I need?", a: "That is exactly what the evaluation and consultation are for. Susie will listen, ask questions, and help identify the most supportive next step. There is no pressure or obligation." },
  { q: "Do I need to buy a package right away?", a: "No. You can begin with a single session or consultation. Packages are available, but they are never required." },
  { q: "Where is Susie Sculpts located?", a: "Susie Sculpts serves women throughout Gilbert, Chandler, Queen Creek, Mesa, and surrounding East Valley communities. Use the Call or Text Susie button below if you have a question." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-white/50 py-9 md:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div id="faq" className="section-anchor mb-6 text-center"><p className="section-label mb-2">Common Questions</p><h2 className="whitespace-nowrap font-serif text-[clamp(1.85rem,8vw,2.5rem)] font-light leading-tight text-[#2c1f14] md:text-5xl">Frequently Asked Questions</h2></div>
        <div className="space-y-2.5">
          {faqs.map((faq, i) => <div key={faq.q} className="overflow-hidden rounded-sm border border-stone bg-white/60">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left" aria-expanded={open === i}><span className="font-serif text-lg font-light leading-snug text-[#2c1f14]">{faq.q}</span><span className={`shrink-0 text-purple transition-transform ${open === i ? "rotate-45" : ""}`}>+</span></button>
            {open === i && <div className="px-5 pb-5"><p className="text-sm font-light leading-relaxed text-muted">{faq.a}</p></div>}
          </div>)}
        </div>
        <div className="mt-7 text-center"><p className="mb-3 text-sm font-light text-muted">Still have questions? Susie is happy to talk.</p><a href="tel:+14805265656" className="btn-primary inline-flex min-h-[56px] items-center justify-center px-6">Call or Text Susie</a></div>
      </div>
    </section>
  );
}
