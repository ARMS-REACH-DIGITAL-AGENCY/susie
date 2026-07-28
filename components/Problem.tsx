import Image from "next/image";

const feelings = [
  { label: "Puffy or bloated", microcopy: "You feel swollen, uncomfortable, or like your body is holding onto everything.", image: "/images/symptom-puffy.png" },
  { label: "Inflamed or achy", microcopy: "Your body feels sore, irritated, or constantly off.", image: "/images/symptom-achy.png" },
  { label: "Heavy or sluggish", microcopy: "You feel weighed down, slow, or like your body just isn't moving well.", image: "/images/symptom-heavy.png" },
  { label: "Tired all the time", microcopy: "Even after resting, your energy still feels low.", image: "/images/symptom-tired.png" },
  { label: "Foggy or unfocused", microcopy: "Your mind feels cloudy, scattered, or hard to clear.", image: "/images/symptom-foggy.png" },
  { label: "Stuck — nothing works", microcopy: "You've tried things before, but nothing seems to create lasting change.", image: "/images/symptom-stuck.png" },
  { label: "Uncomfortable in your body", microcopy: "You don't feel at ease in your skin right now.", image: "/images/symptom-uncomfortable.png" },
  { label: "Don't feel like yourself", microcopy: "Something feels off, and you want to feel like you again.", image: "/images/symptom-yourself.png" },
];

export default function Problem() {
  return (
    <section id="testimonials" className="py-12 md:py-20 bg-white/50 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-purple/5 border border-purple/15 rounded-sm px-5 md:px-8 py-6 md:py-7 max-w-4xl mx-auto mb-12 shadow-[0_8px_24px_rgba(60,40,80,0.06)]">
          <div className="text-gold text-lg mb-3">★★★★★</div>
          <p className="font-serif text-xl md:text-2xl font-light italic text-[#2c1f14] leading-relaxed mb-4">
            &ldquo;I am so grateful to Susie and her expertise on Synergie. I lost 26 pounds and went down 2 sizes.
          </p>
          <p className="font-serif text-lg md:text-xl font-light italic text-[#2c1f14] leading-relaxed mb-4">
            I must admit I was skeptical in the beginning, but I trusted her. I am thrilled with the results and I feel great. Added bonus — my skin is so much softer. It&rsquo;s safe and gets wonderful results.&rdquo;
          </p>
          <p className="text-xs font-sans font-medium tracking-widest uppercase text-purple/60 mb-2">
            — Leslie Y.
          </p>
          <p className="text-[11px] font-sans font-light text-muted/70 leading-relaxed">
            Individual results vary. Testimonial shared from a Susie Sculpts client.
          </p>
        </div>

        <p className="section-label mb-4">You Are Not Alone</p>
        <h2 className="section-heading mb-5">Does any of this sound familiar?</h2>
        <div className="font-sans font-light text-muted text-base md:text-lg leading-relaxed max-w-3xl mx-auto space-y-4 mb-8">
          <p>Many women come to Susie feeling puffy, inflamed, tired, foggy, heavy, stuck, or disconnected from their body.</p>
          <p>Not because they stopped caring. Because their body changed — and what used to work no longer feels like enough.</p>
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
