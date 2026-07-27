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

function quizHref(label: string) {
  return `/body-reset?symptom=${encodeURIComponent(label)}#quiz-funnel`;
}

export default function Problem() {
  return (
    <section className="py-14 md:py-24 bg-white/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="section-label mb-4">You Are Not Alone</p>
        <h2 className="section-heading mb-5">Does any of this sound familiar?</h2>
        <div className="font-sans font-light text-muted text-base md:text-lg leading-relaxed max-w-3xl mx-auto space-y-4 mb-10">
          <p>Many women come to Susie feeling puffy, inflamed, tired, foggy, heavy, stuck, or disconnected from their body.</p>
          <p>Not because they stopped caring. Because their body changed — and what used to work no longer feels like enough.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {feelings.map((f) => (
            <a key={f.label} href={quizHref(f.label)} className="group flex flex-col text-left rounded-[18px] overflow-hidden border border-[rgba(120,90,150,0.12)] bg-[#faf8f5] shadow-[0_6px_20px_rgba(60,40,80,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(60,40,80,0.11)] hover:border-purple/25">
              <div className="relative w-full aspect-square">
                <Image src={f.image} alt={f.label} fill className="object-cover object-top rounded-t-[18px]" sizes="(max-width: 640px) 50vw, 25vw" />
              </div>
              <div className="px-4 py-4 flex flex-col gap-1">
                <p className="font-sans font-semibold leading-snug text-[#6A5A6D] text-[18px] sm:text-[20px]">{f.label}</p>
                <p className="font-sans font-normal text-[13px] text-[#9a8fa0] leading-snug">{f.microcopy}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="bg-purple/5 border border-purple/15 rounded-sm px-6 py-8 max-w-2xl mx-auto">
          <p className="font-serif text-xl md:text-2xl font-light text-[#2c1f14] leading-relaxed italic mb-6">
            &ldquo;Your body changed. You are not broken. Tell Susie what you are feeling, and she can help you figure out where to start.&rdquo;
          </p>
          <a href="/body-reset#quiz-funnel" className="btn-primary">Tell Me What To Try First</a>
        </div>
      </div>
    </section>
  );
}
