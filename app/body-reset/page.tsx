"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Footer from "@/components/Footer";

type Key = "ultimate" | "pemf" | "lymphatic" | "fascia" | "pelvic" | "contour" | "muscle";
type Product = { count: number; price: number; duration: number | null; href: string };
type Offer = { key: Key; name: string; short: string; icon: string; description: string; included: string[]; benefits: string[]; products: Product[] };
type Fields = { firstName: string; email: string; phone: string; consent: boolean; symptoms: string[]; tried: string[]; goals: string[]; priority: string; urgency: string };
type SavedState = { version: 2; leadCaptured: boolean; step: number; status: "quiz" | "results"; fields: Fields };

const STORAGE_KEY = "susie-sculpts-evaluation-v2";
const BODY_RESET_SHARE_URL = "https://susiesculpts.com/body-reset";

const offers: Offer[] = [
  { key: "ultimate", name: 'The Ultimate "YOU" Experience', short: "Ultimate YOU", icon: "/images/susie.jpg", description: "Susie’s complete six-treatment experience when several goals matter or you want help identifying the best focused path.", included: ["One Body Contouring treatment", "One Fascia and Skin Revival treatment", "One Lymphatic Wellness treatment", "One Muscle + Strength + Tone treatment", "One Pelvic Floor Strengthening treatment", "One PEMF Recovery and Wellness treatment"], benefits: [], products: [{ count: 6, price: 1297, duration: null, href: "https://api.armsreachdigital.com/payment-link/6a6da6b87b99151a54041af5" }] },
  { key: "muscle", name: "Muscle + Strength + Tone Series", short: "Muscle + Strength + Tone", icon: "/images/treatment-muscle.png", description: "Muscle activation, strengthening, toning, and body-sculpting support.", included: ["EMShape muscle activation", "Strengthening and toning support", "50-minute appointments"], benefits: ["Supports muscle activation and strengthening", "Supports toning and body-sculpting goals", "Helps target areas that can be difficult to tone with exercise alone"], products: [{ count: 20, price: 5997, duration: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da301a655fa0b802a7622" }, { count: 10, price: 3997, duration: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da29c7b99151a54041ae9" }, { count: 5, price: 2497, duration: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da211a655fa0b802a7620" }, { count: 1, price: 597, duration: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da028a655fa0b802a761d" }] },
  { key: "contour", name: "Body Contouring Series", short: "Body Contouring", icon: "/images/treatment-contour.png", description: "Targeted support for inches, stubborn areas, skin tightening, and contouring goals.", included: ["Ultrasonic cavitation", "RF skin-tightening support", "55-minute appointments"], benefits: ["Targets stubborn areas and inch-loss goals", "Supports smoother, firmer-looking skin", "Helps refine body contours"], products: [{ count: 20, price: 3197, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da44fa655fa0b802a7625" }, { count: 10, price: 1697, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da41ea655fa0b802a7624" }, { count: 5, price: 897, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da3e57b99151a54041aee" }, { count: 1, price: 197, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da32fa655fa0b802a7623" }] },
  { key: "fascia", name: "Fascia and Skin Revival Series", short: "Fascia + Skin Revival", icon: "/images/treatment-fascia.png", description: "Fascia, circulation, skin-texture, and smoothing support.", included: ["Rollerwave fascia treatment", "Circulation and skin-texture support", "55-minute appointments"], benefits: ["Supports fascia mobility and circulation", "Supports smoother-looking skin texture", "Helps address the appearance of cellulite"], products: [{ count: 20, price: 3197, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da7f07b99151a54041af8" }, { count: 10, price: 1697, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da84e7b99151a54041af9" }, { count: 5, price: 897, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da727a655fa0b802a7629" }, { count: 1, price: 197, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da6ec7b99151a54041af6" }] },
  { key: "pelvic", name: "Pelvic Floor Strengthening Series", short: "Pelvic Floor Strengthening", icon: "/images/treatment-pelvic.png", description: "Pelvic-floor and deep-core strengthening support in a private, fully clothed session.", included: ["Pelvic-floor muscle activation", "Private, fully clothed treatment", "45-minute appointments"], benefits: ["Supports pelvic-floor strength", "Supports deep-core activation", "Private, fully clothed sessions"], products: [{ count: 20, price: 3197, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e2f6da655fa0b802a76b8" }, { count: 10, price: 1697, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6da5d87b99151a54041af4" }, { count: 5, price: 897, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6da591a655fa0b802a7627" }, { count: 1, price: 197, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6da4797b99151a54041af1" }] },
  { key: "lymphatic", name: "Lymphatic Wellness Series", short: "Lymphatic Wellness", icon: "/images/treatment-lymphatic.png", description: "Lymphatic and circulation support for puffiness, bloating, heaviness, and sluggishness.", included: ["Synergie vacuum massage", "Lymphatic-flow and circulation support", "45-minute appointments", "$50 spandex bodysuit included"], benefits: ["Supports healthy lymphatic flow", "Supports circulation and wellness", "Helps you feel lighter and less puffy"], products: [{ count: 20, price: 1597, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e1fc77b99151a54041b85" }, { count: 10, price: 897, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e20567b99151a54041b87" }, { count: 5, price: 497, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e221ea655fa0b802a76a6" }, { count: 1, price: 147, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e2307a655fa0b802a76a7" }] },
  { key: "pemf", name: "PEMF Recovery and Wellness Series", short: "PEMF Recovery + Wellness", icon: "/images/treatment-pemf.png", description: "Recovery and wellness support for aches, fatigue, stress, fogginess, and low energy.", included: ["PEMF recovery and wellness treatment", "Relaxation, circulation, and energy support", "30-minute appointments"], benefits: ["Supports recovery and relaxation", "Supports circulation and energy", "Designed for aches, fatigue, stress, and fogginess"], products: [{ count: 20, price: 797, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e20ba7b99151a54041b89" }, { count: 10, price: 497, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e22c57b99151a54041b8c" }, { count: 5, price: 297, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e2370a655fa0b802a76ab" }, { count: 1, price: 67, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e23957b99151a54041b8f" }] },
];

const symptoms = [["Puffy/bloated", "/images/symptom-puffy.png"], ["Inflamed/achy", "/images/symptom-achy.png"], ["Heavy/sluggish", "/images/symptom-heavy.png"], ["Tired all the time", "/images/symptom-tired.png"], ["Foggy/unfocused", "/images/symptom-foggy.png"], ["Stuck—nothing works", "/images/symptom-stuck.png"], ["Uncomfortable in my body", "/images/symptom-uncomfortable.png"], ["Don’t feel like myself", "/images/symptom-yourself.png"]] as const;
const tried = ["Diet or nutrition changes", "Workouts or walking", "Supplements or detoxes", "Massage or lymphatic work", "PEMF or recovery therapies", "Body contouring or med spa", "Skin or cellulite treatments", "Pelvic-floor or core exercises", "Nothing consistently yet"];
const goals = ["Feel lighter and less puffy", "Calm aches or inflammation", "More energy and clearer focus", "Tone and strengthen muscle", "Target inches or stubborn areas", "Improve skin texture", "Strengthen pelvic floor or core", "Let Susie build the plan"];
const priorities = ["Let Susie choose the safest first step", "Feel lighter and less puffy", "Help with aches, fatigue, or recovery", "Smoother skin or fascia support", "Pelvic-floor or core support", "Reduce inches or contour", "Build and tone muscle", "Most complete whole-body experience", "Talk first before choosing"];
const urgency = ["This week", "Within 2 weeks", "This month", "Curious, not urgent", "When I can afford it"];
const emptyFields: Fields = { firstName: "", email: "", phone: "", consent: false, symptoms: [], tried: [], goals: [], priority: "", urgency: "" };

function getOffer(key: Key) { return offers.find((offer) => offer.key === key) ?? offers[0]; }
function money(value: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value); }

function calculate(fields: Fields) {
  const score: Record<Key, number> = { ultimate: 0, pemf: 0, lymphatic: 0, fascia: 0, pelvic: 0, contour: 0, muscle: 0 };
  const reasons: Record<Key, string[]> = { ultimate: [], pemf: [], lymphatic: [], fascia: [], pelvic: [], contour: [], muscle: [] };
  const add = (key: Key, value: number, reason: string) => { score[key] += value; if (!reasons[key].includes(reason)) reasons[key].push(reason); };
  fields.symptoms.forEach((v) => { if (v.includes("Puffy") || v.includes("Heavy")) add("lymphatic", 6, "You described puffiness, bloating, heaviness, or sluggishness."); if (v.includes("Inflamed") || v.includes("Tired") || v.includes("Foggy")) add("pemf", 6, "You described aches, fatigue, or fogginess that may fit a recovery-focused path."); if (v.includes("Stuck") || v.includes("myself")) add("ultimate", 7, "You described feeling stuck or unlike yourself, suggesting a broader starting point."); if (v.includes("Uncomfortable")) { add("contour", 4, "You want to feel more comfortable in your body."); add("muscle", 3, "Body-confidence goals may also connect to strengthening and tone."); } });
  fields.tried.forEach((v) => { if (v.includes("lymphatic")) add("lymphatic", 4, "You have already been drawn to lymphatic work."); if (v.includes("PEMF")) add("pemf", 4, "You have already explored recovery therapies."); if (v.includes("contouring")) add("contour", 4, "You have already explored body contouring."); if (v.includes("Skin")) add("fascia", 6, "You have tried skin or cellulite-focused approaches."); if (v.includes("Pelvic")) add("pelvic", 8, "You have tried pelvic-floor or core exercises."); if (v.includes("Workouts")) add("muscle", 3, "You have already tried movement and exercise."); if (v.includes("Nothing")) add("ultimate", 4, "A complete starting experience may help you stop guessing."); });
  fields.goals.forEach((v) => { if (v.includes("lighter")) add("lymphatic", 8, "Your goal is to feel lighter and less puffy."); if (v.includes("aches") || v.includes("energy")) add("pemf", 8, "Your goal includes recovery, energy, or clearer focus."); if (v.includes("muscle")) add("muscle", 9, "Your goal is to tone and strengthen muscle."); if (v.includes("inches")) add("contour", 9, "Your goal includes targeting inches or stubborn areas."); if (v.includes("skin")) add("fascia", 9, "Your goal includes smoother-looking skin or fascia support."); if (v.includes("pelvic")) add("pelvic", 11, "Your goal specifically includes pelvic-floor or core support."); if (v.includes("Susie")) add("ultimate", 10, "You want Susie to build the plan instead of guessing."); });
  const map: Record<string, Key> = { "Feel lighter and less puffy": "lymphatic", "Help with aches, fatigue, or recovery": "pemf", "Smoother skin or fascia support": "fascia", "Pelvic-floor or core support": "pelvic", "Reduce inches or contour": "contour", "Build and tone muscle": "muscle", "Most complete whole-body experience": "ultimate", "Let Susie choose the safest first step": "ultimate", "Talk first before choosing": "ultimate" };
  if (map[fields.priority]) add(map[fields.priority], fields.priority.includes("Pelvic") ? 15 : 13, `Your top priority is ${fields.priority.toLowerCase()}.`);
  if (fields.symptoms.length >= 4 || fields.goals.length >= 3) add("ultimate", 6, "You selected several concerns or goals, so one narrow treatment may not tell the whole story.");
  const ranked = (Object.keys(score) as Key[]).sort((a, b) => score[b] - score[a]);
  const key = ranked[0] || "ultimate";
  return { key, offer: getOffer(key), reasons: reasons[key].slice(0, 3), summary: ranked.map((k) => `${k}:${score[k]}`).join("|") };
}

function ChoiceButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`relative min-h-[42px] rounded-sm border px-3 py-2 text-left text-[13px] font-light leading-tight transition md:min-h-[46px] md:px-4 md:text-sm ${selected ? "border-purple bg-purple text-white" : "border-stone bg-stone/40 text-muted hover:border-purple/40"}`}>{label}{selected && <span className="absolute right-2 top-1/2 -translate-y-1/2">✓</span>}</button>;
}

function ProductCard({ offer, product }: { offer: Offer; product: Product }) {
  const isUltimate = offer.key === "ultimate";
  const isLymphatic = offer.key === "lymphatic";
  const isSingle = product.count === 1;
  const treatmentValue = isLymphatic ? (product.price - 50) / product.count : product.price / product.count;
  const detail = isUltimate
    ? "Six treatments across Susie’s signature modalities"
    : isSingle
      ? `${product.duration}-minute treatment${isLymphatic ? " · $50 spandex bodysuit included" : ""}`
      : `${money(treatmentValue)} per ${product.duration}-minute treatment${isLymphatic ? " · $50 spandex bodysuit included" : ""}`;
  const label = isUltimate ? "The Complete Experience" : isSingle ? "Single Treatment" : `${product.count}-Treatment Series`;
  const cta = isUltimate ? 'Purchase the Ultimate "YOU" Experience' : `Purchase ${product.count} ${product.count === 1 ? "Session" : "Sessions"}`;

  return <div className="rounded-[16px] border border-stone bg-white p-3.5 md:p-4">
    <div className="flex items-start justify-between gap-3">
      <div><p className="section-label mb-1.5">{label}</p><p className="text-xs font-medium leading-relaxed text-muted">{detail}</p></div>
      <p className="shrink-0 font-serif text-3xl font-light text-purple">{money(product.price)}</p>
    </div>
    <a href={product.href} onClick={(event) => event.stopPropagation()} className="btn-secondary mt-3 flex min-h-11 w-full items-center justify-center px-4 py-2.5 text-center text-sm leading-snug">{cta}</a>
  </div>;
}

function FlipCard({ offer, initiallyFlipped = false, recommended = false }: { offer: Offer; initiallyFlipped?: boolean; recommended?: boolean }) {
  const [flipped, setFlipped] = useState(initiallyFlipped);
  const pricingRef = useRef<HTMLDivElement>(null);
  const highlights = offer.key === "ultimate" ? offer.included : offer.benefits;
  const eyebrow = recommended ? "Recommended Treatment Package" : "Treatment Series";

  function showFront() {
    if (pricingRef.current) pricingRef.current.scrollTop = 0;
    setFlipped(false);
  }

  return <div className="results-treatment-card [perspective:1400px]">
    <div className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
      <button type="button" onClick={() => setFlipped(true)} className="absolute inset-0 flex flex-col overflow-hidden rounded-[24px] border border-purple/15 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl [backface-visibility:hidden] md:p-6">
        <p className="section-label">{eyebrow}</p>
        <h3 className="mt-2.5 font-serif text-3xl font-light leading-tight text-[#2c1f14]">{offer.name}</h3>
        <div className="relative mx-auto my-5 min-h-0 w-full flex-1"><Image src={offer.icon} alt={offer.name} fill className="object-contain p-4" sizes="(max-width: 768px) 80vw, 420px" /></div>
        <p className="mt-auto font-sans text-xs font-semibold uppercase tracking-[0.14em] text-purple">Tap to See Price Options</p>
      </button>

      <div role="button" tabIndex={0} aria-label={`Flip ${offer.name} card to the front`} onClick={showFront} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") showFront(); }} className="absolute inset-0 flex cursor-pointer flex-col overflow-hidden rounded-[24px] border border-purple/15 bg-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
        <div className="results-back-heading shrink-0 bg-white px-5 pb-4 pt-5 text-center md:px-6 md:pt-6">
          <p className="section-label">{eyebrow}</p>
          <h3 className="mt-2.5 font-serif text-3xl font-light leading-tight text-[#2c1f14]">{offer.name}</h3>
        </div>
        <div ref={pricingRef} className="results-pricing-scroll min-h-0 flex-1 border-t border-purple/10 bg-cream/60 px-3.5 py-4 md:px-4">
          <p className="mb-3 text-sm font-light leading-relaxed text-muted">{offer.description}</p>
          <div className="mb-3 rounded-[14px] border border-purple/10 bg-white/85 p-3.5">
            <p className="section-label mb-2">{offer.key === "ultimate" ? "What’s Included" : "Benefits"}</p>
            <ul className="space-y-1.5 text-sm font-light text-muted">{highlights.map((item) => <li key={item} className="flex gap-2"><span className="text-purple">✦</span><span>{item}</span></li>)}</ul>
          </div>
          <div className="space-y-3">{offer.products.map((product) => <ProductCard key={`${offer.key}-${product.count}`} offer={offer} product={product} />)}</div>
        </div>
      </div>
    </div>
  </div>;
}

function ShareBodyReset() {
  const [shareNote, setShareNote] = useState("");
  const title = "See What Susie Says";
  const text = "Take Susie Sculpts’ free Body Reset evaluation and get a personalized starting-point recommendation.";
  const encodedUrl = encodeURIComponent(BODY_RESET_SHARE_URL);
  const emailHref = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${BODY_RESET_SHARE_URL}`)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  async function shareToApps() {
    setShareNote("");
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url: BODY_RESET_SHARE_URL });
        return;
      }
      await navigator.clipboard.writeText(BODY_RESET_SHARE_URL);
      setShareNote("Link copied — paste it into Instagram or any message.");
    } catch (error) {
      if ((error as Error)?.name !== "AbortError") setShareNote("Use Copy Link, then paste it into Instagram or any message.");
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(BODY_RESET_SHARE_URL);
      setShareNote("Body Reset link copied.");
    } catch {
      setShareNote(BODY_RESET_SHARE_URL);
    }
  }

  return <section className="rounded-[22px] border border-purple/15 bg-white p-5 text-center md:p-6">
    <p className="section-label mb-2">Know Someone Who Might Need This?</p>
    <h2 className="font-serif text-3xl font-light text-[#2c1f14]">Share the Body Reset Evaluation</h2>
    <p className="mx-auto mt-2 max-w-xl text-sm font-light leading-relaxed text-muted">Share the evaluation itself — not your personal results — so a friend can see what Susie recommends for them.</p>
    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
      <a href={emailHref} className="btn-secondary flex min-h-11 items-center justify-center px-3 py-2 text-sm">Email</a>
      <a href={facebookHref} target="_blank" rel="noopener noreferrer" className="btn-secondary flex min-h-11 items-center justify-center px-3 py-2 text-sm">Facebook</a>
      <button type="button" onClick={shareToApps} className="btn-secondary min-h-11 px-3 py-2 text-sm">Instagram / Share</button>
      <button type="button" onClick={copyLink} className="btn-secondary min-h-11 px-3 py-2 text-sm">Copy Link</button>
    </div>
    {shareNote && <p className="mt-3 text-xs font-light text-muted">{shareNote}</p>}
  </section>;
}

export default function BodyResetPage() {
  const [hydrated, setHydrated] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "saving" | "error" | "results">("idle");
  const [fields, setFields] = useState<Fields>(emptyFields);

  useEffect(() => { try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as SavedState | null; if (saved?.version === 2) { setLeadCaptured(saved.leadCaptured); setStep(saved.step); setStatus(saved.status === "results" ? "results" : "idle"); setFields(saved.fields); } } finally { setHydrated(true); } }, []);
  useEffect(() => { if (!hydrated) return; const saved: SavedState = { version: 2, leadCaptured, step, status: status === "results" ? "results" : "quiz", fields }; localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); }, [hydrated, leadCaptured, step, status, fields]);

  const result = useMemo(() => calculate(fields), [fields]);
  const canContinue = step === 1 ? fields.symptoms.length > 0 : step === 2 ? fields.tried.length > 0 : step === 3 ? fields.goals.length > 0 : step === 4 ? Boolean(fields.priority) : Boolean(fields.urgency);
  function set<K extends keyof Fields>(key: K, value: Fields[K]) { setFields((current) => ({ ...current, [key]: value })); }
  function toggle(key: "symptoms" | "tried" | "goals", value: string) { setFields((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] })); }

  async function submit(stage: string) {
    const response = await fetch("/api/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ firstName: fields.firstName, email: fields.email, phone: fields.phone, consent: fields.consent, symptoms: fields.symptoms.join(", "), previouslyTried: fields.tried.join(", "), goals: fields.goals.join(", "), priority: fields.priority, urgency: fields.urgency, recommendedTreatment: result.offer.name, recommendationReasons: result.reasons.join(" | "), scoreSummary: result.summary, source: "website-evaluation", page: "/body-reset", stage }) });
    if (!response.ok) throw new Error("submit_failed");
  }

  async function captureLead(event: React.FormEvent) { event.preventDefault(); if (!fields.firstName || !fields.email || !fields.consent) return; setStatus("saving"); try { await submit("Lead Captured Before Quiz"); setLeadCaptured(true); setStatus("idle"); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50); } catch { setStatus("error"); } }
  async function finish() { if (!canContinue) return; setStatus("saving"); try { await submit("Quiz Completed"); setStatus("results"); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50); } catch { setStatus("error"); } }
  function restart() { localStorage.removeItem(STORAGE_KEY); setFields(emptyFields); setLeadCaptured(false); setStep(1); setStatus("idle"); window.scrollTo({ top: 0, behavior: "smooth" }); }

  if (!hydrated) return <main className="min-h-screen bg-cream pt-20" />;

  if (status === "results") {
    const firstName = fields.firstName.trim().split(/\s+/)[0] || "there";
    const others = offers.filter((offer) => offer.key !== result.key);
    return <><main className="bg-cream pb-14 pt-20 md:pt-24"><div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6">
      <section className="rounded-[20px] border border-purple/15 bg-white p-5 shadow-sm md:p-6">
        <p className="section-label mb-2">Your Personalized Recommendation</p>
        <h1 className="font-serif text-3xl font-light leading-tight text-purple md:text-4xl">{result.offer.name}</h1>
        <div className="mt-4 border-t border-purple/10 pt-4">
          <p className="text-sm font-light leading-relaxed text-muted">Hi {firstName},</p>
          <p className="mt-3 text-sm font-light leading-relaxed text-muted">Thanks for taking a few minutes to tell me what you’ve been feeling. Based on your answers, I recommend starting with the <strong className="font-medium text-[#2c1f14]">{result.offer.name}</strong>.</p>
          {result.reasons.length > 0 && <><p className="mt-3 text-sm font-light leading-relaxed text-muted">Here’s why:</p><ul className="mt-2 space-y-1.5">{result.reasons.map((reason) => <li key={reason} className="flex gap-2 text-sm font-light leading-relaxed text-muted"><span className="text-purple">•</span><span>{reason}</span></li>)}</ul></>}
          <p className="mt-3 text-xs font-light leading-relaxed text-muted/80">Just so you know, this is a starting-point recommendation, not a diagnosis. We’ll confirm the right series and number of sessions together based on your goals, comfort level, and budget.</p>
          <div className="mt-4 flex items-end justify-between gap-4">
            <div><p className="text-sm font-light text-muted">Hope to see you soon,</p><p className="mt-1 font-serif text-2xl font-light text-purple">Susie</p></div>
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-purple/15 bg-stone"><Image src="/images/susie.jpg" alt="Susie" fill className="object-cover object-top" sizes="80px" /></div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-xl"><FlipCard offer={result.offer} initiallyFlipped recommended /></div>
      </section>

      <section id="full-treatment-list" className="scroll-mt-24">
        <div className="mb-5 text-center"><p className="section-label mb-2">Explore Other Treatments</p><h2 className="font-serif text-3xl font-light text-[#2c1f14] md:text-4xl">All Susie Sculpts Treatment Series</h2><p className="mx-auto mt-2 max-w-2xl text-sm font-light text-muted">Tap any card to see benefits, pricing options, and secure purchase links.</p></div>
        <div className="grid gap-5 lg:grid-cols-2">{others.map((offer) => <FlipCard key={offer.key} offer={offer} />)}</div>
      </section>

      <ShareBodyReset />
      <button type="button" onClick={restart} className="block w-full pb-2 text-center text-xs text-muted underline">Retake the evaluation</button>
    </div></main><Footer /></>;
  }

  return <><main className="min-h-screen bg-cream pb-10 pt-20 md:pt-24">
    {!leadCaptured ? <section className="mx-auto max-w-6xl px-0 sm:px-6"><div className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-[#2c1f14] sm:rounded-[24px] sm:border sm:border-purple/15 sm:shadow-[0_12px_36px_rgba(60,40,80,0.12)]"><Image src="/images/symptom-yourself.png" alt="Woman looking thoughtfully in the mirror" fill priority className="object-cover object-center" /><div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,20,16,0.18)_0%,rgba(30,20,16,0.34)_38%,rgba(30,20,16,0.88)_100%)]" /><div className="relative z-10 flex min-h-[calc(100svh-5rem)] flex-col justify-end px-5 pb-5 pt-7 sm:px-7 sm:pb-7 lg:grid lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:gap-10 lg:px-10 lg:pb-10"><div className="text-white"><p className="mb-3 inline-flex rounded-full border border-white/30 bg-black/20 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">See What Susie Says</p><h1 className="max-w-2xl font-serif text-[38px] font-light leading-[0.98] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl">Feel puffy, tired, foggy, inflamed, heavy, stuck, or unlike yourself?</h1><p className="mt-3 max-w-xl font-sans text-[14px] font-light leading-relaxed text-white/90 sm:text-base">Enter your information, answer five quick questions, and receive Susie’s professional starting-point recommendation.</p><p className="mt-2 font-sans text-sm font-medium text-white">Free. Private. No pressure.</p></div><form onSubmit={captureLead} className="mt-5 rounded-[20px] border border-white/25 bg-white/94 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-5 lg:mt-0"><div className="space-y-2.5"><input className="input-field bg-white/95" placeholder="First name*" value={fields.firstName} onChange={(e) => set("firstName", e.target.value)} required /><input className="input-field bg-white/95" type="email" placeholder="Email address*" value={fields.email} onChange={(e) => set("email", e.target.value)} required /><input className="input-field bg-white/95" type="tel" placeholder="Mobile number" value={fields.phone} onChange={(e) => set("phone", e.target.value)} /><label className="flex items-start gap-2 font-sans text-[10px] font-light leading-relaxed text-muted sm:text-[11px]"><input type="checkbox" className="mt-0.5 accent-purple" checked={fields.consent} onChange={(e) => set("consent", e.target.checked)} required />I agree to receive follow-up messages about my evaluation and recommendation.</label><button type="submit" className="btn-primary w-full py-3" disabled={status === "saving"}>{status === "saving" ? "Saving..." : "Receive My FREE Evaluation"}</button>{status === "error" && <p className="text-center text-xs text-red-500">Something went wrong. Please try again or call Susie.</p>}</div></form></div></div></section> : <section className="mx-auto max-w-5xl px-3 sm:px-6"><div className="rounded-[20px] border border-purple/15 bg-white p-4 shadow-[0_10px_30px_rgba(60,40,80,0.08)] md:p-6"><div className="mb-4"><div className="mb-2 flex justify-between"><p className="section-label">Ask Susie Evaluation</p><p className="section-label">{step} of 5</p></div><div className="h-1.5 overflow-hidden rounded-full bg-stone/70"><div className="h-full bg-purple transition-all" style={{ width: `${step * 20}%` }} /></div></div>
      {step === 1 && <div><h2 className="font-serif text-2xl font-light leading-tight text-[#2c1f14] md:text-3xl">Which of these have you been feeling lately?</h2><p className="mb-3 mt-1 text-xs font-light text-muted">Select all that apply.</p><div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">{symptoms.map(([label, image]) => { const selected = fields.symptoms.includes(label); return <button key={label} type="button" onClick={() => toggle("symptoms", label)} className={`relative flex min-h-[68px] items-center gap-2 overflow-hidden rounded-[12px] border p-2 text-left md:block md:min-h-0 md:p-0 ${selected ? "border-2 border-purple bg-purple/5" : "border-purple/10 bg-stone/30"}`}><div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[8px] md:h-auto md:w-full md:rounded-none md:aspect-[4/3]"><Image src={image} alt={label} fill className="object-cover object-top" /></div><p className="pr-4 text-[11px] font-medium leading-tight text-[#6A5A6D] md:p-2 md:text-sm">{label}</p>{selected && <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-purple text-xs text-white">✓</span>}</button>; })}</div></div>}
      {step === 2 && <div><h2 className="font-serif text-2xl font-light text-[#2c1f14] md:text-3xl">What have you already tried?</h2><p className="mb-3 mt-1 text-xs text-muted">Select all that apply.</p><div className="grid gap-2 sm:grid-cols-2">{tried.map((option) => <ChoiceButton key={option} label={option} selected={fields.tried.includes(option)} onClick={() => toggle("tried", option)} />)}</div></div>}
      {step === 3 && <div><h2 className="font-serif text-2xl font-light text-[#2c1f14] md:text-3xl">What would feel like a real win?</h2><p className="mb-3 mt-1 text-xs text-muted">Select everything that matters.</p><div className="grid gap-2 sm:grid-cols-2">{goals.map((option) => <ChoiceButton key={option} label={option} selected={fields.goals.includes(option)} onClick={() => toggle("goals", option)} />)}</div></div>}
      {step === 4 && <div><h2 className="mb-3 font-serif text-2xl font-light text-[#2c1f14] md:text-3xl">What matters most right now?</h2><div className="grid gap-2 sm:grid-cols-2">{priorities.map((option) => <ChoiceButton key={option} label={option} selected={fields.priority === option} onClick={() => set("priority", option)} />)}</div></div>}
      {step === 5 && <div><h2 className="mb-3 font-serif text-2xl font-light text-[#2c1f14] md:text-3xl">How soon would you like help?</h2><div className="grid gap-2 sm:grid-cols-2">{urgency.map((option) => <ChoiceButton key={option} label={option} selected={fields.urgency === option} onClick={() => set("urgency", option)} />)}</div></div>}
      <div className="mt-4 flex justify-between gap-3"><button type="button" className="btn-secondary px-5 py-3" disabled={step === 1} onClick={() => setStep((value) => Math.max(1, value - 1))}>Back</button>{step < 5 ? <button type="button" className="btn-primary px-5 py-3" disabled={!canContinue} onClick={() => setStep((value) => Math.min(5, value + 1))}>Continue</button> : <button type="button" className="btn-primary px-5 py-3" disabled={!canContinue || status === "saving"} onClick={finish}>{status === "saving" ? "Thinking..." : "Show My Recommendation"}</button>}</div>{status === "error" && <p className="mt-3 text-center text-xs text-red-500">Something went wrong. Please try again or call Susie at (480) 440-0909.</p>}</div></section>}
  </main>{!leadCaptured && <Footer />}</>;
}
