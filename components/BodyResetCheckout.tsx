"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

type Product = { name: string; count: number; price: number; duration: number | null; href: string };
type FamilyKey = "ultimate" | "muscle" | "body" | "fascia" | "pelvic" | "lymphatic" | "pemf";
type ProductFamily = { key: FamilyKey; name: string; description: string; included: string[]; products: Product[]; image: string };
type RecommendationContext = { reasons: string[]; notes: string[] };

const consultationBookingUrl =
  "https://api.armsreachdigital.com/widget/booking/3yvXSJo59kMORz5W3H4e";

const families: ProductFamily[] = [
  {
    key: "ultimate",
    name: 'The Ultimate "YOU" Experience',
    description: "Susie’s most complete six-treatment experience.",
    image: "/images/susie.jpg",
    included: [
      "One 55-minute Body Contouring Treatment",
      "One 55-minute Fascia and Skin Revival Treatment",
      "One 45-minute Lymphatic Wellness Treatment",
      "One 50-minute Muscle + Strength + Tone Treatment",
      "One 45-minute Pelvic Floor Strengthening Treatment",
      "One 30-minute PEMF Recovery and Wellness Treatment",
    ],
    products: [
      { name: 'The Ultimate "YOU" Experience', count: 6, price: 1297, duration: null, href: "https://api.armsreachdigital.com/payment-link/6a6da6b87b99151a54041af5" },
    ],
  },
  {
    key: "muscle",
    name: "Muscle + Strength + Tone Series",
    description: "Treatment series choices for muscle activation, strengthening, and toning goals.",
    image: "/images/susie.jpg",
    included: ["EMShape muscle activation treatment", "Strengthening and toning support", "50-minute treatment appointments", "Choose a 1, 5, 10, or 20-treatment series"],
    products: [
      { name: "Muscle + Strength + Tone Series", count: 20, price: 5997, duration: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da301a655fa0b802a7622" },
      { name: "Muscle + Strength + Tone Series", count: 10, price: 3997, duration: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da29c7b99151a54041ae9" },
      { name: "Muscle + Strength + Tone Series", count: 5, price: 2497, duration: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da211a655fa0b802a7620" },
      { name: "Muscle + Strength + Tone Treatment", count: 1, price: 597, duration: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da028a655fa0b802a761d" },
    ],
  },
  {
    key: "body",
    name: "Body Contouring Series",
    description: "Treatment series choices for targeted body-contouring goals.",
    image: "/images/susie.jpg",
    included: ["Ultrasonic cavitation treatment", "RF skin-tightening support", "55-minute treatment appointments", "Choose a 1, 5, 10, or 20-treatment series"],
    products: [
      { name: "Body Contouring Series", count: 20, price: 3197, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da44fa655fa0b802a7625" },
      { name: "Body Contouring Series", count: 10, price: 1697, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da41ea655fa0b802a7624" },
      { name: "Body Contouring Series", count: 5, price: 897, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da3e57b99151a54041aee" },
      { name: "Body Contouring Treatment", count: 1, price: 197, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da32fa655fa0b802a7623" },
    ],
  },
  {
    key: "fascia",
    name: "Fascia and Skin Revival Series",
    description: "Treatment series choices focused on fascia, skin texture, and smoothing support.",
    image: "/images/susie.jpg",
    included: ["Rollerwave fascia treatment", "Circulation and skin-texture support", "55-minute treatment appointments", "Choose a 1, 5, 10, or 20-treatment series"],
    products: [
      { name: "Fascia and Skin Revival Series", count: 20, price: 3197, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da7f07b99151a54041af8" },
      { name: "Fascia and Skin Revival Series", count: 10, price: 1697, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da84e7b99151a54041af9" },
      { name: "Fascia and Skin Revival Series", count: 5, price: 897, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da727a655fa0b802a7629" },
      { name: "Fascia and Skin Revival Treatment", count: 1, price: 197, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da6ec7b99151a54041af6" },
    ],
  },
  {
    key: "pelvic",
    name: "Pelvic Floor Strengthening Series",
    description: "Treatment series choices for pelvic-floor and deep-core strengthening support.",
    image: "/images/susie.jpg",
    included: ["Pelvic-floor muscle activation treatment", "Fully clothed, private appointment", "45-minute treatment appointments", "Choose a 1, 5, 10, or 20-treatment series"],
    products: [
      { name: "Pelvic Floor Strengthening Series", count: 20, price: 3197, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e2f6da655fa0b802a76b8" },
      { name: "Pelvic Floor Strengthening Series", count: 10, price: 1697, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6da5d87b99151a54041af4" },
      { name: "Pelvic Floor Strengthening Series", count: 5, price: 897, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6da591a655fa0b802a7627" },
      { name: "Pelvic Floor Strengthening Treatment", count: 1, price: 197, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6da4797b99151a54041af1" },
    ],
  },
  {
    key: "lymphatic",
    name: "Lymphatic Wellness Series",
    description: "Treatment series choices for lymphatic wellness and feeling lighter.",
    image: "/images/susie.jpg",
    included: ["Synergie vacuum massage treatment", "Lymphatic-flow and circulation support", "45-minute treatment appointments", "Required spandex bodysuit included"],
    products: [
      { name: "Lymphatic Wellness Series", count: 20, price: 1597, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e1fc77b99151a54041b85" },
      { name: "Lymphatic Wellness Series", count: 10, price: 897, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e20567b99151a54041b87" },
      { name: "Lymphatic Wellness Series", count: 5, price: 497, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e221ea655fa0b802a76a6" },
      { name: "Lymphatic Wellness Treatment", count: 1, price: 147, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e2307a655fa0b802a76a7" },
    ],
  },
  {
    key: "pemf",
    name: "PEMF Recovery and Wellness Series",
    description: "Treatment series choices for PEMF recovery and wellness support.",
    image: "/images/susie.jpg",
    included: ["PEMF recovery and wellness treatment", "Relaxation, circulation, and energy support", "30-minute treatment appointments", "Choose a 1, 5, 10, or 20-treatment series"],
    products: [
      { name: "PEMF Recovery and Wellness Series", count: 20, price: 797, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e20ba7b99151a54041b89" },
      { name: "PEMF Recovery and Wellness Series", count: 10, price: 497, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e22c57b99151a54041b8c" },
      { name: "PEMF Recovery and Wellness Series", count: 5, price: 297, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e2370a655fa0b802a76ab" },
      { name: "PEMF Recovery and Wellness Treatment", count: 1, price: 67, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e23957b99151a54041b8f" },
    ],
  },
];

function detectRecommendedFamily(text: string): FamilyKey {
  if (text.includes("Pelvic Floor Strengthening")) return "pelvic";
  if (text.includes("Muscle + Strength + Tone") || text.includes("Muscle and Strength and Tone")) return "muscle";
  if (text.includes("Body Contouring")) return "body";
  if (text.includes("Fascia and Skin Revival")) return "fascia";
  if (text.includes("PEMF Recovery")) return "pemf";
  if (text.includes("Lymphatic Wellness")) return "lymphatic";
  return "ultimate";
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function getFirstName() {
  const input = document.querySelector<HTMLInputElement>('input[placeholder="First name*"]');
  return input?.value.trim().split(/\s+/)[0] || "there";
}

function extractRecommendationContext(root: HTMLElement): RecommendationContext {
  const heading = Array.from(root.querySelectorAll<HTMLElement>("p, h2, h3, h4")).find(
    (node) => node.textContent?.trim().toLowerCase() === "why this recommendation came up",
  );
  const block = heading?.closest<HTMLElement>("div.rounded-[18px]");
  const reasons = block
    ? Array.from(block.querySelectorAll<HTMLLIElement>("li"))
        .map((item) => item.textContent?.trim() ?? "")
        .filter(Boolean)
    : [];
  const notes = block
    ? Array.from(block.querySelectorAll<HTMLParagraphElement>("p"))
        .map((item) => item.textContent?.trim() ?? "")
        .filter((text) => text && text.toLowerCase() !== "why this recommendation came up" && text.toLowerCase() !== "important note")
    : [];
  return { reasons, notes };
}

function findRecommendationSource(root: HTMLElement): HTMLElement {
  const directChildren = Array.from(root.children) as HTMLElement[];
  const recommendedCard = directChildren.find((child) =>
    Array.from(child.querySelectorAll<HTMLElement>("p")).some(
      (node) => node.textContent?.trim().toLowerCase() === "recommended series",
    ),
  );
  return recommendedCard ?? directChildren[1] ?? root;
}

function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const isSingle = product.count === 1;
  const perTreatment = product.price / product.count;
  const detail = product.duration
    ? isSingle
      ? `${product.duration}-minute treatment`
      : `${money(perTreatment)} per ${product.duration}-minute treatment`
    : "Six treatments intended over one week — two per day, every other day.";
  const buttonLabel = isSingle
    ? `I WANT 1 ${product.name.toUpperCase()}`
    : product.count === 6
      ? "I WANT THE ULTIMATE YOU EXPERIENCE"
      : `I WANT ${product.count} ${product.name.toUpperCase()} TREATMENTS`;

  return (
    <div className={`flex h-full flex-col rounded-[18px] border p-4 ${featured ? "border-purple/35 bg-purple/5 shadow-[0_8px_24px_rgba(60,40,80,0.08)]" : "border-stone bg-white/80"}`}>
      <p className="section-label mb-2">{isSingle ? "Single Treatment" : `${product.count}-Treatment Series`}</p>
      <div className="mb-4 rounded-[14px] border border-purple/15 bg-white/85 p-3 text-center">
        <p className="font-serif text-4xl font-light text-purple">{money(product.price)}</p>
        <p className="mt-2 font-sans text-[11px] font-medium uppercase tracking-[0.06em] text-muted">{detail}</p>
      </div>
      <a href={product.href} className={featured ? "btn-primary mt-auto w-full" : "btn-secondary mt-auto w-full"}>{buttonLabel}</a>
    </div>
  );
}

function FamilySection({ family, recommended = false }: { family: ProductFamily; recommended?: boolean }) {
  return (
    <section className={`rounded-[22px] border p-5 md:p-6 ${recommended ? "border-purple/25 bg-white/90" : "border-stone bg-stone/25"}`}>
      <div className="mb-5">
        <p className="section-label mb-2">{recommended ? "Susie’s Recommended Series" : "Treatment Series Options"}</p>
        <h3 className="font-serif text-3xl font-light leading-tight text-[#2c1f14] md:text-4xl">{family.name}</h3>
        <p className="mt-2 font-sans text-sm font-light leading-relaxed text-muted md:text-base">{family.description}</p>
      </div>
      <div className="mb-5 rounded-[18px] border border-purple/15 bg-white/75 p-5">
        <p className="section-label mb-3">What&apos;s Included</p>
        <ul className="space-y-2 font-sans text-sm font-light text-muted">
          {family.included.map((item) => <li key={item} className="flex items-start gap-3"><span className="mt-0.5 text-purple">✦</span><span>{item}</span></li>)}
        </ul>
      </div>
      <div className={`grid gap-4 ${family.products.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"}`}>
        {family.products.map((product, index) => <ProductCard key={`${family.key}-${product.count}`} product={product} featured={recommended && index === 0} />)}
      </div>
    </section>
  );
}

function PersonalizedSummary({ firstName, family, context }: { firstName: string; family: ProductFamily; context: RecommendationContext }) {
  const reasons = context.reasons.length
    ? context.reasons
    : [`Your answers point to ${family.name} as the most logical place to begin.`];

  return (
    <section className="rounded-[22px] border border-purple/15 bg-white p-5 shadow-[0_8px_24px_rgba(60,40,80,0.06)] md:p-7">
      <p className="section-label mb-3">Your Personalized Recommendation</p>
      <h1 className="font-serif text-3xl font-light leading-tight text-[#2c1f14] md:text-5xl">{firstName}...</h1>
      <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted md:text-base">Based on what you shared:</p>
      <ul className="mt-4 space-y-2">
        {reasons.map((reason) => <li key={reason} className="flex items-start gap-3 font-sans text-sm font-light leading-relaxed text-muted"><span className="mt-1 text-purple">•</span><span>{reason}</span></li>)}
      </ul>
      <div className="mt-5 rounded-[16px] border border-purple/15 bg-purple/5 p-4 md:p-5">
        <p className="font-sans text-sm font-medium leading-relaxed text-[#2c1f14] md:text-base">My recommendation is <span className="text-purple">{family.name}</span>.</p>
      </div>
      <div className="mt-5 border-t border-purple/15 pt-4 font-sans text-xs font-light leading-relaxed text-muted/80">
        <p><span className="font-medium text-[#2c1f14]">Important note:</span> This is not a diagnosis. It is a starting-point recommendation designed to make your first conversation with Susie more useful. Susie will confirm the right series and number of sessions after she understands your goals, comfort level, and budget.</p>
      </div>
    </section>
  );
}

function FlipFamilyCard({ family }: { family: ProductFamily }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="min-h-[820px] [perspective:1400px]">
      <div className={`relative min-h-[820px] w-full transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
        <button type="button" onClick={() => setFlipped(true)} className="absolute inset-0 overflow-hidden rounded-[24px] border border-purple/15 bg-white text-left shadow-[0_12px_32px_rgba(60,40,80,0.10)] transition hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(60,40,80,0.16)] [backface-visibility:hidden]">
          <div className="relative h-[620px] w-full"><Image src={family.image} alt={`Susie performing ${family.name}`} fill className="object-cover object-top" sizes="(max-width: 768px) 94vw, 520px" /></div>
          <div className="p-6 text-center"><p className="section-label mb-2">Treatment Series</p><h3 className="font-serif text-3xl font-light text-[#2c1f14]">{family.name}</h3><p className="mt-3 font-sans text-xs font-medium uppercase tracking-[0.12em] text-purple">Tap to learn more</p></div>
        </button>
        <div className="absolute inset-0 overflow-y-auto rounded-[24px] bg-cream p-1 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <button type="button" onClick={() => setFlipped(false)} className="sticky top-2 z-10 ml-auto mr-2 mt-2 flex h-9 w-9 items-center justify-center rounded-full border border-purple/20 bg-white text-purple" aria-label="Show treatment photo">×</button>
          <FamilySection family={family} />
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <section id="evaluation-testimonials" className="scroll-mt-24 rounded-[24px] border border-purple/15 bg-purple/5 p-6 text-center md:p-8">
      <div className="mb-3 text-gold">★★★★★</div>
      <p className="font-serif text-xl font-light italic leading-relaxed text-[#2c1f14] md:text-2xl">“I am so grateful to Susie and her expertise on Synergie. I lost 26 pounds and went down 2 sizes. I was skeptical in the beginning, but I trusted her. I am thrilled with the results and I feel great.”</p>
      <p className="mt-4 font-sans text-xs font-medium uppercase tracking-[0.14em] text-purple/70">— Leslie Y.</p>
      <p className="mt-2 font-sans text-[11px] font-light text-muted/70">Individual results vary. Testimonial shared from a Susie Sculpts client.</p>
    </section>
  );
}

export default function BodyResetCheckout() {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [recommendedKey, setRecommendedKey] = useState<FamilyKey>("ultimate");
  const [recommendationContext, setRecommendationContext] = useState<RecommendationContext>({ reasons: [], notes: [] });
  const [firstName, setFirstName] = useState("there");

  useEffect(() => {
    let host: HTMLElement | null = null;
    let claim: HTMLElement | null = null;
    let hiddenChildren: HTMLElement[] = [];

    const attach = () => {
      const root = document.getElementById("results") as HTMLElement | null;
      if (!root || root.dataset.checkoutAttached === "true") return;

      root.dataset.checkoutAttached = "true";
      const source = findRecommendationSource(root);
      const key = detectRecommendedFamily(source.textContent ?? "");
      const context = extractRecommendationContext(root);

      setRecommendedKey(key);
      setRecommendationContext(context);
      setFirstName(getFirstName());

      claim = document.getElementById("claim") as HTMLElement | null;
      if (claim) claim.style.display = "none";

      hiddenChildren = Array.from(root.children) as HTMLElement[];
      hiddenChildren.forEach((child) => child.setAttribute("data-checkout-legacy", "hidden"));

      host = document.createElement("div");
      host.id = "live-stripe-checkout";
      root.insertBefore(host, root.firstChild);
      document.body.dataset.evaluationComplete = "true";
      setPortalTarget(host);
    };

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });
    attach();

    return () => {
      observer.disconnect();
      hiddenChildren.forEach((child) => child.removeAttribute("data-checkout-legacy"));
      host?.remove();
      if (claim) claim.style.display = "";
      document.body.removeAttribute("data-evaluation-complete");
    };
  }, []);

  const recommendedFamily = useMemo(
    () => families.find((family) => family.key === recommendedKey) ?? families[0],
    [recommendedKey],
  );
  const otherTreatmentFamilies = useMemo(
    () => families.filter((family) => family.key !== recommendedFamily.key),
    [recommendedFamily.key],
  );

  if (!portalTarget) return null;

  return createPortal(
    <>
      <style>{`[data-checkout-legacy="hidden"]{display:none!important;}`}</style>
      <div className="space-y-8 pb-8">
        <PersonalizedSummary firstName={firstName} family={recommendedFamily} context={recommendationContext} />
        <FamilySection family={recommendedFamily} recommended />
        <section id="full-treatment-list" className="scroll-mt-24">
          <div className="mb-6 text-center">
            <p className="section-label mb-3">Full Treatment Option List</p>
            <h2 className="font-serif text-4xl font-light text-[#2c1f14]">Explore Every Susie Sculpts Series</h2>
            <p className="mx-auto mt-3 max-w-2xl font-sans text-sm font-light text-muted">Tap each photo to flip the card and view its treatment descriptions, series prices, per-treatment cost, and checkout links.</p>
          </div>
          <div className="grid gap-7 lg:grid-cols-2">{otherTreatmentFamilies.map((family) => <FlipFamilyCard key={family.key} family={family} />)}</div>
        </section>
        <section className="rounded-[22px] border border-purple/15 bg-white p-5 text-center md:p-7">
          <p className="font-serif text-2xl font-light text-[#2c1f14]">Not ready to choose a series yet?</p>
          <p className="mx-auto mt-2 max-w-xl font-sans text-sm font-light text-muted">Talk with Susie before selecting a paid treatment option.</p>
          <a href={consultationBookingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 inline-block">Book Your FREE Professional Consult</a>
        </section>
        <Testimonials />
      </div>
    </>,
    portalTarget,
  );
}
