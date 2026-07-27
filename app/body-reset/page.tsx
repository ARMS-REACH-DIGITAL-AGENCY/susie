"use client";

import { useEffect, useMemo, useState } from "react";
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

const triedOptions = [
  "Eating better or cutting calories",
  "Walking, workouts, or trying to move more",
  "Supplements, detoxes, or wellness trends",
  "Massage, bodywork, or lymphatic support",
  "Med spa, body contouring, or sculpting",
  "Nothing consistently yet — I just know something feels off",
];

const goalOptions = [
  "Feel lighter and less puffy",
  "Calm the achy, inflamed feeling",
  "Have more energy and recover better",
  "Clear the fog and feel more focused",
  "Tone, sculpt, and feel more confident",
  "Stop guessing and find the right first step",
];

const urgencyOptions = [
  "I want help this week",
  "Within the next 2 weeks",
  "Sometime this month",
  "I am curious, but not urgent yet",
];

const offers = [
  {
    name: "Ask Susie Where To Start",
    price: "Free",
    label: "Start Here",
    copy: "Tell Susie what you are feeling and answer a few quick questions so she can point you toward where she would start.",
    href: "#quiz-funnel",
    button: "Tell Me What To Try First",
  },
  {
    name: "Body Reset Starter Visit",
    price: "$49",
    label: "Easy First Step",
    copy: "A private starter visit to review what you are feeling and choose the best first session. Use this as the low-friction paid entry point.",
    href: "#lead-capture",
    button: "Reserve My Starter Visit",
  },
  {
    name: "Lymphatic + PEMF Reset Intro",
    price: "$297",
    label: "Most Natural Fit",
    copy: "A focused intro path for women feeling puffy, inflamed, tired, heavy, foggy, or stuck.",
    href: "#lead-capture",
    button: "I Want the Reset Intro",
  },
  {
    name: "Full Body Reset Package",
    price: "$497",
    label: "Best Reset Path",
    copy: "For women ready to combine consultation, Synergy, PEMF, sculpting, and personalized next steps.",
    href: "#lead-capture",
    button: "I Want the Full Reset",
  },
];

function selectedClass(selected: boolean) {
  return selected
    ? "border-2 border-purple bg-purple/5 shadow-[0_0_0_3px_rgba(140,110,180,0.15),0_8px_24px_rgba(60,40,80,0.10)]"
    : "border border-[rgba(120,90,150,0.12)] bg-[#faf8f5] shadow-[0_6px_20px_rgba(60,40,80,0.06)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(60,40,80,0.10)] hover:border-purple/25";
}

export default function BodyResetPage() {
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [arrivedFromSymptom, setArrivedFromSymptom] = useState(false);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    symptoms: [] as string[],
    tried: "",
    goal: "",
    urgency: "",
    consent: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const symptom = params.get("symptom");
    if (symptom && symptomCards.some((card) => card.value === symptom)) {
      setArrivedFromSymptom(true);
      setFields((prev) => ({
        ...prev,
        symptoms: prev.symptoms.includes(symptom) ? prev.symptoms : [symptom, ...prev.symptoms],
      }));
    }
  }, []);

  const symptomsText = fields.symptoms.join(", ");

  const recommendedOffer = useMemo(() => {
    const symptoms = fields.symptoms;
    if (symptoms.some((s) => ["Puffy or bloated", "Heavy or sluggish", "Foggy or unfocused", "Inflamed or achy", "Tired all the time"].includes(s))) {
      return "Lymphatic + PEMF Reset Intro";
    }
    if (symptoms.some((s) => ["Uncomfortable in your body", "Don't feel like yourself"].includes(s))) {
      return "Body Reset Starter Visit";
    }
    return "Ask Susie Where To Start";
  }, [fields.symptoms]);

  const set = (key: string, value: string | boolean | string[]) => setFields((prev) => ({ ...prev, [key]: value }));
  const toggleSymptom = (value: string) => {
    setFields((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(value)
        ? prev.symptoms.filter((item) => item !== value)
        : [...prev.symptoms, value],
    }));
  };

  const canContinue = step === 1 ? fields.symptoms.length > 0 : step === 2 ? !!fields.tried : step === 3 ? !!fields.goal : step === 4 ? !!fields.urgency : true;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!fields.firstName || !fields.email || !fields.phone || !fields.consent) return;
    setFormState("submitting");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          symptoms: fields.symptoms,
          symptom: symptomsText,
          interest: symptomsText,
          timeline: fields.urgency,
          preferredNextStep: fields.goal,
          recommendedOffer,
          quizPath: "Tell Me What To Try First Funnel",
          source: "Susie Sculpts Quiz Funnel",
          page: "Tell Me What To Try First",
        }),
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
        <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden bg-gradient-to-br from-cream via-stone/40 to-cream">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.05fr_.95fr] gap-10 items-center relative">
            <div>
              <p className="section-label mb-4">For the woman who does not feel like herself</p>
              <h1 className="font-serif text-[44px] sm:text-5xl lg:text-6xl font-light leading-[1.04] text-[#2c1f14] mb-5">
                Feel puffy, tired, foggy, inflamed, heavy, or stuck?
              </h1>
              <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed mb-4 max-w-2xl">
                You are not broken. Your body may just be asking for a different kind of reset.
              </p>
              <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed mb-7 max-w-2xl">
                Tell me what you are feeling, answer a few quick questions, and I will show you where I would start.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a href="#quiz-funnel" className="btn-primary">Tell Me What To Try First</a>
                <a href="#checkout-options" className="btn-secondary">See Reset Options</a>
              </div>
              <p className="text-xs font-sans font-light text-muted/70 max-w-xl">
                No shame. No pressure. No guessing. Just a private next-step recommendation from Susie.
              </p>
            </div>

            <div className="bg-white/75 border border-purple/15 rounded-[26px] p-5 md:p-6 shadow-[0_12px_34px_rgba(60,40,80,0.10)]">
              <div className="grid grid-cols-2 gap-3">
                {symptomCards.slice(0, 4).map((card) => (
                  <a key={card.value} href={`?symptom=${encodeURIComponent(card.value)}#quiz-funnel`} className="rounded-[18px] overflow-hidden bg-[#faf8f5] border border-purple/10 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(60,40,80,0.10)]">
                    <div className="relative aspect-square"><Image src={card.image} alt={card.title} fill className="object-cover object-top" sizes="160px" /></div>
                    <p className="px-3 py-2 text-sm font-sans font-medium text-[#6A5A6D] leading-tight">{card.title}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="section-label mb-4">A Message from Susie</p>
            <h2 className="section-heading mb-6">I know how frustrating it is when your body no longer feels like yours.</h2>
            <div className="card text-left space-y-4 font-sans font-light text-muted leading-relaxed text-base md:text-lg">
              <p>
                Many women reach a point where they wake up and think, "This does not feel like me anymore." They feel puffy, inflamed, heavy, tired, foggy, or uncomfortable in their own body.
              </p>
              <p>
                The frustrating part is that they have usually tried to fix it. They have tried eating better, exercising more, taking supplements, booking appointments, and pushing through with willpower.
              </p>
              <p>
                I cannot diagnose you, and I am not going to promise a magic cure. But I can help you stop guessing. Tell me what you are feeling, and I will show you where I would start — lymphatic support, PEMF/frequency wellness, sculpting, or a full Body Reset path.
              </p>
              <div className="pt-3">
                <a href="#quiz-funnel" className="btn-primary">Tell Me What To Try First</a>
              </div>
            </div>
          </div>
        </section>

        <section id="quiz-funnel" className="py-14 md:py-24 bg-cream">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="section-label mb-4">Step {formState === "success" ? 5 : step} of 5</p>
              <h2 className="section-heading mb-4">Tell me what you are feeling. I will tell you where I would start.</h2>
              <p className="font-sans font-light text-muted max-w-2xl mx-auto">
                Select everything that applies so Susie has enough context to point you toward the most logical first step.
              </p>
            </div>

            <div className="bg-white/80 border border-purple/15 rounded-[24px] p-5 md:p-8 shadow-[0_10px_30px_rgba(60,40,80,0.08)]">
              {formState === "success" ? (
                <div className="text-center py-8">
                  <p className="section-label mb-4">Recommendation Requested</p>
                  <h3 className="font-serif text-3xl md:text-4xl font-light text-[#2c1f14] mb-4">Thank you, {fields.firstName}.</h3>
                  <p className="font-sans font-light text-muted max-w-2xl mx-auto mb-8">
                    Susie has your answers. Your likely starting point is <strong>{recommendedOffer}</strong>. Choose a reset option below, or wait for Susie to follow up personally.
                  </p>
                  <a href="#checkout-options" className="btn-primary">See My Reset Options</a>
                </div>
              ) : (
                <>
                  {step === 1 && (
                    <div>
                      <h3 className="font-serif text-3xl font-light mb-3 text-[#2c1f14]">
                        {arrivedFromSymptom ? "What else have you been feeling too?" : "Which of these have you been feeling lately?"}
                      </h3>
                      <p className="font-sans font-light text-muted mb-6">Select all that apply.</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {symptomCards.map((card) => {
                          const selected = fields.symptoms.includes(card.value);
                          return (
                            <button key={card.value} type="button" onClick={() => toggleSymptom(card.value)} className={`relative text-left rounded-[18px] overflow-hidden transition-all duration-200 ${selectedClass(selected)}`} aria-pressed={selected}>
                              {selected && (
                                <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-purple flex items-center justify-center shadow">
                                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                    <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                              )}
                              <div className="relative aspect-square"><Image src={card.image} alt={card.title} fill className="object-cover object-top" sizes="(max-width: 640px) 50vw, 25vw" /></div>
                              <div className="px-4 py-4"><p className="font-sans font-semibold text-[#6A5A6D] text-[18px] leading-snug">{card.title}</p><p className="font-sans text-[13px] text-[#9a8fa0] leading-snug mt-1">{card.microcopy}</p></div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {step === 2 && <OptionStep title="What have you already tried?" options={triedOptions} value={fields.tried} onSelect={(v) => set("tried", v)} />}
                  {step === 3 && <OptionStep title="What would feel like a real win?" options={goalOptions} value={fields.goal} onSelect={(v) => set("goal", v)} />}
                  {step === 4 && <OptionStep title="How soon do you want help figuring this out?" options={urgencyOptions} value={fields.urgency} onSelect={(v) => set("urgency", v)} />}

                  {step === 5 && (
                    <form id="lead-capture" onSubmit={submit} className="space-y-5">
                      <div className="text-center mb-6">
                        <p className="section-label mb-4">Your likely starting point</p>
                        <h3 className="font-serif text-3xl font-light mb-3 text-[#2c1f14]">{recommendedOffer}</h3>
                        <p className="font-sans font-light text-muted max-w-2xl mx-auto">
                          Where should Susie send what she would recommend first?
                        </p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input className="input-field" placeholder="First name*" value={fields.firstName} onChange={(e) => set("firstName", e.target.value)} required />
                        <input className="input-field" placeholder="Last name" value={fields.lastName} onChange={(e) => set("lastName", e.target.value)} />
                      </div>
                      <input className="input-field" type="email" placeholder="Email address*" value={fields.email} onChange={(e) => set("email", e.target.value)} required />
                      <input className="input-field" type="tel" placeholder="Phone number*" value={fields.phone} onChange={(e) => set("phone", e.target.value)} required />
                      <label className="flex gap-3 items-start text-xs font-sans font-light text-muted leading-relaxed">
                        <input type="checkbox" className="mt-1 accent-purple" checked={fields.consent} onChange={(e) => set("consent", e.target.checked)} required />
                        I agree to receive follow-up messages from Susie Sculpts about my request. Message and data rates may apply. I can opt out anytime.
                      </label>
                      <button type="submit" disabled={formState === "submitting"} className="btn-primary w-full disabled:opacity-60">
                        {formState === "submitting" ? "Sending..." : "Send Me Susie's Recommendation"}
                      </button>
                      {formState === "error" && <p className="text-center text-sm text-red-500">Something went wrong. Please try again or call Susie at (480) 440-0909.</p>}
                    </form>
                  )}

                  {step < 5 && (
                    <div className="flex justify-between gap-4 mt-8">
                      <button type="button" onClick={() => setStep(Math.max(1, step - 1))} className="btn-secondary opacity-80" disabled={step === 1}>Back</button>
                      <button type="button" onClick={() => canContinue && setStep(step + 1)} className="btn-primary disabled:opacity-40" disabled={!canContinue}>Continue</button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        <section id="checkout-options" className="py-16 md:py-24 bg-white/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="section-label mb-4">Choose Your Next Step</p>
              <h2 className="section-heading mb-4">Start with Susie's recommendation, or choose a reset path.</h2>
              <p className="font-sans font-light text-muted max-w-2xl mx-auto">
                The page is built so Stripe links can be added to the paid options when the offer is approved.
              </p>
            </div>
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
          </div>
        </section>

        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="section-label mb-4">Why this feels different</p>
            <h2 className="section-heading mb-6">You do not need another random wellness guess.</h2>
            <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed mb-8">
              The goal is to match the first step to what your body is actually telling you: lymphatic support, frequency recovery, sculpting, or a combination plan. That is why the quiz starts with symptoms, not services.
            </p>
            <a href="#quiz-funnel" className="btn-primary">Tell Me What To Try First</a>
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

function OptionStep({ title, options, value, onSelect }: { title: string; options: string[]; value: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h3 className="font-serif text-3xl font-light mb-6 text-[#2c1f14]">{title}</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {options.map((option) => (
          <button key={option} type="button" onClick={() => onSelect(option)} className={`text-left rounded-sm px-5 py-4 font-sans font-light transition-all duration-200 ${value === option ? "bg-purple text-white border-purple" : "bg-stone/50 text-muted border border-stone hover:border-purple/40"}`}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
