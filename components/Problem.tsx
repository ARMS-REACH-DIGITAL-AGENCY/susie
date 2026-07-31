import Image from "next/image";

const feelings = [
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
  {
    label: "Don’t feel like yourself",
    microcopy: "“I don’t recognize the woman in the mirror.” Susie is here to help you rediscover that woman.",
    image: "/images/symptom-yourself.png",
  },
];

export default function Problem() {
  return (
    <section className="pt-8 md:pt-12 pb-12 md:pb-16 bg-white/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div id="testimonials" className="bg-purple/5 border border-purple/15 rounded-sm px-5 md:px-8 py-6 md:py-7 max-w-4xl mx-auto mb-10 shadow-[0_8px_24px_rgba(60,40,80,0.06)] scroll-mt-20 md:scroll-mt-24">
          <div className="text-gold text-lg mb-3">★★★★★</div>
          <p className="font-serif text-xl md:text-2xl font-light italic text-[#2c1f14] leading-relaxed mb-4">
            “I am so grateful to Susie and her expertise on Synergie. I lost 26 pounds and went down 2 sizes.
          </p>
          <p className="font-serif text-lg md:text-xl font-light italic text-[#2c1f14] leading-relaxed mb-4">
            I must admit I was skeptical in the beginning, but I trusted her. I am thrilled with the results and I feel great. Added bonus — my skin is so much softer. It’s safe and gets wonderful results.”
          </p>
          <p className="text-xs font-sans font-medium tracking-widest uppercase text-purple/60 mb-2">
            — Leslie Y.
          </p>
          <p className="text-[11px] font-sans font-light text-muted/70 leading-relaxed">
            Individual results vary. Testimonial shared from a Susie Sculpts client.
          </p>
        </div>

        <p className="section-label mb-4">For the woman who feels lost in her own body</p>
        <h2 className="section-heading mb-5">Do you still recognize the woman in the mirror?</h2>
        <div className="font-sans font-light text-muted text-base md:text-lg leading-relaxed max-w-3xl mx-auto space-y-4 mb-8">
          <p>If you’ve been feeling like your body isn’t your own anymore, you’re not alone. Many women tell Susie they don’t recognize the woman looking back at them.</p>
          <p>This isn’t about what is wrong with you. It is about naming what changed so you can start finding your way back.</p>
        </div>

        <div className="-mx-4 sm:mx-0 overflow-x-auto pb-4 snap-x snap-mandatory">
          <div className="flex gap-4 px-4 sm:px-0 min-w-max">
            {feelings.map((f) => (
              <div key={f.label} className="group flex flex-col text-left rounded-[18px] overflow-hidden border border-[rgba(120,90,150,0.12)] bg-[#faf8f5] shadow-[0_6px_20px_rgba(60,40,80,0.06)] w-[210px] md:w-[230px] shrink-0 snap-start">
                <div className="relative w-full aspect-square">
                  <Image src={f.image} alt={f.label} fill className="object-cover object-top rounded-t-[18px]" sizes="230px" />
                </div>
                <div className="px-4 py-4 flex flex-col gap-1">
                  <p className="font-sans font-semibold leading-snug text-[#6A5A6D] text-[18px]">{f.label}</p>
                  <p className="font-sans font-normal text-[13px] text-[#9a8fa0] leading-snug">{f.microcopy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs font-sans font-light text-muted/60 mt-1 mb-7">
          Swipe or scroll to see more ways women describe feeling before they come to Susie.
        </p>

        <a href="#services" className="btn-primary">View Services</a>
      </div>
    </section>
  );
}
