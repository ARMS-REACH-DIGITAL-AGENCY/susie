import Image from "next/image";

const feelings = [
  {
    label: "Don’t feel like yourself",
    microcopy: "“I don’t recognize the woman in the mirror.” Susie is here to help you rediscover that woman.",
    image: "/images/symptom-yourself.png",
  },
  {
    label: "Puffy or bloated",
    microcopy: "“My rings are tight. My clothes don’t fit the same. I just feel puffy.” Let’s support healthy lymphatic flow so you can feel lighter again.",
    image: "/images/symptom-puffy.png",
  },
  {
    label: "Inflamed or achy",
    microcopy: "“Everything aches. I wake up stiff. My body hurts for no reason.” Let’s help support recovery naturally.",
    image: "/images/symptom-achy.png",
  },
  {
    label: "Heavy or sluggish",
    microcopy: "“I feel like I’m dragging all day. Even simple things feel harder.” Your body deserves better support.",
    image: "/images/symptom-heavy.png",
  },
  {
    label: "Always exhausted?",
    microcopy: "“I slept, but I still feel exhausted. Coffee isn’t helping anymore.” Let’s help your body recover and recharge.",
    image: "/images/symptom-tired.png",
  },
  {
    label: "Brain fog",
    microcopy: "“I walk into a room and forget why. I can’t focus like I used to.” Let’s help you feel clear and focused again.",
    image: "/images/symptom-foggy.png",
  },
  {
    label: "Stuck — nothing works",
    microcopy: "“I’ve tried things before, but nothing seems to last.” Stop guessing and find the right first step.",
    image: "/images/symptom-stuck.png",
  },
  {
    label: "Uncomfortable in your body",
    microcopy: "“My body doesn’t feel like mine anymore.” Let’s help you feel more comfortable and at home again.",
    image: "/images/symptom-uncomfortable.png",
  },
];

export default function Problem() {
  return (
    <section className="pt-8 md:pt-12 pb-10 md:pb-16 bg-white/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div id="testimonials" className="bg-purple/5 border border-purple/15 rounded-sm px-5 md:px-8 py-6 md:py-7 max-w-4xl mx-auto mb-8 md:mb-10 shadow-[0_8px_24px_rgba(60,40,80,0.06)] scroll-mt-20 md:scroll-mt-24">
          <div className="text-gold text-lg mb-3">★★★★★</div>
          <p className="font-serif text-xl md:text-2xl font-light italic text-[#2c1f14] leading-relaxed mb-4">
            “I am so grateful to Susie and her expertise on Synergie. I lost 26 pounds and went down 2 sizes.
          </p>
          <p className="font-serif text-lg md:text-xl font-light italic text-[#2c1f14] leading-relaxed mb-4">
            I must admit I was skeptical in the beginning, but I trusted her. I am thrilled with the results and I feel great. Added bonus — my skin is so much softer. It’s safe and gets wonderful results.”
          </p>
          <p className="text-xs font-sans font-medium tracking-widest uppercase text-purple/60 mb-2">— Leslie Y.</p>
          <p className="text-[11px] font-sans font-light text-muted/70 leading-relaxed">Individual results vary. Testimonial shared from a Susie Sculpts client.</p>
        </div>

        <p className="section-label mb-3 md:mb-4">For the woman who feels lost in her own body</p>
        <h2 className="font-serif text-[31px] sm:text-4xl md:text-5xl font-light leading-[0.98] md:leading-tight text-[#2c1f14] mb-3 md:mb-5">
          <span className="block sm:inline">Do you still recognize</span>{" "}
          <span className="block sm:inline">the woman in the mirror?</span>
        </h2>

        <div className="relative -mx-4 mb-4 md:mx-0 md:mb-7">
          <div className="pointer-events-none absolute left-1 top-[42%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-purple shadow-md md:hidden" aria-hidden="true">‹</div>
          <div className="pointer-events-none absolute right-1 top-[42%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-purple shadow-md md:hidden" aria-hidden="true">›</div>

          <div className="overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max gap-3 px-4 md:gap-4 md:px-0">
              {feelings.map((f) => (
                <article
                  key={f.label}
                  className="flex w-[82vw] max-w-[315px] shrink-0 snap-center flex-col overflow-hidden rounded-[18px] border border-[rgba(120,90,150,0.12)] bg-[#faf8f5] text-left shadow-[0_6px_20px_rgba(60,40,80,0.06)] md:w-[230px] md:snap-start"
                >
                  <div className="relative w-full aspect-[4/3] md:aspect-square">
                    <Image src={f.image} alt={f.label} fill className="object-cover object-top" sizes="(max-width: 767px) 82vw, 230px" />
                  </div>
                  <div className="px-4 py-3 md:py-4">
                    <p className="whitespace-nowrap font-sans text-[17px] font-semibold leading-none text-[#6A5A6D] md:whitespace-normal md:text-[18px] md:leading-snug">{f.label}</p>
                    <p className="mt-2 font-sans text-[13px] font-normal leading-snug text-[#9a8fa0]">{f.microcopy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="font-sans font-light text-muted text-[15px] md:text-lg leading-relaxed max-w-3xl mx-auto space-y-3 md:space-y-4 md:mb-3">
          <p>If you’ve been feeling like your body isn’t your own anymore, you’re not alone. Many women tell Susie they don’t recognize the woman looking back at them.</p>
          <p className="hidden md:block">This isn’t about what is wrong with you. It is about naming what changed so you can start finding your way back.</p>
        </div>
      </div>
    </section>
  );
}
