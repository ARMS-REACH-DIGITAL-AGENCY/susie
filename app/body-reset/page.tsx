import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const symptoms = [
  "Puffy or bloated",
  "Inflamed or achy",
  "Heavy or sluggish",
  "Tired all the time",
  "Foggy or unfocused",
  "Stuck — nothing works",
  "Uncomfortable in your body",
  "Don't feel like yourself",
];

const included = [
  "Private Body Reset consultation",
  "Review of your goals and symptoms",
  "Personalized next-step recommendation",
  "Guidance on which service or combination may make sense",
  "Deposit credited toward a qualifying package if purchased",
];

const faqs = [
  {
    question: "What if I don't know which service I need?",
    answer:
      "That is exactly why the Body Reset Experience exists. Susie will talk through what you are feeling and help you identify the best next step for your body and goals.",
  },
  {
    question: "Is this medical treatment?",
    answer:
      "No. Susie Sculpts provides wellness-focused services and does not diagnose, treat, cure, or prevent disease. Individual experiences vary.",
  },
  {
    question: "Can my deposit be applied to a package?",
    answer:
      "Yes. Your $49 deposit can be credited toward a qualifying package if you decide to move forward after your consultation.",
  },
  {
    question: "How long is the consultation?",
    answer:
      "Plan for a private first-step conversation where Susie can understand your goals, symptoms, and best-fit service options.",
  },
  {
    question: "Where is Susie Sculpts located?",
    answer:
      "Susie Sculpts serves Gilbert and the East Valley, including Chandler, Queen Creek, Mesa, and nearby Arizona communities.",
  },
];

export default function BodyResetPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-gradient-to-br from-cream via-stone/40 to-cream">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/8 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative">
            <p className="section-label mb-4">The Body Reset Experience</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-[#2c1f14] mb-6">
              Your Body Changed.<br />
              <em className="text-purple not-italic font-normal">You Are Not Broken.</em>
            </h1>
            <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
              For women who feel puffy, inflamed, tired, foggy, heavy, stuck, or unlike themselves — and want a private first step toward feeling lighter, clearer, and more like themselves again.
            </p>
            <a href="#deposit" className="btn-primary">
              Reserve Your Body Reset Experience — $49
            </a>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <p className="section-label mb-4">A Message from Susie</p>
              <h2 className="section-heading mb-4">Start with a private first step</h2>
            </div>
            <div className="aspect-video bg-purple/5 border border-purple/15 rounded-sm flex items-center justify-center text-center px-6 shadow-[0_6px_20px_rgba(60,40,80,0.06)]">
              <div>
                <p className="font-serif text-2xl md:text-3xl font-light text-[#2c1f14] mb-3">
                  Video coming soon
                </p>
                <p className="font-sans font-light text-muted text-sm md:text-base max-w-xl mx-auto">
                  Susie&apos;s short message will explain what the Body Reset Experience is, who it is for, and how to reserve your private consultation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="section-label mb-4">Does this feel familiar?</p>
              <h2 className="section-heading mb-4">Common reasons women start here</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {symptoms.map((symptom) => (
                <div key={symptom} className="card text-center py-6">
                  <p className="font-sans font-medium text-[#6A5A6D] leading-snug">
                    {symptom}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="section-label mb-4">The Body Reset Experience</p>
              <h2 className="section-heading mb-6">A private consultation to find your next right step</h2>
              <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed">
                A private first-step session designed to help Susie understand what you&apos;re feeling and recommend the best next step — Synergy Vacuum Massage, PEMF/frequency wellness, EMShape sculpting, Ultrasonic Cavitation &amp; RF, or a combination reset plan.
              </p>
            </div>
            <div className="card">
              <h3 className="font-serif text-2xl md:text-3xl font-light text-[#2c1f14] mb-5">
                What&apos;s included
              </h3>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans font-light text-muted leading-relaxed">
                    <span className="text-purple mt-1 shrink-0">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="deposit" className="py-16 md:py-24 bg-cream">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="bg-white/80 border border-purple/20 rounded-sm px-6 md:px-10 py-10 md:py-12 shadow-[0_10px_30px_rgba(60,40,80,0.08)]">
              <p className="section-label mb-4">Reserve Your Body Reset Experience</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-[#2c1f14] mb-4">
                $49 deposit
              </h2>
              <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                Your deposit reserves your private Body Reset consultation and can be credited toward a qualifying package if you decide to move forward.
              </p>
              <a href="#deposit" className="btn-primary">
                Reserve My Body Reset Experience — $49
              </a>
              <p className="font-sans font-light text-xs text-muted/60 mt-5">
                Payment link placeholder. Replace this button link with the HighLevel checkout or calendar payment link when ready.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="section-label mb-4">Questions</p>
              <h2 className="section-heading">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="card">
                  <h3 className="font-serif text-xl md:text-2xl font-light text-[#2c1f14] mb-2">
                    {faq.question}
                  </h3>
                  <p className="font-sans font-light text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gradient-to-br from-cream via-stone/40 to-cream">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="section-heading mb-6">
              Ready to feel lighter, clearer, and more like yourself again?
            </h2>
            <a href="#deposit" className="btn-primary">
              Reserve Your Body Reset Experience — $49
            </a>
            <p className="text-center mt-8 text-xs font-sans font-light text-muted/60 max-w-xl mx-auto">
              Services are wellness-focused and are not intended to diagnose, treat, cure, or prevent any disease. Individual experiences vary.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
