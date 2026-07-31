"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

type RecommendationKey = "full" | "synergie" | "pemf" | "contour" | "cavitation" | "roller";

type Fields = {
  firstName: string;
  email: string;
  phone: string;
  symptoms: string[];
  tried: string[];
  goals: string[];
  priority: string;
  urgency: string;
  consent: boolean;
};

type PackageTier = {
  name: string;
  price: string;
  note: string;
  href: string;
  button: string;
  featured?: boolean;
};

type RecommendationPackage = {
  key: RecommendationKey;
  name: string;
  label: string;
  mainPrice: string;
  shortFit: string;
  includes: string[];
  tiers: PackageTier[];
};

const checkoutLinks = {
  full: "#stripe-full-reset-link-needed",
  synergie: "#stripe-synergie-series-link-needed",
  pemf: "#stripe-pemf-series-link-needed",
  contour: "#stripe-contour-package-link-needed",
  cavitation: "#stripe-cavitation-rf-link-needed",
  roller: "#stripe-roller-package-link-needed",
  consult: "#calendar-booking-link-needed",
};

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
  "Dieting, cutting calories, or eating better",
  "Workouts, walking, or trying to move more",
  "Supplements, detoxes, or wellness trends",
  "Massage, lymphatic drainage, or bodywork",
  "PEMF, frequency work, red light, or recovery therapies",
  "Med spa, body contouring, cavitation, RF, or sculpting",
  "Nothing consistently yet - I just know something feels off",
];

const goalOptions = [
  "Feel lighter, less puffy, and less bloated",
  "Calm the achy, inflamed, or irritated feeling",
  "Have more energy, recover better, and feel clearer",
  "Tone, strengthen, and sculpt",
  "Target inches, stubborn areas, or loose-feeling skin",
  "Improve skin texture, smoothness, or cellulite appearance",
  "Stop guessing and let Susie build the plan",
];

const priorityOptions = [
  "I want Susie to choose the safest first step",
  "I mostly want to feel lighter and less puffy",
  "I mostly want help with aches, fatigue, or recovery",
  "I mostly want to sculpt, tighten, or contour",
  "I want the most complete reset plan",
  "I want the lowest-commitment way to talk first",
];

const urgencyOptions = [
  "I want help this week",
  "Within the next 2 weeks",
  "Sometime this month",
  "I am curious, but not urgent yet",
];

const packages: Record<RecommendationKey, RecommendationPackage> = {
  full: {
    key: "full",
    name: "Complete Body Reset Transformation Package",
    label: "Most complete reset path",
    mainPrice: "$1,200",
    shortFit: "Best when your answers show several things happening at once: puffiness, fatigue, inflammation, body confidence, and not knowing where to start.",
    includes: [
      "Private Body Reset consultation with Susie",
      "Synergie Vacuum Massage / lymphatic support",
      "PEMF frequency wellness",
      "EMShape Neo body sculpting",
      "Ultrasonic Cavitation & RF",
      "Roller body contouring support",
      "Personalized next-service plan",
    ],
    tiers: [
      { name: "Complete Body Reset Transformation Package", price: "$1,200", note: "Begin today and receive a $100 promotional service credit toward your next qualifying service after this package is completed.", href: checkoutLinks.full, button: "Reserve Complete Reset", featured: true },
      { name: "Focused Body Reset Package", price: "$697", note: "A smaller reset path. No promotional credit applies.", href: checkoutLinks.full, button: "Choose Focused Reset" },
      { name: "Starter Body Reset Visit", price: "$197", note: "A lower-commitment starter visit. No promotional credit applies.", href: checkoutLinks.full, button: "Choose Starter Visit" },
    ],
  },
  synergie: {
    key: "synergie",
    name: "Synergie Lymphatic Reset Series",
    label: "Best lymphatic path",
    mainPrice: "$1,000",
    shortFit: "Best when your answers point mostly to puffiness, bloating, heaviness, sluggishness, or wanting to feel lighter.",
    includes: ["12 Synergie Vacuum Massage sessions", "Lymphatic flow and circulation support", "Two sessions included compared with $100/session pricing", "Progress check-ins with Susie"],
    tiers: [
      { name: "12-Session Synergie Lymphatic Reset Series", price: "$1,000", note: "Best value. Begin today and receive a $100 promotional service credit toward your next qualifying service after the series is completed.", href: checkoutLinks.synergie, button: "Reserve Synergie Series", featured: true },
      { name: "6-Session Synergie Series", price: "$600", note: "Six sessions at regular package pricing. No promotional credit applies.", href: checkoutLinks.synergie, button: "Choose 6 Sessions" },
      { name: "3-Session Synergie Starter", price: "$300", note: "A starter series for lymphatic support. No promotional credit applies.", href: checkoutLinks.synergie, button: "Choose Starter Series" },
    ],
  },
  pemf: {
    key: "pemf",
    name: "PEMF Recovery & Frequency Wellness Series",
    label: "Best recovery path",
    mainPrice: "$1,000",
    shortFit: "Best when your answers point mostly to achy, inflamed, tired, foggy, stressed, or recovery-focused needs.",
    includes: ["20 PEMF / frequency wellness sessions", "Recovery-focused wellness support", "Whole-body relaxation and energy support", "Recommendation for whether to continue or combine services"],
    tiers: [
      { name: "20-Session PEMF Recovery Series", price: "$1,000", note: "Best value. Begin today and receive a $100 promotional service credit toward your next qualifying service after the series is completed.", href: checkoutLinks.pemf, button: "Reserve PEMF Series", featured: true },
      { name: "10-Session PEMF Series", price: "$500", note: "Ten PEMF sessions. No promotional credit applies.", href: checkoutLinks.pemf, button: "Choose 10 Sessions" },
      { name: "5-Session PEMF Starter", price: "$250", note: "Five PEMF sessions. No promotional credit applies.", href: checkoutLinks.pemf, button: "Choose Starter Series" },
    ],
  },
  contour: {
    key: "contour",
    name: "Body Contour Transformation Package",
    label: "Best contouring path",
    mainPrice: "$1,200",
    shortFit: "Best when your answers point mostly to toning, sculpting, stubborn areas, body confidence, or visible contouring support.",
    includes: ["EMShape Neo body sculpting", "Ultrasonic Cavitation & RF", "Roller body contouring support", "Contouring-focused next-step plan"],
    tiers: [
      { name: "Body Contour Transformation Package", price: "$1,200", note: "Begin today and receive a $100 promotional service credit toward your next qualifying service after this package is completed.", href: checkoutLinks.contour, button: "Reserve Contour Package", featured: true },
      { name: "Focused Contour Package", price: "$800", note: "A smaller contouring package. No promotional credit applies.", href: checkoutLinks.contour, button: "Choose Focused Contour" },
      { name: "Single Sculpting Session", price: "$400", note: "A single EMShape Neo body sculpting session. No promotional credit applies.", href: checkoutLinks.contour, button: "Choose Single Session" },
    ],
  },
  cavitation: {
    key: "cavitation",
    name: "Ultrasonic Cavitation & RF Skin Tightening Series",
    label: "Best targeted contouring path",
    mainPrice: "$1,200",
    shortFit: "Best when your answers point to stubborn areas, inches, loose-feeling skin, or firmer-looking skin as the main goal.",
    includes: ["6 Ultrasonic Cavitation & RF sessions", "Target-area contouring support", "Skin-tightening support", "Recommendation for whether to combine with sculpting or roller work"],
    tiers: [
      { name: "6-Session Cavitation & RF Series", price: "$1,200", note: "Begin today and receive a $100 promotional service credit toward your next qualifying service after the series is completed.", href: checkoutLinks.cavitation, button: "Reserve Cavitation Series", featured: true },
      { name: "3-Session Cavitation & RF Series", price: "$600", note: "Three targeted sessions. No promotional credit applies.", href: checkoutLinks.cavitation, button: "Choose 3 Sessions" },
      { name: "Single Cavitation & RF Session", price: "$200", note: "A single targeted session. No promotional credit applies.", href: checkoutLinks.cavitation, button: "Choose Single Session" },
    ],
  },
  roller: {
    key: "roller",
    name: "Roller Body Contouring Series",
    label: "Best texture and circulation-support path",
    mainPrice: "$1,200",
    shortFit: "Best when your answers point to skin texture, smoothness, cellulite appearance, circulation support, or supportive bodywork.",
    includes: ["6 Roller body contouring sessions", "Skin texture and smoothness focus", "Circulation-supportive bodywork", "Recommendation for whether to combine with Synergie or RF"],
    tiers: [
      { name: "6-Session Roller Body Contouring Series", price: "$1,200", note: "Begin today and receive a $100 promotional service credit toward your next qualifying service after the series is completed.", href: checkoutLinks.roller, button: "Reserve Roller Series", featured: true },
      { name: "3-Session Roller Series", price: "$600", note: "Three roller sessions. No promotional credit applies.", href: checkoutLinks.roller, button: "Choose 3 Sessions" },
      { name: "Single Roller Session", price: "$200", note: "A single roller session. No promotional credit applies.", href: checkoutLinks.roller, button: "Choose Single Session" },
    ],
  },
};

const resultOrder: RecommendationKey[] = ["full", "synergie", "pemf", "contour", "cavitation", "roller"];

function buildRecommendation(fields: Fields) {
  const scores: Record<RecommendationKey, number> = { full: 0, synergie: 0, pemf: 0, contour: 0, cavitation: 0, roller: 0 };
  const reasons: Record<RecommendationKey, string[]> = { full: [], synergie: [], pemf: [], contour: [], cavitation: [], roller: [] };

  const add = (key: RecommendationKey, points: number, reason: string) => {
    scores[key] += points;
    if (!reasons[key].includes(reason)) reasons[key].push(reason);
  };

  const hasSymptom = (value: string) => fields.symptoms.includes(value);
  const hasTried = (value: string) => fields.tried.includes(value);
  const hasGoal = (value: string) => fields.goals.includes(value);
  const hasPriority = (value: string) => fields.priority === value;

  if (hasSymptom("Puffy or bloated")) add("synergie", 5, "You selected puffiness or bloating, which points first toward lymphatic support.");
  if (hasSymptom("Heavy or sluggish")) add("synergie", 4, "You selected feeling heavy or sluggish, which often fits a lymphatic reset conversation.");
  if (hasSymptom("Inflamed or achy")) add("pemf", 5, "You selected achy or inflamed feelings, which points toward recovery and frequency wellness support.");
  if (hasSymptom("Tired all the time")) add("pemf", 4, "You selected low energy, which points toward a recovery-focused wellness path.");
  if (hasSymptom("Foggy or unfocused")) add("pemf", 3, "You selected foggy or unfocused, which points toward recovery, frequency wellness, and whole-body support.");
  if (hasSymptom("Uncomfortable in your body")) add("contour", 4, "You selected feeling uncomfortable in your body, which may point toward sculpting, contouring, and body-confidence goals.");
  if (hasSymptom("Stuck - nothing works")) add("full", 5, "You selected that nothing seems to work, so a one-service guess may be too narrow.");
  if (hasSymptom("Don't feel like yourself")) add("full", 5, "You selected not feeling like yourself, which points toward a broader reset conversation.");

  if (hasTried("Massage, lymphatic drainage, or bodywork")) add("synergie", 3, "You have already been drawn to lymphatic work or bodywork, so a Synergie series may be a natural fit.");
  if (hasTried("PEMF, frequency work, red light, or recovery therapies")) add("pemf", 3, "You have already been drawn to recovery or frequency therapies, so a PEMF series may fit.");
  if (hasTried("Med spa, body contouring, cavitation, RF, or sculpting")) {
    add("contour", 3, "You have already been drawn to body contouring or sculpting services.");
    add("cavitation", 2, "Cavitation or RF interest points toward a targeted contouring path.");
  }
  if (hasTried("Dieting, cutting calories, or eating better")) add("full", 1, "You have already tried food changes, so this may need more than another simple diet attempt.");
  if (hasTried("Workouts, walking, or trying to move more")) add("contour", 2, "You have already tried movement, so contouring or sculpting support may fit your goals.");
  if (hasTried("Supplements, detoxes, or wellness trends")) add("synergie", 2, "You have tried wellness trends, so a structured lymphatic reset may be a better next step than more guessing.");
  if (hasTried("Nothing consistently yet - I just know something feels off")) add("full", 3, "You have not tried anything consistently yet, so a broader guided reset may be safer than choosing one isolated service.");

  if (hasGoal("Feel lighter, less puffy, and less bloated")) add("synergie", 5, "Your main goal includes feeling lighter and less puffy.");
  if (hasGoal("Calm the achy, inflamed, or irritated feeling")) add("pemf", 5, "Your main goal includes calming achy, inflamed, or irritated feelings.");
  if (hasGoal("Have more energy, recover better, and feel clearer")) add("pemf", 5, "Your main goal includes energy, recovery, and clarity.");
  if (hasGoal("Tone, strengthen, and sculpt")) add("contour", 5, "Your main goal includes toning, strengthening, and sculpting.");
  if (hasGoal("Target inches, stubborn areas, or loose-feeling skin")) add("cavitation", 5, "Your main goal includes stubborn areas, inches, or loose-feeling skin.");
  if (hasGoal("Improve skin texture, smoothness, or cellulite appearance")) add("roller", 5, "Your main goal includes skin texture, smoothness, or cellulite appearance.");
  if (hasGoal("Stop guessing and let Susie build the plan")) add("full", 6, "You want Susie to build the plan instead of guessing service by service.");

  if (hasPriority("I mostly want to feel lighter and less puffy")) add("synergie", 6, "Your top priority is feeling lighter and less puffy.");
  if (hasPriority("I mostly want help with aches, fatigue, or recovery")) add("pemf", 6, "Your top priority is aches, fatigue, or recovery.");
  if (hasPriority("I mostly want to sculpt, tighten, or contour")) {
    add("contour", 5, "Your top priority is sculpting, tightening, or contouring.");
    add("cavitation", 3, "Tightening and stubborn-area goals may also point toward Cavitation & RF.");
  }
  if (hasPriority("I want the most complete reset plan")) add("full", 8, "You said you want the most complete reset plan.");
  if (hasPriority("I want Susie to choose the safest first step")) add("full", 4, "You asked Susie to choose the safest first step, so a guided reset path may be better than guessing.");
  if (hasPriority("I want the lowest-commitment way to talk first")) add("full", 1, "Even if you want to talk first, the result still points to the best package path to discuss with Susie.");

  if (fields.symptoms.length >= 4) add("full", 5, "You selected several symptoms, so a one-service answer may be too narrow.");
  if (fields.goals.length >= 3) add("full", 4, "You selected several goals, so the broader reset path may be a better fit.");
  if (fields.tried.length >= 3) add("full", 3, "You have already tried several things, so the recommendation should not be another blind guess.");

  const ranked = resultOrder.map((key) => ({ key, score: scores[key] })).sort((a, b) => b.score - a.score);
  const winner = ranked[0]?.score > 0 ? ranked[0].key : "full";
  const selectedReasons = reasons[winner].length ? reasons[winner].slice(0, 3) : [packages[winner].shortFit];
  const alternateKeys = ranked.filter((item) => item.key !== winner && item.score > 0).slice(0, 2).map((item) => item.key);
  const scoreSummary = ranked.map((item) => `${packages[item.key].name}: ${item.score}`).join(" | ");

  return { key: winner, package: packages[winner], reasons: selectedReasons, alternateKeys, scoreSummary };
}

function BodyResetHeader({ showHomeCta }: { showHomeCta: boolean }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-stone/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="Susie Sculpts" width={180} height={44} priority className="h-9 md:h-11 w-auto" />
        </Link>
        <Link href="/#testimonials" className="btn-primary text-[9px] sm:text-[10px] px-3 sm:px-5 py-3 leading-tight">Read Testimonials</Link>
      </div>
    </header>
  );
}

export default function BodyResetPage() {
  const [questionStep, setQuestionStep] = useState(1);
  const [leadState, setLeadState] = useState<"idle" | "submitting" | "captured" | "error">("idle");
  const [quizState, setQuizState] = useState<"idle" | "submitting" | "analyzing" | "success" | "error">("idle");
  const [fields, setFields] = useState<Fields>({ firstName: "", email: "", phone: "", symptoms: [], tried: [], goals: [], priority: "", urgency: "", consent: false });

  const recommendation = useMemo(() => buildRecommendation(fields), [fields]);
  const symptomsText = fields.symptoms.join(", ");
  const triedText = fields.tried.join(", ");
  const goalsText = fields.goals.join(", ");
  const topTier = recommendation.package.tiers[0];

  const set = (key: keyof Fields, value: string | boolean | string[]) => setFields((prev) => ({ ...prev, [key]: value }));
  const toggleArrayValue = (key: "symptoms" | "tried" | "goals", value: string) => {
    setFields((prev) => ({ ...prev, [key]: prev[key].includes(value) ? prev[key].filter((item) => item !== value) : [...prev[key], value] }));
  };

  const canContinue = questionStep === 1 ? fields.symptoms.length > 0 : questionStep === 2 ? fields.tried.length > 0 : questionStep === 3 ? fields.goals.length > 0 : questionStep === 4 ? !!fields.priority : questionStep === 5 ? !!fields.urgency : true;

  function scrollToElement(id: string, delay = 60) {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (!element) return;
      const top = element.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    }, delay);
  }

  function goToQuestionStep(nextStep: number) {
    setQuestionStep(nextStep);
    scrollToElement("quiz-card");
  }

  async function postLead(stage: string) {
    const recommendationReady = !stage.includes("Before Quiz");
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
        priority: fields.priority,
        timeline: fields.urgency,
        preferredNextStep: goalsText,
        recommendedOffer: recommendationReady ? recommendation.package.name : "Pending Body Reset Evaluation",
        recommendedPackagePrice: recommendationReady ? recommendation.package.mainPrice : "Pending",
        recommendedTopPackage: recommendationReady ? topTier.name : "Pending",
        recommendationKey: recommendationReady ? recommendation.key : "pending",
        recommendationReasons: recommendationReady ? recommendation.reasons.join(" | ") : "Pending quiz answers",
        recommendationScoreSummary: recommendationReady ? recommendation.scoreSummary : "Pending quiz answers",
        quizPath: "Smart High-Ticket Body Reset Evaluation",
        source: "Susie Sculpts Quiz Funnel",
        page: "Find My Best First Step",
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
      await postLead("Quiz Completed - High Ticket Smart Recommendation Requested");
      setQuizState("analyzing");
      scrollToElement("analysis-card", 90);
      setTimeout(() => {
        setQuizState("success");
        scrollToElement("results", 80);
      }, 7000);
    } catch {
      setQuizState("error");
    }
  }

  return (
    <>
      <BodyResetHeader showHomeCta={quizState === "success"} />
      <main>
        <section id="claim" className="relative pt-20 md:pt-28 pb-6 md:pb-10 overflow-hidden bg-gradient-to-br from-cream via-stone/40 to-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_.9fr] gap-5 lg:gap-8 items-start relative">
            <div className="bg-white/75 border border-purple/15 rounded-[22px] p-5 md:p-7 shadow-[0_8px_24px_rgba(60,40,80,0.06)]">
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-md shrink-0 border-4 border-white">
                  <Image src="/images/susie.jpg" alt="Susie from Susie Sculpts" fill className="object-cover object-[center_8%]" sizes="80px" />
                </div>
                <div>
                  <p className="section-label mb-1">A Message from Susie</p>
                  <p className="font-sans font-medium text-[12px] tracking-[0.18em] uppercase text-purple/70">Since 1995</p>
                </div>
              </div>
              <h1 className="font-serif text-[30px] sm:text-4xl lg:text-5xl font-light leading-[1.05] text-[#2c1f14] mb-5">Feel puffy, tired, foggy, inflamed, heavy, stuck, or just not like yourself?</h1>
              <div className="space-y-4 font-sans font-light text-muted text-base md:text-lg leading-relaxed">
                <p>I want to help you figure out where you should start. Every woman does not need the same treatment, and I do not want you guessing from one service to the next.</p>
                <p>Answer a few quick questions. Based on what you share, I will recommend the most logical package path to discuss with you.</p>
                <p className="font-medium text-[#2c1f14]">No pressure. Ever.</p>
                <p className="text-sm md:text-base text-muted/85">This online result is a starting-point recommendation, not a diagnosis. Susie will confirm the right plan with you in person.</p>
              </div>
            </div>

            <div className="bg-white/90 border border-purple/15 rounded-[22px] p-5 md:p-6 shadow-[0_12px_34px_rgba(60,40,80,0.10)]">
              {leadState === "captured" ? (
                <div className="rounded-sm bg-purple/5 border border-purple/15 p-5 text-center">
                  <p className="font-serif text-2xl font-light text-[#2c1f14] mb-2">Hi, {fields.firstName}. Tell me what has been going on.</p>
                  <p className="font-sans font-light text-muted text-sm mb-4">This is a five-step evaluation. Your answers change the recommendation.</p>
                  <a href="#quiz-funnel" onClick={(e) => { e.preventDefault(); scrollToElement("quiz-card", 0); }} className="btn-primary w-full">Start My Evaluation</a>
                </div>
              ) : (
                <form id="body-reset-lead-form" onSubmit={captureLead} className="space-y-4">
                  <input className="input-field" placeholder="First name*" value={fields.firstName} onChange={(e) => set("firstName", e.target.value)} required />
                  <input className="input-field" type="email" placeholder="Email address*" value={fields.email} onChange={(e) => set("email", e.target.value)} required />
                  <input className="input-field" type="tel" placeholder="Mobile number (optional)" value={fields.phone} onChange={(e) => set("phone", e.target.value)} />
                  <label className="flex gap-3 items-start text-xs font-sans font-light text-muted leading-relaxed">
                    <input type="checkbox" className="mt-1 accent-purple" checked={fields.consent} onChange={(e) => set("consent", e.target.checked)} required />
                    I agree to receive follow-up messages from Susie Sculpts about my evaluation and recommendation. If I provide a mobile number, message and data rates may apply. I can opt out anytime.
                  </label>
                  <button type="submit" disabled={leadState === "submitting"} className="btn-primary w-full disabled:opacity-60">{leadState === "submitting" ? "Saving..." : "Find My Best First Step"}</button>
                  <p className="text-center text-xs font-sans font-light text-muted/80 leading-relaxed">Email is required so Susie can send your recommendation and follow up if you do not book today.</p>
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
                  <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-purple/10 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-purple/20 border-t-purple animate-spin" /></div>
                  <p className="section-label mb-4">Reviewing your answers</p>
                  <h2 className="section-heading mb-4">Susie is matching your answers to the best first step.</h2>
                  <p className="font-sans font-light text-muted max-w-xl mx-auto mb-5">The evaluation is weighing your symptoms, what you have already tried, your goals, and how much guidance you want before making a recommendation.</p>
                </div>
              ) : quizState === "success" ? (
                <div id="results" className="scroll-mt-24 bg-white/85 border border-purple/15 rounded-[24px] p-4 md:p-6 shadow-[0_10px_30px_rgba(60,40,80,0.08)]">
                  <div className="mb-5 rounded-[20px] border border-purple/15 bg-white/80 p-4 md:p-5">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0 mx-auto md:mx-0">
                        <Image src="/images/susie.jpg" alt="Susie from Susie Sculpts" fill className="object-cover object-[center_8%]" sizes="80px" />
                      </div>
                      <div className="text-center md:text-left flex-1">
                        <p className="section-label mb-2">Susie&apos;s Smart Recommendation</p>
                        <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#2c1f14] mb-3">
                          &ldquo;Based on what you shared, I would start with the {recommendation.package.name}.&rdquo;
                        </h2>
                        <p className="font-sans font-light text-sm md:text-base text-muted leading-relaxed">
                          This is the package path I would discuss with you first. If your budget or comfort level points somewhere smaller, I gave you those options too.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5 bg-purple/5 border-2 border-purple/25 rounded-[22px] p-5 md:p-6">
                    <p className="section-label mb-2">Recommended Package</p>
                    <div className="grid md:grid-cols-[1fr_auto] md:items-start gap-4 mb-4">
                      <div>
                        <h3 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#2c1f14] mb-2">{topTier.name}</h3>
                        <p className="font-sans font-light text-sm md:text-base text-muted leading-relaxed">{recommendation.package.shortFit}</p>
                      </div>
                      <div className="md:text-right">
                        <p className="font-serif text-5xl font-light text-purple leading-none mb-2">{topTier.price}</p>
                        <p className="font-sans font-medium text-xs tracking-[0.12em] uppercase text-purple/70">Top recommendation</p>
                      </div>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-2 mb-5 font-sans font-light text-sm text-muted">
                      {recommendation.package.includes.map((item) => (
                        <li key={item} className="flex gap-2"><span className="text-purple">•</span><span>{item}</span></li>
                      ))}
                    </ul>
                    <p className="font-sans font-medium text-purple mb-5">{topTier.note}</p>
                    <a href={topTier.href} className="btn-primary w-full md:w-auto">{topTier.button}</a>
                  </div>

                  <div className="mb-6 rounded-[18px] bg-stone/45 border border-stone/80 p-4 md:p-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <p className="section-label mb-3">Why this recommendation came up</p>
                        <ul className="space-y-2 font-sans font-light text-sm text-muted leading-relaxed">
                          {recommendation.reasons.map((reason) => (
                            <li key={reason} className="flex gap-3"><span className="text-purple mt-[2px]">•</span><span>{reason}</span></li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="section-label mb-3">Important note</p>
                        <p className="font-sans font-light text-sm text-muted leading-relaxed mb-3">
                          This is not a diagnosis. It is a starting-point recommendation designed to make the first conversation with Susie more useful.
                        </p>
                        <p className="font-sans font-light text-sm text-muted leading-relaxed">
                          Susie will confirm the right plan after she talks with you and understands your goals, comfort level, and budget.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    {recommendation.package.tiers.slice(1).map((tier) => <PackageCard key={tier.name} tier={tier} />)}
                    <PackageCard tier={{ name: "Talk With Susie First", price: "Free", note: "Schedule a conversation before choosing a paid package.", href: checkoutLinks.consult, button: "Book Consult" }} />
                  </div>

                  {recommendation.alternateKeys.length > 0 && (
                    <div className="mt-6 rounded-[18px] bg-stone/50 border border-stone p-5">
                      <p className="section-label mb-3">Other paths Susie may discuss with you</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {recommendation.alternateKeys.map((key) => (
                          <div key={key}>
                            <p className="font-serif text-xl text-[#2c1f14]">{packages[key].name}</p>
                            <p className="font-sans font-light text-sm text-muted">{packages[key].shortFit}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div id="quiz-card" className="scroll-mt-24 bg-white/80 border border-purple/15 rounded-[24px] p-5 md:p-8 shadow-[0_10px_30px_rgba(60,40,80,0.08)]">
                  <div className="mb-8">
                    <div className="flex items-center justify-between gap-4 mb-3"><p className="section-label">Smart Evaluation</p><p className="section-label whitespace-nowrap">{questionStep} of 5</p></div>
                    <div className="w-full h-2 bg-stone/70 rounded-full overflow-hidden"><div className="h-full bg-purple rounded-full transition-all duration-300" style={{ width: `${questionStep * 20}%` }} /></div>
                  </div>

                  {questionStep === 1 && (
                    <div>
                      <h3 className="font-serif text-3xl font-light mb-3 text-[#2c1f14]">Which of these have you been feeling lately?</h3>
                      <p className="font-sans font-light text-muted mb-6">Select all that apply.</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{symptomCards.map((card) => {
                        const selected = fields.symptoms.includes(card.value);
                        return <button key={card.value} type="button" onClick={() => toggleArrayValue("symptoms", card.value)} className={`relative text-left rounded-[18px] overflow-hidden transition-all duration-200 ${selected ? "border-2 border-purple bg-purple/5" : "border border-[rgba(120,90,150,0.12)] bg-[#faf8f5]"}`}><div className="relative aspect-square"><Image src={card.image} alt={card.title} fill className="object-cover object-top" sizes="(max-width: 640px) 50vw, 25vw" /></div><div className="px-4 py-4"><p className="font-sans font-semibold text-[#6A5A6D] text-[18px] leading-snug">{card.title}</p><p className="font-sans text-[13px] text-[#9a8fa0] leading-snug mt-1">{card.microcopy}</p></div>{selected && <span className="absolute top-2 right-2 bg-purple text-white rounded-full w-6 h-6 flex items-center justify-center">✓</span>}</button>;
                      })}</div>
                    </div>
                  )}
                  {questionStep === 2 && <MultiOptionStep title="What have you already tried?" helper="Select all that apply." options={triedOptions} values={fields.tried} onToggle={(v) => toggleArrayValue("tried", v)} />}
                  {questionStep === 3 && <MultiOptionStep title="What would feel like a real win?" helper="Select everything that would matter to you." options={goalOptions} values={fields.goals} onToggle={(v) => toggleArrayValue("goals", v)} />}
                  {questionStep === 4 && <OptionStep title="What feels most important right now?" options={priorityOptions} value={fields.priority} onSelect={(v) => set("priority", v)} />}
                  {questionStep === 5 && <OptionStep title="How soon do you want help figuring this out?" options={urgencyOptions} value={fields.urgency} onSelect={(v) => set("urgency", v)} />}

                  <div className="flex justify-between gap-4 mt-8">
                    <button type="button" onClick={() => goToQuestionStep(Math.max(1, questionStep - 1))} className="btn-secondary opacity-80" disabled={questionStep === 1}>Back</button>
                    {questionStep < 5 ? <button type="button" onClick={() => canContinue && goToQuestionStep(questionStep + 1)} className="btn-primary disabled:opacity-40" disabled={!canContinue}>Continue</button> : <button type="button" onClick={finishQuiz} className="btn-primary disabled:opacity-40" disabled={!canContinue || quizState === "submitting"}>{quizState === "submitting" ? "Saving..." : "Show Me Where To Start"}</button>}
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

function PackageCard({ tier }: { tier: PackageTier }) {
  return (
    <div className="card flex flex-col">
      <h3 className="font-serif text-2xl font-light text-[#2c1f14] mb-2">{tier.name}</h3>
      <p className="font-serif text-4xl font-light text-purple mb-2">{tier.price}</p>
      <p className="font-sans font-light text-sm text-muted leading-relaxed mb-5 flex-1">{tier.note}</p>
      <a href={tier.href} className="btn-secondary text-[10px] px-4">{tier.button}</a>
    </div>
  );
}

function OptionStep({ title, options, value, onSelect }: { title: string; options: string[]; value: string; onSelect: (v: string) => void }) {
  return <div><h3 className="font-serif text-3xl font-light mb-6 text-[#2c1f14]">{title}</h3><div className="grid sm:grid-cols-2 gap-3">{options.map((option) => <button key={option} type="button" onClick={() => onSelect(option)} className={`text-left rounded-sm px-5 py-4 font-sans font-light transition-all duration-200 ${value === option ? "bg-purple text-white border-purple" : "bg-stone/50 text-muted border border-stone hover:border-purple/40"}`}>{option}</button>)}</div></div>;
}

function MultiOptionStep({ title, helper, options, values, onToggle }: { title: string; helper: string; options: string[]; values: string[]; onToggle: (v: string) => void }) {
  return <div><h3 className="font-serif text-3xl font-light mb-3 text-[#2c1f14]">{title}</h3><p className="font-sans font-light text-muted mb-6">{helper}</p><div className="grid sm:grid-cols-2 gap-3">{options.map((option) => { const selected = values.includes(option); return <button key={option} type="button" onClick={() => onToggle(option)} className={`relative text-left rounded-sm px-5 py-4 pr-12 font-sans font-light transition-all duration-200 ${selected ? "bg-purple text-white border-purple" : "bg-stone/50 text-muted border border-stone hover:border-purple/40"}`}>{option}{selected && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white">✓</span>}</button>; })}</div></div>;
}
