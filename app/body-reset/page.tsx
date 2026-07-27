"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const symptomCards = [
  { value: "Puffy or bloated", title: "Puffy or bloated", microcopy: "Swollen, heavy, or like your body is holding onto everything.", image: "/images/symptom-puffy.png" },
  { value: "Inflamed or achy", title: "Inflamed or achy", microcopy: "Sore, irritated, stiff, or constantly off.", image: "/images/symptom-achy.png" },
  { value: "Heavy or sluggish", title: "Heavy or sluggish", microcopy: "Weighed down, slow, or like your body is not moving well.", image: "/images/symptom-heavy.png" },
  { value: "Tired all the time", title: "Tired all the time", microcopy: "Low energy even after you rest.", image: "/images/symptom-tired.png" },
  { value: "Foggy or unfocused", title: "Foggy or unfocused", microcopy: "Cloudy, scattered, or hard to clear your head.", image: "/images/symptom-foggy.png" },
  { value: "Stuck — nothing works", title: "Stuck — nothing works", microcopy: "You have tried things before, but nothing seems to last.", image: "/images/symptom-stuck.png" },
  { value: "Uncomfortable in your body", title: "Uncomfortable in your body", microcopy: "You do not feel at ease in your skin right now.", image: "/images/symptom-uncomfortable.png" },
  { value: "Don't feel like yourself", title: "Don't feel like yourself", microcopy: "Something feels off, and you want to feel like you again.", image: "/images/symptom-yourself.png" },
];

const triedOptions = ["Diet or cutting calories", "Exercise or walking more", "Supplements or detoxes", "Massage or bodywork", "Med spa / body contouring", "Nothing consistently yet"];
const goalOptions = ["Feel lighter and less puffy", "Reduce aches and inflammation", "Improve energy and recovery", "Clear the fog and feel focused", "Tone, sculpt, and feel more confident", "Figure out what my body needs first"];
const urgencyOptions = ["This week", "Within 2 weeks", "This month", "I am curious but not urgent"];

const offers = [
  { name: "Free Body Reset Evaluation", price: "$0", label: "Lead Magnet", copy: "Answer the quiz, share your contact info, and get Susie's recommended next step for your body.", href: "#quiz-funnel", button: "Start My Free Evaluation" },
  { name: "Body Reset Starter Experience", price: "$49", label: "Easy First Step", copy: "Reserve a private consultation and apply the deposit toward a qualifying package if you move forward.", href: "#lead-capture", button: "Reserve the $49 Starter" },
  { name: "Lymphatic + PEMF Reset Intro", price: "$297", label: "Most Natural Fit", copy: "A focused reset path for women feeling puffy, inflamed, tired, heavy, or foggy. Replace this with a Stripe checkout link when ready.", href: "#lead-capture", button: "I Want the Intro Package" },
  { name: "Full Body Reset Package", price: "$497", label: "Best Reset Path", copy: "For women ready to combine consultation, Synergy, PEMF, and personalized next steps. Replace this with a Stripe checkout link when ready.", href: "#lead-capture", button: "I Want the Full Reset" },
];

function selectedClass(selected: boolean) {
  return selected ? "border-2 border-purple bg-purple/5 shadow-[0_0_0_3px_rgba(140,110,180,0.15),0_8px_24px_rgba(60,40,80,0.10)]" : "border border-[rgba(120,90,150,0.12)] bg-[#faf8f5] shadow-[0_6px_20px_rgba(60,40,80,0.06)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(60,40,80,0.10)] hover:border-purple/25";
}

export default function BodyResetPage() {
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [fields, setFields] = useState({ firstName: "", lastName: "", email: "", phone: "", symptom: "", tried: "", goal: "", urgency: "", consent: false });

  const recommendedOffer = useMemo(() => {
    if (["Puffy or bloated", "Heavy or sluggish", "Foggy or unfocused", "Inflamed or achy", "Tired all the time"].includes(fields.symptom)) return "Lymphatic + PEMF Reset Intro";
    if (["Uncomfortable in your body", "Don't feel like yourself"].includes(fields.symptom)) return "Body Reset Starter Experience";
    return "Free Body Reset Evaluation";
  }, [fields.symptom]);

  const set = (key: string, value: string | boolean) => setFields((prev) => ({ ...prev, [key]: value }));
  const canContinue = step === 1 ? !!fields.symptom : step === 2 ? !!fields.tried : step === 3 ? !!fields.goal : step === 4 ? !!fields.urgency : true;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!fields.firstName || !fields.email || !fields.phone || !fields.consent) return;
    setFormState("submitting");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, interest: fields.symptom, timeline: fields.urgency, preferredNextStep: fields.goal, recommendedOffer, source: "Susie Sculpts Quiz Funnel", page: "Free Body Reset Evaluation" }),
      });
      if (!res.ok) throw new Error("submit_failed");
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-24 md:pt-32 pb-14 md:pb-20 overflow-hidden bg-gradient-to-br from-cream via-stone/40 to-cream">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.05fr_.95fr] gap-10 items-center relative">
            <div>
              <p className="section-label mb-4">Free Body Reset Evaluation</p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-[#2c1f14] mb-6">
                Feel puffy, achy, tired, foggy, or stuck in a body that no longer feels like yours?
              </h1>
              <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                Take the private Body Reset quiz and find out which first step may fit your body best: lymphatic support, PEMF/frequency wellness, sculpting, or a combination reset plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a href="#quiz-funnel" className="btn-primary">Start My Free Evaluation</a>
                <a href="#checkout-options" className="btn-secondary">See Reset Packages</a>
              </div>
              <p className="text-xs font-sans font-light text-muted/70 max-w-xl">No pressure. No shame. No guessing. Just a private next-step recommendation from Susie.</p>
            </div>
            <div className="bg-white/75 border border-purple/15 rounded-[26px] p-5 md:p-6 shadow-[0_12px_34px_rgba(60,40,80,0.10)]">
              <div className="grid grid-cols-2 gap-3">
                {symptomCards.slice(0, 4).map((card) => (
                  <div key={card.value} className="rounded-[18px] overflow-hidden bg-[#faf8f5] border border-purple/10">
                    <div className="relative aspect-square"><Image src={card.image} alt={card.title} fill className="object-cover object-top" sizes="160px" /></div>
                    <p className="px-3 py-2 text-sm font-sans font-medium text-[#6A5A6D] leading-tight">{card.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="section-label mb-4">A Message from Susie</p>
            <h2 className="section-heading mb-6">Your body changed. You are not broken.</h2>
            <div className="card text-left space-y-4 font-sans font-light text-muted leading-relaxed text-base md:text-lg">
              <p>Many women reach a point where they wake up and think, “This does not feel like me anymore.” They feel puffy, inflamed, heavy, tired, foggy, or uncomfortable in their own body.</p>
              <p>The frustrating part is that they have usually tried to fix it. They have tried eating better, exercising more, supplements, appointments, and willpower. But when the body is stuck, guessing usually creates more frustration.</p>
              <p>The Body Reset Evaluation is a private starting point. You answer a few simple questions, and Susie helps identify whether your next step may be Synergy Vacuum Massage, PEMF/frequency wellness, EMShape, Ultrasonic Cavitation & RF, or a combined reset path.</p>
            </div>
          </div>
        </section>

        <section id="quiz-funnel" className="py-16 md:py-24 bg-cream">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="section-label mb-4">Step {step} of 5</p>
              <h2 className="section-heading mb-4">Get Your Free Body Reset Evaluation</h2>
              <p className="font-sans font-light text-muted max-w-2xl mx-auto">Answer a few quick questions so Susie can recommend the most logical first step.</p>
            </div>

            <div className="bg-white/80 border border-purple/15 rounded-[24px] p-5 md:p-8 shadow-[0_10px_30px_rgba(60,40,80,0.08)]">
              {step === 1 && (
                <div>
                  <h3 className="font-serif text-3xl font-light mb-6 text-[#2c1f14]">What feels most true for you right now?</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {symptomCards.map((card) => (
                      <button key={card.value} type="button" onClick={() => set("symptom", card.value)} className={`text-left rounded-[18px] overflow-hidden transition-all duration-200 ${selectedClass(fields.symptom === card.value)}`}>
                        <div className="relative aspect-square"><Image src={card.image} alt={card.title} fill className="object-cover object-top" sizes="(max-width: 640px) 50vw, 25vw" /></div>
                        <div className="px-4 py-4"><p className="font-sans font-semibold text-[#6A5A6D] text-[18px] leading-snug">{card.title}</p><p className="font-sans text-[13px] text-[#9a8fa0] leading-snug mt-1">{card.microcopy}</p></div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && <OptionStep title="What have you already tried?" options={triedOptions} value={fields.tried} onSelect={(v) => set("tried", v)} />}
              {step === 3 && <OptionStep title="What would feel like a real win?" options={goalOptions} value={fields.goal} onSelect={(v) => set("goal", v)} />}
              {step === 4 && <OptionStep title="How soon would you like to feel a shift?" options={urgencyOptions} value={fields.urgency} onSelect={(v) => set("urgency", v)} />}

              {step === 5 && (
                <form id="lead-capture" onSubmit={submit} className="space-y-5">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-3xl font-light mb-3 text-[#2c1f14]">Your likely starting point: {recommendedOffer}</h3>
                    <p className="font-sans font-light text-muted">Enter your info to get your free Body Reset Evaluation and let Susie follow up with the recommended next step.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input className="input-field" placeholder="First name*" value={fields.firstName} onChange={(e) => set("firstName", e.target.value)} required />
                    <input className="input-field" placeholder="Last name" value={fields.lastName} onChange={(e) => set("lastName", e.target.value)} />
                  </div>
                  <input className="input-field" type="email" placeholder="Email address*" value={fields.email} onChange={(e) => set("email", e.target.value)} required />
                  <input className="input-field" type="tel" placeholder="Phone number*" value={fields.phone} onChange={(e) => set("phone", e.target.value)} required />
                  <label className="flex gap-3 items-start text-xs font-sans font-light text-muted leading-relaxed"><input type="checkbox" className="mt-1 accent-purple" checked={fields.consent} onChange={(e) => set("consent", e.target.checked)} required />I agree to receive follow-up messages from Susie Sculpts about my evaluation. Message and data rates may apply. I can opt out anytime.</label>
                  <button type="submit" disabled={formState === "submitting"} className="btn-primary w-full disabled:opacity-60">{formState === "submitting" ? "Sending..." : "Get My Free Evaluation"}</button>
                  {formState === "error" && <p className="text-center text-sm text-red-500">Something went wrong. Please try again or call Susie at (480) 440-0909.</p>}
                </form>
              )}

              {formState === "success" ? (
                <div className="text-center py-8">
                  <p className="section-label mb-4">Evaluation Requested</p>
                  <h3 className="font-serif text-3xl md:text-4xl font-light text-[#2c1f14] mb-4">Thank you, {fields.firstName}.</h3>
                  <p className="font-sans font-light text-muted max-w-2xl mx-auto mb-8">Susie has your quiz answers. Your likely starting point is <strong>{recommendedOffer}</strong>. Choose a package below, or wait for Susie to follow up personally.</p>
                  <a href="#checkout-options" className="btn-primary">See My Reset Options</a>
                </div>
              ) : step < 5 && (
                <div className="flex justify-between gap-4 mt-8">
                  <button type="button" onClick={() => setStep(Math.max(1, step - 1))} className="btn-secondary opacity-80" disabled={step === 1}>Back</button>
                  <button type="button" onClick={() => canContinue && setStep(step + 1)} className="btn-primary disabled:opacity-40" disabled={!canContinue}>Continue</button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="checkout-options" className="py-16 md:py-24 bg-white/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12"><p className="section-label mb-4">Choose Your Next Step</p><h2 className="section-heading mb-4">Start free, reserve a visit, or buy the reset path</h2><p className="font-sans font-light text-muted max-w-2xl mx-auto">Use the free evaluation to start the conversation, or connect Stripe links to let ready buyers purchase immediately.</p></div>
            <div className="grid md:grid-cols-4 gap-5">
              {offers.map((offer) => (
                <div key={offer.name} className="card flex flex-col">
                  <p className="section-label mb-3">{offer.label}</p>
                  <h3 className="font-serif text-2xl font-light text-[#2c1f14] mb-2">{offer.name}</h3>
                  <p className="font-serif text-4xl font-light text-purple mb-4">{offer.price}</p>
                  <p className="font-sans font-light text-sm text-muted leading-relaxed flex-1 mb-6">{offer.copy}</p>
                  <a href={offer.href} className="btn-primary text-[10px] px-4">{offer.button}</a>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-xs font-sans font-light text-muted/60">Stripe/payment links still need to be connected before paid checkout is live. Until then, the quiz captures the lead and routes Susie to follow up.</p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="section-label mb-4">Why this feels different</p>
            <h2 className="section-heading mb-6">You do not need another random wellness guess.</h2>
            <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed mb-8">The goal is to match the first step to what your body is actually telling you: lymphatic support, frequency recovery, sculpting, or a combination plan. That is why the quiz starts with symptoms, not services.</p>
            <a href="#quiz-funnel" className="btn-primary">Start My Free Evaluation</a>
            <p className="text-center mt-8 text-xs font-sans font-light text-muted/60 max-w-xl mx-auto">Services are wellness-focused and are not intended to diagnose, treat, cure, or prevent any disease. Individual experiences vary.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function OptionStep({ title, options, value, onSelect }: { title: string; options: string[]; value: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h3 className="font-serif text-3xl font-light mb-6 text-[#2c1f14]">{title}</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {options.map((option) => (
          <button key={option} type="button" onClick={() => onSelect(option)} className={`text-left rounded-sm px-5 py-4 font-sans font-light transition-all duration-200 ${value === option ? "bg-purple text-white border-purple" : "bg-stone/50 text-muted border border-stone hover:border-purple/40"}`}>{option}</button>
        ))}
      </div>
    </div>
  );
}
