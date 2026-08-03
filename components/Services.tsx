"use client";

import { useState } from "react";
import Link from "next/link";

const treatments = [
  { title: "Lymphatic Wellness Series", tag: "Lymphatic", icon: "lymphatic", description: "A gentle, effective treatment using controlled suction to support healthy lymphatic flow, improve circulation, and help you feel lighter, more energized, and refreshed.", bullets: ["Supports healthy lymphatic flow", "Supports circulation and overall wellness", "Helps you feel lighter and less puffy", "Supports healthy digestion and elimination", "Helps your body feel refreshed"] },
  { title: "PEMF Recovery and Wellness Series", tag: "PEMF", icon: "pemf", description: "Pulsed electromagnetic field sessions designed to support circulation, relaxation, recovery, energy, and whole-body wellness.", bullets: ["Supports recovery and relaxation", "Supports circulation", "Supports energy and clarity", "Non-invasive wellness session", "Pairs well with other treatments"] },
  { title: "Muscle + Strength + Tone Series", tag: "Muscle", icon: "muscle", description: "A non-invasive treatment using electromagnetic technology to activate muscles, support tone, and help you feel stronger and more confident.", bullets: ["Muscle activation and tone", "Body contouring support", "Supports abdomen, thighs, and glutes", "No surgery or downtime", "Pairs well with lymphatic support"] },
  { title: "Body Contouring Series", tag: "Contour", icon: "contour", description: "A gentle contouring approach that supports smoother, firmer-feeling skin and helps target stubborn areas without surgery or downtime.", bullets: ["Supports body contouring", "Supports firmer-feeling skin", "Targets stubborn areas", "Non-invasive treatment", "Complements wellness plans"] },
  { title: "Fascia and Skin Revival Series", tag: "Fascia", icon: "fascia", description: "Focused bodywork designed to support circulation, fascia mobility, smoother-looking skin, and a more refreshed feeling in treated areas.", bullets: ["Supports skin texture and smoothness", "Supports circulation", "Targets areas of visible texture", "Supports fascia mobility", "Pairs well with contouring treatments"] },
  { title: "Pelvic Floor Strengthening Series", tag: "Pelvic", icon: "pelvic", description: "A non-invasive strengthening option focused on the pelvic floor and deep core support, designed for comfort and privacy.", bullets: ["Supports pelvic-floor strength", "Supports deep-core engagement", "Non-invasive and fully clothed", "Private one-on-one appointments", "No downtime"] },
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
  const src = treatmentIconSources[type] ?? treatmentIconSources.lymphatic;
  const size = compact
    ? "h-12 w-12 sm:h-14 sm:w-14"
    : "h-56 w-56 lg:h-64 lg:w-64 xl:h-72 xl:w-72";

  return (
    <span className={`relative block shrink-0 ${size}`} aria-hidden="true">
      <img src={src} alt="" className="h-full w-full object-contain" />
    </span>
  );
}

function TreatmentDetails({ treatment }: { treatment: (typeof treatments)[number] }) {
  return <div className="flex h-full flex-col"><p className="section-label mb-3">{treatment.tag}</p><h3 className="mb-4 font-serif text-2xl font-light leading-tight text-[#2c1f14]">{treatment.title}</h3><p className="mb-5 font-sans text-sm font-light leading-relaxed text-muted">{treatment.description}</p><ul className="mb-6 space-y-2">{treatment.bullets.map((bullet)=><li key={bullet} className="flex items-start gap-2 font-sans text-xs font-light text-muted"><span className="mt-0.5 text-purple">✦</span><span>{bullet}</span></li>)}</ul><Link href="/body-reset" className="btn-primary mt-auto w-full text-center">See If This Is Right For You</Link></div>;
}

export default function Services() {
  const [selected, setSelected] = useState(0);
  return <section className="bg-cream pb-12 pt-10 md:pb-16 md:pt-14"><div className="mx-auto max-w-6xl px-4 sm:px-6"><div id="treatments" className="mb-4 scroll-mt-20 text-center md:mb-9 md:scroll-mt-24"><p className="section-label mb-3">The Ultimate &quot;YOU&quot; Experience</p><h2 className="whitespace-nowrap font-serif text-[18px] font-light leading-tight text-[#2c1f14] sm:text-3xl md:text-5xl">Explore Susie&apos;s Professional Treatments</h2></div><div className="relative md:hidden"><div className="sticky top-16 z-30 -mx-4"><div className="border-y border-purple/10 bg-cream/95 px-2 py-2 shadow-sm backdrop-blur-md"><div className="grid grid-cols-6 gap-1">{treatments.map((treatment,index)=><button key={treatment.title} type="button" onClick={()=>setSelected(index)} className={`flex min-h-[96px] flex-col items-center justify-center rounded-[10px] border px-0.5 py-2 text-center transition ${selected===index?"border-purple bg-purple/10 shadow-sm":"border-stone/80 bg-white/75 text-muted"}`} aria-pressed={selected===index} aria-label={treatment.title}><TreatmentIcon type={treatment.icon} compact/><span className={`mt-1 flex min-h-[16px] w-full items-center justify-center whitespace-nowrap font-sans text-[7px] font-medium uppercase leading-none tracking-[0.01em] sm:text-[8px] ${selected===index?"text-purple":"text-muted"}`}>{treatment.tag}</span></button>)}</div></div><div className="mx-4 rounded-b-[22px] border border-t-0 border-purple/15 bg-white/95 p-5 shadow-[0_10px_28px_rgba(60,40,80,0.08)] backdrop-blur-md"><TreatmentDetails treatment={treatments[selected]}/></div></div></div><div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">{treatments.map((treatment)=><div key={treatment.title} className="group h-[540px] [perspective:1200px]"><div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]"><div className="absolute inset-0 flex flex-col items-center justify-center rounded-[22px] border border-purple/15 bg-gradient-to-br from-white via-cream to-purple/5 p-7 text-center shadow-[0_10px_28px_rgba(60,40,80,0.08)] [backface-visibility:hidden]"><div className="mb-1"><TreatmentIcon type={treatment.icon}/></div><p className="section-label mb-3">{treatment.tag}</p><h3 className="font-serif text-3xl font-light leading-tight text-[#2c1f14]">{treatment.title}</h3><p className="mt-5 font-sans text-xs font-medium uppercase tracking-[0.12em] text-purple/70">Hover or tap to learn more</p></div><div className="absolute inset-0 rounded-[22px] border border-purple/20 bg-white p-7 shadow-[0_10px_28px_rgba(60,40,80,0.10)] [backface-visibility:hidden] [transform:rotateY(180deg)]"><TreatmentDetails treatment={treatment}/></div></div></div>)}</div><p className="mx-auto mt-8 max-w-xl text-center font-sans text-xs font-light text-muted/60">Every treatment supports a different goal, are wellness-focused, and are not intended to diagnose, treat, cure, or prevent any disease. Individual experiences vary.</p></div></section>;
}
