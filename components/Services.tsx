const services = [
  {
    title: "Synergy Vacuum Massage",
    tag: "Lymphatic Support",
    color: "border-purple/20",
    tagColor: "text-purple",
    description:
      "Support lymphatic flow, circulation, digestion and elimination, immune wellness, and mental clarity. Many clients report feeling lighter, less puffy, and more clear after their first session.",
    bullets: [
      "Lymphatic flow support",
      "Circulation & digestion",
      "Immune wellness support",
      "Mental clarity",
      "Reduced puffiness & heaviness",
    ],
  },
  {
    title: "PEMF / Frequency Wellness",
    tag: "Recovery & Reset",
    color: "border-gold/30",
    tagColor: "text-gold",
    description:
      "Pulsed electromagnetic field therapy to support recovery, circulation, inflammation response, stress reset, and whole-body wellness. A gentle, non-invasive way to support your body at the cellular level.",
    bullets: [
      "Inflammation response support",
      "Circulation & blood movement",
      "Recovery & energy",
      "Stress & body reset",
      "Whole-body wellness",
    ],
  },
  {
    title: "EMShape Body Sculpting",
    tag: "Body Confidence",
    color: "border-warm/20",
    tagColor: "text-warm",
    description:
      "Non-invasive body sculpting to support tone, shape, muscle activation, and body confidence — without surgery or downtime. A great next step for women ready to feel stronger and more confident in their body.",
    bullets: [
      "Muscle activation & tone",
      "Non-invasive contouring",
      "Body confidence support",
      "No surgery or downtime",
      "Personalized approach",
    ],
  },
];

export default function Services() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="section-label mb-4">The Body Reset Experience</p>
          <h2 className="section-heading mb-6">
            A supportive place to find your next right step
          </h2>
          <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Susie Sculpts is not a one-size-fits-all clinic. It is a private, personalized wellness studio in Gilbert, AZ where you can explore what your body actually needs — without pressure, judgment, or a hard sell.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className={`bg-white/70 backdrop-blur-sm border-t-2 ${s.color} border-l border-r border-b border-stone rounded-sm p-6 md:p-8 flex flex-col`}
            >
              <p className={`font-sans font-medium tracking-widest uppercase text-xs mb-3 ${s.tagColor}`}>
                {s.tag}
              </p>
              <h3 className="font-serif text-xl md:text-2xl font-light text-[#2c1f14] mb-4 leading-snug">
                {s.title}
              </h3>
              <p className="font-sans font-light text-sm text-muted leading-relaxed mb-5 flex-1">
                {s.description}
              </p>
              <ul className="space-y-1.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs font-sans font-light text-muted">
                    <span className="text-purple mt-0.5 shrink-0">✦</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-xs font-sans font-light text-muted/60 max-w-xl mx-auto">
          Services are wellness-focused and are not intended to diagnose, treat, cure, or prevent any disease. Individual experiences vary.
        </p>
      </div>
    </section>
  );
}
