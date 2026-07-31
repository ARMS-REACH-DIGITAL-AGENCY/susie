const services = [
  {
    title: "Synergie Vacuum Massage",
    tag: "Lymphatic Support",
    color: "border-purple/20",
    tagColor: "text-purple",
    description:
      "A gentle, effective therapy that uses controlled suction to support healthy lymphatic flow, improve circulation, and help you feel lighter, more energized, and refreshed.",
    bullets: [
      "Supports healthy lymphatic flow",
      "Supports circulation and overall wellness",
      "Helps you feel lighter and less puffy",
      "Supports healthy digestion and elimination",
      "Helps your body feel refreshed",
    ],
  },
  {
    title: "PEMF Recovery & Wellness",
    tag: "Recovery & Reset",
    color: "border-gold/30",
    tagColor: "text-gold",
    description:
      "Support your body's natural recovery using pulsed electromagnetic field therapy. Many clients use PEMF to support circulation, relaxation, recovery, and whole-body wellness.",
    bullets: [
      "Recovery",
      "Circulation",
      "Relaxation",
      "Energy support",
      "Whole-body wellness",
    ],
  },
  {
    title: "EMShape Neo Body Sculpting",
    tag: "Body Confidence",
    color: "border-warm/20",
    tagColor: "text-warm",
    description:
      "A non-invasive body sculpting treatment that uses electromagnetic technology to activate muscles, support tone, and help you feel stronger and more confident in your body.",
    bullets: [
      "Muscle activation and tone",
      "Body contouring support",
      "Abdomen, thighs, and glutes",
      "No surgery or downtime",
      "Pairs well with reset services",
    ],
  },
  {
    title: "Ultrasonic Cavitation & RF",
    tag: "Skin & Contouring",
    color: "border-purple/10",
    tagColor: "text-purple/70",
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
];

const whyWomenChooseSusie = [
  "30+ years of health and wellness experience",
  "Private one-on-one appointments",
  "Non-invasive therapies",
  "No pressure or hard sell",
  "Personalized wellness plans",
  "Serving Gilbert and the East Valley since 1995",
];

export default function Services() {
  return (
    <section className="pt-10 md:pt-14 pb-12 md:pb-16 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div id="services" className="text-center mb-9 scroll-mt-20 md:scroll-mt-24">
          <p className="section-label mb-3">The Body Reset Experience</p>
          <h2 className="section-heading mb-5">
            A supportive place to find your next right step
          </h2>
          <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            For over 30 years, Susie has helped women feel stronger, healthier, and more confident through non-invasive therapies that support the body's natural recovery and wellness process.
          </p>
        </div>

        <div className="bg-white/70 border border-purple/15 rounded-sm p-5 md:p-7 mb-10 shadow-[0_8px_24px_rgba(60,40,80,0.06)]">
          <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-6 md:gap-10 items-start">
            <div>
              <p className="section-label mb-3">Why women choose Susie</p>
              <h3 className="font-serif text-3xl font-light text-[#2c1f14] leading-tight">
                Private, personal, and built around how you want to feel.
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {whyWomenChooseSusie.map((item) => (
                <div key={item} className="flex items-start gap-3 font-sans font-light text-muted text-sm leading-relaxed">
                  <span className="text-purple font-medium shrink-0">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className={`bg-white/70 backdrop-blur-sm border-t-2 ${s.color} border-l border-r border-b border-stone rounded-sm p-6 flex flex-col`}
            >
              <p className={`font-sans font-medium tracking-widest uppercase text-xs mb-3 ${s.tagColor}`}>
                {s.tag}
              </p>
              <h3 className="font-serif text-xl font-light text-[#2c1f14] mb-4 leading-snug">
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

        <p className="text-center mt-8 text-xs font-sans font-light text-muted/60 max-w-xl mx-auto">
          Services are wellness-focused and are not intended to diagnose, treat, cure, or prevent any disease. Individual experiences vary.
        </p>
      </div>
    </section>
  );
}
