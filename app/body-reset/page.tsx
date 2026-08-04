"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

type Key = "ultimate" | "pemf" | "lymphatic" | "fascia" | "pelvic" | "contour" | "muscle";
type Fields = {
  firstName: string;
  email: string;
  phone: string;
  consent: boolean;
  symptoms: string[];
  tried: string[];
  goals: string[];
  priority: string;
  urgency: string;
};

type Offer = {
  key: Key;
  name: string;
  description: string;
  included: string[];
  price: string;
  checkout: string;
};

const consultationUrl = "https://api.armsreachdigital.com/widget/booking/3yvXSJo59kMORz5W3H4e";

const offers: Record<Key, Offer> = {
  ultimate: { key: "ultimate", name: 'The Ultimate "YOU" Experience', description: "A complete six-treatment experience when several goals matter or you want Susie to help identify the best focused path.", included: ["One treatment from each of Susie’s six signature series", "A complete whole-body starting experience", "Designed to help narrow the best ongoing plan"], price: "$1,297", checkout: "https://api.armsreachdigital.com/payment-link/6a6da6b87b99151a54041af5" },
  pemf: { key: "pemf", name: "PEMF Recovery and Wellness Series", description: "Recovery and wellness support for aches, fatigue, stress, fogginess, and low energy.", included: ["30-minute PEMF sessions", "Recovery, relaxation, circulation, and energy support", "Series options available"], price: "$797", checkout: "https://api.armsreachdigital.com/payment-link/6a6e20ba7b99151a54041b89" },
  lymphatic: { key: "lymphatic", name: "Lymphatic Wellness Series", description: "Lymphatic and circulation support for puffiness, bloating, heaviness, and sluggishness.", included: ["45-minute Synergie sessions", "Lymphatic-flow and circulation support", "Required spandex bodysuit included"], price: "$1,597", checkout: "https://api.armsreachdigital.com/payment-link/6a6e1fc77b99151a54041b85" },
  fascia: { key: "fascia", name: "Fascia and Skin Revival Series", description: "Fascia, circulation, skin-texture, and smoothing support.", included: ["55-minute Rollerwave sessions", "Fascia and circulation support", "Skin texture and smoothing focus"], price: "$3,197", checkout: "https://api.armsreachdigital.com/payment-link/6a6da7f07b99151a54041af8" },
  pelvic: { key: "pelvic", name: "Pelvic Floor Strengthening Series", description: "Pelvic-floor and deep-core strengthening support in a private, fully clothed session.", included: ["45-minute strengthening sessions", "Pelvic-floor and deep-core activation", "Private and fully clothed"], price: "$3,197", checkout: "https://api.armsreachdigital.com/payment-link/6a6e2f6da655fa0b802a76b8" },
  contour: { key: "contour", name: "Body Contouring Series", description: "Targeted support for inches, stubborn areas, skin tightening, and contouring goals.", included: ["55-minute cavitation sessions", "Ultrasound cavitation and RF support", "Targeted body-contouring focus"], price: "$3,197", checkout: "https://api.armsreachdigital.com/payment-link/6a6da44fa655fa0b802a7625" },
  muscle: { key: "muscle", name: "Muscle + Strength + Tone Series", description: "Muscle activation, strengthening, toning, and body-sculpting support.", included: ["50-minute EMShape sessions", "Muscle activation and strengthening", "Toning and body-sculpting support"], price: "$5,997", checkout: "https://api.armsreachdigital.com/payment-link/6a6da301a655fa0b802a7622" },
};

const symptoms = [
  ["Puffy or bloated", "/images/symptom-puffy.png"],
  ["Inflamed or achy", "/images/symptom-achy.png"],
  ["Heavy or sluggish", "/images/symptom-heavy.png"],
  ["Tired all the time", "/images/symptom-tired.png"],
  ["Foggy or unfocused", "/images/symptom-foggy.png"],
  ["Stuck - nothing works", "/images/symptom-stuck.png"],
  ["Uncomfortable in your body", "/images/symptom-uncomfortable.png"],
  ["Don't feel like yourself", "/images/symptom-yourself.png"],
] as const;

const tried = [
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

const goals = [
  "Feel lighter, less puffy, and less bloated",
  "Calm the achy, inflamed, or irritated feeling",
  "Have more energy, recover better, and feel clearer",
  "Tone, strengthen, and sculpt muscle",
  "Target inches, stubborn areas, or loose-feeling skin",
  "Improve skin texture, smoothness, or cellulite appearance",
  "Strengthen my pelvic floor, core, or bladder confidence",
  "Stop guessing and let Susie build the plan",
];

const priorities = [
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

const urgency = ["I want help this week", "Within the next 2 weeks", "Sometime this month", "I am curious, but not urgent yet", "When I can afford to invest in my health journey"];

function calculate(fields: Fields) {
  const scores: Record<Key, number> = { ultimate: 0, pemf: 0, lymphatic: 0, fascia: 0, pelvic: 0, contour: 0, muscle: 0 };
  const reasons: Record<Key, string[]> = { ultimate: [], pemf: [], lymphatic: [], fascia: [], pelvic: [], contour: [], muscle: [] };
  const add = (key: Key, value: number, reason: string) => { scores[key] += value; if (!reasons[key].includes(reason)) reasons[key].push(reason); };
  const has = (list: string[], value: string) => list.includes(value);

  if (has(fields.symptoms, "Puffy or bloated")) add("lymphatic", 6, "You selected puffiness or bloating, which points toward lymphatic wellness support.");
  if (has(fields.symptoms, "Heavy or sluggish")) add("lymphatic", 5, "You selected feeling heavy or sluggish, which often fits a lymphatic wellness path.");
  if (has(fields.symptoms, "Inflamed or achy")) add("pemf", 6, "You selected achy or inflamed feelings, which points toward recovery and wellness support.");
  if (has(fields.symptoms, "Tired all the time")) add("pemf", 5, "You selected low energy, which points toward a recovery-focused wellness path.");
  if (has(fields.symptoms, "Foggy or unfocused")) add("pemf", 4, "You selected fogginess or difficulty focusing, which supports a recovery and wellness discussion.");
  if (has(fields.symptoms, "Uncomfortable in your body")) { add("contour", 3, "You selected feeling uncomfortable in your body, which may connect to contouring goals."); add("muscle", 3, "Body-confidence goals may also connect to strengthening and toning."); }
  if (has(fields.symptoms, "Stuck - nothing works")) add("ultimate", 6, "You selected that nothing seems to work, so one narrow treatment may not tell the whole story.");
  if (has(fields.symptoms, "Don't feel like yourself")) add("ultimate", 6, "You selected not feeling like yourself, which points toward a broader whole-body starting experience.");

  if (has(fields.tried, "Massage, lymphatic drainage, or bodywork")) add("lymphatic", 4, "You have already been drawn to lymphatic work or bodywork.");
  if (has(fields.tried, "PEMF, frequency work, red light, or recovery therapies")) add("pemf", 4, "You have already been drawn to recovery or frequency therapies.");
  if (has(fields.tried, "Med spa, body contouring, cavitation, RF, or sculpting")) add("contour", 4, "You have already been drawn to body-contouring services.");
  if (has(fields.tried, "Cellulite creams, massage tools, or skin-smoothing treatments")) add("fascia", 6, "You have already tried skin-smoothing or cellulite-focused approaches.");
  if (has(fields.tried, "Kegels, pelvic floor exercises, or core strengthening")) add("pelvic", 8, "You have already tried pelvic-floor or core exercises.");
  if (has(fields.tried, "Workouts, walking, or trying to move more")) add("muscle", 3, "You have already tried movement, so structured muscle activation may fit your goals.");
  if (has(fields.tried, "Dieting, cutting calories, or eating better")) add("ultimate", 2, "You have already tried food changes, so a broader experience may be useful.");
  if (has(fields.tried, "Supplements, detoxes, or wellness trends")) add("ultimate", 2, "You have tried wellness trends, so a guided whole-body approach may be more useful than more guessing.");
  if (has(fields.tried, "Nothing consistently yet - I just know something feels off")) add("ultimate", 4, "You have not tried anything consistently yet, so a complete starting experience may help Susie identify the best focus.");

  if (has(fields.goals, "Feel lighter, less puffy, and less bloated")) add("lymphatic", 7, "Your goal is to feel lighter, less puffy, and less bloated.");
  if (has(fields.goals, "Calm the achy, inflamed, or irritated feeling")) add("pemf", 7, "Your goal includes relief from achy, inflamed, or irritated feelings.");
  if (has(fields.goals, "Have more energy, recover better, and feel clearer")) add("pemf", 7, "Your goal includes energy, recovery, and clarity.");
  if (has(fields.goals, "Tone, strengthen, and sculpt muscle")) add("muscle", 8, "Your goal is specifically to tone, strengthen, and sculpt muscle.");
  if (has(fields.goals, "Target inches, stubborn areas, or loose-feeling skin")) add("contour", 8, "Your goal includes targeting inches, stubborn areas, or loose-feeling skin.");
  if (has(fields.goals, "Improve skin texture, smoothness, or cellulite appearance")) add("fascia", 8, "Your goal includes smoother-looking skin, fascia support, or less visible cellulite.");
  if (has(fields.goals, "Strengthen my pelvic floor, core, or bladder confidence")) add("pelvic", 10, "Your goal specifically includes pelvic-floor, core, or bladder-confidence support.");
  if (has(fields.goals, "Stop guessing and let Susie build the plan")) add("ultimate", 9, "You want Susie to help build the plan instead of guessing treatment by treatment.");

  const priorityMap: Record<string, [Key, number, string]> = {
    "I mostly want to feel lighter and less puffy": ["lymphatic", 12, "Your top priority is feeling lighter and less puffy."],
    "I mostly want help with aches, fatigue, or recovery": ["pemf", 12, "Your top priority is aches, fatigue, or recovery."],
    "I mostly want smoother skin, fascia support, or less visible cellulite": ["fascia", 13, "Your top priority is fascia support, smoother skin, or less visible cellulite."],
    "I mostly want pelvic floor, core, or bladder-confidence support": ["pelvic", 15, "Your top priority is pelvic-floor, core, or bladder-confidence support."],
    "I mostly want to reduce inches, tighten, or contour": ["contour", 13, "Your top priority is reducing inches, tightening, or contouring."],
    "I mostly want to build, strengthen, and tone muscle": ["muscle", 13, "Your top priority is building, strengthening, and toning muscle."],
    "I want the most complete whole-body experience": ["ultimate", 16, "You said you want the most complete whole-body experience."],
    "I want Susie to choose the safest first step": ["ultimate", 8, "You asked Susie to choose the best starting point."],
    "I want the lowest-commitment way to talk first": ["ultimate", 2, "You prefer to talk first before choosing a series."],
  };
  const priorityHit = priorityMap[fields.priority];
  if (priorityHit) add(...priorityHit);

  if (fields.symptoms.length >= 4) add("ultimate", 5, "You selected several symptoms, so one narrow treatment may not tell the whole story.");
  if (fields.goals.length >= 3) add("ultimate", 4, "You selected several goals, which supports a complete starting experience.");

  const order: Key[] = ["pelvic", "muscle", "contour", "fascia", "pemf", "lymphatic", "ultimate"];
  const ranked = order.map((key) => ({ key, score: scores[key] })).sort((a, b) => b.score - a.score || order.indexOf(a.key) - order.indexOf(b.key));
  let winner = ranked[0].score > 0 ? ranked[0].key : "ultimate";
  const strongSpecialists = ranked.filter((item) => item.key !== "ultimate" && item.score >= 10);
  if (winner !== "pelvic" && strongSpecialists.length >= 3) winner = "ultimate";

  return {
    key: winner,
    offer: offers[winner],
    reasons: reasons[winner].slice(0, 3).length ? reasons[winner].slice(0, 3) : [offers[winner].description],
    scoreSummary: ranked.map((item) => `${offers[item.key].name}: ${item.score}`).join(" | "),
  };
}

function MultiChoice({ title, helper, options, values, onToggle }: { title: string; helper: string; options: string[]; values: string[]; onToggle: (value: string) => void }) {
  return <div><h2 className="font-serif text-3xl font-light text-[#2c1f14]">{title}</h2><p className="mb-6 mt-2 text-sm font-light text-muted">{helper}</p><div className="grid gap-3 sm:grid-cols-2">{options.map((option) => { const selected = values.includes(option); return <button key={option} type="button" onClick={() => onToggle(option)} className={`relative rounded-sm border px-5 py-4 pr-12 text-left font-sans font-light transition ${selected ? "border-purple bg-purple text-white" : "border-stone bg-stone/40 text-muted hover:border-purple/40"}`}>{option}{selected && <span className="absolute right-4 top-1/2 -translate-y-1/2">✓</span>}</button>; })}</div></div>;
}

function SingleChoice({ title, options, value, onSelect }: { title: string; options: string[]; value: string; onSelect: (value: string) => void }) {
  return <div><h2 className="mb-6 font-serif text-3xl font-light text-[#2c1f14]">{title}</h2><div className="grid gap-3 sm:grid-cols-2">{options.map((option) => <button key={option} type="button" onClick={() => onSelect(option)} className={`rounded-sm border px-5 py-4 text-left font-sans font-light transition ${value === option ? "border-purple bg-purple text-white" : "border-stone bg-stone/40 text-muted hover:border-purple/40"}`}>{option}</button>)}</div></div>;
}

export default function BodyResetPage() {
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "saving" | "results" | "error">("idle");
  const [fields, setFields] = useState<Fields>({ firstName: "", email: "", phone: "", consent: false, symptoms: [], tried: [], goals: [], priority: "", urgency: "" });
  const result = useMemo(() => calculate(fields), [fields]);
  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => setFields((current) => ({ ...current, [key]: value }));
  const toggle = (key: "symptoms" | "tried" | "goals", value: string) => setFields((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] }));
  const canContinue = step === 1 ? fields.symptoms.length > 0 : step === 2 ? fields.tried.length > 0 : step === 3 ? fields.goals.length > 0 : step === 4 ? Boolean(fields.priority) : Boolean(fields.urgency);

  async function submit(stage: string) {
    const complete = stage === "Quiz Completed";
    const response = await fetch("/api/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...fields, firstName: fields.firstName.trim().split(/\s+/)[0], symptom: fields.symptoms.join(", "), interest: fields.symptoms.join(", "), triedText: fields.tried.join(", "), goal: fields.goals.join(", "), timeline: fields.urgency, preferredNextStep: "Book Your FREE Professional Consult", recommendedOffer: complete ? result.offer.name : "Pending Susie Evaluation", recommendationKey: complete ? result.key : "pending", recommendationReasons: complete ? result.reasons.join(" | ") : "Pending quiz answers", recommendationScoreSummary: complete ? result.scoreSummary : "Pending quiz answers", quizPath: "Official Susie Sculpts Series Evaluation", source: "Susie Sculpts Quiz Funnel", page: "/body-reset", leadStage: stage }) });
    if (!response.ok) throw new Error("submit_failed");
  }

  async function captureLead(event: React.FormEvent) {
    event.preventDefault();
    if (!fields.firstName || !fields.email || !fields.consent) return;
    setStatus("saving");
    try { await submit("Lead Captured Before Quiz"); setLeadCaptured(true); setStatus("idle"); setTimeout(() => document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100); } catch { setStatus("error"); }
  }

  async function finish() {
    if (!canContinue) return;
    setStatus("saving");
    try { await submit("Quiz Completed"); setStatus("results"); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50); } catch { setStatus("error"); }
  }

  if (status === "results") {
    return <><main className="bg-cream pb-16 pt-24 md:pt-28"><div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6"><section className="rounded-[22px] border border-purple/15 bg-white p-5 shadow-[0_8px_24px_rgba(60,40,80,0.06)] md:p-8"><p className="section-label mb-3">Your Personalized Recommendation</p><h1 className="font-serif text-4xl font-light text-[#2c1f14] md:text-5xl">{fields.firstName.trim().split(/\s+/)[0]}...</h1><p className="mt-4 text-base font-light text-muted">Based on what you shared:</p><ul className="mt-4 space-y-3">{result.reasons.map((reason) => <li key={reason} className="flex gap-3 text-sm font-light leading-relaxed text-muted"><span className="text-purple">•</span><span>{reason}</span></li>)}</ul><div className="mt-6 rounded-[16px] border border-purple/15 bg-purple/5 p-5"><p className="text-base font-medium text-[#2c1f14]">My recommendation is <span className="text-purple">{result.offer.name}</span>.</p></div><p className="mt-5 border-t border-purple/15 pt-4 text-xs font-light leading-relaxed text-muted/80"><strong className="font-medium text-[#2c1f14]">Important note:</strong> This is not a diagnosis. It is a starting-point recommendation designed to make your first conversation with Susie more useful. Susie will confirm the right series and number of sessions after she understands your goals, comfort level, and budget.</p></section><section className="rounded-[22px] border border-purple/20 bg-white p-5 md:p-8"><p className="section-label mb-2">Susie’s Recommended Series</p><h2 className="font-serif text-4xl font-light text-[#2c1f14]">{result.offer.name}</h2><p className="mt-3 text-base font-light leading-relaxed text-muted">{result.offer.description}</p><div className="mt-5 rounded-[16px] border border-purple/15 bg-stone/30 p-5"><p className="section-label mb-3">What’s Included</p><ul className="space-y-2">{result.offer.included.map((item) => <li key={item} className="flex gap-3 text-sm font-light text-muted"><span className="text-purple">✦</span><span>{item}</span></li>)}</ul></div><div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-serif text-4xl font-light text-purple">{result.offer.price}</p><p className="text-xs uppercase tracking-widest text-muted">Starting series option</p></div><a href={result.offer.checkout} className="btn-primary text-center">View This Treatment Series</a></div></section><section className="rounded-[22px] border border-purple/15 bg-white p-5 text-center md:p-7"><h2 className="font-serif text-3xl font-light text-[#2c1f14]">Talk with Susie before choosing</h2><p className="mx-auto mt-2 max-w-xl text-sm font-light text-muted">Review the recommendation together and confirm the right number of sessions.</p><a href={consultationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 inline-block">Book Your FREE Professional Consult</a></section></div></main><Footer /></>;
  }

  return <><main className="bg-cream pb-14 pt-24 md:pt-28"><section className="mx-auto max-w-6xl px-4 sm:px-6"><div className="grid gap-5 lg:grid-cols-[1fr_.9fr]">{!leadCaptured && <div className="rounded-[22px] border border-purple/15 bg-white/80 p-5 shadow-[0_8px_24px_rgba(60,40,80,0.06)] md:p-7"><div className="mb-5 flex items-center gap-4"><div className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-white shadow-md"><Image src="/images/susie.jpg" alt="Susie" fill className="object-cover object-[center_8%]" sizes="64px" /></div><div><p className="section-label mb-1">A Message from Susie</p><p className="text-xs font-medium uppercase tracking-[0.18em] text-purple/70">Since 1995</p></div></div><h1 className="font-serif text-[34px] font-light leading-[1.05] text-[#2c1f14] md:text-5xl">Feel puffy, tired, foggy, inflamed, heavy, stuck, or just not like yourself?</h1><p className="mt-5 text-base font-light leading-relaxed text-muted">Answer five quick questions so I can recommend the most logical Susie Sculpts series to discuss with you.</p><p className="mt-4 font-medium text-[#2c1f14]">No pressure. Ever.</p></div>}{!leadCaptured && <form onSubmit={captureLead} className="rounded-[22px] border border-purple/15 bg-white p-5 shadow-[0_10px_30px_rgba(60,40,80,0.08)] md:p-6"><div className="space-y-4"><input className="input-field" placeholder="First name*" value={fields.firstName} onChange={(e) => set("firstName", e.target.value)} required /><input className="input-field" type="email" placeholder="Email address*" value={fields.email} onChange={(e) => set("email", e.target.value)} required /><input className="input-field" type="tel" placeholder="Mobile number (optional)" value={fields.phone} onChange={(e) => set("phone", e.target.value)} /><label className="flex items-start gap-3 text-xs font-light leading-relaxed text-muted"><input type="checkbox" className="mt-1 accent-purple" checked={fields.consent} onChange={(e) => set("consent", e.target.checked)} required />I agree to receive follow-up messages from Susie Sculpts about my evaluation and recommendation.</label><button type="submit" className="btn-primary w-full" disabled={status === "saving"}>{status === "saving" ? "Saving..." : "Receive Your FREE Professional Evaluation"}</button></div></form>}</div></section>{leadCaptured && <section id="quiz" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-4 sm:px-6 md:py-8"><div className="rounded-[24px] border border-purple/15 bg-white p-5 shadow-[0_10px_30px_rgba(60,40,80,0.08)] md:p-8"><div className="mb-8"><div className="mb-3 flex justify-between"><p className="section-label">Ask Susie Evaluation</p><p className="section-label">{step} of 5</p></div><div className="h-2 overflow-hidden rounded-full bg-stone/70"><div className="h-full rounded-full bg-purple transition-all" style={{ width: `${step * 20}%` }} /></div></div>{step === 1 && <div><h2 className="font-serif text-3xl font-light text-[#2c1f14]">Which of these have you been feeling lately?</h2><p className="mb-6 mt-2 text-sm font-light text-muted">Select all that apply.</p><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{symptoms.map(([label, image]) => { const selected = fields.symptoms.includes(label); return <button key={label} type="button" onClick={() => toggle("symptoms", label)} className={`relative overflow-hidden rounded-[18px] text-left transition ${selected ? "border-2 border-purple bg-purple/5" : "border border-purple/10 bg-stone/30"}`}><div className="relative aspect-square"><Image src={image} alt={label} fill className="object-cover object-top" sizes="(max-width: 768px) 50vw, 25vw" /></div><p className="p-3 text-sm font-medium text-[#6A5A6D]">{label}</p>{selected && <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple text-white">✓</span>}</button>; })}</div></div>}{step === 2 && <MultiChoice title="What have you already tried?" helper="Select all that apply." options={tried} values={fields.tried} onToggle={(value) => toggle("tried", value)} />}{step === 3 && <MultiChoice title="What would feel like a real win?" helper="Select everything that matters to you." options={goals} values={fields.goals} onToggle={(value) => toggle("goals", value)} />}{step === 4 && <SingleChoice title="What feels most important right now?" options={priorities} value={fields.priority} onSelect={(value) => set("priority", value)} />}{step === 5 && <SingleChoice title="How soon do you want help figuring this out?" options={urgency} value={fields.urgency} onSelect={(value) => set("urgency", value)} />}<div className="mt-8 flex justify-between gap-4"><button type="button" className="btn-secondary" disabled={step === 1} onClick={() => setStep((value) => Math.max(1, value - 1))}>Back</button>{step < 5 ? <button type="button" className="btn-primary" disabled={!canContinue} onClick={() => setStep((value) => Math.min(5, value + 1))}>Continue</button> : <button type="button" className="btn-primary" disabled={!canContinue || status === "saving"} onClick={finish}>{status === "saving" ? "Saving..." : "Show Me Where To Start"}</button>}</div>{status === "error" && <p className="mt-4 text-center text-sm text-red-500">Something went wrong. Please try again or call Susie at (480) 440-0909.</p>}</div></section>}</main><Footer /></>;
}
