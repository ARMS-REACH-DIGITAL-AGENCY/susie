const feelings = [
  { emoji: "💧", label: "Puffy or bloated" },
  { emoji: "🔥", label: "Inflamed or achy" },
  { emoji: "🪨", label: "Heavy or sluggish" },
  { emoji: "😴", label: "Tired all the time" },
  { emoji: "🌫️", label: "Foggy or unfocused" },
  { emoji: "🔒", label: "Stuck — nothing works" },
  { emoji: "👗", label: "Uncomfortable in your body" },
  { emoji: "💔", label: "Like you no longer feel like yourself" },
];

export default function Problem() {
  return (
    <section className="py-20 md:py-28 bg-white/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <p className="section-label mb-4">You Are Not Alone</p>
        <h2 className="section-heading mb-6">
          Does any of this sound familiar?
        </h2>
        <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
          Maybe your body changed after stress, menopause, caregiving, age, inflammation, or years of putting everyone else first. Whatever brought you here, you do not need shame, pressure, or another extreme plan. You need a private first step.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {feelings.map((f) => (
            <div
              key={f.label}
              className="bg-stone/50 border border-stone rounded-sm px-4 py-5 text-center"
            >
              <div className="text-2xl mb-2">{f.emoji}</div>
              <p className="font-sans font-light text-sm text-muted leading-snug">{f.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-purple/5 border border-purple/15 rounded-sm px-6 py-8 max-w-2xl mx-auto">
          <p className="font-serif text-xl md:text-2xl font-light text-[#2c1f14] leading-relaxed italic">
            &ldquo;Your body changed. You are not broken. Start with a private Body Reset consultation and find the best next step for your body, energy, confidence, and recovery.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
