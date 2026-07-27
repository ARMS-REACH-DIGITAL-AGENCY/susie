"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FULL_RESET_CHECKOUT_URL = "#stripe-checkout-link-needed";
const RESET_INTRO_CHECKOUT_URL = "#stripe-checkout-link-needed";
const STARTER_VISIT_CHECKOUT_URL = "#stripe-checkout-link-needed";
const INITIAL_CONSULT_BOOKING_URL = "#calendar-booking-link-needed";

const symptomCards = [
  { value: "Puffy or bloated", title: "Puffy or bloated", microcopy: "Swollen, heavy, or like your body is holding onto everything.", image: "/images/symptom-puffy.png" },
  { value: "Inflamed or achy", title: "Inflamed or achy", microcopy: "Sore, irritated, stiff, or constantly off.", image: "/images/symptom-achy.png" },
  { value: "Heavy or sluggish", title: "Heavy or sluggish", microcopy: "Weighed down, slow, or like your body is not moving well.", image: "/images/symptom-heavy.png" },
  { value: "Tired all the time", title: "Tired all the time", microcopy: "Low energy even after you rest.", image: "/images/symptom-tired.png" },
  { value: "Foggy or unfocused", title: "Foggy or unfocused", microcopy: "Cloudy, scattered, or hard to clear your head.", image: "/images/symptom-foggy.png" },
  { value: "Stuck - nothing works", title: "Stuck - nothing works", microcopy: "You have tried things before, but nothing seems to last.", image: "/images/symptom-stuck.png" },
  { value: "Uncomfortable in your body", title: "Uncomfortable in your body", microcopy: "You do not feel at ease in your skin right now.", image: "/images/symptom-uncomfortable.png" },
  { value: "Don't feel like yourself", title: "Don't feel like yourself", microcopy: "Something feels off, and you want to feel like you again.", image: "/images/symptom-yourself.png" },
];

const triedOptions = [
  "Eating better or cutting calories",
  "Walking, workouts, or trying to move more",
  "Supplements, detoxes, or wellness trends",
  "Massage, bodywork, or lymphatic support",
  "Med spa, body contouring, or sculpting",
  "Nothing consistently yet - I just know something feels off",
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
    name: "Full Body Reset Package",
    price: "$497 today",
    label: "Susie's Recommendation",
    credit: "Earn a $100 rebate toward your next service",
    procedures: [
      "Private Body Reset consultation",
      "Synergy Vacuum Massage / lymphatic support",
      "PEMF frequency wellness",
      "EMShape Neo body sculpting",
      "Personalized next-service recommendation",
    ],
    href: FULL_RESET_CHECKOUT_URL,
    button: "Reserve Full Reset",
    featured: true,
  },
  {
    name: "Lymphatic + PEMF Reset Intro",
    price: "$297",
    label: "Focused Reset Intro",
    credit: "",
    procedures: [
      "Synergy Vacuum Massage / lymphatic support",
      "PEMF frequency wellness",
      "Reset-focused wellness check-in with Susie",
    ],
    href: RESET_INTRO_CHECKOUT_URL,
    button: "Choose Reset Intro",
    featured: false,
  },
  {
    name: "Body Reset Starter Visit",
    price: "$49",
    label: "Low-Commitment Start",
    credit: "",
    procedures: [
      "Private starter evaluation with Susie",
      "Review of what you are feeling and what you have tried",
      "Recommendation for your best first treatment path",
    ],
    href: STARTER_VISIT_CHECKOUT_URL,
    button: "Choose Starter Visit",
    featured: false,
  },
  {
    name: "Initial Face-to-Face Consult With Susie",
    price: "Free",
    label: "Book First",
    credit: "No purchase required",
    procedures: [
      "Zoom or in-person evaluation",
      "Review of symptoms, goals, and questions",
      "Guidance before choosing a Body Reset path",
    ],
    href: INITIAL_CONSULT_BOOKING_URL,
    button: "Book Initial Consult",
    featured: false,
  },
];

function selectedClass(selected: boolean) {
  return selected
    ? "border-2 border-purple bg-purple/5 shadow-[0_0_0_3px_rgba(140,110,180,0.15),0_8px_24px_rgba(60,40,80,0.10)]"
    : "border border-[rgba(120,90,150,0.12)] bg-[#faf8f5] shadow-[0_6px_20px_rgba(60,40,80,0.06)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(60,40,80,0.10)] hover:border-purple/25";
}

export default function BodyResetPage() {
  const [questionStep, setQuestionStep] = useState(1);
  const [leadState, setLeadState] = useState<"idle" | "submitting" | "captured" | "error">("idle");
  const [quizState, setQuizState] = useState<"idle" | "submitting" | "analyzing" | "success" | "error">("idle");
  const [arrivedFromSymptom, setArrivedFromSymptom] = useState(false);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    symptoms: [] as string[],
    tried: [] as string[],
    goals: [] as string[],
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
  const triedText = fields.tried.join(", ");
  const goalsText = fields.goals.join(", ");
  const recommendedOffer = useMemo(() => "Full Body Reset Package", []);

  const set = (key: string, value: string | boolean | string[]) => setFields((prev) => ({ ...prev, [key]: value }));

  const toggleArrayValue = (key: "symptoms" | "tried" | "goals", value: string) => {
    setFields((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const canContinue =
    questionStep === 1 ? fields.symptoms.length > 0 :
    questionStep === 2 ? fields.tried.length > 0 :
    questionStep === 3 ? fields.goals.length > 0 :
    questionStep === 4 ? !!fields.urgency : true;

  function scrollToElement(id: string, delay = 60) {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (!element) return;
      const stickyOffset = 84;
      const top = element.getBoundingClientRect().top + window.scrollY - stickyOffset;
      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    }, delay);
  }

  function goToQuestionStep(nextStep: number) {
    setQuestionStep(nextStep);
    scrollToElement("quiz-card");
  }

  async function postLead(stage: string) {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...fields,
        symptoms: fields.symptoms,
        symptom: symptomsText,
        interest: symptomsText,
        tried: fields.tried,
        triedText,
        goals: fields.goals,
        goal: goalsText,
        timeline: fields.urgency,
        preferredNextStep: goalsText,
        recommendedOffer,
        quizPath: "Body Reset Credit Lead-First Funnel",
        source: "Susie Sculpts Quiz Funnel",
        page: "Claim Your Credit",
        leadStage: stage,
      }),
    });
    if (!res.ok) throw new Error("submit_failed");
  }

  async function captureLead(e: React.FormEvent) {
    e.preventDefault();
    if (!fields.firstName || !fields.email || !fields.consent) return;
    setLeadState("submitting");
    try {
      await postLead("Lead Captured Before Quiz");
      setLeadState("captured");
      scrollToElement("quiz-card", 180);
    } catch {
      setLeadState("error");
    }
  }

  async function finishQuiz() {
    if (!canContinue) return;
    setQuizState("submitting");
    try {
      await postLead("Quiz Completed - Recommendation Requested");
      setQuizState("analyzing");
      scrollToElement("analysis-card", 90);
      setTimeout(() => {
        setQuizState("success");
        scrollToElement("results", 80);
      }, 4000);
    } catch {
      setQuizState("error");
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <section id="claim" className="relative pt-20 md:pt-28 pb-6 md:pb-10 overflow-hidden bg-gradient-to-br from-cream via-stone/40 to-cream">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_.9fr] gap-5 lg:gap-8 items-start relative">
            <div className="bg-white/75 border border-purple/15 rounded-[22px] p-5 md:p-7 shadow-[0_8px_24px_rgba(60,40,80,0.06)]">
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-md shrink-0 border-4 border-white">
                  <Image
                    src="/images/susie.jpg"
                    alt="Susie from Susie Sculpts"
                    fill
                    className="object-cover object-[center_8%]"
                    sizes="80px"
                  />
                </div>
                <p className="section-label">A Message from Susie</p>
              </div>

              <h1 className="font-serif text-[30px] sm:text-4xl lg:text-5xl font-light leading-[1.05] text-[#2c1f14] mb-5">
                Let&apos;s figure out where you should start and get to feeling better!
              </h1>

              <div className="space-y-4 font-sans font-light text-muted text-base md:text-lg leading-relaxed">
                <p>
                  After you submit the answers to a few very basic questions to accept my gracious offer, I&apos;ll be able to recommend the right solution for what&apos;s weighing you down.
                </p>
                <p>
                  If you decide to accept the $100 rebate toward your next service, I look forward to meeting you!
                </p>
              </div>
            </div>

            <div className="bg-white/90 border border-purple/15 rounded-[22px] p-5 md:p-6 shadow-[0_12px_34px_rgba(60,40,80,0.10)]">
              {leadState === "captured" ? (
                <div className="rounded-sm bg-purple/5 border border-purple/15 p-5 text-center">
                  <p className="font-serif text-2xl font-light text-[#2c1f14] mb-2">You are in, {fields.firstName}.</p>
                  <p className="font-sans font-light text-muted text-sm mb-4">Now answer the quick questions below.</p>
                  <a href="#quiz-funnel" onClick={(e) => { e.preventDefault(); scrollToElement("quiz-card", 0); }} className="btn-primary w-full">Start the Questions</a>
                </div>
              ) : (
                <form id="body-reset-lead-form" onSubmit={captureLead} className="space-y-4">
                  <input className="input-field" placeholder="First name*" value={fields.firstName} onChange={(e) => set("firstName", e.target.value)} required />
                  <input className="input-field" type="email" placeholder="Email address*" value={fields.email} onChange={(e) => set("email", e.target.value)} required />
                  <input className="input-field" type="tel" placeholder="Mobile number (optional)" value={fields.phone} onChange={(e) => set("phone", e.target.value)} />
                  <label className="flex gap-3 items-start text-xs font-sans font-light text-muted leading-relaxed">
                    <input type="checkbox" className="mt-1 accent-purple" checked={fields.consent} onChange={(e) => set("consent", e.target.checked)} required />
                    I agree to receive follow-up messages from Susie Sculpts about my credit and recommendation. If I provide a mobile number, message and data rates may apply. I can opt out anytime.
                  </label>
                  <button type="submit" disabled={leadState === "submitting"} className="btn-primary w-full disabled:opacity-60">
                    {leadState === "submitting" ? "Saving..." : "Claim My $100 Offer"}
                  </button>
                  {leadState === "error" && <p className="text-center text-sm text-red-500">Something went wrong. Please try again or call Susie at (480) 440-0909.</p>}
                </form>
              )}
            </div>
          </div>
        </section>

        {leadState === "captured" && (
          <section id="quiz-funnel" className="py-2 md:py-8 bg-cream">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              {quizState === "analyzing" ? (
                <div id="analysis-card" className="scroll-mt-24 bg-white/80 border border-purple/15 rounded-[24px] p-8 md:p-10 text-center shadow-[0_10px_30px_rgba(60,40,80,0.08)]">
                  <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-purple/10 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-4 border-purple/20 border-t-purple animate-spin" />
                  </div>
                  <p className="section-label mb-4">Reviewing your answers</p>
                  <h2 className="section-heading mb-4">Susie is looking at what you shared.</h2>
                  <p className="font-sans font-light text-muted max-w-xl mx-auto">
                    Give her a moment to match your symptoms, what you have already tried, and the result you want most.
                  </p>
                </div>
              ) : quizState === "success" ? (
                <div id="results" className="scroll-mt-24 bg-white/80 border border-purple/15 rounded-[24px] p-5 md:p-8 shadow-[0_10px_30px_rgba(60,40,80,0.08)]">
                  <div className="text-center mb-10">
                    <p className="section-label mb-4">Susie&apos;s Recommendation</p>
                    <h2 className="section-heading mb-4">I&apos;m going to recommend my Full Body Reset Package.</h2>
                    <p className="font-sans font-light text-muted max-w-2xl mx-auto mb-4">
                      The procedures included in this premium starter plan will give us the most complete way to work with what you are feeling instead of guessing from one single service.
                    </p>
                    <p className="font-sans font-light text-muted max-w-2xl mx-auto mb-4">
                      As a way to show you my commitment to your health and wellness goals, I&apos;m confident you&apos;re going to want more.
                    </p>
                    <p className="font-sans font-light text-muted max-w-2xl mx-auto mb-4">
                      So, for a limited time for just a select few qualified ladies, I&apos;ve decided to add a $100 rebate offer that can be used toward your next service!
                    </p>
                    <p className="font-serif text-2xl font-light text-[#2c1f14] max-w-2xl mx-auto">
                      Congratulations on taking the first step!<br />You&apos;ve got this!
                    </p>
                  </div>

                  <div className="grid md:grid-cols-4 gap-5">
                    {offers.map((offer) => (
                      <div key={offer.name} className={`card flex flex-col ${offer.featured ? "border-2 border-purple shadow-[0_14px_34px_rgba(60,40,80,0.14)]" : ""}`}>
                        <p className="section-label mb-3">{offer.label}</p>
                        <h3 className="font-serif text-2xl font-light text-[#2c1f14] mb-2">{offer.name}</h3>
                        <p className="font-serif text-4xl font-light text-purple mb-2">{offer.price}</p>
                        {offer.credit && <p className="font-sans font-semibold text-sm text-purple mb-4">{offer.credit}</p>}
                        <ul className="font-sans font-light text-sm text-muted leading-relaxed flex-1 mb-6 space-y-2">
                          {offer.procedures.map((procedure) => (
                            <li key={procedure} className="flex gap-2">
                              <span className="text-purple mt-[1px]">•</span>
                              <span>{procedure}</span>
                            </li>
                          ))}
                        </ul>
                        <a href={offer.href} className="btn-primary text-[10px] px-4">{offer.button}</a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div id="quiz-card" className="scroll-mt-24 bg-white/80 border border-purple/15 rounded-[24px] p-5 md:p-8 shadow-[0_10px_30px_rgba(60,40,80,0.08)]">
                  <div className="mb-8">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <p className="section-label">Evaluation</p>
                      <p className="section-label whitespace-nowrap">{questionStep} of 4</p>
                    </div>
                    <div className="w-full h-2 bg-stone/70 rounded-full overflow-hidden">
                      <div className="h-full bg-purple rounded-full transition-all duration-300" style={{ width: `${questionStep * 25}%` }} />
                    </div>
                  </div>

                  {questionStep === 1 && (
                    <div>
                      <h3 className="font-serif text-3xl font-light mb-3 text-[#2c1f14]">
                        {arrivedFromSymptom ? "What else have you been feeling too?" : "Which of these have you been feeling lately?"}
                      </h3>
                      <p className="font-sans font-light text-muted mb-6">Select all that apply.</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {symptomCards.map((card) => {
                          const selected = fields.symptoms.includes(card.value);
                          return (
                            <button key={card.value} type="button" onClick={() => toggleArrayValue("symptoms", card.value)} className={`relative text-left rounded-[18px] overflow-hidden transition-all duration-200 ${selectedClass(selected)}`} aria-pressed={selected}>
                              {selected && <CheckBadge />}
                              <div className="relative aspect-square"><Image src={card.image} alt={card.title} fill className="object-cover object-top" sizes="(max-width: 640px) 50vw, 25vw" /></div>
                              <div className="px-4 py-4"><p className="font-sans font-semibold text-[#6A5A6D] text-[18px] leading-snug">{card.title}</p><p className="font-sans text-[13px] text-[#9a8fa0] leading-snug mt-1">{card.microcopy}</p></div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {questionStep === 2 && (
                    <MultiOptionStep title="What have you already tried?" helper="Select all that apply. This helps Susie understand what has already been part of your journey." options={triedOptions} values={fields.tried} onToggle={(v) => toggleArrayValue("tried", v)} />
                  )}
                  {questionStep === 3 && (
                    <MultiOptionStep title="What would feel like a real win?" helper="Select everything that would matter to you." options={goalOptions} values={fields.goals} onToggle={(v) => toggleArrayValue("goals", v)} />
                  )}
                  {questionStep === 4 && <OptionStep title="How soon do you want help figuring this out?" options={urgencyOptions} value={fields.urgency} onSelect={(v) => set("urgency", v)} />}

                  <div className="flex justify-between gap-4 mt-8">
                    <button type="button" onClick={() => goToQuestionStep(Math.max(1, questionStep - 1))} className="btn-secondary opacity-80" disabled={questionStep === 1}>Back</button>
                    {questionStep < 4 ? (
                      <button type="button" onClick={() => canContinue && goToQuestionStep(questionStep + 1)} className="btn-primary disabled:opacity-40" disabled={!canContinue}>Continue</button>
                    ) : (
                      <button type="button" onClick={finishQuiz} className="btn-primary disabled:opacity-40" disabled={!canContinue || quizState === "submitting"}>
                        {quizState === "submitting" ? "Saving..." : "Show Me Where To Start"}
                      </button>
                    )}
                  </div>
                  {quizState === "error" && <p className="text-center mt-4 text-sm text-red-500">Something went wrong. Please try again or call Susie at (480) 440-0909.</p>}
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

function CheckBadge() {
  return (
    <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-purple flex items-center justify-center shadow">
      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
        <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
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

function MultiOptionStep({ title, helper, options, values, onToggle }: { title: string; helper: string; options: string[]; values: string[]; onToggle: (v: string) => void }) {
  return (
    <div>
      <h3 className="font-serif text-3xl font-light mb-3 text-[#2c1f14]">{title}</h3>
      <p className="font-sans font-light text-muted mb-6">{helper}</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {options.map((option) => {
          const selected = values.includes(option);
          return (
            <button key={option} type="button" onClick={() => onToggle(option)} className={`relative text-left rounded-sm px-5 py-4 pr-12 font-sans font-light transition-all duration-200 ${selected ? "bg-purple text-white border-purple" : "bg-stone/50 text-muted border border-stone hover:border-purple/40"}`} aria-pressed={selected}>
              {option}
              {selected && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
