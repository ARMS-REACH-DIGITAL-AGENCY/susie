"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type Product = {
  name: string;
  count: number;
  price: number;
  duration: number | null;
  href: string;
};

type FamilyKey =
  | "ultimate"
  | "muscle"
  | "body"
  | "fascia"
  | "pelvic"
  | "lymphatic"
  | "pemf";

type ProductFamily = {
  key: FamilyKey;
  name: string;
  description: string;
  included: string[];
  products: Product[];
};

const families: ProductFamily[] = [
  {
    key: "ultimate",
    name: 'The Ultimate "YOU" Experience',
    description: "Susie’s most complete six-treatment series.",
    included: [
      "(1) 55-minute Body Contouring Treatment",
      "(1) 55-minute Fascia and Skin Revival Treatment",
      "(1) 45-minute Lymphatic Wellness Treatment",
      "(1) 50-minute Muscle + Strength + Tone Treatment",
      "(1) 45-minute Pelvic Floor Strengthening Treatment",
      "(1) 30-minute PEMF Recovery and Wellness Treatment",
    ],
    products: [
      {
        name: 'The Ultimate "YOU" Experience',
        count: 6,
        price: 1297,
        duration: null,
        href: "https://api.armsreachdigital.com/payment-link/6a6da6b87b99151a54041af5",
      },
    ],
  },
  {
    key: "muscle",
    name: "Muscle + Strength + Tone Series",
    description: "Treatment series choices for muscle activation, strengthening, and toning goals.",
    included: [
      "EMShape muscle activation treatment",
      "Strengthening and toning support",
      "50-minute treatment appointments",
      "Choose a 1, 5, 10, or 20-treatment series",
    ],
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
    included: [
      "Ultrasonic cavitation treatment",
      "RF skin-tightening support",
      "55-minute treatment appointments",
      "Choose a 1, 5, 10, or 20-treatment series",
    ],
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
    included: [
      "Rollerwave fascia treatment",
      "Circulation and skin-texture support",
      "55-minute treatment appointments",
      "Choose a 1, 5, 10, or 20-treatment series",
    ],
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
    included: [
      "Pelvic-floor muscle activation treatment",
      "Fully clothed, private appointment",
      "45-minute treatment appointments",
      "Choose a 1, 5, 10, or 20-treatment series",
    ],
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
    included: [
      "Synergie vacuum massage treatment",
      "Lymphatic-flow and circulation support",
      "45-minute treatment appointments",
      "Required spandex bodysuit included",
    ],
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
    included: [
      "PEMF recovery and wellness treatment",
      "Relaxation, circulation, and energy support",
      "30-minute treatment appointments",
      "Choose a 1, 5, 10, or 20-treatment series",
    ],
    products: [
      { name: "PEMF Recovery and Wellness Series", count: 20, price: 797, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e20ba7b99151a54041b89" },
      { name: "PEMF Recovery and Wellness Series", count: 10, price: 497, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e22c57b99151a54041b8c" },
      { name: "PEMF Recovery and Wellness Series", count: 5, price: 297, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e2370a655fa0b802a76ab" },
      { name: "PEMF Recovery and Wellness Treatment", count: 1, price: 67, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e23957b99151a54041b8f" },
    ],
  },
];

function detectRecommendedFamily(text: string): FamilyKey {
  if (text.includes("Lymphatic Wellness Series") || text.includes("Synergie Lymphatic Reset")) return "lymphatic";
  if (text.includes("PEMF Recovery and Wellness Series") || text.includes("PEMF Recovery & Frequency Wellness")) return "pemf";
  if (text.includes("Muscle + Strength + Tone Series") || text.includes("Body Contour Transformation")) return "muscle";
  if (text.includes("Body Contouring Series") || text.includes("Ultrasonic Cavitation & RF")) return "body";
  if (text.includes("Fascia and Skin Revival Series") || text.includes("Roller Body Contouring")) return "fascia";
  if (text.includes("Pelvic Floor Strengthening Series")) return "pelvic";
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

function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const perTreatment = product.price / product.count;
  const isSingle = product.count === 1;
  const seriesLabel = isSingle ? "Single Treatment" : `${product.count}-Treatment Series`;
  const buttonLabel = isSingle
    ? "RESERVE YOUR TREATMENT"
    : `RESERVE YOUR ${product.count} TREATMENT SERIES`;

  return (
    <div
      className={`flex h-full flex-col rounded-[18px] border p-5 ${
        featured
          ? "border-purple/35 bg-purple/5 shadow-[0_8px_24px_rgba(60,40,80,0.08)]"
          : "border-stone bg-white/70"
      }`}
    >
      <div className="mb-4">
        <p className="section-label mb-2">{seriesLabel}</p>
        <h4 className="font-serif text-2xl font-light leading-tight text-[#2c1f14]">
          {product.name}
        </h4>
      </div>

      <div className="mb-5 rounded-[16px] border border-purple/15 bg-white/80 p-4 text-center">
        <p className="font-serif text-4xl font-light text-purple">{money(product.price)}</p>
        <p className="mt-2 font-sans text-xs font-medium uppercase tracking-[0.08em] text-muted">
          {isSingle
            ? `${product.duration}-minute treatment`
            : product.duration
              ? `${money(perTreatment)} per ${product.duration}-minute treatment`
              : `${money(perTreatment)} average per treatment`}
        </p>
      </div>

      <a href={product.href} className={featured ? "btn-primary mt-auto w-full" : "btn-secondary mt-auto w-full"}>
        {buttonLabel}
      </a>
    </div>
  );
}

function FamilySection({ family, recommended = false }: { family: ProductFamily; recommended?: boolean }) {
  return (
    <section
      className={`rounded-[22px] border p-5 md:p-6 ${
        recommended ? "border-purple/25 bg-white/90" : "border-stone bg-stone/25"
      }`}
    >
      <div className="mb-5">
        <p className="section-label mb-2">
          {recommended ? "Susie’s Recommended Series" : "Additional Treatment Series"}
        </p>
        <h3 className="font-serif text-3xl font-light leading-tight text-[#2c1f14] md:text-4xl">
          {family.name}
        </h3>
        <p className="mt-2 font-sans text-sm font-light leading-relaxed text-muted md:text-base">
          {family.description}
        </p>
      </div>

      <div className="mb-5 rounded-[18px] border border-purple/15 bg-white/75 p-5">
        <p className="section-label mb-3">What&apos;s Included</p>
        <ul className="space-y-2 font-sans text-sm font-light text-muted">
          {family.included.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 text-purple">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`grid gap-4 ${family.products.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"}`}>
        {family.products.map((product, index) => (
          <ProductCard
            key={`${family.key}-${product.count}`}
            product={product}
            featured={recommended && index === 0}
          />
        ))}
      </div>
    </section>
  );
}

export default function BodyResetCheckout() {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [recommendedKey, setRecommendedKey] = useState<FamilyKey>("ultimate");

  useEffect(() => {
    let activeRoot: HTMLElement | null = null;
    let activeHost: HTMLElement | null = null;
    let hiddenChildren: HTMLElement[] = [];

    const detach = () => {
      hiddenChildren.forEach((child) => child.removeAttribute("data-checkout-legacy"));
      hiddenChildren = [];
      activeHost?.remove();
      activeHost = null;
      activeRoot = null;
      document.body.removeAttribute("data-evaluation-complete");
      setPortalTarget(null);
    };

    const attach = () => {
      const root = document.getElementById("results");
      if (!root || root === activeRoot) return;

      detach();
      activeRoot = root;

      const originalChildren = Array.from(root.children) as HTMLElement[];
      hiddenChildren = originalChildren.filter((_, index) => [0, 1, 3, 4].includes(index));
      hiddenChildren.forEach((child) => child.setAttribute("data-checkout-legacy", "hidden"));

      const host = document.createElement("div");
      host.id = "live-stripe-checkout";
      root.insertBefore(host, root.firstChild);
      activeHost = host;

      setRecommendedKey(detectRecommendedFamily(root.textContent ?? ""));
      document.body.setAttribute("data-evaluation-complete", "true");
      window.dispatchEvent(new Event("evaluation-complete"));
      setPortalTarget(host);
    };

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });
    attach();

    return () => {
      observer.disconnect();
      detach();
    };
  }, []);

  const recommendedFamily = useMemo(
    () => families.find((family) => family.key === recommendedKey) ?? families[0],
    [recommendedKey],
  );

  if (!portalTarget) return null;

  return createPortal(
    <>
      <style>{`[data-checkout-legacy="hidden"] { display: none !important; }`}</style>
      <div className="mb-6">
        <FamilySection family={recommendedFamily} recommended />
      </div>
    </>,
    portalTarget,
  );
}
