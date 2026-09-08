"use client";

import Image from "next/image";
import { useState } from "react";
import { treatmentOffers, type TreatmentOffer, type TreatmentProduct } from "@/lib/treatment-offers";

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function packageLabel(product: TreatmentProduct) {
  if (product.count === 6 && product.duration === null) return "Complete Experience";
  return product.count === 1 ? "Single Treatment" : `${product.count}-Treatment Series`;
}

function packageDetail(offer: TreatmentOffer, product: TreatmentProduct) {
  if (product.count === 6 && product.duration === null) {
    return "Six signature treatments, designed as one complete experience";
  }

  if (product.count === 1) return `${product.duration}-minute treatment`;

  const packageAdjustment = offer.key === "lymphatic" ? 50 : 0;
  return `${money((product.price - packageAdjustment) / product.count)} per ${product.duration}-minute treatment`;
}

function purchaseLabel(offer: TreatmentOffer, product: TreatmentProduct) {
  if (offer.key === "ultimate") return 'Choose the Ultimate "YOU" Experience';
  return product.count === 1 ? "Choose 1 Treatment" : `Choose ${product.count} Treatments`;
}

function PricingCard({ offer, product }: { offer: TreatmentOffer; product: TreatmentProduct }) {
  const isSingle = product.count === 1;

  return (
    <article className={`flex min-h-[218px] flex-col rounded-[16px] border p-4 ${isSingle ? "border-stone bg-white" : "border-purple/20 bg-white/85"}`}>
      <p className="section-label mb-2 text-[10px]">{packageLabel(product)}</p>
      <p className="font-serif text-4xl font-light text-purple">{money(product.price)}</p>
      <p className="mt-2 min-h-10 font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.06em] text-muted">{packageDetail(offer, product)}</p>
      <a href={product.href} className={isSingle ? "btn-secondary mt-auto w-full px-3 py-3 text-[10px]" : "btn-primary mt-auto w-full px-3 py-3 text-[10px]"}>
        {purchaseLabel(offer, product)}
      </a>
    </article>
  );
}

function TreatmentCard({ offer }: { offer: TreatmentOffer }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const highlights = offer.key === "ultimate" ? offer.included : offer.benefits;

  return (
    <section id={offer.key} className="section-anchor min-h-[680px] [perspective:1400px] sm:min-h-[640px]">
      <div className={`relative min-h-[680px] w-full transition-transform duration-700 [transform-style:preserve-3d] sm:min-h-[640px] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>
        <button
          type="button"
          onClick={() => setIsFlipped(true)}
          aria-label={`Show ${offer.name} pricing options`}
          className="absolute inset-0 overflow-hidden rounded-[24px] border border-purple/15 bg-white text-left shadow-[0_12px_32px_rgba(60,40,80,.10)] transition hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(60,40,80,.16)] [backface-visibility:hidden]"
        >
          <div className="relative h-[465px] bg-stone/30 sm:h-[420px]">
            <Image src={offer.icon} alt="" fill className="object-contain p-8" sizes="(max-width: 768px) 92vw, 48vw" />
          </div>
          <div className="p-6 text-center">
            <p className="section-label mb-2">Treatment Series</p>
            <h2 className="font-serif text-3xl font-light leading-tight text-[#2c1f14]">{offer.name}</h2>
            <p className="mt-3 font-sans text-xs font-medium uppercase tracking-[0.12em] text-purple">View pricing &amp; options</p>
          </div>
        </button>

        <div className="absolute inset-0 overflow-y-auto rounded-[24px] border border-purple/15 bg-cream p-2 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <button type="button" onClick={() => setIsFlipped(false)} className="sticky top-2 z-10 ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-purple/20 bg-white text-purple shadow-sm" aria-label={`Show ${offer.name} image`}>
            ×
          </button>
          <div className="rounded-[20px] bg-white p-5 md:p-6">
            <p className="section-label mb-2">Treatment Series Options</p>
            <h2 className="font-serif text-3xl font-light leading-tight text-[#2c1f14]">{offer.name}</h2>
            <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted">{offer.description}</p>

            <div className="mt-5 rounded-[16px] border border-purple/15 bg-purple/5 p-4">
              <p className="section-label mb-3 text-[10px]">What to know</p>
              <ul className="space-y-2">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 font-sans text-sm font-light leading-relaxed text-muted"><span className="text-purple">✦</span><span>{highlight}</span></li>
                ))}
              </ul>
            </div>

            <div className={`mt-5 grid gap-3 ${offer.products.length === 1 ? "grid-cols-1" : "sm:grid-cols-2"}`}>
              {offer.products.map((product) => <PricingCard key={`${offer.key}-${product.count}`} offer={offer} product={product} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TreatmentPricingHub() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-20">
      <div className="mb-8 flex flex-wrap justify-center gap-2 md:mb-10">
        {treatmentOffers.map((offer) => (
          <a key={offer.key} href={`#${offer.key}`} className="rounded-full border border-purple/20 bg-white px-3 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.1em] text-purple transition hover:border-purple hover:bg-purple hover:text-white">
            {offer.short}
          </a>
        ))}
      </div>
      <div className="grid gap-7 lg:grid-cols-2">
        {treatmentOffers.map((offer) => <TreatmentCard key={offer.key} offer={offer} />)}
      </div>
    </section>
  );
}
