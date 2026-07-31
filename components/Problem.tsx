import Image from "next/image";

const feelings = [
  {
    label: "Puffy or bloated",
    microcopy: "\u201cMy rings are tight. My clothes don\u2019t fit the same. I just feel puffy.\u201d Let\u2019s support healthy lymphatic flow so you can feel lighter again.",
    image: "/images/symptom-puffy.png",
  },
  {
    label: "Inflamed or achy",
    microcopy: "\u201cEverything aches. I wake up stiff. My body hurts for no reason.\u201d Let\u2019s help support recovery naturally.",
    image: "/images/symptom-achy.png",
  },
  {
    label: "Heavy or sluggish",
    microcopy: "\u201cI feel like I\u2019m dragging all day. Even simple things feel harder.\u201d Your body deserves better support.",
    image: "/images/symptom-heavy.png",
  },
  {
    label: "Always exhausted?",
    microcopy: "\u201cI slept, but I still feel exhausted. Coffee isn\u2019t helping anymore.\u201d Let\u2019s help your body recover and recharge.",
    image: "/images/symptom-tired.png",
  },
  {
    label: "Brain fog",
    microcopy: "\u201cI walk into a room and forget why. I can\u2019t focus like I used to.\u201d Let\u2019s help you feel clear and focused again.",
    image: "/images/symptom-foggy.png",
  },
  {
    label: "Stuck \u2014 nothing works",
    microcopy: "\u201cI\u2019ve tried things before, but nothing seems to last.\u201d Stop guessing and find the right first step.",
    image: "/images/symptom-stuck.png",
  },
  {
    label: "Uncomfortable in your body",
    microcopy: "\u201cMy body doesn\u2019t feel like mine anymore.\u201d Let\u2019s help you feel more comfortable and at home again.",
    image: "/images/symptom-uncomfortable.png",
  },
  {
    label: "Don\u2019t feel like yourself",
    microcopy: "\u201cI don\u2019t recognize the woman in the mirror.\u201d Susie is here to help you rediscover that woman.",
    image: "/images/symptom-yourself.png",
  },
];

export default function Problem() {
  return (
    <section id="testimonials" className="py-12 md:py-20 bg-white/50 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-purple/5 border border-purple/15 rounded-sm px-5 md:px-8 py-6 md:py-7 max-w-4xl mx-auto mb-12 shadow-[0_8px_24px_rgba(60,40,80,0.06)]">
          <div className="text-gold text-lg mb-3">\u2605\u2605\u2605\u2605\u2605</div>
          <p className="font-serif text-xl md:text-2xl font-light italic text-[#2c1f14] leading-relaxed mb-4">
            &ldquo;I am so grateful to Susie and her expertise on Synergie. I lost 26 pounds and went down 2 sizes.
          </p>
          <p className="font-serif text-lg md:text-xl font-light italic text-[#2c1f14] leading-relaxed mb-4">
            I must admit I was skeptical in the beginning, but I trusted her. I am thrilled with the results and I feel great. Added bonus \u2014 my skin is so much softer. It&rsquo;s safe and gets wonderful results.&rdquo;
          </p>
          <p className="text-xs font-sans font-medium tracking-widest uppercase text-purple/60 mb-2">
            \u2014 Leslie Y.
          </p>
          <p className="text-[11px] font-sans font-light text-muted/70 leading-relaxed">
            Individual results vary. Testimonial shared from a Susie Sculpts client.
          </p>
        </div>

        <p className="section-label mb-4">For the woman who feels lost in her own body</p>
        <h2 className="section-heading mb-5">Do you still recognize the woman in the mirror?</h2>
        <div className="font-sans font-light text-muted text-base md:text-lg leading-relaxed max-w-3xl mx-auto space-y-4 mb-8">
          <p>If you&rsquo;ve been feeling like your body isn&rsquo;t your own anymore, you&rsquo;re not alone. Many women tell Susie they don&rsquo;t recognize the woman looking back at them.</p>
          <p>This isn&rsquo;t about what is wrong with you. It is about naming what changed so you can start finding your way back.</p>
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
