"use client";

import Link from "next/link";
import { useState } from "react";

const treatments = [
  { title: "Lymphatic Wellness Series", tag: "Lymphatic", icon: "lymphatic", description: "A gentle treatment using controlled suction to support healthy lymphatic flow, circulation, and a lighter refreshed feeling.", bullets: ["Supports healthy lymphatic flow", "Supports circulation and wellness", "Helps you feel lighter and less puffy", "Supports healthy digestion and elimination"] },
  { title: "PEMF Recovery and Wellness Series", tag: "PEMF", icon: "pemf", description: "Pulsed electromagnetic field sessions designed to support circulation, relaxation, recovery, energy, and whole-body wellness.", bullets: ["Supports recovery and relaxation", "Supports circulation", "Supports energy and clarity", "Pairs well with other treatments"] },
  { title: "Muscle + Strength + Tone Series", tag: "Muscle", icon: "muscle", description: "A non-invasive treatment using electromagnetic technology to activate muscles, support tone, and help you feel stronger.", bullets: ["Muscle activation and tone", "Body contouring support", "Supports abdomen, thighs, and glutes", "No surgery or downtime"] },
  { title: "Body Contouring Series", tag: "Contour", icon: "contour", description: "A gentle contouring approach that supports smoother, firmer-feeling skin and helps target stubborn areas without surgery.", bullets: ["Supports body contouring", "Supports firmer-feeling skin", "Targets stubborn areas", "Non-invasive treatment"] },
  { title: "Fascia and Skin Revival Series", tag: "Fascia", icon: "fascia", description: "Focused bodywork designed to support circulation, fascia mobility, smoother-looking skin, and a refreshed feeling.", bullets: ["Supports skin texture and smoothness", "Supports circulation", "Targets visible texture", "Supports fascia mobility"] },
  { title: "Pelvic Floor Strengthening Series", tag: "Pelvic", icon: "pelvic", description: "A non-invasive strengthening option focused on pelvic-floor and deep-core support, designed for comfort and privacy.", bullets: ["Supports pelvic-floor strength", "Supports deep-core engagement", "Fully clothed and private", "No downtime"] },
];

const treatmentIconSources: Record<string, string> = {
  lymphatic: "/images/treatment-lymphatic.png",
  pemf: "/images/treatment-pemf.png",
  muscle: "/images/treatment-muscle.png",
  contour: "/images/treatment-contour.png",
  fascia: "/images/treatment-fascia.png",
  pelvic: "/images/treatment-pelvic.png",
};

function TreatmentIcon({ type, compact = false }: { type: string; compact?: boolean }) {
  const size = compact ? "h-12 w-12" : "h-40 w-40 lg:h-44 lg:w-44";
  return <span className={`relative block shrink-0 ${size}`} aria-hidden="true"><img src={treatmentIconSources[type]} alt="" className="h-full w-full object-contain" /></span>;
}

function TreatmentDetails({ treatment }: { treatment: (typeof treatments)[number] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-start gap-3">
        <TreatmentIcon type={treatment.icon} compact />
        <div><p className="section-label mb-1">{treatment.tag}</p><h3 className="font-serif text-2xl font-light leading-tight text-[#2c1f14]">{treatment.title}</h3></div>
      </div>
      <p className="mb-4 font-sans text-sm font-light leading-relaxed text-muted">{treatment.description}</p>
      <ul className="mb-5 space-y-1.5">{treatment.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-2 font-sans text-xs font-light text-muted"><span className="text-purple">✦</span><span>{bullet}</span></li>)}</ul>
      <Link href="/body-reset" className="btn-primary mt-auto w-full text-center" onClick={(event) => event.stopPropagation()}>See If This Is Right For You</Link>
    </div>
  );
}

export default function Services() {
  const [selected, setSelected] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(() => new Set());
  const toggleCard = (index: number) => setFlippedCards((current) => { const next = new Set(current); next.has(index) ? next.delete(index) : next.add(index); return next; });

  return (
    <section className="bg-cream pb-10 pt-8 md:pb-12 md:pt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div id="treatments" className="mb-5 scroll-mt-24 text-center md:mb-7"><p className="section-label mb-2">The Ultimate &quot;YOU&quot; Experience</p><h2 className="font-serif text-3xl font-light leading-tight text-[#2c1f14] md:text-5xl">Explore Susie&apos;s Professional Treatments</h2></div>

        <div className="relative md:hidden">
          <div className="grid grid-cols-6 gap-1 rounded-t-[18px] border border-purple/10 bg-cream/95 p-2">
            {treatments.map((treatment, index) => <button key={treatment.title} type="button" onClick={() => setSelected(index)} className={`flex min-h-[82px] flex-col items-center justify-center rounded-[10px] border px-0.5 py-1.5 ${selected === index ? "border-purple bg-purple/10" : "border-stone/80 bg-white/75"}`}><TreatmentIcon type={treatment.icon} compact /><span className="mt-1 text-[7px] font-medium uppercase text-purple">{treatment.tag}</span></button>)}
          </div>
          <div className="rounded-b-[18px] border border-t-0 border-purple/15 bg-white p-4 shadow-[0_10px_28px_rgba(60,40,80,0.08)]"><TreatmentDetails treatment={treatments[selected]} /></div>
        </div>

        <div className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-3">
          {treatments.map((treatment, index) => {
            const isFlipped = flippedCards.has(index);
            return <div key={treatment.title} role="button" tabIndex={0} onClick={() => toggleCard(index)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggleCard(index); } }} className="h-[430px] cursor-pointer rounded-[22px] outline-none [perspective:1200px]">
              <div className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[22px] border border-purple/15 bg-gradient-to-br from-white via-cream to-purple/5 p-6 text-center shadow-[0_10px_28px_rgba(60,40,80,0.08)] [backface-visibility:hidden]"><p className="section-label mb-2">{treatment.tag}</p><TreatmentIcon type={treatment.icon} /><h3 className="mt-2 font-serif text-2xl font-light leading-tight text-[#2c1f14]">{treatment.title}</h3><p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-purple/70">Tap to Learn More</p></div>
                <div className="absolute inset-0 rounded-[22px] border border-purple/20 bg-white p-6 shadow-[0_10px_28px_rgba(60,40,80,0.10)] [backface-visibility:hidden] [transform:rotateY(180deg)]"><TreatmentDetails treatment={treatment} /></div>
              </div>
            </div>;
          })}
        </div>

        <p className="mx-auto mt-6 max-w-xl text-center text-xs font-light text-muted/60">Each treatment supports a different wellness goal and is not intended to diagnose, treat, cure, or prevent disease. Individual experiences vary.</p>
      </div>
    </section>
  );
}
