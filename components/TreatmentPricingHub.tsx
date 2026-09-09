import Image from "next/image";
import { treatmentOffers, type TreatmentOffer, type TreatmentProduct } from "@/lib/treatment-offers";

const ultimateTreatmentLinks = [
  ["Body Contouring", "contour"],
  ["Fascia + Skin Revival", "fascia"],
  ["Lymphatic Wellness", "lymphatic"],
  ["Muscle + Strength + Tone", "muscle"],
  ["Pelvic Floor Strengthening", "pelvic"],
  ["PEMF Recovery + Wellness", "pemf"],
] as const;

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

function PricingOption({ offer, product }: { offer: TreatmentOffer; product: TreatmentProduct }) {
  const isSingle = product.count === 1;
  const isUltimate = offer.key === "ultimate";

  return (
    <article className={`flex min-h-[186px] flex-col rounded-[14px] border p-3.5 ${isSingle ? "border-stone bg-white" : "border-purple/20 bg-purple/[0.025]"}`}>
      <p className="section-label mb-2 text-[10px]">{packageLabel(product)}</p>
      <p className="font-serif text-3xl font-light text-purple md:text-4xl">{money(product.price)}</p>
      <p className="mt-1.5 min-h-9 font-sans text-[10px] font-medium uppercase leading-relaxed tracking-[0.05em] text-muted">{packageDetail(offer, product)}</p>
      {isUltimate && (
        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {ultimateTreatmentLinks.map(([label, key]) => (
            <li key={key}>
              <a href={`#${key}`} className="flex items-center gap-2 font-sans text-xs font-light text-muted transition-colors hover:text-purple">
                <span className="text-purple">✦</span>
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
      <a href={product.href} className={isUltimate ? "btn-primary mt-3 w-full px-2 py-2.5 text-[9px]" : isSingle ? "btn-secondary mt-auto w-full px-2 py-2.5 text-[9px]" : "btn-primary mt-auto w-full px-2 py-2.5 text-[9px]"}>
        {purchaseLabel(offer, product)}
      </a>
    </article>
  );
}

function TreatmentRow({ offer }: { offer: TreatmentOffer }) {
  return (
    <section id={offer.key} className="section-anchor rounded-[20px] border border-purple/15 bg-white p-4 shadow-[0_8px_24px_rgba(60,40,80,.05)] md:p-5">
      <div className="xl:grid xl:grid-cols-[350px_1fr] xl:gap-6">
        <header className="border-b border-stone pb-4 xl:border-b-0 xl:border-r xl:pr-6">
          <div className="flex items-center gap-2">
            <div className={`relative h-[clamp(2.25rem,10vw,3rem)] w-[clamp(2.25rem,10vw,3rem)] shrink-0 xl:h-[52px] xl:w-[52px] xl:basis-[52px] ${offer.key === "ultimate" ? "overflow-hidden rounded-full border border-purple/15 bg-white" : ""}`}>
              <Image src={offer.icon} alt="" fill sizes="(min-width: 1280px) 52px, 48px" className={offer.key === "ultimate" ? "object-cover object-top" : "object-contain"} />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="section-label mb-1 text-[10px]">Treatment Series</p>
              <h2 className="whitespace-nowrap font-serif text-[clamp(0.95rem,4vw,1.35rem)] font-light leading-[1.02] tracking-[-0.02em] text-[#2c1f14] xl:text-[1.18rem]">{offer.name}</h2>
            </div>
          </div>
          <p className="mt-2 font-sans text-sm font-light leading-relaxed text-muted">{offer.description}</p>
        </header>
        <div className={`mt-4 grid gap-3 ${offer.products.length === 1 ? "grid-cols-1" : "grid-cols-2 md:grid-cols-4 xl:gap-2"} xl:mt-0`}>
          {offer.products.map((product) => <PricingOption key={`${offer.key}-${product.count}`} offer={offer} product={product} />)}
        </div>
      </div>
    </section>
  );
}

export default function TreatmentPricingHub() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-20">
      <div className="space-y-5">
        {treatmentOffers.map((offer) => <TreatmentRow key={offer.key} offer={offer} />)}
      </div>
    </section>
  );
}
