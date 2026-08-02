"use client";

import { useState } from "react";
import Link from "next/link";

const treatments = [
  {
    title: "Lymphatic Wellness Series",
    tag: "Lymphatic",
    icon: "lymphatic",
    description:
      "A gentle, effective treatment using controlled suction to support healthy lymphatic flow, improve circulation, and help you feel lighter, more energized, and refreshed.",
    bullets: [
      "Supports healthy lymphatic flow",
      "Supports circulation and overall wellness",
      "Helps you feel lighter and less puffy",
      "Supports healthy digestion and elimination",
      "Helps your body feel refreshed",
    ],
  },
  {
    title: "PEMF Recovery and Wellness Series",
    tag: "PEMF",
    icon: "pemf",
    description:
      "Pulsed electromagnetic field sessions designed to support circulation, relaxation, recovery, energy, and whole-body wellness.",
    bullets: [
      "Supports recovery and relaxation",
      "Supports circulation",
      "Supports energy and clarity",
      "Non-invasive wellness session",
      "Pairs well with other treatments",
    ],
  },
  {
    title: "Muscle + Strength + Tone Series",
    tag: "Muscle",
    icon: "muscle",
    description:
      "A non-invasive treatment using electromagnetic technology to activate muscles, support tone, and help you feel stronger and more confident.",
    bullets: [
      "Muscle activation and tone",
      "Body contouring support",
      "Supports abdomen, thighs, and glutes",
      "No surgery or downtime",
      "Pairs well with lymphatic support",
    ],
  },
  {
    title: "Body Contouring Series",
    tag: "Contour",
    icon: "contour",
    description:
      "A gentle contouring approach that supports smoother, firmer-feeling skin and helps target stubborn areas without surgery or downtime.",
    bullets: [
      "Supports body contouring",
      "Supports firmer-feeling skin",
      "Targets stubborn areas",
      "Non-invasive treatment",
      "Complements wellness plans",
    ],
  },
  {
    title: "Fascia and Skin Revival Series",
    tag: "Fascia",
    icon: "fascia",
    description:
      "Focused bodywork designed to support circulation, fascia mobility, smoother-looking skin, and a more refreshed feeling in treated areas.",
    bullets: [
      "Supports skin texture and smoothness",
      "Supports circulation",
      "Targets areas of visible texture",
      "Supports fascia mobility",
      "Pairs well with contouring treatments",
    ],
  },
  {
    title: "Pelvic Floor Strengthening Series",
    tag: "Pelvic",
    icon: "pelvic",
    description:
      "A non-invasive strengthening option focused on the pelvic floor and deep core support, designed for comfort and privacy.",
    bullets: [
      "Supports pelvic-floor strength",
      "Supports deep-core engagement",
      "Non-invasive and fully clothed",
      "Private one-on-one appointments",
      "No downtime",
    ],
  },
];

function TreatmentIcon({ type, compact = false }: { type: string; compact?: boolean }) {
  const common = compact ? "h-6 w-6" : "h-12 w-12 md:h-16 md:w-16";

  if (type === "pemf") {
    return (
      <svg viewBox="0 0 64 64" className={common} fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="3" />
        <path d="M8 32h13V22c0-5 8-5 8 0v20c0 5 8 5 8 0V22c0-5 8-5 8 0v10h11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "muscle") {
    return (
      <svg viewBox="0 0 64 64" className={common} fill="none" aria-hidden="true">
        <path d="M12 42c8 0 11-8 14-18 7 2 8 8 9 12 5-4 9-3 13 1 4 4 5 10 2 15H20c-5 0-8-4-8-10Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 48c8-3 16-3 26 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "pelvic") {
    return (
      <svg viewBox="0 0 64 64" className={common} fill="none" aria-hidden="true">
        <path d="M20 9c-4 12-5 25-2 39h28c3-14 2-27-2-39" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M32 10v33M24 19h16M22 27h20M24 35h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M23 46c3-7 7-8 9-2 2-6 6-5 9 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "fascia") {
    return (
      <svg viewBox="0 0 64 64" className={common} fill="none" aria-hidden="true">
        <path d="M14 20c12-7 24-7 36 0M14 44c12 7 24 7 36 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M18 24c-6 5-6 11 0 16M46 24c6 5 6 11 0 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M24 22c2 5 2 15 0 20M40 22c-2 5-2 15 0 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "contour") {
    return (
      <svg viewBox="0 0 64 64" className={common} fill="none" aria-hidden="true">
        <path d="M23 10c-5 10-5 18-2 24-4 6-3 13 2 20M41 10c5 10 5 18 2 24 4 6 3 13-2 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M17 30h10M37 30h10M14 27l3 3-3 3M50 27l-3 3 3 3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className={common} fill="none" aria-hidden="true">
      <path d="M18 12h16c8 0 14 6 14 14v20H18V12Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M34 20h12M34 28h12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M10 18h8v22h-8z" stroke="currentColor" strokeWidth="3" />
      <path d="M14 44c0 4 3 8 6 8s6-4 6-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function TreatmentDetails({ treatment }: { treatment: (typeof treatments)[number] }) {
  return (
    <div className="flex h-full flex-col">
      <p className="section-label mb-3">{treatment.tag}</p>
      <h3 className="mb-4 font-serif text-2xl font-light leading-tight text-[#2c1f14]">{treatment.title}</h3>
      <p className="mb-5 font-sans text-sm font-light leading-relaxed text-muted">{treatment.description}</p>
      <ul className="mb-6 space-y-2">
        {treatment.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 font-sans text-xs font-light text-muted">
            <span className="mt-0.5 text-purple">✦</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <Link href="/body-reset" className="btn-primary mt-auto w-full text-center">
        See If This Is Right For You
      </Link>
    </div>
  );
}

export default function Services() {
  const [selected, setSelected] = useState(0);

  return (
    <section className="bg-cream pb-12 pt-10 md:pb-16 md:pt-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div id="treatments" className="mb-6 scroll-mt-20 text-center md:mb-9 md:scroll-mt-24">
          <p className="section-label mb-3">The Ultimate &quot;YOU&quot; Experience</p>
          <h2 className="section-heading mb-5">Explore Susie&apos;s six treatments</h2>
          <p className="mx-auto max-w-2xl font-sans text-base font-light leading-relaxed text-muted md:text-lg">
            Every treatment supports a different goal. Choose one below to learn more, then let Susie&apos;s evaluation help identify the best place to start.
          </p>
        </div>

        <div className="md:hidden">
          <div className="sticky top-16 z-30 -mx-4 mb-3 border-y border-purple/10 bg-cream/95 px-2 py-2 shadow-sm backdrop-blur-md">
            <div className="grid grid-cols-6 gap-1">
              {treatments.map((treatment, index) => (
                <button
                  key={treatment.title}
                  type="button"
                  onClick={() => setSelected(index)}
                  className={`flex min-h-[56px] flex-col items-center justify-center rounded-[10px] border px-0.5 py-1.5 text-center transition ${
                    selected === index
                      ? "border-purple bg-purple/10 text-purple shadow-sm"
                      : "border-stone/80 bg-white/75 text-muted"
                  }`}
                  aria-pressed={selected === index}
                  aria-label={treatment.title}
                >
                  <TreatmentIcon type={treatment.icon} compact />
                  <span className="mt-1 max-w-full truncate font-sans text-[6.5px] font-medium uppercase leading-none tracking-[0.04em]">
                    {treatment.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-purple/15 bg-white/85 p-5 shadow-[0_10px_28px_rgba(60,40,80,0.08)]">
            <TreatmentDetails treatment={treatments[selected]} />
          </div>
        </div>

        <div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
          {treatments.map((treatment) => (
            <div key={treatment.title} className="group h-[430px] [perspective:1200px]">
              <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[22px] border border-purple/15 bg-gradient-to-br from-white via-cream to-purple/5 p-8 text-center shadow-[0_10px_28px_rgba(60,40,80,0.08)] [backface-visibility:hidden]">
                  <div className="mb-6 text-purple"><TreatmentIcon type={treatment.icon} /></div>
                  <p className="section-label mb-3">{treatment.tag}</p>
                  <h3 className="font-serif text-3xl font-light leading-tight text-[#2c1f14]">{treatment.title}</h3>
                  <p className="mt-5 font-sans text-xs font-medium uppercase tracking-[0.12em] text-purple/70">Hover or tap to learn more</p>
                </div>

                <div className="absolute inset-0 rounded-[22px] border border-purple/20 bg-white p-7 shadow-[0_10px_28px_rgba(60,40,80,0.10)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <TreatmentDetails treatment={treatment} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center font-sans text-xs font-light text-muted/60">
          Treatments are wellness-focused and are not intended to diagnose, treat, cure, or prevent any disease. Individual experiences vary.
        </p>
      </div>
    </section>
  );
}
