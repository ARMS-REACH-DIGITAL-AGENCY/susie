"use client";

import { useState } from "react";
import Image from "next/image";

export type RecommendationKey = "ultimate" | "pemf" | "lymphatic" | "fascia" | "pelvic" | "contour" | "muscle";

type Tier = { count: number; price: number; minutes: number | null; href: string };
type Series = {
  key: RecommendationKey;
  name: string;
  description: string;
  image: string;
  included: string[];
  tiers: Tier[];
};

const consultationUrl = "https://api.armsreachdigital.com/widget/booking/3yvXSJo59kMORz5W3H4e";

const series: Series[] = [
  {
    key: "ultimate",
    name: 'The Ultimate "YOU" Experience',
    description: "A complete six-treatment experience designed to help Susie identify the best focused path for you.",
    image: "/images/susie-treatment-hero.png",
    included: ["One treatment from each of Susie’s six signature treatment series", "A complete whole-body starting experience", "Designed to help narrow the best ongoing plan"],
    tiers: [{ count: 6, price: 1297, minutes: null, href: "https://api.armsreachdigital.com/payment-link/6a6da6b87b99151a54041af5" }],
  },
  {
    key: "pemf",
    name: "PEMF Recovery and Wellness Series",
    description: "Recovery and wellness support for aches, fatigue, stress, fogginess, and low energy.",
    image: "/images/treatment-pemf.png",
    included: ["30-minute PEMF sessions", "Recovery, relaxation, circulation, and energy support", "Choose 1, 5, 10, or 20 treatments"],
    tiers: [
      { count: 20, price: 797, minutes: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e20ba7b99151a54041b89" },
      { count: 10, price: 497, minutes: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e22c57b99151a54041b8c" },
      { count: 5, price: 297, minutes: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e2370a655fa0b802a76ab" },
      { count: 1, price: 67, minutes: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e23957b99151a54041b8f" },
    ],
  },
  {
    key: "lymphatic",
    name: "Lymphatic Wellness Series",
    description: "Lymphatic and circulation support for puffiness, bloating, heaviness, and sluggishness.",
    image: "/images/treatment-lymphatic.png",
    included: ["45-minute Synergie sessions", "Lymphatic-flow and circulation support", "Required spandex bodysuit included"],
    tiers: [
      { count: 20, price: 1597, minutes: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e1fc77b99151a54041b85" },
      { count: 10, price: 897, minutes: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e20567b99151a54041b87" },
      { count: 5, price: 497, minutes: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e221ea655fa0b802a76a6" },
      { count: 1, price: 147, minutes: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e2307a655fa0b802a76a7" },
    ],
  },
  {
    key: "fascia",
    name: "Fascia and Skin Revival Series",
    description: "Fascia, circulation, skin-texture, and smoothing support.",
    image: "/images/treatment-fascia.png",
    included: ["55-minute Rollerwave sessions", "Fascia and circulation support", "Skin texture and smoothing focus"],
    tiers: [
      { count: 20, price: 3197, minutes: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da7f07b99151a54041af8" },
      { count: 10, price: 1697, minutes: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da84e7b99151a54041af9" },
      { count: 5, price: 897, minutes: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da727a655fa0b802a7629" },
      { count: 1, price: 197, minutes: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da6ec7b99151a54041af6" },
    ],
  },
  {
    key: "pelvic",
    name: "Pelvic Floor Strengthening Series",
    description: "Pelvic-floor and deep-core strengthening support in a private, fully clothed session.",
    image: "/images/treatment-pelvic.png",
    included: ["45-minute strengthening sessions", "Pelvic-floor and deep-core activation", "Private and fully clothed"],
    tiers: [
      { count: 20, price: 3197, minutes: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e2f6da655fa0b802a76b8" },
      { count: 10, price: 1697, minutes: 45, href: "https://api.armsreachdigital.com/payment-link/6a6da5d87b99151a54041af4" },
      { count: 5, price: 897, minutes: 45, href: "https://api.armsreachdigital.com/payment-link/6a6da591a655fa0b802a7627" },
      { count: 1, price: 197, minutes: 45, href: "https://api.armsreachdigital.com/payment-link/6a6da4797b99151a54041af1" },
    ],
  },
  {
    key: "contour",
    name: "Body Contouring Series",
    description: "Targeted support for inches, stubborn areas, skin tightening, and contouring goals.",
    image: "/images/treatment-contour.png",
    included: ["55-minute cavitation sessions", "Ultrasound cavitation and RF support", "Targeted body-contouring focus"],
    tiers: [
      { count: 20, price: 3197, minutes: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da44fa655fa0b802a7625" },
      { count: 10, price: 1697, minutes: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da41ea655fa0b802a7624" },
      { count: 5, price: 897, minutes: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da3e57b99151a54041aee" },
      { count: 1, price: 197, minutes: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da32fa655fa0b802a7623" },
    ],
  },
  {
    key: "muscle",
    name: "Muscle + Strength + Tone Series",
    description: "Muscle activation, strengthening, toning, and body-sculpting support.",
    image: "/images/treatment-muscle.png",
    included: ["50-minute EMShape sessions", "Muscle activation and strengthening", "Toning and body-sculpting support"],
    tiers: [
      { count: 20, price: 5997, minutes: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da301a655fa0b802a7622" },
      { count: 10, price: 3997, minutes: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da29c7b99151a54041ae9" },
      { count: 5, price: 2497, minutes: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da211a655fa0b802a7620" },
      { count: 1, price: 597, minutes: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da028a655fa0b802a761d" },
    ],
  },
];

function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function PricingGrid({ item, recommended = false }: { item: Series; recommended?: boolean }) {
  return (
    <div className={`rounded-[22px] border p-5 md:p-7 ${recommended ? "border-purple/25 bg-white" : "border-purple/15 bg-stone/20"}`}>
      <p className="section-label mb-2">{recommended ? "Susie’s Recommended Series" : "Treatment Series"}</p>
      <h2 className="font-serif text-3xl font-light text-[#2c1f14] md:text-4xl">{item.name}</h2>
      <p className="mt-3 text-sm font-light leading-relaxed text-muted md:text-base">{item.description}</p>
      <div className="mt-5 rounded-[16px] border border-purple/15 bg-white/80 p-5">
        <p className="section-label mb-3">What’s Included</p>
        <ul className="space-y-2">{item.included.map((line) => <li key={line} className="flex gap-3 text-sm font-light text-muted"><span className="text-purple">✦</span><span>{line}</span></li>)}</ul>
      </div>
      <div className={`mt-5 grid gap-4 ${item.tiers.length === 1 ? "grid-cols-1" : "sm:grid-cols-2"}`}>
        {item.tiers.map((tier, index) => {
          const featured = recommended && index === 0;
          const perTreatment = tier.count > 1 ? tier.price / tier.count : tier.price;
          return (
            <div key={`${item.key}-${tier.count}`} className={`flex flex-col rounded-[16px] border p-4 ${featured ? "border-purple bg-purple/5 shadow-[0_8px_22px_rgba(80,55,120,.10)]" : "border-purple/15 bg-white"}`}>
              <p className="section-label mb-2">{tier.count === 1 ? "Single Treatment" : `${tier.count}-Treatment Series`}</p>
              <p className="font-serif text-4xl font-light text-purple">{currency(tier.price)}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[.08em] text-muted">{tier.count > 1 ? `${currency(perTreatment)} per treatment` : `${tier.minutes ?? ""}-minute treatment`}</p>
              <a href={tier.href} className={featured ? "btn-primary mt-5 text-center" : "btn-secondary mt-5 text-center"}>{tier.count === 1 ? `I Want 1 ${item.name.replace(" Series", " Treatment")}` : `I Want ${tier.count} ${item.name.replace(" Series", " Treatments")}`}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FlipCard({ item }: { item: Series }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="min-h-[640px] [perspective:1400px]">
      <div className={`relative min-h-[640px] w-full transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
        <button type="button" onClick={() => setFlipped(true)} className="absolute inset-0 overflow-hidden rounded-[24px] border border-purple/15 bg-white text-left shadow-[0_12px_32px_rgba(60,40,80,.10)] transition hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(60,40,80,.16)] [backface-visibility:hidden]">
          <div className="relative h-[470px] w-full bg-stone/30"><Image src={item.image} alt={item.name} fill className="object-contain p-8" sizes="(max-width: 768px) 92vw, 48vw" /></div>
          <div className="p-6 text-center"><p className="section-label mb-2">Treatment Series</p><h3 className="font-serif text-3xl font-light text-[#2c1f14]">{item.name}</h3><p className="mt-3 text-xs font-medium uppercase tracking-[.12em] text-purple">Tap to learn more</p></div>
        </button>
        <div className="absolute inset-0 overflow-y-auto rounded-[24px] bg-cream p-2 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <button type="button" onClick={() => setFlipped(false)} className="sticky top-2 z-10 ml-auto mr-2 mt-2 flex h-9 w-9 items-center justify-center rounded-full border border-purple/20 bg-white text-purple" aria-label="Show treatment image">×</button>
          <PricingGrid item={item} />
        </div>
      </div>
    </div>
  );
}

export default function BodyResetResults({ firstName, recommendationKey, reasons }: { firstName: string; recommendationKey: RecommendationKey; reasons: string[] }) {
  const recommended = series.find((item) => item.key === recommendationKey) ?? series[0];
  const remaining = series.filter((item) => item.key !== recommended.key);

  return (
    <main className="bg-cream pb-16 pt-24 md:pt-28">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
        <section className="rounded-[22px] border border-purple/15 bg-white p-5 shadow-[0_8px_24px_rgba(60,40,80,.06)] md:p-8">
          <p className="section-label mb-3">Your Personalized Recommendation</p>
          <h1 className="font-serif text-4xl font-light text-[#2c1f14] md:text-5xl">{firstName}...</h1>
          <p className="mt-4 text-base font-light text-muted">Based on what you shared:</p>
          <ul className="mt-4 space-y-3">{reasons.map((reason) => <li key={reason} className="flex gap-3 text-sm font-light leading-relaxed text-muted"><span className="text-purple">•</span><span>{reason}</span></li>)}</ul>
          <div className="mt-6 rounded-[16px] border border-purple/15 bg-purple/5 p-5"><p className="text-base font-medium text-[#2c1f14]">My recommendation is <span className="text-purple">{recommended.name}</span>.</p></div>
          <p className="mt-5 border-t border-purple/15 pt-4 text-xs font-light leading-relaxed text-muted/80"><strong className="font-medium text-[#2c1f14]">Important note:</strong> This is not a diagnosis. It is a starting-point recommendation designed to make your first conversation with Susie more useful. Susie will confirm the right series and number of sessions after she understands your goals, comfort level, and budget.</p>
        </section>

        <PricingGrid item={recommended} recommended />

        <section>
          <div className="mb-6 text-center"><p className="section-label mb-3">Full Treatment Option List</p><h2 className="font-serif text-4xl font-light text-[#2c1f14]">Explore Every Susie Sculpts Series</h2><p className="mx-auto mt-3 max-w-2xl text-sm font-light text-muted">Tap each treatment image to flip the card and view the description, pricing options, per-treatment value, and secure checkout links.</p></div>
          <div className="grid gap-7 lg:grid-cols-2">{remaining.map((item) => <FlipCard key={item.key} item={item} />)}</div>
        </section>

        <section className="rounded-[22px] border border-purple/15 bg-white p-5 text-center md:p-7"><h2 className="font-serif text-3xl font-light text-[#2c1f14]">Talk with Susie before choosing</h2><p className="mx-auto mt-2 max-w-xl text-sm font-light text-muted">Review the recommendation together and confirm the right number of sessions.</p><a href={consultationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 inline-block">Book Your FREE Professional Consult</a></section>
      </div>
    </main>
  );
}
