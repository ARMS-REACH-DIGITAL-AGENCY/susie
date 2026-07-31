"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const FULL_RESET_CHECKOUT_URL = "#stripe-checkout-link-needed";
const SYNERGIE_SERIES_CHECKOUT_URL = "#stripe-checkout-link-needed";
const PEMF_CHECKOUT_URL = "#stripe-checkout-link-needed";
const CONTOUR_BUNDLE_CHECKOUT_URL = "#stripe-checkout-link-needed";
const CAVITATION_CHECKOUT_URL = "#stripe-checkout-link-needed";
const ROLLER_CHECKOUT_URL = "#stripe-checkout-link-needed";
const INITIAL_CONSULT_BOOKING_URL = "#calendar-booking-link-needed";

type ServiceKey =
  | "fullReset"
  | "synergieSeries"
  | "pemfReset"
  | "contourBundle"
  | "cavitationRf"
  | "rollerContour"
  | "consult";

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  symptoms: string[];
  tried: string[];
  goals: string[];
  priority: string;
  urgency: string;
  consent: boolean;
};

type Offer = {
  name: string;
  price: string;
  label: string;
  credit: string;
  terms: string;
  clinicalFit: string;
  procedures: string[];
  href: string;
  button: string;
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

const offerCatalog: Record<ServiceKey, Offer> = {
  fullReset: {
    name: "Full Body Reset Discovery Package",
    price: "$997",
    label: "Best Full Reset Path",
    credit: "$100 future service credit after completion",
    terms: "Credit is issued after completion. No cash value, not transferable, cannot be applied to today's purchase, and cannot be combined with other offers.",
    clinicalFit:
      "Best when your answers point to several needs at once - puffiness, fatigue, inflammation, contouring, and uncertainty about where to begin.",
    procedures: [
      "Private Body Reset consultation",
      "Synergie Vacuum Massage / lymphatic support",
      "PEMF frequency wellness",
      "EMShape Neo body sculpting",
      "Ultrasonic Cavitation & RF",
      "Roller body contouring support",
      "Personalized next-service recommendation",
    ],
    href: FULL_RESET_CHECKOUT_URL,
    button: "Reserve Full Reset",
  },
  synergieSeries: {
    name: "Synergie Lymphatic Reset Series",
    price: "$1,000",
    label: "Best Lymphatic Path",
    credit: "12 Synergie sessions for the price of 10",
    terms: "Designed for clients who are most focused on lymphatic support, puffiness, heaviness, or feeling sluggish.",
    clinicalFit:
      "Best when your answers point mostly to puffiness, bloating, heaviness, fluid-feeling discomfort, or wanting to feel lighter.",
    procedures: [
      "12 Synergie Vacuum Massage sessions",
      "Two sessions included compared with $100/session pricing",
      "Lymphatic flow and circulation support",
      "Progress check-ins with Susie",
    ],
    href: SYNERGIE_SERIES_CHECKOUT_URL,
    button: "Reserve Synergie Series",
  },
  pemfReset: {
    name: "PEMF Frequency Wellness Session",
    price: "$50",
    label: "Best Recovery Path",
    credit: "Single-session starting point",
    terms: "A low-friction first step when recovery, energy, inflammation response, or whole-body wellness is the main concern.",
    clinicalFit:
      "Best when your answers point mostly to achy, inflamed, tired, foggy, stressed, or recovery-focused needs.",
    procedures: [
      "PEMF / frequency wellness session",
      "Recovery-focused wellness support",
      "Private check-in with Susie",
      "Recommendation for whether to continue or combine services",
    ],
    href: PEMF_CHECKOUT_URL,
    button: "Choose PEMF Session",
  },
  contourBundle: {
    name: "Body Contour + Skin Tightening Bundle",
    price: "$797",
    label: "Best Contouring Path",
    credit: "Bundled contouring path",
    terms: "Built for clients whose answers are more about shape, tone, stubborn areas, or skin texture than full-body reset symptoms.",
    clinicalFit:
      "Best when your answers point mostly to toning, sculpting, stubborn areas, loose-feeling skin, or wanting visible contouring support.",
    procedures: [
      "EMShape Neo body sculpting",
      "Ultrasonic Cavitation & RF",
      "Roller body contouring support",
      "Contouring-focused next-step plan",
    ],
    href: CONTOUR_BUNDLE_CHECKOUT_URL,
    button: "Choose Contour Bundle",
  },
  cavitationRf: {
    name: "Ultrasonic Cavitation & RF Session",
    price: "$200",
    label: "Targeted Contouring",
    credit: "Single-session option",
    terms: "A targeted session for stubborn areas and skin-tightening support.",
    clinicalFit:
      "Best when your answers point to stubborn areas, inches, loose-feeling skin, or firmer-looking skin as the main goal.",
    procedures: [
      "Ultrasonic Cavitation",
      "RF skin-tightening support",
      "Target-area focus",
      "Recommendation for whether to bundle with sculpting or roller work",
    ],
    href: CAVITATION_CHECKOUT_URL,
    button: "Choose Cavitation & RF",
  },
  rollerContour: {
    name: "Roller Body Contouring Session",
    price: "$200",
    label: "Texture & Circulation Support",
    credit: "Single-session option",
    terms: "A targeted option for clients focused on skin texture, smoothness, circulation support, or body contouring support.",
    clinicalFit:
      "Best when your answers point to skin texture, smoothness, cellulite appearance, or needing supportive bodywork as the first step.",
    procedures: [
      "Roller body contouring support",
      "Skin texture and smoothness focus",
      "Circulation-supportive session",
      "Recommendation for whether to combine with Synergie or RF",
    ],
    href: ROLLER_CHECKOUT_URL,
    button: "Choose Roller Session",
  },
  consult: {
    name: "Initial Face-to-Face Consult With Susie",
    price: "Free",
    label: "Best Conversation First",
    credit: "No purchase required",
    terms: "Use this when the answers are mixed, budget is uncertain, or you want Susie to look at the whole situation before choosing a service.",
    clinicalFit:
      "Best when the form does not give enough clarity, or when you would rather talk with Susie before choosing a paid path.",
    procedures: [
      "Zoom or in-person evaluation",
      "Review of symptoms, goals, and questions",
      "Guidance before choosing a Body Reset path",
    ],
    href: INITIAL_CONSULT_BOOKING_URL,
    button: "Book Initial Consult",
  },
};

const displayOrder: ServiceKey[] = [
  "fullReset",
  "synergieSeries",
  "pemfReset",
  "contourBundle",
  "cavitationRf",
  "rollerContour",
  "consult",
];

function emptyScores(): Record<ServiceKey, number> {
  return {
    fullReset: 0,
    synergieSeries: 0,
    pemfReset: 0,
    contourBundle: 0,
    cavitationRf: 0,
    rollerContour: 0,
    consult: 0,
  };
}

function emptyReasons(): Record<ServiceKey, string[]> {
  return {
    fullReset: [],
    synergieSeries: [],
    pemfReset: [],
    contourBundle: [],
    cavitationRf: [],
    rollerContour: [],
    consult: [],
  };
}

function buildRecommendation(fields: FormFields) {
  const scores = emptyScores();
  const reasons = emptyReasons();

  const add = (key: ServiceKey, points: number, reason: string) => {
    scores[key] += points;
    if (reason && !reasons[key].includes(reason)) reasons[key].push(reason);
  };

  const hasSymptom = (value: string) => fields.symptoms.includes(value);
  const hasTried = (value: string) => fields.tried.includes(value);
  const hasGoal = (value: string) => fields.goals.includes(value);
  const hasPriority = (value: string) => fields.priority === value;

  if (hasSymptom("Puffy or bloated")) {
    add("synergieSeries", 4, "You selected puffiness or bloating, which points first toward lymphatic support.");
    add("fullReset", 1, "Puffiness can also be part of a broader reset picture.");
  }
  if (hasSymptom("Heavy or sluggish")) {
    add("synergieSeries", 3, "You selected feeling heavy or sluggish, which often fits a lymphatic reset conversation.");
    add("pemfReset", 1, "Feeling sluggish can also point toward recovery and energy support.");
    add("fullReset", 1, "Heaviness can be part of a broader reset pattern.");
  }
  if (hasSymptom("Inflamed or achy")) {
    add("pemfReset", 4, "You selected achy or inflamed feelings, which points toward recovery and frequency wellness support.");
    add("fullReset", 1, "Inflammation-type symptoms may also need a more complete reset approach.");
  }
  if (hasSymptom("Tired all the time")) {
    add("pemfReset", 3, "You selected low energy, which points toward a recovery-focused starting point.");
    add("fullReset", 1, "Low energy can be part of a broader body reset picture.");
  }
  if (hasSymptom("Foggy or unfocused")) {
    add("pemfReset", 3, "You selected foggy or unfocused, which points toward recovery, frequency wellness, and whole-body reset support.");
    add("synergieSeries", 1, "Foggy or heavy feelings can sometimes pair with lymphatic support.");
  }
  if (hasSymptom("Stuck - nothing works")) {
    add("fullReset", 3, "You selected that nothing seems to work, so a one-service guess may not be the best first move.");
    add("consult", 2, "When you feel stuck, Susie may need a conversation before choosing a service.");
  }
  if (hasSymptom("Uncomfortable in your body")) {
    add("contourBundle", 3, "You selected feeling uncomfortable in your body, which may point toward sculpting, contouring, or visible body-confidence goals.");
    add("fullReset", 2, "Body discomfort can also be part of a broader reset path.");
  }
  if (hasSymptom("Don't feel like yourself")) {
    add("fullReset", 3, "You selected not feeling like yourself, which points toward a broader reset conversation.");
    add("consult", 2, "Not feeling like yourself may deserve a conversation before choosing one isolated service.");
  }

  if (hasTried("Dieting, cutting calories, or eating better")) {
    add("contourBundle", 1, "You have already tried food changes, so contouring or sculpting may be part of the next conversation.");
    add("fullReset", 1, "Trying diet changes without feeling better can point toward a broader reset plan.");
  }
  if (hasTried("Workouts, walking, or trying to move more")) {
    add("contourBundle", 2, "You have already tried movement, so sculpting or contouring support may fit your goals.");
    add("pemfReset", 1, "Movement plus lingering fatigue or soreness can point toward recovery support.");
  }
  if (hasTried("Supplements, detoxes, or wellness trends")) {
    add("synergieSeries", 2, "You have tried wellness trends, so a structured lymphatic reset may be a better next step than more guessing.");
    add("pemfReset", 1, "Wellness fatigue can also point toward frequency support as a simple first step.");
  }
  if (hasTried("Massage, lymphatic drainage, or bodywork")) {
    add("synergieSeries", 3, "You have already been drawn to bodywork or lymphatic support, so a Synergie series may be a natural fit.");
  }
  if (hasTried("PEMF, frequency work, red light, or recovery therapies")) {
    add("pemfReset", 3, "You have already been drawn to frequency or recovery therapies, so PEMF may be a clear starting point.");
  }
  if (hasTried("Med spa, body contouring, cavitation, RF, or sculpting")) {
    add("contourBundle", 3, "You have already been drawn to contouring or sculpting services, so a contouring path may fit best.");
    add("cavitationRf", 2, "Cavitation or RF interest points toward a targeted contouring session.");
  }
  if (hasTried("Nothing consistently yet - I just know something feels off")) {
    add("consult", 4, "You have not tried anything consistently yet, so a conversation may be the safest first step.");
    add("fullReset", 1, "A guided reset can help when you are not sure where to begin.");
  }

  if (hasGoal("Feel lighter, less puffy, and less bloated")) {
    add("synergieSeries", 4, "Your main goal includes feeling lighter and less puffy.");
  }
  if (hasGoal("Calm the achy, inflamed, or irritated feeling")) {
    add("pemfReset", 4, "Your main goal includes calming achy, inflamed, or irritated feelings.");
  }
  if (hasGoal("Have more energy, recover better, and feel clearer")) {
    add("pemfReset", 4, "Your main goal includes energy, recovery, and clarity.");
    add("fullReset", 1, "Energy and clarity can also fit a complete reset path.");
  }
  if (hasGoal("Tone, strengthen, and sculpt")) {
    add("contourBundle", 4, "Your main goal includes toning, strengthening, and sculpting.");
  }
  if (hasGoal("Target inches, stubborn areas, or loose-feeling skin")) {
    add("cavitationRf", 4, "Your main goal includes stubborn areas, inches, or loose-feeling skin.");
    add("contourBundle", 3, "Targeted contouring goals can also fit a bundled contouring path.");
  }
  if (hasGoal("Improve skin texture, smoothness, or cellulite appearance")) {
    add("rollerContour", 4, "Your main goal includes skin texture, smoothness, or cellulite appearance.");
    add("contourBundle", 2, "Texture goals can also pair with RF, roller, and contouring support.");
  }
  if (hasGoal("Stop guessing and let Susie build the plan")) {
    add("fullReset", 4, "You want Susie to build the plan instead of guessing service by service.");
    add("consult", 2, "A consult is also a safe first step when you want guidance.");
  }

  if (hasPriority("I want Susie to choose the safest first step")) {
    add("consult", 3, "You asked Susie to choose the safest first step.");
    add("fullReset", 2, "A broader reset path may make sense if several answers overlap.");
  }
  if (hasPriority("I mostly want to feel lighter and less puffy")) {
    add("synergieSeries", 4, "Your priority is feeling lighter and less puffy.");
  }
  if (hasPriority("I mostly want help with aches, fatigue, or recovery")) {
    add("pemfReset", 4, "Your priority is aches, fatigue, or recovery.");
  }
  if (hasPriority("I mostly want to sculpt, tighten, or contour")) {
    add("contourBundle", 4, "Your priority is sculpting, tightening, or contouring.");
    add("cavitationRf", 2, "Tightening and contouring may also point toward Cavitation & RF.");
    add("rollerContour", 1, "Texture and contouring may also point toward roller support.");
  }
  if (hasPriority("I want the most complete reset plan")) {
    add("fullReset", 6, "You said you want the most complete reset plan.");
  }
  if (hasPriority("I want the lowest-commitment way to talk first")) {
    add("consult", 7, "You asked for the lowest-commitment way to talk first.");
  }

  if (fields.symptoms.length >= 4) {
    add("fullReset", 4, "You selected several symptoms, so a one-service answer may be too narrow.");
  }
  if (fields.goals.length >= 3) {
    add("fullReset", 3, "You selected several goals, so the broader reset path may be a better fit.");
  }
  if (fields.tried.length >= 3) {
    add("fullReset", 2, "You have already tried several things, so the recommendation should not be another blind guess.");
  }
  if (fields.urgency === "I am curious, but not urgent yet") {
    add("consult", 2, "You are curious but not urgent, so a conversation may be better than jumping into a package.");
  }

  const answeredEnough = fields.symptoms.length > 0 || fields.goals.length > 0 || fields.priority.length > 0;
  if (!answeredEnough) {
    return {
      key: "consult" as ServiceKey,
      offer: offerCatalog.consult,
      reasons: ["I need your quiz answers before recommending a paid treatment path."],
      scoreSummary: "No quiz answers yet.",
      rankedKeys: ["consult" as ServiceKey],
    };
  }

  const sorted = displayOrder
    .map((key) => ({ key, score: scores[key] }))
    .sort((a, b) => b.score - a.score);

  const topScore = sorted[0]?.score || 0;
  let topKey = sorted[0]?.key || "consult";

  const clearSingleService = sorted.find(
    (item) => item.key !== "fullReset" && item.key !== "consult" && item.score >= Math.max(5, topScore - 1)
  );

  const broadResetSignals =
    fields.symptoms.length >= 4 ||
    fields.goals.length >= 3 ||
    hasSymptom("Stuck - nothing works") ||
    hasSymptom("Don't feel like yourself") ||
    hasPriority("I want the most complete reset plan") ||
    hasGoal("Stop guessing and let Susie build the plan");

  if (hasPriority("I want the lowest-commitment way to talk first")) {
    topKey = "consult";
  } else if (hasPriority("I want the most complete reset plan")) {
    topKey = "fullReset";
  } else if (topKey === "fullReset" && clearSingleService && !broadResetSignals) {
    topKey = clearSingleService.key;
  } else if (topScore < 4) {
    topKey = "consult";
  }

  const rankedKeys = [
    topKey,
    ...sorted
      .filter((item) => item.key !== topKey && item.score > 0)
      .map((item) => item.key),
    "consult" as ServiceKey,
  ].filter((key, index, arr) => arr.indexOf(key) === index).slice(0, 6);

  const selectedReasons = reasons[topKey].length
    ? reasons[topKey].slice(0, 3)
    : [offerCatalog[topKey].clinicalFit];

  const scoreSummary = displayOrder
    .map((key) => `${offerCatalog[key].name}: ${scores[key]}`)
    .join(" | ");

  return {
    key: topKey,
    offer: offerCatalog[topKey],
    reasons: selectedReasons,
    scoreSummary,
    rankedKeys,
  };
}

function selectedClass(selected: boolean) {
  return selected
    ? "border-2 border-purple bg-purple/5 shadow-[0_0_0_3px_rgba(140,110,180,0.15),0_8px_24px_rgba(60,40,80,0.10)]"
    : "border border-[rgba(120,90,150,0.12)] bg-[#faf8f5] shadow-[0_6px_20px_rgba(60,40,80,0.06)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(60,40,80,0.10)] hover:border-purple/25";
}

function BodyResetHeader({ showHomeCta }: { showHomeCta: boolean }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-stone/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Susie Sculpts - Empowered Transformations"
            width={180}
            height={44}
            priority
            className="h-9 md:h-11 w-auto"
          />
        </Link>

        {showHomeCta ? (
          <Link href="/#testimonials" className="btn-primary text-[9px] sm:text-[10px] px-3 sm:px-5 py-3 leading-tight">
            Read Testimonials
          </Link>
        ) : (
          <button
            type="submit"
            form="body-reset-lead-form"
            className="btn-primary text-[9px] sm:text-[10px] px-3 sm:px-5 py-3 leading-tight"
          >
            Find My Best First Step
          </button>
        )}
      </div>
    </header>
  );
}

export default function BodyResetPage() {
  const [questionStep, setQuestionStep] = useState(1);
  const [leadState, setLeadState] = useState<"idle" | "submitting" | "captured" | "error">("idle");
  const [quizState, setQuizState] = useState<"idle" | "submitting" | "analyzing" | "success" | "error">("idle");
  const [arrivedFromSymptom, setArrivedFromSymptom] = useState(false);
  const [fields, setFields] = useState<FormFields>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    symptoms: [],
    tried: [],
    goals: [],
    priority: "",
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

  const recommendation = useMemo(() => buildRecommendation(fields), [fields]);
  const symptomsText = fields.symptoms.join(", ");
  const triedText = fields.tried.join(", ");
  const goalsText = fields.goals.join(", ");

  const set = (key: keyof FormFields, value: string | boolean | string[]) => setFields((prev) => ({ ...prev, [key]: value }));

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
    questionStep === 4 ? !!fields.priority :
    questionStep === 5 ? !!fields.urgency : true;

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
        recommendedOffer: recommendationReady ? recommendation.offer.name : "Pending Body Reset Evaluation",
        recommendationKey: recommendationReady ? recommendation.key : "pending",
        recommendationReasons: recommendationReady ? recommendation.reasons.join(" | ") : "Pending quiz answers",
        recommendationScoreSummary: recommendationReady ? recommendation.scoreSummary : "Pending quiz answers",
        quizPath: "Smart Body Reset Evaluation Lead-First Funnel",
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
      await postLead("Quiz Completed - Smart Recommendation Requested");
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
                <div>
                  <p className="section-label mb-1">A Message from Susie</p>
                  <p className="font-sans font-medium text-[12px] tracking-[0.18em] uppercase text-purple/70">Since 1995</p>
                </div>
              </div>

              <p className="font-sans font-medium text-purple/80 text-sm md:text-base mb-3">
                A smarter first-step evaluation - not the same answer for every woman.
              </p>

              <h1 className="font-serif text-[30px] sm:text-4xl lg:text-5xl font-light leading-[1.05] text-[#2c1f14] mb-5">
                Feel puffy, tired, foggy, inflamed, heavy, stuck, or just not like yourself?
              </h1>

              <div className="space-y-4 font-sans font-light text-muted text-base md:text-lg leading-relaxed">
                <p>
                  Let&apos;s figure out where you should start and get to feeling better. I don&apos;t believe every woman needs the same treatment, and I don&apos;t want you guessing from one service to the next.
                </p>
                <p>
                  I&apos;ll look at what you&apos;re feeling, what you&apos;ve already tried, and what you want most. If the best first step is Synergie, PEMF, sculpting, cavitation, roller work, a full reset, or a conversation first, I want the recommendation to reflect that.
                </p>
                <p className="font-medium text-[#2c1f14]">
                  No pressure. Ever.
                </p>
                <p className="text-sm md:text-base text-muted/85">
                  This online result is a starting-point recommendation, not a diagnosis. Susie will confirm the right plan with you in person.
                </p>
              </div>
            </div>

            <div className="bg-white/90 border border-purple/15 rounded-[22px] p-5 md:p-6 shadow-[0_12px_34px_rgba(60,40,80,0.10)]">
              {leadState === "captured" ? (
                <div className="rounded-sm bg-purple/5 border border-purple/15 p-5 text-center">
                  <p className="font-serif text-2xl font-light text-[#2c1f14] mb-2">Hi, {fields.firstName}. Tell me what&apos;s been going on.</p>
                  <p className="font-sans font-light text-muted text-sm mb-4">This is a five-step evaluation. Your answers will change the recommendation.</p>
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
                  <button type="submit" disabled={leadState === "submitting"} className="btn-primary w-full disabled:opacity-60">
                    {leadState === "submitting" ? "Saving..." : "Find My Best First Step"}
                  </button>
                  <p className="text-center text-xs font-sans font-light text-muted/80 leading-relaxed">
                    Email is required so Susie can send your recommendation and follow up if you do not book today.
                  </p>
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
                  <h2 className="section-heading mb-4">Susie is matching your answers to the best first step.</h2>
                  <p className="font-sans font-light text-muted max-w-xl mx-auto mb-5">
                    The evaluation is weighing your symptoms, what you have already tried, your goals, and how much guidance you want before making a recommendation.
                  </p>
                  <div className="max-w-xl mx-auto rounded-[18px] bg-purple/5 border border-purple/15 p-4 text-left">
                    <p className="section-label mb-2">A quick note from Susie</p>
                    <p className="font-sans font-light text-sm md:text-base text-muted leading-relaxed">
                      This is not a diagnosis. It is a smarter starting point so we can have a better conversation about what your body may need next.
                    </p>
                  </div>
                </div>
              ) : quizState === "success" ? (
                <div id="results" className="scroll-mt-24 bg-white/80 border border-purple/15 rounded-[24px] p-5 md:p-8 shadow-[0_10px_30px_rgba(60,40,80,0.08)]">
                  <div className="text-center mb-10">
                    <p className="section-label mb-4">Susie&apos;s Smart Recommendation</p>
                    <h2 className="section-heading mb-4">Based on what you shared, I would start with {recommendation.offer.name}.</h2>
                    <p className="font-sans font-light text-muted max-w-2xl mx-auto mb-4">
                      I am not diagnosing you from a website form. I am using your answers to choose the most logical first conversation and treatment path.
                    </p>
                    <div className="max-w-2xl mx-auto rounded-[18px] bg-purple/5 border border-purple/15 p-5 text-left mb-5">
                      <p className="section-label mb-3">Why this recommendation came up</p>
                      <ul className="space-y-3 font-sans font-light text-sm md:text-base text-muted leading-relaxed">
                        {recommendation.reasons.map((reason) => (
                          <li key={reason} className="flex gap-3">
                            <span className="text-purple mt-[2px]">•</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="font-serif text-2xl font-light text-[#2c1f14] max-w-2xl mx-auto">
                      No pressure. Ever.<br />Susie will make the final recommendation after she talks with you.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5 items-start">
                    {recommendation.rankedKeys.map((key) => {
                      const offer = offerCatalog[key];
                      const featured = key === recommendation.key;
                      return (
                        <div key={offer.name} className={`card flex flex-col ${featured ? "border-2 border-purple shadow-[0_14px_34px_rgba(60,40,80,0.14)]" : ""}`}>
                          <p className="section-label mb-3">{featured ? "Recommended First" : offer.label}</p>
                          <h3 className="font-serif text-2xl font-light text-[#2c1f14] mb-2">{offer.name}</h3>
                          <p className="font-serif text-4xl font-light text-purple mb-2">{offer.price}</p>
                          {offer.credit && <p className="font-sans font-medium text-[12px] text-purple/80 leading-snug mb-3">{offer.credit}</p>}
                          <p className="font-sans font-light text-sm text-muted leading-relaxed mb-5">{offer.clinicalFit}</p>
                          <ul className="font-sans font-light text-sm text-muted leading-relaxed mb-5 space-y-2">
                            {offer.procedures.map((procedure) => (
                              <li key={procedure} className="flex gap-2">
                                <span className="text-purple mt-[1px]">•</span>
                                <span>{procedure}</span>
                              </li>
                            ))}
                          </ul>
                          <a href={offer.href} className="btn-primary text-[10px] px-4">{offer.button}</a>
                          {offer.terms && <p className="font-sans font-light text-[10px] text-muted/65 leading-relaxed mt-3">{offer.terms}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div id="quiz-card" className="scroll-mt-24 bg-white/80 border border-purple/15 rounded-[24px] p-5 md:p-8 shadow-[0_10px_30px_rgba(60,40,80,0.08)]">
                  <div className="mb-8">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <p className="section-label">Smart Evaluation</p>
                      <p className="section-label whitespace-nowrap">{questionStep} of 5</p>
                    </div>
                    <div className="w-full h-2 bg-stone/70 rounded-full overflow-hidden">
                      <div className="h-full bg-purple rounded-full transition-all duration-300" style={{ width: `${questionStep * 20}%` }} />
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
                    <MultiOptionStep title="What have you already tried?" helper="Select all that apply. This helps Susie avoid recommending another blind guess." options={triedOptions} values={fields.tried} onToggle={(v) => toggleArrayValue("tried", v)} />
                  )}
                  {questionStep === 3 && (
                    <MultiOptionStep title="What would feel like a real win?" helper="Select everything that would matter to you." options={goalOptions} values={fields.goals} onToggle={(v) => toggleArrayValue("goals", v)} />
                  )}
                  {questionStep === 4 && <OptionStep title="What feels most important right now?" options={priorityOptions} value={fields.priority} onSelect={(v) => set("priority", v)} />}
                  {questionStep === 5 && <OptionStep title="How soon do you want help figuring this out?" options={urgencyOptions} value={fields.urgency} onSelect={(v) => set("urgency", v)} />}

                  <div className="flex justify-between gap-4 mt-8">
                    <button type="button" onClick={() => goToQuestionStep(Math.max(1, questionStep - 1))} className="btn-secondary opacity-80" disabled={questionStep === 1}>Back</button>
                    {questionStep < 5 ? (
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
