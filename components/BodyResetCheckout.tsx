"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type Product = {
  sku: string;
  name: string;
  tier: string;
  price: string;
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
  products: Product[];
};

const families: ProductFamily[] = [
  {
    key: "ultimate",
    name: "Ultimate YOU Experience",
    description: "Susie’s most complete package experience.",
    products: [
      {
        sku: "UEX",
        name: "Ultimate YOU Experience",
        tier: "Package",
        price: "$1,297",
        href: "https://api.armsreachdigital.com/payment-link/6a6da6b87b99151a54041af5",
      },
    ],
  },
  {
    key: "muscle",
    name: "Muscle + Strength + Tone Series",
    description: "Package choices for muscle activation, strengthening, and toning goals.",
    products: [
      {
        sku: "MST-20",
        name: "Muscle + Strength + Tone Series",
        tier: "20-Session Package",
        price: "$5,997",
        href: "https://api.armsreachdigital.com/payment-link/6a6da301a655fa0b802a7622",
      },
      {
        sku: "MST-10",
        name: "Muscle + Strength + Tone Series",
        tier: "10-Session Package",
        price: "$3,997",
        href: "https://api.armsreachdigital.com/payment-link/6a6da29c7b99151a54041ae9",
      },
      {
        sku: "MST-05",
        name: "Muscle + Strength + Tone Series",
        tier: "5-Session Package",
        price: "$2,497",
        href: "https://api.armsreachdigital.com/payment-link/6a6da211a655fa0b802a7620",
      },
      {
        sku: "MST-01",
        name: "Muscle + Strength + Tone Series",
        tier: "Single Session",
        price: "$597",
        href: "https://api.armsreachdigital.com/payment-link/6a6da028a655fa0b802a761d",
      },
    ],
  },
  {
    key: "body",
    name: "Body Contouring Series",
    description: "Package choices for targeted body contouring goals.",
    products: [
      {
        sku: "BC-20",
        name: "Body Contouring Series",
        tier: "20-Session Package",
        price: "$3,197",
        href: "https://api.armsreachdigital.com/payment-link/6a6da44fa655fa0b802a7625",
      },
      {
        sku: "BC-10",
        name: "Body Contouring Series",
        tier: "10-Session Package",
        price: "$1,697",
        href: "https://api.armsreachdigital.com/payment-link/6a6da41ea655fa0b802a7624",
      },
      {
        sku: "BC-05",
        name: "Body Contouring Series",
        tier: "5-Session Package",
        price: "$897",
        href: "https://api.armsreachdigital.com/payment-link/6a6da3e57b99151a54041aee",
      },
      {
        sku: "BC-01",
        name: "Body Contouring Series",
        tier: "Single Session",
        price: "$197",
        href: "https://api.armsreachdigital.com/payment-link/6a6da32fa655fa0b802a7623",
      },
    ],
  },
  {
    key: "fascia",
    name: "Fascia and Skin Revival Series",
    description: "Package choices focused on fascia, skin texture, and smoothing support.",
    products: [
      {
        sku: "FSR-20",
        name: "Fascia and Skin Revival Series",
        tier: "20-Session Package",
        price: "$3,197",
        href: "https://api.armsreachdigital.com/payment-link/6a6da7f07b99151a54041af8",
      },
      {
        sku: "FSR-10",
        name: "Fascia and Skin Revival Series",
        tier: "10-Session Package",
        price: "$1,697",
        href: "https://api.armsreachdigital.com/payment-link/6a6da84e7b99151a54041af9",
      },
      {
        sku: "FSR-05",
        name: "Fascia and Skin Revival Series",
        tier: "5-Session Package",
        price: "$897",
        href: "https://api.armsreachdigital.com/payment-link/6a6da727a655fa0b802a7629",
      },
      {
        sku: "FSR-01",
        name: "Fascia and Skin Revival Series",
        tier: "Single Session",
        price: "$197",
        href: "https://api.armsreachdigital.com/payment-link/6a6da6ec7b99151a54041af6",
      },
    ],
  },
  {
    key: "pelvic",
    name: "Pelvic Floor Strengthening Series",
    description: "Package choices for pelvic-floor strengthening support.",
    products: [
      {
        sku: "PFS-20",
        name: "Pelvic Floor Strengthening Series",
        tier: "20-Session Package",
        price: "$3,197",
        href: "https://api.armsreachdigital.com/payment-link/6a6e2f6da655fa0b802a76b8",
      },
      {
        sku: "PFS-10",
        name: "Pelvic Floor Strengthening Series",
        tier: "10-Session Package",
        price: "$1,697",
        href: "https://api.armsreachdigital.com/payment-link/6a6da5d87b99151a54041af4",
      },
      {
        sku: "PFS-05",
        name: "Pelvic Floor Strengthening Series",
        tier: "5-Session Package",
        price: "$897",
        href: "https://api.armsreachdigital.com/payment-link/6a6da591a655fa0b802a7627",
      },
      {
        sku: "PFS-01",
        name: "Pelvic Floor Strengthening Series",
        tier: "Single Session",
        price: "$197",
        href: "https://api.armsreachdigital.com/payment-link/6a6da4797b99151a54041af1",
      },
    ],
  },
  {
    key: "lymphatic",
    name: "Lymphatic Wellness Series",
    description: "Package choices for lymphatic wellness and feeling lighter.",
    products: [
      {
        sku: "LW-20",
        name: "Lymphatic Wellness Series",
        tier: "20-Session Package",
        price: "$1,597",
        href: "https://api.armsreachdigital.com/payment-link/6a6e1fc77b99151a54041b85",
      },
      {
        sku: "LW-10",
        name: "Lymphatic Wellness Series",
        tier: "10-Session Package",
        price: "$897",
        href: "https://api.armsreachdigital.com/payment-link/6a6e20567b99151a54041b87",
      },
      {
        sku: "LW-05",
        name: "Lymphatic Wellness Series",
        tier: "5-Session Package",
        price: "$497",
        href: "https://api.armsreachdigital.com/payment-link/6a6e221ea655fa0b802a76a6",
      },
      {
        sku: "LW-01",
        name: "Lymphatic Wellness Series",
        tier: "Single Session",
        price: "$147",
        href: "https://api.armsreachdigital.com/payment-link/6a6e2307a655fa0b802a76a7",
      },
    ],
  },
  {
    key: "pemf",
    name: "PEMF Recovery and Wellness Series",
    description: "Package choices for PEMF recovery and wellness support.",
    products: [
      {
        sku: "PEMF-20",
        name: "PEMF Recovery and Wellness Series",
        tier: "20-Session Package",
        price: "$797",
        href: "https://api.armsreachdigital.com/payment-link/6a6e20ba7b99151a54041b89",
      },
      {
        sku: "PEMF-10",
        name: "PEMF Recovery and Wellness Series",
        tier: "10-Session Package",
        price: "$497",
        href: "https://api.armsreachdigital.com/payment-link/6a6e22c57b99151a54041b8c",
      },
      {
        sku: "PEMF-05",
        name: "PEMF Recovery and Wellness Series",
        tier: "5-Session Package",
        price: "$297",
        href: "https://api.armsreachdigital.com/payment-link/6a6e2370a655fa0b802a76ab",
      },
      {
        sku: "PEMF-01",
        name: "PEMF Recovery and Wellness Series",
        tier: "Single Session",
        price: "$67",
        href: "https://api.armsreachdigital.com/payment-link/6a6e23957b99151a54041b8f",
      },
    ],
  },
];

function detectRecommendedFamily(text: string): FamilyKey {
  if (text.includes("Synergie Lymphatic Reset")) return "lymphatic";
  if (text.includes("PEMF Recovery & Frequency Wellness")) return "pemf";
  if (text.includes("Body Contour Transformation")) return "muscle";
  if (text.includes("Ultrasonic Cavitation & RF")) return "body";
  if (text.includes("Roller Body Contouring")) return "fascia";
  return "ultimate";
}

function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  return (
    <div
      className={`flex h-full flex-col rounded-[18px] border p-5 ${
        featured
          ? "border-purple/35 bg-purple/5 shadow-[0_8px_24px_rgba(60,40,80,0.08)]"
          : "border-stone bg-white/70"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-purple/70">
            {product.sku}
          </p>
          <h4 className="mt-1 font-serif text-2xl font-light leading-tight text-[#2c1f14]">
            {product.tier}
          </h4>
        </div>
        <p className="whitespace-nowrap font-serif text-3xl font-light text-purple">
          {product.price}
        </p>
      </div>
      <p className="mb-5 flex-1 font-sans text-sm font-light text-muted">
        {product.name}
      </p>
      <a href={product.href} className={featured ? "btn-primary w-full" : "btn-secondary w-full"}>
        {product.tier === "Single Session" ? "Purchase Single Session" : `Reserve ${product.tier}`}
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
        <p className="section-label mb-2">{recommended ? "Susie’s Recommended Checkout Path" : "Additional Checkout Option"}</p>
        <h3 className="font-serif text-3xl font-light leading-tight text-[#2c1f14] md:text-4xl">
          {family.name}
        </h3>
        <p className="mt-2 font-sans text-sm font-light leading-relaxed text-muted md:text-base">
          {family.description}
        </p>
      </div>
      <div className={`grid gap-4 ${family.products.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"}`}>
        {family.products.map((product, index) => (
          <ProductCard key={product.sku} product={product} featured={recommended && index === 0} />
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

  const otherFamilies = useMemo(
    () => families.filter((family) => family.key !== recommendedFamily.key),
    [recommendedFamily.key],
  );

  if (!portalTarget) return null;

  return createPortal(
    <>
      <style>{`[data-checkout-legacy="hidden"] { display: none !important; }`}</style>
      <div className="mb-6 space-y-5">
        <FamilySection family={recommendedFamily} recommended />

        <details className="rounded-[20px] border border-stone bg-white/70 p-5 md:p-6">
          <summary className="cursor-pointer list-none font-sans text-sm font-medium uppercase tracking-[0.12em] text-purple">
            View all other Susie Sculpts purchase options
          </summary>
          <div className="mt-6 space-y-5">
            {otherFamilies.map((family) => (
              <FamilySection key={family.key} family={family} />
            ))}
          </div>
        </details>
      </div>
    </>,
    portalTarget,
  );
}
