const services = [
  {
    title: "Synergy Vacuum Massage",
    tag: "Lymphatic Support",
    color: "border-purple/20",
    tagColor: "text-purple",
    description:
      "A gentle, effective therapy that uses controlled suction to improve skin tone and circulation, supporting lymphatic drainage and helping you feel less puffy, heavy, or sluggish.",
    bullets: [
      "Lymphatic flow & drainage support",
      "Circulation & blood movement",
      "Digestion & elimination support",
      "Immune wellness support",
      "Mental clarity & reduced puffiness",
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
    title: "EMShape Neo Body Sculpting",
    tag: "Body Confidence",
    color: "border-warm/20",
    tagColor: "text-warm",
    description:
      "High-intensity electromagnetic technology that simulates an intense workout — toning and strengthening muscles while supporting body contouring. Non-invasive, no surgery, no downtime.",
    bullets: [
      "Muscle activation & tone",
      "Body contouring support",
      "Abdomen, thighs & glutes",
      "No surgery or downtime",
      "Pairs well with other services",
    ],
  },
  {
    title: "Ultrasonic Cavitation & RF",
    tag: "Skin & Contouring",
    color: "border-purple/10",
    tagColor: "text-purple/70",
    description:
      "A dual-action approach using ultrasound waves to support fat cell breakdown while RF energy stimulates collagen production — for firmer, more youthful-feeling skin.",
    bullets: [
      "Supports fat cell breakdown",
      "Collagen stimulation",
      "Skin tightening & elasticity",
      "Targets stubborn areas",
      "Non-invasive treatment",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-cream scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="section-label mb-4">The Body Reset Experience</p>
          <h2 className="section-heading mb-6">
            A supportive place to find your next right step
          </h2>
          <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Susie Sculpts is a private, personalized wellness studio in Gilbert, AZ. With over 30 years in health and wellness, Susie takes a holistic approach — supporting your body, mind, and confidence without pressure or a hard sell.
          </p>
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

        <p className="text-center mt-10 text-xs font-sans font-light text-muted/60 max-w-xl mx-auto">
          Services are wellness-focused and are not intended to diagnose, treat, cure, or prevent any disease. Individual experiences vary.
        </p>
      </div>
    </section>
  );
}
