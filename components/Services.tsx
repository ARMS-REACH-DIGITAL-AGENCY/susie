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

function TreatmentIcon({ type, compact = false }: { type: string; compact?: boolean }) {
  const common = compact ? "h-8 w-8" : "h-20 w-20 md:h-24 md:w-24";
  const color = ["lymphatic", "muscle", "fascia"].includes(type) ? "#7654A8" : "#9B8062";

  const ring = (
    <>
      <circle cx="32" cy="32" r="25.5" stroke={color} strokeWidth="1.15" opacity="0.18" />
      <path d="M8.2 34.5C7.2 19.2 17.8 7.5 32.7 6.5c10.7-.7 19.5 3.8 24.8 12.1" stroke={color} strokeWidth="2.15" strokeLinecap="round" opacity="0.78" />
      <path d="M6.7 30.4C9.1 15.1 21.2 5.2 36.2 7.1c9.7 1.2 17.1 6.2 21.2 13.8" stroke={color} strokeWidth="1.35" strokeLinecap="round" opacity="0.42" />
      <path d="M7.8 39.1C11.4 51.2 21.3 58.7 33.9 58.4c11.7-.3 20.8-6.5 25-16.8" stroke={color} strokeWidth="2.1" strokeLinecap="round" opacity="0.72" />
      <path d="M10.2 43.7C14.5 54 23.8 59.3 34.5 58.5c9.4-.7 17.5-5.9 21.7-14.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.34" />
    </>
  );

  let symbol;

  if (type === "pemf") {
    symbol = (
      <>
        <path d="M23 41a9 9 0 0 1 18 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M32 15v10M19.5 19.5l5.4 7M44.5 19.5l-5.4 7M14.5 30l8.5 3M49.5 30 41 33" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 42h30" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
      </>
    );
  } else if (type === "muscle") {
    symbol = (
      <>
        <path d="M21 42c-3-8 1-14 6-17 1-5 1-9 5-11 3 3 4 7 3 11 5 0 8 2 11 6 2 3 2 7 0 11-3 5-8 8-14 8-5 0-9-3-11-8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 26c4 2 7 5 8 10 3-2 6-2 9 0M24 44c7 2 13 1 19-3" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
      </>
    );
  } else if (type === "contour") {
    symbol = (
      <>
        <path d="M25 15c-3 6-3 11-1 16-4 6-5 12-3 18M39 15c3 6 3 11 1 16 4 6 5 12 3 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M24 31c3 3 5 5 8 5s5-2 8-5M21 49c4-3 7-5 11-5s7 2 11 5" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
        <path d="M32 36v7" stroke={color} strokeWidth="1.45" strokeLinecap="round" opacity="0.7" />
      </>
    );
  } else if (type === "fascia") {
    symbol = (
      <>
        <path d="M15 25c7-3 13-3 20 0s12 3 18 0M14 31c7-3 14-3 21 0s12 3 18 0M15 37c7-3 13-3 20 0s12 3 18 0" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="20" cy="44" r="1.7" fill={color} opacity="0.8" />
        <circle cx="27" cy="46" r="1.45" fill={color} opacity="0.68" />
        <circle cx="34" cy="44" r="1.65" fill={color} opacity="0.8" />
        <circle cx="41" cy="46" r="1.45" fill={color} opacity="0.68" />
        <circle cx="48" cy="44" r="1.7" fill={color} opacity="0.8" />
        <path d="M18 49h30" stroke={color} strokeWidth="1.15" strokeLinecap="round" opacity="0.4" />
      </>
    );
  } else if (type === "pelvic") {
    symbol = (
      <>
        <path d="M22 27c-5 2-8 6-8 11 0 6 4 10 10 11 2 0 4-2 5-5l3-6 3 6c1 3 3 5 5 5 6-1 10-5 10-11 0-5-3-9-8-11-3-1-6 1-10 5-4-4-7-6-10-5Z" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M25 34c2 2 4 3 7 3s5-1 7-3M32 16v10" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="32" cy="12" r="1.6" fill={color} />
        <circle cx="32" cy="8" r="1.25" fill={color} opacity="0.65" />
      </>
    );
  } else {
    symbol = (
      <>
        <path d="M14 30c6-6 12-6 18 0s12 6 18 0M13 36c7-5 13-5 19 0s12 5 19 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="19" cy="22" r="1.7" fill={color} opacity="0.82" />
        <circle cx="26" cy="19" r="1.3" fill={color} opacity="0.65" />
        <circle cx="43" cy="22" r="1.7" fill={color} opacity="0.82" />
        <circle cx="48" cy="27" r="1.25" fill={color} opacity="0.65" />
        <circle cx="21" cy="43" r="1.3" fill={color} opacity="0.7" />
        <circle cx="45" cy="43" r="1.55" fill={color} opacity="0.75" />
      </>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className={common} fill="none" aria-hidden="true">
      {ring}
      {symbol}
    </svg>
  );
}

function TreatmentDetails({ treatment }: { treatment: (typeof treatments)[number] }) {
  return <div className="flex h-full flex-col"><p className="section-label mb-3">{treatment.tag}</p><h3 className="mb-4 font-serif text-2xl font-light leading-tight text-[#2c1f14]">{treatment.title}</h3><p className="mb-5 font-sans text-sm font-light leading-relaxed text-muted">{treatment.description}</p><ul className="mb-6 space-y-2">{treatment.bullets.map((bullet)=><li key={bullet} className="flex items-start gap-2 font-sans text-xs font-light text-muted"><span className="mt-0.5 text-purple">✦</span><span>{bullet}</span></li>)}</ul><Link href="/body-reset" className="btn-primary mt-auto w-full text-center">See If This Is Right For You</Link></div>;
}

export default function Services() {
  const [selected, setSelected] = useState(0);
  return <section className="bg-cream pb-12 pt-10 md:pb-16 md:pt-14"><div className="mx-auto max-w-6xl px-4 sm:px-6"><div id="treatments" className="mb-4 scroll-mt-20 text-center md:mb-9 md:scroll-mt-24"><p className="section-label mb-3">The Ultimate &quot;YOU&quot; Experience</p><h2 className="whitespace-nowrap font-serif text-[18px] font-light leading-tight text-[#2c1f14] sm:text-3xl md:text-5xl">Explore Susie&apos;s Professional Treatments</h2></div><div className="relative md:hidden"><div className="sticky top-16 z-30 -mx-4"><div className="border-y border-purple/10 bg-cream/95 px-2 py-2 shadow-sm backdrop-blur-md"><div className="grid grid-cols-6 gap-1">{treatments.map((treatment,index)=><button key={treatment.title} type="button" onClick={()=>setSelected(index)} className={`flex min-h-[62px] flex-col items-center justify-center rounded-[10px] border px-0.5 py-1.5 text-center transition ${selected===index?"border-purple bg-purple/10 shadow-sm":"border-stone/80 bg-white/75 text-muted"}`} aria-pressed={selected===index} aria-label={treatment.title}><TreatmentIcon type={treatment.icon} compact/><span className={`mt-1 max-w-full truncate font-sans text-[6.5px] font-medium uppercase leading-none tracking-[0.04em] ${selected===index?"text-purple":"text-muted"}`}>{treatment.tag}</span></button>)}</div></div><div className="mx-4 rounded-b-[22px] border border-t-0 border-purple/15 bg-white/95 p-5 shadow-[0_10px_28px_rgba(60,40,80,0.08)] backdrop-blur-md"><TreatmentDetails treatment={treatments[selected]}/></div></div></div><div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">{treatments.map((treatment)=><div key={treatment.title} className="group h-[430px] [perspective:1200px]"><div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]"><div className="absolute inset-0 flex flex-col items-center justify-center rounded-[22px] border border-purple/15 bg-gradient-to-br from-white via-cream to-purple/5 p-8 text-center shadow-[0_10px_28px_rgba(60,40,80,0.08)] [backface-visibility:hidden]"><div className="mb-5"><TreatmentIcon type={treatment.icon}/></div><p className="section-label mb-3">{treatment.tag}</p><h3 className="font-serif text-3xl font-light leading-tight text-[#2c1f14]">{treatment.title}</h3><p className="mt-5 font-sans text-xs font-medium uppercase tracking-[0.12em] text-purple/70">Hover or tap to learn more</p></div><div className="absolute inset-0 rounded-[22px] border border-purple/20 bg-white p-7 shadow-[0_10px_28px_rgba(60,40,80,0.10)] [backface-visibility:hidden] [transform:rotateY(180deg)]"><TreatmentDetails treatment={treatment}/></div></div></div>)}</div><p className="mx-auto mt-8 max-w-xl text-center font-sans text-xs font-light text-muted/60">Every treatment supports a different goal, are wellness-focused, and are not intended to diagnose, treat, cure, or prevent any disease. Individual experiences vary.</p></div></section>;
}
