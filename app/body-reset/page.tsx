"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

type RecommendationKey = "ultimate" | "pemf" | "lymphatic" | "fascia" | "pelvic" | "contour" | "muscle";

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
  duration: string;
  shortFit: string;
  includes: string[];
  tiers: PackageTier[];
};

const checkoutLinks = {
  ultimate: "#stripe-ultimate-you-link-needed",
  pemf: "#stripe-pemf-series-link-needed",
  lymphatic: "#stripe-lymphatic-series-link-needed",
  fascia: "#stripe-fascia-skin-series-link-needed",
  pelvic: "#stripe-pelvic-floor-series-link-needed",
  contour: "#stripe-body-contouring-series-link-needed",
  muscle: "#stripe-muscle-strength-tone-series-link-needed",
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
  "Cellulite creams, massage tools, or skin-smoothing treatments",
  "Kegels, pelvic floor exercises, or core strengthening",
  "Nothing consistently yet - I just know something feels off",
];

const goalOptions = [
  "Feel lighter, less puffy, and less bloated",
  "Calm the achy, inflamed, or irritated feeling",
  "Have more energy, recover better, and feel clearer",
  "Tone, strengthen, and sculpt muscle",
  "Target inches, stubborn areas, or loose-feeling skin",
  "Improve skin texture, smoothness, or cellulite appearance",
  "Strengthen my pelvic floor, core, or bladder confidence",
  "Stop guessing and let Susie build the plan",
];

const priorityOptions = [
  "I want Susie to choose the safest first step",
  "I mostly want to feel lighter and less puffy",
  "I mostly want help with aches, fatigue, or recovery",
  "I mostly want smoother skin, fascia support, or less visible cellulite",
  "I mostly want pelvic floor, core, or bladder-confidence support",
  "I mostly want to reduce inches, tighten, or contour",
  "I mostly want to build, strengthen, and tone muscle",
  "I want the most complete whole-body experience",
  "I want the lowest-commitment way to talk first",
];

const urgencyOptions = [
  "I want help this week",
  "Within the next 2 weeks",
  "Sometime this month",
  "I am curious, but not urgent yet",
];

const packages: Record<RecommendationKey, RecommendationPackage> = {
  ultimate: {
    key: "ultimate",
    name: "Ultimate YOU Experience",
    label: "Most complete whole-body experience",
    mainPrice: "$1,297",
    duration: "Six-treatment experience",
    shortFit: "Best when your answers point to several needs at once or when you want to experience every Susie Sculpts treatment before choosing a focused series.",
    includes: [
      "One 30-minute PEMF Recovery and Wellness treatment",
      "One 45-minute Lymphatic Wellness treatment",
      "One 55-minute Fascia and Skin Revival treatment",
      "One 45-minute Pelvic Floor Strengthening treatment",
      "One 55-minute Body Contouring treatment",
      "One 50-minute Muscle and Strength and Tone treatment",
    ],
    tiers: [
      { name: "Ultimate YOU Experience", price: "$1,297", note: "One of each of Susie Sculpts' six signature treatments in one complete experience.", href: checkoutLinks.ultimate, button: "Reserve Ultimate YOU", featured: true },
    ],
  },
  pemf: {
    key: "pemf",
    name: "PEMF Recovery and Wellness Series",
    label: "Best recovery and wellness path",
    mainPrice: "$797",
    duration: "30-minute sessions",
    shortFit: "Best when your answers point mostly to aches, fatigue, stress, fogginess, low energy, or recovery-focused wellness support.",
    includes: ["30-minute PEMF sessions", "Recovery and relaxation support", "Energy and whole-body wellness support", "Choose 1, 5, 10, or 20 sessions"],
    tiers: [
      { name: "20-Session PEMF Recovery and Wellness Series", price: "$797", note: "Twenty 30-minute sessions and the strongest series value.", href: checkoutLinks.pemf, button: "Reserve 20 Sessions", featured: true },
      { name: "10-Session PEMF Recovery and Wellness Series", price: "$497", note: "Ten 30-minute sessions.", href: checkoutLinks.pemf, button: "Choose 10 Sessions" },
      { name: "5-Session PEMF Recovery and Wellness Series", price: "$297", note: "Five 30-minute sessions.", href: checkoutLinks.pemf, button: "Choose 5 Sessions" },
      { name: "Single PEMF Recovery and Wellness Session", price: "$67", note: "One 30-minute session.", href: checkoutLinks.pemf, button: "Choose 1 Session" },
    ],
  },
  lymphatic: {
    key: "lymphatic",
    name: "Lymphatic Wellness Series",
    label: "Best lymphatic wellness path",
    mainPrice: "$1,597",
    duration: "45-minute Synergie sessions",
    shortFit: "Best when your answers point mostly to puffiness, bloating, heaviness, sluggishness, circulation support, or wanting to feel lighter.",
    includes: ["45-minute Synergie sessions", "Lymphatic flow and circulation support", "Required spandex bodysuit included", "Choose 1, 5, 10, or 20 sessions"],
    tiers: [
      { name: "20-Session Lymphatic Wellness Series", price: "$1,597", note: "Twenty 45-minute Synergie sessions. Includes the spandex bodysuit.", href: checkoutLinks.lymphatic, button: "Reserve 20 Sessions", featured: true },
      { name: "10-Session Lymphatic Wellness Series", price: "$897", note: "Ten 45-minute Synergie sessions. Includes the spandex bodysuit.", href: checkoutLinks.lymphatic, button: "Choose 10 Sessions" },
      { name: "5-Session Lymphatic Wellness Series", price: "$497", note: "Five 45-minute Synergie sessions. Includes the spandex bodysuit.", href: checkoutLinks.lymphatic, button: "Choose 5 Sessions" },
      { name: "Single Lymphatic Wellness Session", price: "$147", note: "One 45-minute Synergie session. Includes the spandex bodysuit.", href: checkoutLinks.lymphatic, button: "Choose 1 Session" },
    ],
  },
  fascia: {
    key: "fascia",
    name: "Fascia and Skin Revival Series",
    label: "Best fascia, circulation, and skin-smoothing path",
    mainPrice: "$3,197",
    duration: "55-minute Rollerwave sessions",
    shortFit: "Best when your answers point mostly to skin texture, visible cellulite, circulation, fascia support, or wanting smoother and firmer-looking skin.",
    includes: ["55-minute Rollerwave sessions", "Fascia and circulation support", "Skin texture and smoothing focus", "Choose 1, 5, 10, or 20 sessions"],
    tiers: [
      { name: "20-Session Fascia and Skin Revival Series", price: "$3,197", note: "Twenty 55-minute Rollerwave sessions and the strongest series value.", href: checkoutLinks.fascia, button: "Reserve 20 Sessions", featured: true },
      { name: "10-Session Fascia and Skin Revival Series", price: "$1,697", note: "Ten 55-minute Rollerwave sessions.", href: checkoutLinks.fascia, button: "Choose 10 Sessions" },
      { name: "5-Session Fascia and Skin Revival Series", price: "$897", note: "Five 55-minute Rollerwave sessions.", href: checkoutLinks.fascia, button: "Choose 5 Sessions" },
      { name: "Single Fascia and Skin Revival Session", price: "$197", note: "One 55-minute Rollerwave session.", href: checkoutLinks.fascia, button: "Choose 1 Session" },
    ],
  },
  pelvic: {
    key: "pelvic",
    name: "Pelvic Floor Strengthening Series",
    label: "Best pelvic floor and core-confidence path",
    mainPrice: "$3,197",
    duration: "45-minute sessions",
    shortFit: "Best when you specifically identify pelvic floor weakness, core stability, posture, or bladder-confidence support as a priority.",
    includes: ["45-minute Pelvic Floor Strengthening sessions", "Comfortably seated and fully clothed", "Pelvic floor and deep-core muscle activation", "Choose 1, 5, 10, or 20 sessions"],
    tiers: [
      { name: "20-Session Pelvic Floor Strengthening Series", price: "$3,197", note: "Twenty 45-minute sessions and the strongest series value.", href: checkoutLinks.pelvic, button: "Reserve 20 Sessions", featured: true },
      { name: "10-Session Pelvic Floor Strengthening Series", price: "$1,697", note: "Ten 45-minute sessions.", href: checkoutLinks.pelvic, button: "Choose 10 Sessions" },
      { name: "5-Session Pelvic Floor Strengthening Series", price: "$897", note: "Five 45-minute sessions.", href: checkoutLinks.pelvic, button: "Choose 5 Sessions" },
      { name: "Single Pelvic Floor Strengthening Session", price: "$197", note: "One 45-minute session.", href: checkoutLinks.pelvic, button: "Choose 1 Session" },
    ],
  },
  contour: {
    key: "contour",
    name: "Body Contouring Series",
    label: "Best targeted body-contouring path",
    mainPrice: "$3,197",
    duration: "55-minute cavitation sessions",
    shortFit: "Best when your answers point mostly to inches, stubborn areas, skin tightening, firmer-looking skin, or targeted contouring goals.",
    includes: ["55-minute cavitation sessions", "Ultrasound cavitation and RF skin-tightening support", "Targeted body-contouring focus", "Choose 1, 5, 10, or 20 sessions"],
    tiers: [
      { name: "20-Session Body Contouring Series", price: "$3,197", note: "Twenty 55-minute cavitation sessions and the strongest series value.", href: checkoutLinks.contour, button: "Reserve 20 Sessions", featured: true },
      { name: "10-Session Body Contouring Series", price: "$1,697", note: "Ten 55-minute cavitation sessions.", href: checkoutLinks.contour, button: "Choose 10 Sessions" },
      { name: "5-Session Body Contouring Series", price: "$897", note: "Five 55-minute cavitation sessions.", href: checkoutLinks.contour, button: "Choose 5 Sessions" },
      { name: "Single Body Contouring Session", price: "$197", note: "One 55-minute cavitation session.", href: checkoutLinks.contour, button: "Choose 1 Session" },
    ],
  },
  muscle: {
    key: "muscle",
    name: "Muscle and Strength and Tone Series",
    label: "Best muscle-building and toning path",
    mainPrice: "$5,997",
    duration: "50-minute EMShape sessions",
    shortFit: "Best when your answers point mostly to building muscle, strengthening, toning, core activation, or improving body confidence through EMShape.",
    includes: ["50-minute EMShape sessions", "Muscle activation, strengthening, and toning", "Body-sculpting and metabolic-activity support", "Choose 1, 5, 10, or 20 sessions"],
    tiers: [
      { name: "20-Session Muscle and Strength and Tone Series", price: "$5,997", note: "Twenty 50-minute EMShape sessions and the strongest series value.", href: checkoutLinks.muscle, button: "Reserve 20 Sessions", featured: true },
      { name: "10-Session Muscle and Strength and Tone Series", price: "$3,997", note: "Ten 50-minute EMShape sessions.", href: checkoutLinks.muscle, button: "Choose 10 Sessions" },
      { name: "5-Session Muscle and Strength and Tone Series", price: "$2,497", note: "Five 50-minute EMShape sessions.", href: checkoutLinks.muscle, button: "Choose 5 Sessions" },
      { name: "Single Muscle and Strength and Tone Session", price: "$597", note: "One 50-minute EMShape session.", href: checkoutLinks.muscle, button: "Choose 1 Session" },
    ],
  },
};

const resultOrder: RecommendationKey[] = ["ultimate", "pemf", "lymphatic", "fascia", "pelvic", "contour", "muscle"];

function buildRecommendation(fields: Fields) {
  const scores: Record<RecommendationKey, number> = { ultimate: 0, pemf: 0, lymphatic: 0, fascia: 0, pelvic: 0, contour: 0, muscle: 0 };
  const reasons: Record<RecommendationKey, string[]> = { ultimate: [], pemf: [], lymphatic: [], fascia: [], pelvic: [], contour: [], muscle: [] };

  const add = (key: RecommendationKey, points: number, reason: string) => {
    scores[key] += points;
    if (!reasons[key].includes(reason)) reasons[key].push(reason);
  };

  const hasSymptom = (value: string) => fields.symptoms.includes(value);
  const hasTried = (value: string) => fields.tried.includes(value);
  const hasGoal = (value: string) => fields.goals.includes(value);
  const hasPriority = (value: string) => fields.priority === value;

  if (hasSymptom("Puffy or bloated")) add("lymphatic", 6, "You selected puffiness or bloating, which points toward lymphatic wellness support.");
  if (hasSymptom("Heavy or sluggish")) { add("lymphatic", 5, "You selected feeling heavy or sluggish, which often fits a lymphatic wellness path."); add("fascia", 2, "Heaviness may also make circulation and fascia support worth discussing."); }
  if (hasSymptom("Inflamed or achy")) add("pemf", 6, "You selected achy or inflamed feelings, which points toward recovery and wellness support.");
  if (hasSymptom("Tired all the time")) add("pemf", 5, "You selected low energy, which points toward a recovery-focused wellness path.");
  if (hasSymptom("Foggy or unfocused")) add("pemf", 4, "You selected foggy or unfocused, which points toward whole-body recovery and wellness support.");
  if (hasSymptom("Uncomfortable in your body")) { add("contour", 3, "You selected feeling uncomfortable in your body, which may connect to body-contouring goals."); add("muscle", 3, "Body-confidence goals may also connect to strengthening and toning."); }
  if (hasSymptom("Stuck - nothing works")) add("ultimate", 6, "You selected that nothing seems to work, so trying one isolated treatment may be too narrow.");
  if (hasSymptom("Don't feel like yourself")) add("ultimate", 6, "You selected not feeling like yourself, which points toward a broader whole-body experience.");

  if (hasTried("Massage, lymphatic drainage, or bodywork")) { add("lymphatic", 4, "You have already been drawn to lymphatic work or bodywork."); add("fascia", 2, "Your bodywork interest may also fit fascia and circulation support."); }
  if (hasTried("PEMF, frequency work, red light, or recovery therapies")) add("pemf", 4, "You have already been drawn to recovery or frequency therapies.");
  if (hasTried("Med spa, body contouring, cavitation, RF, or sculpting")) { add("contour", 4, "You have already been drawn to cavitation, RF, or body-contouring services."); add("muscle", 3, "Your sculpting interest may also fit EMShape strengthening and toning."); }
  if (hasTried("Cellulite creams, massage tools, or skin-smoothing treatments")) add("fascia", 6, "You have already tried skin-smoothing or cellulite-focused approaches, which points toward Fascia and Skin Revival.");
  if (hasTried("Kegels, pelvic floor exercises, or core strengthening")) add("pelvic", 8, "You have already tried pelvic floor or core exercises, which makes the Pelvic Floor Strengthening Series relevant to discuss.");
  if (hasTried("Dieting, cutting calories, or eating better")) add("ultimate", 2, "You have already tried food changes, so a broader experience may be more useful than another simple diet attempt.");
  if (hasTried("Workouts, walking, or trying to move more")) add("muscle", 3, "You have already tried movement, so structured muscle activation and toning may fit your goals.");
  if (hasTried("Supplements, detoxes, or wellness trends")) add("ultimate", 2, "You have tried wellness trends, so a guided whole-body experience may be a better next step than more guessing.");
  if (hasTried("Nothing consistently yet - I just know something feels off")) add("ultimate", 4, "You have not tried anything consistently yet, so experiencing the full range may help Susie identify your best focused series.");

  if (hasGoal("Feel lighter, less puffy, and less bloated")) add("lymphatic", 7, "Your goal is to feel lighter, less puffy, and less bloated.");
  if (hasGoal("Calm the achy, inflamed, or irritated feeling")) add("pemf", 7, "Your goal includes recovery from achy, inflamed, or irritated feelings.");
  if (hasGoal("Have more energy, recover better, and feel clearer")) add("pemf", 7, "Your goal includes energy, recovery, and clarity.");
  if (hasGoal("Tone, strengthen, and sculpt muscle")) add("muscle", 8, "Your goal is specifically to tone, strengthen, and sculpt muscle.");
  if (hasGoal("Target inches, stubborn areas, or loose-feeling skin")) add("contour", 8, "Your goal includes targeting inches, stubborn areas, or loose-feeling skin.");
  if (hasGoal("Improve skin texture, smoothness, or cellulite appearance")) add("fascia", 8, "Your goal includes smoother-looking skin, fascia support, or less visible cellulite.");
  if (hasGoal("Strengthen my pelvic floor, core, or bladder confidence")) add("pelvic", 10, "Your goal specifically includes pelvic floor, core, or bladder-confidence support.");
  if (hasGoal("Stop guessing and let Susie build the plan")) add("ultimate", 9, "You want Susie to help build the plan instead of guessing treatment by treatment.");

  if (hasPriority("I mostly want to feel lighter and less puffy")) add("lymphatic", 10, "Your top priority is feeling lighter and less puffy.");
  if (hasPriority("I mostly want help with aches, fatigue, or recovery")) add("pemf", 10, "Your top priority is aches, fatigue, or recovery.");
  if (hasPriority("I mostly want smoother skin, fascia support, or less visible cellulite")) add("fascia", 11, "Your top priority is fascia support, smoother skin, or less visible cellulite.");
  if (hasPriority("I mostly want pelvic floor, core, or bladder-confidence support")) add("pelvic", 13, "Your top priority is pelvic floor, core, or bladder-confidence support.");
  if (hasPriority("I mostly want to reduce inches, tighten, or contour")) add("contour", 11, "Your top priority is reducing inches, tightening, or contouring.");
  if (hasPriority("I mostly want to build, strengthen, and tone muscle")) add("muscle", 11, "Your top priority is building, strengthening, and toning muscle.");
  if (hasPriority("I want the most complete whole-body experience")) add("ultimate", 14, "You said you want the most complete whole-body experience.");
  if (hasPriority("I want Susie to choose the safest first step")) add("ultimate", 7, "You asked Susie to choose the best first step rather than selecting one treatment yourself.");
  if (hasPriority("I want the lowest-commitment way to talk first")) add("ultimate", 1, "You prefer to talk first, so Susie can review the full picture before you choose a series.");

  if (fields.symptoms.length >= 4) add("ultimate", 6, "You selected several symptoms, so one narrow treatment may not tell the whole story.");
  if (fields.goals.length >= 3) add("ultimate", 5, "You selected several goals, which supports trying the complete experience before choosing a focused series.");
  if (fields.tried.length >= 3) add("ultimate", 4, "You have already tried several things, so the recommendation should not be another blind guess.");

  const ranked = resultOrder.map((key) => ({ key, score: scores[key] })).sort((a, b) => b.score - a.score);
  const top = ranked[0];
  const second = ranked[1];
  let winner: RecommendationKey = top?.score > 0 ? top.key : "ultimate";

  const specialistKeys = ranked.filter((item) => item.key !== "ultimate" && item.score > 0);
  const strongSpecialists = specialistKeys.filter((item) => item.score >= 8);
  if (winner !== "pelvic" && strongSpecialists.length >= 3) winner = "ultimate";
  if (winner !== "pelvic" && top && second && top.key !== "ultimate" && second.key !== "ultimate" && top.score - second.score <= 2) winner = "ultimate";

  const selectedReasons = reasons[winner].length ? reasons[winner].slice(0, 3) : [packages[winner].shortFit];
  const alternateKeys = ranked.filter((item) => item.key !== winner && item.score > 0).slice(0, 3).map((item) => item.key);
  const scoreSummary = ranked.map((item) => `${packages[item.key].name}: ${item.score}`).join(" | ");

  return { key: winner, package: packages[winner], reasons: selectedReasons, alternateKeys, scoreSummary };
}

function BodyResetHeader() {
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
        recommendedOffer: recommendationReady ? recommendation.package.name : "Pending Susie Evaluation",
        recommendedPackagePrice: recommendationReady ? recommendation.package.mainPrice : "Pending",
        recommendedTopPackage: recommendationReady ? topTier.name : "Pending",
        recommendationKey: recommendationReady ? recommendation.key : "pending",
        recommendationReasons: recommendationReady ? recommendation.reasons.join(" | ") : "Pending quiz answers",
        recommendationScoreSummary: recommendationReady ? recommendation.scoreSummary : "Pending quiz answers",
        quizPath: "Official Susie Sculpts Series Evaluation",
        source: "Susie Sculpts Quiz Funnel",
        page: "Ask Susie Evaluation",
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
      await postLead("Quiz Completed - Official Series Recommendation Requested");
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
      <BodyResetHeader />
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
                <p>Answer five quick questions. Based on what you share, I will recommend the most logical Susie Sculpts series to discuss with you.</p>
                <p className="font-medium text-[#2c1f14]">No pressure. Ever.</p>
                <p className="text-sm md:text-base text-muted/85">This online result is a starting-point recommendation, not a diagnosis. Susie will confirm the right plan with you in person.</p>
              </div>
            </div>

            <div className="bg-white/90 border border-purple/15 rounded-[22px] p-5 md:p-6 shadow-[0_12px_34px_rgba(60,40,80,0.10)]">
              {leadState === "captured" ? (
                <div className="rounded-sm bg-purple/5 border border-purple/15 p-5 text-center">
                  <p className="font-serif text-2xl font-light text-[#2c1f14] mb-2">Hi, {fields.firstName}. Tell me what has been going on.</p>
                  <p className="font-sans font-light text-muted text-sm mb-4">This is a five-question evaluation. Your answers change the recommended series.</p>
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
                  <h2 className="section-heading mb-4">Susie is matching your answers to the best series.</h2>
                  <p className="font-sans font-light text-muted max-w-xl mx-auto">The evaluation is weighing your symptoms, what you have already tried, your goals, and your top priority before making a recommendation.</p>
                </div>
              ) : quizState === "success" ? (
                <div id="results" className="scroll-mt-24 bg-white/85 border border-purple/15 rounded-[24px] p-4 md:p-6 shadow-[0_10px_30px_rgba(60,40,80,0.08)]">
                  <div className="mb-5 rounded-[20px] border border-purple/15 bg-white/80 p-4 md:p-5">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0 mx-auto md:mx-0">
                        <Image src="/images/susie.jpg" alt="Susie from Susie Sculpts" fill className="object-cover object-[center_8%]" sizes="80px" />
                      </div>
                      <div className="text-center md:text-left flex-1">
                        <p className="section-label mb-2">Susie&apos;s Recommendation</p>
                        <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#2c1f14] mb-3">&ldquo;Based on what you shared, I would start with the {recommendation.package.name}.&rdquo;</h2>
                        <p className="font-sans font-light text-sm md:text-base text-muted leading-relaxed">This is the series I would discuss with you first. Susie will confirm the right number of sessions after talking with you.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5 bg-purple/5 border-2 border-purple/25 rounded-[22px] p-5 md:p-6">
                    <p className="section-label mb-2">Recommended Series</p>
                    <div className="grid md:grid-cols-[1fr_auto] md:items-start gap-4 mb-4">
                      <div>
                        <h3 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#2c1f14] mb-2">{topTier.name}</h3>
                        <p className="font-sans font-medium text-xs tracking-[0.12em] uppercase text-purple/70 mb-2">{recommendation.package.duration}</p>
                        <p className="font-sans font-light text-sm md:text-base text-muted leading-relaxed">{recommendation.package.shortFit}</p>
                      </div>
                      <div className="md:text-right">
                        <p className="font-serif text-5xl font-light text-purple leading-none mb-2">{topTier.price}</p>
                        <p className="font-sans font-medium text-xs tracking-[0.12em] uppercase text-purple/70">Best series value</p>
                      </div>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-2 mb-5 font-sans font-light text-sm text-muted">
                      {recommendation.package.includes.map((item) => <li key={item} className="flex gap-2"><span className="text-purple">•</span><span>{item}</span></li>)}
                    </ul>
                    <p className="font-sans font-medium text-purple mb-5">{topTier.note}</p>
                    <a href={topTier.href} className="btn-primary w-full md:w-auto">{topTier.button}</a>
                  </div>

                  <div className="mb-6 rounded-[18px] bg-stone/45 border border-stone/80 p-4 md:p-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <p className="section-label mb-3">Why this recommendation came up</p>
                        <ul className="space-y-2 font-sans font-light text-sm text-muted leading-relaxed">
                          {recommendation.reasons.map((reason) => <li key={reason} className="flex gap-3"><span className="text-purple mt-[2px]">•</span><span>{reason}</span></li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="section-label mb-3">Important note</p>
                        <p className="font-sans font-light text-sm text-muted leading-relaxed mb-3">This is not a diagnosis. It is a starting-point recommendation designed to make the first conversation with Susie more useful.</p>
                        <p className="font-sans font-light text-sm text-muted leading-relaxed">Susie will confirm the right series and number of sessions after she understands your goals, comfort level, and budget.</p>
                      </div>
                    </div>
                  </div>

                  {recommendation.package.tiers.length > 1 && (
                    <div className="grid md:grid-cols-3 gap-5 mb-6">
                      {recommendation.package.tiers.slice(1).map((tier) => <PackageCard key={tier.name} tier={tier} />)}
                    </div>
                  )}

                  <div className="mb-6">
                    <p className="section-label mb-4 text-center">All Official Susie Sculpts Series</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {resultOrder.filter((key) => key !== recommendation.key).map((key) => (
                        <div key={key} className="card p-5">
                          <p className="font-serif text-xl text-[#2c1f14] mb-1">{packages[key].name}</p>
                          <p className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-purple/70 mb-2">{packages[key].duration}</p>
                          <p className="font-sans font-light text-sm text-muted mb-3">{packages[key].shortFit}</p>
                          <p className="font-sans font-medium text-sm text-purple">Series options from {packages[key].tiers[packages[key].tiers.length - 1].price} to {packages[key].tiers[0].price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <PackageCard tier={{ name: "Talk With Susie First", price: "Free", note: "Schedule a conversation before choosing a paid series.", href: checkoutLinks.consult, button: "Book Consult" }} />
                </div>
              ) : (
                <div id="quiz-card" className="scroll-mt-24 bg-white/80 border border-purple/15 rounded-[24px] p-5 md:p-8 shadow-[0_10px_30px_rgba(60,40,80,0.08)]">
                  <div className="mb-8">
                    <div className="flex items-center justify-between gap-4 mb-3"><p className="section-label">Ask Susie Evaluation</p><p className="section-label whitespace-nowrap">{questionStep} of 5</p></div>
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
