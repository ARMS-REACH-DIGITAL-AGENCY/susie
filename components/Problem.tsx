"use client";

import Image from "next/image";
import { useRef } from "react";

type Slide =
  | { kind: "symptom"; label: string; microcopy: string; image: string }
  | { kind: "review"; quote: string; author: string; source?: string };

const slides: Slide[] = [
  { kind: "symptom", label: "Don’t feel like yourself", microcopy: "“I don’t recognize the woman in the mirror.” Susie is here to help you rediscover that woman.", image: "/images/symptom-yourself.png" },
  { kind: "review", quote: "I am so grateful to Susie and her expertise on Synergie. I lost 26 pounds and went down 2 sizes.", author: "Leslie Y." },
  { kind: "symptom", label: "Uncomfortable in your body", microcopy: "“My body doesn’t feel like mine anymore.” Let’s help you feel more comfortable and at home again.", image: "/images/symptom-uncomfortable.png" },
  { kind: "review", quote: "I was extremely happy with the results that I got and lost a couple inches. Susie is very professional and very easy to talk to.", author: "Mary H.", source: "Google Review" },
  { kind: "symptom", label: "Puffy or bloated", microcopy: "“My rings are tight. My clothes don’t fit the same. I just feel puffy.” Let’s support healthy lymphatic flow so you can feel lighter again.", image: "/images/symptom-puffy.png" },
  { kind: "symptom", label: "Inflamed or achy", microcopy: "“Everything aches. I wake up stiff. My body hurts for no reason.” Let’s help support recovery naturally.", image: "/images/symptom-achy.png" },
  { kind: "symptom", label: "Heavy or sluggish", microcopy: "“I feel like I’m dragging all day. Even simple things feel harder.” Your body deserves better support.", image: "/images/symptom-heavy.png" },
  { kind: "symptom", label: "Always exhausted?", microcopy: "“I slept, but I still feel exhausted. Coffee isn’t helping anymore.” Let’s help your body recover and recharge.", image: "/images/symptom-tired.png" },
  { kind: "symptom", label: "Brain fog", microcopy: "“I walk into a room and forget why. I can’t focus like I used to.” Let’s help you feel clear and focused again.", image: "/images/symptom-foggy.png" },
  { kind: "symptom", label: "Stuck — nothing works", microcopy: "“I’ve tried things before, but nothing seems to last.” Stop guessing and find the right first step.", image: "/images/symptom-stuck.png" },
];

export default function Problem() {
  const trackRef = useRef<HTMLDivElement>(null);
  const move = (direction: number) => trackRef.current?.scrollBy({ left: direction * Math.min(trackRef.current.clientWidth * 0.82, 320), behavior: "smooth" });

  return (
    <section className="bg-white/50 pb-8 pt-6 md:pb-12 md:pt-8">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <div id="testimonials" className="section-anchor">
          <p className="section-label mb-3">For the woman who feels lost in her own body</p>
          <h2 className="mb-3 font-serif text-[31px] font-light leading-[1.02] text-[#2c1f14] sm:text-4xl md:mb-4 md:text-5xl">Do you still recognize the woman in the mirror?</h2>
        </div>

        <div className="relative -mx-4 mb-2 md:mx-0 md:mb-4">
          <button type="button" onClick={() => move(-1)} aria-label="Previous symptoms or review" className="absolute left-1 top-[40%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl text-purple shadow-md md:left-2">‹</button>
          <button type="button" onClick={() => move(1)} aria-label="Next symptoms or review" className="absolute right-1 top-[40%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl text-purple shadow-md md:right-2">›</button>
          <div ref={trackRef} className="overflow-x-auto scroll-smooth snap-x snap-mandatory scroll-px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max gap-3 px-4 md:gap-4 md:px-12">
              {slides.map((slide, index) =>
                slide.kind === "symptom" ? (
                  <article key={slide.label} className="flex w-[82vw] max-w-[315px] shrink-0 snap-center flex-col overflow-hidden rounded-[18px] border border-[rgba(120,90,150,0.12)] bg-[#faf8f5] text-left shadow-[0_6px_20px_rgba(60,40,80,0.06)] md:w-[230px] md:snap-start">
                    <div className="relative aspect-[4/3] w-full md:aspect-square"><Image src={slide.image} alt={slide.label} fill className="object-cover object-top" sizes="(max-width: 767px) 82vw, 230px" /></div>
                    <div className="px-4 py-3"><p className="font-sans text-[17px] font-semibold leading-snug text-[#6A5A6D]">{slide.label}</p><p className="mt-2 font-sans text-[13px] font-normal leading-snug text-[#9a8fa0]">{slide.microcopy}</p></div>
                  </article>
                ) : (
                  <article key={`review-${index}`} className="flex w-[82vw] max-w-[315px] shrink-0 snap-center flex-col justify-center rounded-[18px] border border-purple/15 bg-purple/5 px-6 py-8 text-center shadow-[0_6px_20px_rgba(60,40,80,0.06)] md:w-[230px] md:snap-start">
                    <div className="mb-3 text-lg text-gold">★★★★★</div>
                    <p className="font-serif text-xl font-light italic leading-relaxed text-[#2c1f14]">“{slide.quote}”</p>
                    <p className="mt-4 text-xs font-sans font-medium uppercase tracking-widest text-purple/60">— {slide.author}</p>
                    {slide.source ? (
                      <p className="mt-2 text-[10px] font-sans font-medium uppercase tracking-[0.16em] text-purple/45">{slide.source}</p>
                    ) : (
                      <p className="mt-3 text-[10px] font-sans font-light leading-relaxed text-muted/70">Individual results vary. Testimonial shared from a Susie Sculpts client.</p>
                    )}
                  </article>
                ),
              )}
            </div>
          </div>
        </div>

        <p className="mx-auto max-w-[355px] font-sans text-[15px] font-semibold leading-[1.35] text-[#2c1f14] md:max-w-3xl md:text-lg md:font-medium md:leading-relaxed">If your body no longer feels like your own, you are not alone. Naming what changed is the first step toward finding your way back.</p>
      </div>
    </section>
  );
}
